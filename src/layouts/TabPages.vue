<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-05-26 14:52:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-30 11:05:16
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
    <q-tab v-for="tab in tabs" :name="tab.id" :label="$t('S.' + upperCase(tab.name).replace(/ /g, '_'))" :key="tab.id">
      <span class="btn-close" @click.stop="onCloseTab(tab.id)">&times;</span>
    </q-tab>
  </q-tabs>

  <q-page :style-fn="pageStyle">
    <router-view />
  </q-page>
</template>

<script setup>
import { usePagesStore } from '@/stores/pageManager'
import { upperCase } from 'lodash'
import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'

/* eslint-disable */
const props = defineProps({
  tabHeaderHeight: {
    type: Number,
    required: false,
    default: 36 /* dense */
  }
})

// common vars
const $router = useRouter()
const pagesStore = usePagesStore()

const tabs = ref(pagesStore.pages)
const activeId = ref(pagesStore.activeId || 'Home')
const activeName = ref(pagesStore.activeName || 'Home')

// provide vars
const bodyHeight = ref(0)
provide('bodyHeight', bodyHeight)

const pageStyle = (offset, height) => {
  // "offset" is a Number (pixels) that refers to the total height of header + footer that occupies on screen,
  // "height" is screen height
  const style = {
    // minHeight: `calc(100vh - ${offset + props.tabHeaderHeight}px)`,
    // body height, with offset and tab header height
    height: `${height - offset - props.tabHeaderHeight}px`,
    // scroll body
    overflow: 'scroll'
  }
  bodyHeight.value = height - offset - props.tabHeaderHeight

  return style
}

// events
const onCloseTab = (tabId) => {
  // always left one page
  if (pagesStore.pages.length > 1) {
    pagesStore.removePage(tabId)
    $router.push(pagesStore.getRouteById(pagesStore.activeId))
  }
}

const onChangeTab = (tabId) => {
  pagesStore.setActivePage(tabId)
  $router.push(pagesStore.getRouteById(tabId))
}

pagesStore.$subscribe(() => {
  // update ui if any changes occurs
  // changes include: addTab, removeTab, resetTab, updateLabel, setActiveTab
  // changes exclude: changeTab
  tabs.value = pagesStore.pages
  activeId.value = pagesStore.activeId
  activeName.value = pagesStore.activeName
  document.title = require('app/package.json').productName + ' - ' + activeName.value
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
