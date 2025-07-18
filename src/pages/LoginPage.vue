<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-05-24 09:38:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-11-29 19:32:31
* @FilePath              : sage-assistant-web/src/pages/LoginPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page class="flex flex-center" style="height: 100%">
    <q-card style="width: 60vw; min-width: 300px" :flat="!isLgXs">
      <q-card-section :horizontal="isLgXs">
        <!-- horizontal=true make col inactive -->
        <q-card-section class="col-8">
          <!-- horizontal true make col doesn't works -->
          <LottiePlayer animationLink="/json/working-on-laptop-in-office.json" />
        </q-card-section>
        <q-separator v-if="isLgXs" vertical inset />
        <q-card-section align="center" class="col-4">
          <!-- horizontal=true make col inactive -->
          <div class="text-h3 text-primary">
            {{ $t('S.APP_NAME') }}
          </div>
          <q-banner dense class="bg-white text-red text-subtitle1" style="min-height: 100px">
            {{ $t('{VAR_HOLD}', { VAR_HOLD: loginMessage }) }}
          </q-banner>
          <q-form>
            <!--  -->
            <q-input
              v-model="username"
              standout="bg-teal text-white"
              bottom-slots
              :label="$t('S.LOGIN_NAME_NOTE')"
              autocomplete="username"
              @keydown="checkEnterKey($event)"
            >
              <template v-slot:prepend>
                <q-icon name="fas fa-user" />
              </template>
            </q-input>
            <!--  -->
            <q-input
              v-model="password"
              clearable
              class="login-input"
              standout="bg-teal text-white"
              bottom-slots
              :label="$t('S.PASSWORD')"
              :type="isPwd ? 'password' : 'text'"
              autocomplete="current-password"
              @keydown="checkEnterKey($event)"
            >
              <template v-slot:prepend>
                <q-icon name="fas fa-key" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  class="cursor-pointer"
                  v-on:click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <!--  -->
            <q-btn
              :loading="loading"
              class="login-btn bg-login-card-input"
              text-color="white"
              unelevated
              label
              style="font-size: large"
              @click="doLogin"
            >
              {{ $t('S.LOGIN') }}
            </q-btn>
          </q-form>
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { axiosPost } from '@/assets/axiosActions'
import LottiePlayer from '@/components/lottie/LottiePlayer.vue'
import { SessionStorage, useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

// common vars
const $q = useQuasar()
const $router = useRouter()
const { t } = useI18n()

// page vars
const isLgXs = $q.screen.gt.xs
const isPwd = ref(true)
const username = ref('')
const password = ref('')
const loading = ref(false)
const loginMessage = ref('')

onMounted(() => {
  SessionStorage.remove('authorization')
  SessionStorage.remove('functions')
  SessionStorage.remove('userProfiles')
})

// This function is from Sage login page, login.js
const authToken = (type, login, password) => {
  // convert to UTF8 (only works for characters with code points up to 65535)
  let s = login + ':' + password
  let i = s.length
  while (--i >= 0) {
    const c = s.charCodeAt(i)
    if (c > 127) {
      if (c < 2047) {
        s = s.substr(0, i) + String.fromCharCode(192 | (c >> 6), 128 | (c & 0x3f)) + s.substr(i + 1)
      } else {
        s =
          s.substr(0, i) +
          String.fromCharCode(224 | (c >> 12), 128 | ((c >> 6) & 0x3f), 128 | (c & 0x3f)) +
          s.substr(i + 1)
      }
    }
  }
  // !!! btoa not supported on IE??
  switch (type) {
    case 'basic':
      return 'Basic ' + window.btoa(s)
    case 'sageerpx3':
      return 'sageerpx3 ' + window.btoa(s)
    default:
      return null
  }
}

const checkEnterKey = (event) => {
  if (event.keyCode === 13) {
    doLogin()
  }
}

const doLogin = async () => {
  if (username.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    $q.dialog({
      title: t('S.TIPS'),
      message: t('S.LOGIN_NAME_NOTE'),
      html: true,
      ok: {
        label: t('S.OK'),
        color: 'primary'
      }
    })
    return
  }
  const token = authToken('basic', username.value.toLocaleLowerCase(), password.value)
  SessionStorage.set('authorization', token)

  await axiosPost('/Data/Login', { username: username.value.toLocaleLowerCase() })
    .then(
      (response) => {
        if (response.success) {
          loginMessage.value = t('S.LOAD_PROFILE')

          $router.push({ name: 'Home' })
        } else {
          SessionStorage.remove('authorization')
          loginMessage.value = response.msg
        }
      },
      (error) => {
        SessionStorage.remove('authorization')
        if (error.msg) {
          loginMessage.value = error.msg
        } else {
          loginMessage.value = t('S.OOPS')
        }
      }
    )
    .finally(() => {
      loading.value = false
      $q.loadingBar.stop()
    })
}
</script>

<style lang="scss" scoped>
.login-btn {
  font-size: large;
  margin-top: 0px;
  margin-bottom: 20px;
  width: 100%;
}

.bg-login-card-input {
  background: linear-gradient(to right, $secondary, $primary);
  transition: all 0.3s ease-in-out;
  background-size: 200% auto;
}

.bg-login-card-input:hover {
  background-position: right center;
  box-shadow: 0 12px 20px -11px $primary-h;
}
</style>
