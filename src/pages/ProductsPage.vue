<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-21 13:35:21
* @FilePath              : sage-assistant-web/src/pages/ProductsPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page :style-fn="$pageStore.setPageHeightStyle">
    <WaitInputLottieVue v-if="!pnRoot" />
    <div class="row q-gutter-sm q-pa-sm">
      <div class="col-12">
        <QSelectAxios
          option-label="PN"
          option-value="PNROOT"
          data-url="/Data/PNHelper"
          :label="$t('S.SEARCH_PRODUCT')"
          :hint="$t('S.SEARCH_PRODUCT_HINT')"
          input-style="font-weight:bolder;font-size:25px;text-transform:uppercase"
          popup-content-style="font-weight:bold;font-size:25px"
          popup-content-class="text-secondary"
          class="q-pa-sm"
          @update:model-value="update"
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-pa-sm" :style="$pageStore.setDomHeightStyle(56)" v-if="pnRoot">
      <div class="col-3">
        <q-card>
          <q-scroll-area style="height: 150px"> <QListPnList :pnRoot="pnRoot" /></q-scroll-area>
        </q-card>
      </div>
      <div class="col-3">
        <q-card>
          <q-scroll-area style="height: 150px"> <FileList :pn="pnRoot" /> </q-scroll-area>
        </q-card>
      </div>
      <div class="col-3"><EchartPNInventoryStock :pnRoot="pnRoot" style="height: 150px" /></div>
      <div class="col-3"><EchartPNDeliveryDuration :pnRoot="pnRoot" style="height: 150px" /></div>
      <div class="col-12"><EchartPNSalesHistory :pnRoot="pnRoot" style="height: 300px" /></div>
      <div class="col-12"><EchartPNQuoteHistory :pnRoot="pnRoot" style="height: 300px" /></div>
      <div class="col-12"><EchartPNCostHistory :pnRoot="pnRoot" style="height: 300px" /></div>
    </div>
  </q-page>
</template>

<script setup>
import EchartPNCostHistory from '@/components/echarts/EchartPNCostHistory.vue'
import EchartPNDeliveryDuration from '@/components/echarts/EchartPNDeliveryDuration.vue'
import EchartPNInventoryStock from '@/components/echarts/EchartPNInventoryStock.vue'
import EchartPNQuoteHistory from '@/components/echarts/EchartPNQuoteHistory.vue'
import EchartPNSalesHistory from '@/components/echarts/EchartPNSalesHistory.vue'
import WaitInputLottieVue from '@/components/lottie/WaitInputLottie.vue'
import FileList from '@/components/products/FileList.vue'
import QListPnList from '@/components/products/QListPnList.vue'
import QSelectAxios from '@/controls/QSelectAxios.vue'

import { ref } from 'vue'

import { usePageStore } from '@/stores/PageStore'
const $pageStore = usePageStore()

// page vars
const pnRoot = ref('')
// actions
const update = (newPNROOT) => {
  pnRoot.value = newPNROOT
}
</script>
<style lang="scss" scoped></style>
