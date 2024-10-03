<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-10-17 18:11:30
* @FilePath              : sage-assistant-web/src/layouts/MainLayout.vue
* @CopyRight             : MerBleueAviation
-->

<template>
  <q-layout view="hHh Lpr lFf">
    <PageHeader />

    <!-- mini-to-overlay let the main body size frozen-->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      :mini-width="40"
      :width="200"
      mini-to-overlay
      bordered
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <MenuItems />
    </q-drawer>

    <q-page-container>
      <TabPages />
    </q-page-container>

    <PageFooter />
  </q-layout>
</template>

<script setup>
import MenuItems from '@/components/menu/MenuItems.vue'
import PageFooter from '@/layouts/PageFooter.vue'
import PageHeader from '@/layouts/PageHeader.vue'
import TabPages from '@/layouts/TabPages.vue'

import { usePageStore } from '@/stores/PageStore'
import { storeToRefs } from 'pinia'

const $pageStore = usePageStore()
const { leftDrawerOpen, miniState } = storeToRefs($pageStore)
$pageStore.usingTabPage = true
</script>
