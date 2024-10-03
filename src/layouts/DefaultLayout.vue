<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-11-29 19:29:43
* @FilePath              : sage-assistant-web/src/layouts/DefaultLayout.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-layout>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { usePageStore } from '@/stores/PageStore'

const $pageStore = usePageStore()
$pageStore.usingTabPage = false
</script>
