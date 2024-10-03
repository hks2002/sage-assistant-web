<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 23:09:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-11-29 19:34:28
* @FilePath              : sage-assistant-web/src/pages/WorkActionPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page :style-fn="$pageStore.setTabPageHeightStyle">
    <q-tabs
      v-model="tabPage"
      dense
      align="left"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      narrow-indicator
    >
      <q-tab name="TQC" :label="$t('S.TQC')" />
      <q-tab name="IQC" :label="$t('S.IQC')" />
      <q-tab name="FQC" :label="$t('S.FQC')" />
      <q-tab name="PCK" :label="$t('S.PACKING')" />
    </q-tabs>
    <q-separator />
    <work-action :actType="tabPage" :site="site" :style="heightStyle" />
  </q-page>
</template>

<script setup>
import WorkAction from '@/components/workAction/WorkAction.vue'

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { usePageStore } from '@/stores/PageStore'
import { storeToRefs } from 'pinia'
const $pageStore = usePageStore()

// computed vars
const heightStyle = computed(() => {
  return { height: `${$pageStore.getTabPageDomHeight(36 + 10)}px` }
})
const { site } = storeToRefs($pageStore)

const tabPage = ref('TQC')

const router = useRouter()
if (router.currentRoute.value.query.page) {
  tabPage.value = router.currentRoute.value.query.page
}
if (router.currentRoute.value.query.site) {
  site.value = router.currentRoute.value.query.site
}
</script>
<style lang="scss" scoped></style>
