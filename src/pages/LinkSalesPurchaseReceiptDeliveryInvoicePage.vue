<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-11-15 23:10:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-12-13 15:51:53
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <div class="q-pa-sm">
    <LinkItems
      :site="site"
      :style="{ height: tabPanelHeight + 'px' }"
      v-if="isAuthorized('GESPOH') || isAuthorized('GESSOH')"
    />
  </div>
</template>

<script setup>
import { isAuthorized } from '@/assets/auth'
import LinkItems from '@/components/linkItems/LinkItems.vue'
import { LocalStorage } from 'quasar'
import { computed, inject, onBeforeUnmount, ref } from 'vue'

/* eslint-disable */
const props = defineProps({
  tabHeaderHeight: { type: Number, default: 36 /* dense */ }
})

// page vars
const ebus = inject('ebus')
const site = ref(LocalStorage.getItem('site'))
// provide by TabPages
const bodyHeight = inject('bodyHeight')

// computed vars
const tabPanelHeight = computed(() => {
  /** for q-tab-panels */
  return bodyHeight.value > 0 ? bodyHeight.value - props.tabHeaderHeight - 10 : 500
})

// events
ebus.on('changeSite', (newSite) => {
  site.value = newSite
})

onBeforeUnmount(() => {
  ebus.off('changeSite')
})
</script>
