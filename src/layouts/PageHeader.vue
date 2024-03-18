<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-12-15 14:22:48
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-header elevated :style="'height:' + height + 'px'">
    <q-toolbar>
      <q-btn flat dense round icon="fas fa-outdent" aria-label="Menu" @click="toggleLeftDrawer" />
      <q-btn v-show="$q.screen.gt.xs" dense flat round size="sm" class="q-mr-xs" @click="goHome">
        <q-avatar dense>
          <img src="/imgs/logo.svg" style="background-color: white" />
        </q-avatar>
      </q-btn>
      <q-toolbar-title>{{ $t('S.APP_NAME') }}{{ $route.path }}</q-toolbar-title>
      <div class="q-gutter-xs q-ml-sm row items-center no-wrap">
        <q-select
          dense
          borderless
          emit-value
          map-options
          options-dense
          color="primary"
          v-model="site"
          :options="siteList"
          @update:model-value="changeSite"
        >
          <template #selected-item="{ opt }">
            <span class="text-white">{{ opt }}</span>
          </template>
        </q-select>
        <q-select
          dense
          borderless
          emit-value
          map-options
          options-dense
          color="primary"
          v-model="locale"
          :options="langOptions"
          @update:model-value="changeLanguage"
        >
          <template #selected-item="{ opt }">
            <span class="text-white">{{ opt.label }}</span>
          </template>
        </q-select>
        <q-btn round dense size="sm" icon="fas fa-question-circle" @click="showHelp">
          <q-tooltip>{{ $t('S.HELP') }}</q-tooltip>
        </q-btn>
        <q-btn dense round size="sm" icon="fas fa-bell">
          <q-badge v-if="totalInformCount > 0" color="negative" style="padding: 2px 4px" title-color="white" floating>
            {{ totalInformCount }}
          </q-badge>
        </q-btn>
        <span>{{ userInfo }}</span>
        <q-btn dense flat size="sm" icon="fas fa-sign-out-alt" @click="doLogout">
          <q-tooltip>{{ $t('S.EXIT') }}</q-tooltip>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { usePagesStore } from '@/stores/pageManager'
import { Cookies, Dialog, LocalStorage, SessionStorage, useQuasar } from 'quasar'
import languages from 'quasar/lang/index.json'
import { inject, onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

/* eslint-disable */
const props = defineProps({
  height: {
    type: Number,
    required: false,
    default: 40
  }
})

// common vars
const pagesStore = usePagesStore()
const $router = useRouter()
const $q = useQuasar()
const ebus = inject('ebus')

// header vars
const site = ref(null)
const siteList = ref(null)
const userInfo = ref('')
const totalInformCount = ref(0)

// languages vars
// 'en-US', 'zh-CN'
const { locale, t } = useI18n()
const appLanguages = languages.filter((lang) => ['en-US', 'zh-CN'].includes(lang.isoName))
const langOptions = appLanguages.map((lang) => ({
  label: lang.nativeName,
  value: lang.isoName
}))

// actions
const toggleLeftDrawer = () => {
  ebus.emit('toggleLeftDrawer')
}

const showHelp = () => {
  Dialog.create({
    title: t('S.INFO'),
    message: t('S.IN_DEVELOPING')
  })
}

const goHome = () => {
  pagesStore.$reset()
  $router.push({ name: 'Home' })
}

const doLogout = () => {
  SessionStorage.remove('authorization')
  SessionStorage.remove('authorizations')
  SessionStorage.remove('userProfiles')
  $router.push({ path: '/Login' })
}

const changeSite = (val) => {
  LocalStorage.set('site', val)
  ebus.emit('changeSite', val)
}

const changeLanguage = (val) => {
  // This change $t() in template automatically,
  locale.value = val
  // Save this change in Cookies
  Cookies.set('locale', val)

  // Json data import won't update automatically,
  // so send a signal
  ebus.emit('changeLanguage', val)
}

// event handing
onBeforeMount(() => {
  if (!LocalStorage.has('site')) {
    site.value = 'ZHU'
    LocalStorage.set('site', site.value)
  }

  axiosGet('/Data/Sites').then((data) => {
    siteList.value = data
    LocalStorage.set('siteList', siteList.value)
  })
  const userProfiles = SessionStorage.getItem('userProfiles')
  userInfo.value = userProfiles.userName + '<' + userProfiles.email + '>'
})
</script>

<style lang="scss" scoped>
.q-field__native > span {
  color: white;
}
.q-field__append {
  color: white;
}
</style>
