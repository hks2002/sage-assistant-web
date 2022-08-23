<!--
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-03-25 11:01:23
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-08-23 12:39:49
 * @FilePath       : \web2\src\layouts\PageHeader.vue
 * @CopyRight      : Dedienne Aerospace China ZhuHai
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
      <q-toolbar-title>Sage Assistant{{ $route.path }}</q-toolbar-title>
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
        <q-btn type="a" target="_blank" size="sm" dense round href="https://srvsyr01">
          <q-avatar size="sm">
            <img src="https://srvsyr01/favicon.ico" />
            <q-tooltip v-if="$q.screen.gt.sm">
              {{ sageInfo }}
            </q-tooltip>
          </q-avatar>
        </q-btn>
        <q-btn round dense size="sm" icon="fas fa-question-circle" @click="showHelp">
          <q-tooltip>{{ $t('Help') }}</q-tooltip>
        </q-btn>
        <q-btn dense round size="sm" icon="fas fa-bell">
          <q-badge v-if="totalInformCount > 0" color="negative" style="padding: 2px 4px" title-color="white" floating>
            {{ totalInformCount }}
          </q-badge>
        </q-btn>
        <span>{{ userInfo }}</span>
        <q-btn dense flat size="sm" icon="fas fa-sign-out-alt" @click="doLogout">
          <q-tooltip>{{ $t('Exit') }}</q-tooltip>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { infoDialog } from '@/assets/common'
import { ebus } from '@/assets/ebus'
import { usePagesStore } from '@/stores/pageManager'
import { LocalStorage, SessionStorage, useQuasar } from 'quasar'
import languages from 'quasar/lang/index.json'
import { onBeforeMount, ref } from 'vue'
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

// header vars
const site = ref(null)
const siteList = ref(null)
const userInfo = ref('Your name')
const sageInfo = ref('Sage')
const totalInformCount = ref(0)

// languages vars
// 'fr', 'de'
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

const changeSite = () => {
  LocalStorage.set('site', site.value)
  ebus.emit('changeSite', site.value)
}

const showHelp = () => {
  infoDialog(t('In Developping'))
}

const goHome = () => {
  pagesStore.$reset()
  $router.push({ name: 'Home' })
}

const doLogout = () => {
  SessionStorage.remove('authorization')
  $router.push({ path: '/Login' })
}

const updateUserProfiles = () => {
  const userProfiles = SessionStorage.getItem('userProfiles')
  if (userProfiles) {
    userInfo.value = userProfiles.userInfo
    sageInfo.value = userProfiles.sageInfo
  }
}

// events
onBeforeMount(() => {
  updateUserProfiles()

  if (LocalStorage.getItem('site')) {
    site.value = LocalStorage.getItem('site')
  } else {
    LocalStorage.set('site', 'ZHU')
    site.value = 'ZHU'
  }

  axiosGet('/Data/Sites').then((data) => {
    siteList.value = data
    LocalStorage.set('siteList', siteList.value)
  })
})

const changeLanguage = (val) => {
  // This change $t() in template automaticly,
  locale.value = val
  // Json data import won't update automaticly,
  // so send a signal
  ebus.emit('changeLanguage')

  // dynamic import, so loading on demand only
  // save to cookies also
  Promise.resolve(require('quasar/lang/' + val)).then((lang) => {
    $q.lang.set(lang.default)
    $q.cookies.set('locale', lang.default.isoName, {
      path: '/',
      expires: '7d'
    })
  })
}
</script>
<style lang="scss" scoped>
.q-field__native > span {
  color: white;
}
.q-field__append {
  color: white;
}
</style>
