<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-23 22:58:30
* @FilePath              : sage-assistant-web/src/pages/ProductsPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <WaitInputLottieVue v-if="!pnRoot && isAuthorized('GESITM')" />
  <ExceptionLottie :ErrorCode="403" v-if="!isAuthorized('GESITM')" />
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
    v-if="isAuthorized('GESITM')"
    @update:model-value="update"
  />
  <div class="row q-gutter-sm q-px-sm" style="height: 150px" v-if="pnRoot">
    <q-card class="col-4">
      <q-scroll-area style="height: 150px">
        <q-list-pn-list :pnRoot="pnRoot" />
      </q-scroll-area>
    </q-card>
    <q-card class="col-grow">
      <q-scroll-area style="height: 150px">
        <EchartInventoryStock :pnRoot="pnRoot" style="padding: 0px; height: 150px" v-show="isAuthorized('CONSSDE')" />
      </q-scroll-area>
    </q-card>
    <q-card class="col-4">
      <q-scroll-area style="height: 150px">
        <EchartDeliveryDuration :pnRoot="pnRoot" style="height: 150px" v-show="isAuthorized('GESSDH')" />
      </q-scroll-area>
    </q-card>
  </div>
  <div class="row q-px-sm" v-if="pnRoot">
    <EchartSalesHistory :pnRoot="pnRoot" :style="echartHeight" class="col-grow" v-show="isAuthorized('GESSOH')" />
  </div>
  <div class="row q-px-sm" v-if="pnRoot">
    <EchartQuoteHistory :pnRoot="pnRoot" :style="echartHeight" class="col-grow" v-show="isAuthorized('GESSQH')" />
  </div>
  <div class="row q-px-sm" v-if="pnRoot">
    <EchartCostHistory :pnRoot="pnRoot" :style="echartHeight" class="col-grow" v-show="isAuthorized('GESPOH')" />
  </div>
</template>

<script setup>
import { isAuthorized } from '@/assets/auth'
import EchartCostHistory from '@/components/echarts/EchartCostHistory.vue'
import EchartDeliveryDuration from '@/components/echarts/EchartDeliveryDuration.vue'
import EchartInventoryStock from '@/components/echarts/EchartInventoryStock.vue'
import EchartQuoteHistory from '@/components/echarts/EchartQuoteHistory.vue'
import EchartSalesHistory from '@/components/echarts/EchartSalesHistory.vue'
import ExceptionLottie from '@/components/lottie/ExceptionLottie.vue'
import WaitInputLottieVue from '@/components/lottie/WaitInputLottie.vue'
import QListPnList from '@/components/products/QListPnList.vue'
import QSelectAxios from '@/controls/QSelectAxios.vue'
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'

/* eslint-disable */
const props = defineProps({
  pageHeight: { type: Number, default: 0 /* not passing  */ }
})

// common vars
const $q = useQuasar()

// page vars
const pnRoot = ref('')

// computed vars
const echartHeight = computed(() => {
  /** 56: QSelect height, 150: PnInfo height */
  const echartItemHeight = (props.pageHeight - 56 - 150) / 3
  return echartItemHeight > 320 ? { height: echartItemHeight + 'px' } : { height: 320 + 'px' }
})

// actions
const update = (newPNROOT) => {
  pnRoot.value = newPNROOT
}
</script>
<style lang="scss" scoped></style>
