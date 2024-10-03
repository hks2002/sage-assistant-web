<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 23:09:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-11-29 19:34:12
* @FilePath              : sage-assistant-web/src/pages/TodoPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page :style-fn="$pageStore.setTabPageHeightStyle">
    <q-tabs
      v-model="tabSubPage"
      dense
      align="left"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      narrow-indicator
    >
      <q-tab name="Tracking" :label="$t('S.TRACKING')" />
      <q-tab name="NotActive-PN" :label="$t('S.NOT_ACTIVE_PN')" />
      <q-tab name="New-Order" :label="$t('S.NEW_ORDER')" />
      <q-tab name="Short-Bom" :label="$t('S.SHORT_BOM')" />
      <q-tab name="Delivery" :label="$t('S.TO_BE_DELIVERY')" />
      <q-tab name="Receive" :label="$t('S.TO BE_RECEIVE')" />
      <q-tab name="NO-ACK-PO" :label="$t('S.NO_ACK_PO')" />
      <q-tab name="NO-Invoice-PO" :label="$t('S.TO BE_INVOICE')" />
      <q-tab name="Wrong-Project-PO" :label="$t('S.WRONG_PROJECT_PO')" />
      <q-tab name="Dead-PO-Line" :label="$t('S.DEAD_PO_LINE')" />
      <q-tab name="LongTime-NO-QC" :label="$t('S.LONGTIME_NO-QC')" />
      <q-tab name="LongTime-NC" :label="$t('S.LONGTIME_NC')" />
      <q-tab name="Orphan-WO" :label="$t('S.ORPHAN_WO')" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tabSubPage">
      <q-tab-panel name="NotActive-PN" class="q-pa-none">
        <q-markup-table-pn-not-active :site="site" :style="heightStyle" v-if="tabSubPage == 'NotActive-PN'" />
      </q-tab-panel>
      <q-tab-panel name="New-Order" class="q-pa-none">
        <echart-todo-deal-new-s-o :site="site" :style="heightStyle" v-if="tabSubPage == 'New-Order'" />
      </q-tab-panel>
      <q-tab-panel name="Tracking" class="q-pa-none">
        <open-sale-items :site="site" :style="heightStyle" v-if="tabSubPage == 'Tracking'" />
      </q-tab-panel>
      <q-tab-panel name="Delivery" class="q-pa-none">
        <echart-todo-delivery :site="site" :style="heightStyle" v-if="tabSubPage == 'Delivery'" />
      </q-tab-panel>
      <q-tab-panel name="Receive" class="q-pa-none">
        <echart-todo-receive :site="site" :style="heightStyle" v-if="tabSubPage == 'Receive'" />
      </q-tab-panel>
      <q-tab-panel name="Short-Bom" class="q-pa-none">
        <echart-todo-purchase-bom :site="site" :style="heightStyle" v-if="tabSubPage == 'Short-Bom'" />
      </q-tab-panel>
      <q-tab-panel name="Orphan-WO" class="q-pa-none">
        <echart-todo-closed-w-o :site="site" :style="heightStyle" v-if="tabSubPage == 'Orphan-WO'" />
      </q-tab-panel>
      <q-tab-panel name="NO-ACK-PO" class="q-pa-none">
        <echart-todo-no-ack-date-p-o :site="site" :style="heightStyle" v-if="tabSubPage == 'NO-ACK-PO'" />
      </q-tab-panel>
      <q-tab-panel name="LongTime-NC" class="q-pa-none">
        <echart-todo-long-time-n-c :site="site" :style="heightStyle" v-if="tabSubPage == 'LongTime-NC'" />
      </q-tab-panel>
      <q-tab-panel name="LongTime-NO-QC" class="q-pa-none">
        <echart-todo-long-time-no-q-c :site="site" :style="heightStyle" v-if="tabSubPage == 'LongTime-NO-QC'" />
      </q-tab-panel>
      <q-tab-panel name="Wrong-Project-PO" class="q-pa-none">
        <echart-todo-wrong-project-p-o :site="site" :style="heightStyle" v-if="tabSubPage == 'Wrong-Project-PO'" />
      </q-tab-panel>
      <q-tab-panel name="NO-Invoice-PO" class="q-pa-none">
        <echart-todo-no-invoice-p-o :site="site" :style="heightStyle" v-if="tabSubPage == 'NO-Invoice-PO'" />
      </q-tab-panel>
      <q-tab-panel name="Dead-PO-Line" class="q-pa-none">
        <echart-todo-dead-p-o-line :site="site" :style="heightStyle" v-if="tabSubPage == 'Dead-PO-Line'" />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import QMarkupTablePnNotActive from '@/components/products/QMarkupTablePnNotActive.vue'
import OpenSaleItems from '@/components/todo/OpenSaleItems.vue'

import EchartTodoClosedWO from '@/components/echarts/EchartTodoClosedWO.vue'
import EchartTodoDeadPOLine from '@/components/echarts/EchartTodoDeadPOLine.vue'
import EchartTodoDealNewSO from '@/components/echarts/EchartTodoDealNewSO.vue'
import EchartTodoDelivery from '@/components/echarts/EchartTodoDelivery.vue'
import EchartTodoLongTimeNC from '@/components/echarts/EchartTodoLongTimeNC.vue'
import EchartTodoLongTimeNoQC from '@/components/echarts/EchartTodoLongTimeNoQC.vue'
import EchartTodoNoAckDatePO from '@/components/echarts/EchartTodoNoAckDatePO.vue'
import EchartTodoNoInvoicePO from '@/components/echarts/EchartTodoNoInvoicePO.vue'
import EchartTodoPurchaseBom from '@/components/echarts/EchartTodoPurchaseBom.vue'
import EchartTodoReceive from '@/components/echarts/EchartTodoReceive.vue'
import EchartTodoWrongProjectPO from '@/components/echarts/EchartTodoWrongProjectPO.vue'

import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { usePageStore } from '@/stores/PageStore'
import { storeToRefs } from 'pinia'
const $pageStore = usePageStore()

const { tabSubPage, site } = storeToRefs($pageStore)

// computed vars
const heightStyle = computed(() => {
  return { height: `${$pageStore.getDomHeight(36 + 10)}px` }
})

const router = useRouter()
if (router.currentRoute.value.query.page) {
  tabSubPage.value = router.currentRoute.value.query.page
}
if (router.currentRoute.value.query.site) {
  site.value = router.currentRoute.value.query.site
}
</script>
<style lang="scss" scoped></style>
