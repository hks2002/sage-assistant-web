<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-24 10:37:45
* @FilePath              : sage-assistant-web/src/layouts/PageHeader.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-header elevated :style="'height:' + height + 'px'">
    <q-toolbar>
      <q-btn flat dense round icon="fas fa-outdent" aria-label="Menu" @click="toggleLeftDrawer" />
      <q-btn v-show="$q.screen.gt.xs" dense flat round size="sm" class="q-mr-xs" @click="goHome">
        <q-avatar dense>
          <q-img src="/imgs/logo.svg" style="background-color: white" />
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
          v-model="language"
          :options="langOptions"
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
import { axiosGet, axiosPost } from '@/assets/axiosActions'
import { usePageStore } from '@/stores/PageStore'
import { storeToRefs } from 'pinia'
import { Dialog, SessionStorage, useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import languages from 'quasar/lang/index.json'

/* eslint-disable */
const props = defineProps({
  height: {
    type: Number,
    required: false,
    default: 40
  }
})

// common vars
const $pageStore = usePageStore()
const $router = useRouter()
const $q = useQuasar()

// header vars
const { site, language, siteList, userInfo } = storeToRefs($pageStore)
const totalInformCount = ref(0)

// languages vars
const { t } = useI18n()
const appLangs = []
const i18nFiles = require.context('@/i18n', false, /.json$/)
i18nFiles.keys().forEach((key) => {
  // remove "./" and ".js"
  const lang = key.slice(2, -5)
  appLangs.push(lang)
  console.debug('\u001b[35m' + '[i18n] ', 'adding', lang)
})
const appLanguages = languages.filter((lang) => appLangs.includes(lang.isoName))
const langOptions = appLanguages.map((lang) => ({
  label: lang.nativeName,
  value: lang.isoName
}))

// actions
const toggleLeftDrawer = () => {
  $pageStore.toggleLeftDrawer()
}

const showHelp = () => {
  Dialog.create({
    title: t('S.INFO'),
    message: t('S.IN_DEVELOPING')
  })
}

const goHome = () => {
  $pageStore.$reset()
  $router.push({ name: 'Dashboard' })
}

const doLogout = () => {
  SessionStorage.remove('authorization')
  SessionStorage.remove('functions')
  SessionStorage.remove('userProfiles')
  $router.push({ path: '/Login' })
}

// event handing
onMounted(() => {
  axiosGet('/Data/Sites').then((data) => {
    data.push('CHINA')
    data.push('ALL')
    siteList.value = data
  })

  axiosPost('/Data/Profile', {}).then((response) => {
    if (response.success) {
      SessionStorage.set('userProfiles', response.profile)
      $pageStore.setUserInfo(response.profile.userName + '<' + response.profile.email + '>')
    }
  })

  axiosPost('/Data/Function', {}).then((response) => {
    if (response.success) {
      SessionStorage.set('functions', response.functions)
    }
  })
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
