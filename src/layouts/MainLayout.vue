<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-25 10:53:08
* @FilePath              : sage-assistant-web/src/layouts/MainLayout.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-layout view="hHh Lpr lFf">
    <PageHeader />

    <!-- mini-to-overlay let the main body size frozen-->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      :mini-width="drawerMiniWidth"
      :width="150"
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
import MenuItems from '@/layouts/MenuItems.vue'
import PageFooter from '@/layouts/PageFooter.vue'
import PageHeader from '@/layouts/PageHeader.vue'
import TabPages from '@/layouts/TabPages.vue'
import { inject, onBeforeUnmount, ref } from 'vue'

const ebus = inject('ebus')
/** why it always be true when mounted */
const leftDrawerOpen = ref(true)
const miniState = ref(true)
const drawerMiniWidth = 40

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const closeLeftDrawer = () => {
  leftDrawerOpen.value = false
}

// event handing
ebus.on('toggleLeftDrawer', toggleLeftDrawer)
ebus.on('closeLeftDrawer', closeLeftDrawer)

onBeforeUnmount(() => {
  ebus.off('toggleLeftDrawer', toggleLeftDrawer)
  ebus.off('closeLeftDrawer', closeLeftDrawer)
})
</script>
