<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-05-26 14:52:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-12-30 14:20:43
* @FilePath              : sage-assistant-web/src/layouts/TabPages.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-tabs
    dense
    shrink
    no-caps
    narrow-indicator
    mobile-arrows
    align="left"
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    v-model="activeId"
    @update:model-value="onChangeTab"
  >
    <!-- Set the page label, such as 'S.HOME PAGE', replace space with '_' -->
    <q-tab v-for="tab in pages" :name="tab.id" :label="$t('S.' + constCase(tab.name))" :key="tab.id">
      <span class="btn-close" @click.stop="onCloseTab(tab.id)">&times;</span>
    </q-tab>
  </q-tabs>

  <router-view />
</template>

<script setup>
import { constCase, titleCase } from '@/assets/nameStyle'
import { usePageStore } from '@/stores/PageStore'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

// common vars
const $router = useRouter()
const $pagesStore = usePageStore()

$pagesStore.tabHeaderHeight = 36 /* dense */
const { activeId, activeName, pages } = storeToRefs($pagesStore)

// events
const onCloseTab = (tabId) => {
  // always left one page
  if ($pagesStore.pages.length > 1) {
    $pagesStore.removePage(tabId)
    $router.push($pagesStore.getRouteById($pagesStore.activeId))
  }
}

const onChangeTab = (tabId) => {
  $pagesStore.setActivePage(tabId)
  $router.push($pagesStore.getRouteById(tabId))
}

watch(activeId, (newValue) => {
  console.debug('onChangeTab:', newValue)
  document.title = require('app/package.json').productName + ' - ' + titleCase(activeName.value)
})
</script>

<style lang="scss" scoped>
.btn-close {
  position: absolute;
  display: inline-block;
  top: 6px;
  right: -12px;
  line-height: 12px;
  width: 14px;
  height: 14px;
  border-radius: 14px;
  font-size: 12px;
  transition: all 0.2s ease;

  &:hover {
    color: #333;
    transform: scale(1.5);
    cursor: pointer;
  }
}
</style>
