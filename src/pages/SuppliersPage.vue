<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-04-08 09:36:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-19 13:40:17
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <ExceptionLottie :ErrorCode="403" v-if="!isAuthorized('GESPOH')" />
  <WaitInputLottieVue v-if="!supplierCode && isAuthorized('GESPOH')" />

  <div class="row q-gutter-sm q-pa-sm" v-if="isAuthorized('GESPOH')">
    <QSelectAxiosVue
      option-label="supplierName"
      option-value="supplierCode"
      data-url="/Data/SupplierHelper"
      :label="$t('S.SEARCH_SUPPLIER')"
      input-style="font-weight:bolder;font-size:25px;text-transform:uppercase"
      popup-content-style="font-weight:bold;font-size:25px"
      popup-content-class="text-secondary"
      class="col-grow"
      v-model="supplierCode"
    />
    <q-input
      dense
      outlined
      debounce="1000"
      mask="date"
      type="date"
      class="col-3"
      :label="$t('S.FROM')"
      v-model="dateFrom"
    />
    <q-input
      dense
      outlined
      debounce="1000"
      mask="date"
      type="date"
      class="col-3"
      :label="$t('S.TO')"
      v-model="dateTo"
    />
  </div>
  <QCardSupplierInfoVue :supplierCode="supplierCode" class="q-mx-sm q-pt-sm" v-if="supplierCode" />
  <QMarkupTableSupplierOpenItemsVue
    :supplierCode="supplierCode"
    :dateFrom="dateFrom"
    :dateTo="dateTo"
    class="row q-mx-sm q-mt-sm col-grow"
    v-if="supplierCode"
  />
  <div class="row q-mx-sm q-mt-sm" v-if="supplierCode">
    <EchartSupplierOpenQtyVue
      :supplierCode="supplierCode"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      style="padding: 0px; height: 200px"
      class="col-6"
    />
    <EchartSupplierOpenAmountVue
      :supplierCode="supplierCode"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      style="padding: 0px; height: 200px"
      class="col-6"
    />
  </div>
  <div class="row q-mx-sm q-mt-sm" v-if="supplierCode">
    <EchartSupplierTotalQtyVue
      :supplierCode="supplierCode"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      style="padding: 0px; height: 200px"
      class="col-6"
    />
    <EchartSupplierTotalAmountVue
      :supplierCode="supplierCode"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      style="padding: 0px; height: 200px"
      class="col-6"
    />
  </div>
  <div class="row q-mx-sm q-mt-sm" v-if="supplierCode">
    <EchartSupplierDeliveryHistoryVue
      :supplierCode="supplierCode"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      style="padding: 0px; height: 200px"
      class="col-6"
    />
    <EchartSupplierDelayHistoryVue
      :supplierCode="supplierCode"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      style="padding: 0px; height: 200px"
      class="col-6"
    />
  </div>
</template>

<script setup>
import { isAuthorized } from '@/assets/auth'
import EchartSupplierDelayHistoryVue from '@/components/echarts/EchartSupplierDelayHistory.vue'
import EchartSupplierDeliveryHistoryVue from '@/components/echarts/EchartSupplierDeliveryHistory.vue'
import EchartSupplierOpenAmountVue from '@/components/echarts/EchartSupplierOpenAmount.vue'
import EchartSupplierOpenQtyVue from '@/components/echarts/EchartSupplierOpenQty.vue'
import EchartSupplierTotalAmountVue from '@/components/echarts/EchartSupplierTotalAmount.vue'
import EchartSupplierTotalQtyVue from '@/components/echarts/EchartSupplierTotalQty.vue'
import ExceptionLottie from '@/components/lottie/ExceptionLottie.vue'
import WaitInputLottieVue from '@/components/lottie/WaitInputLottie.vue'
import QCardSupplierInfoVue from '@/components/suppliers/QCardSupplierInfo.vue'
import QMarkupTableSupplierOpenItemsVue from '@/components/suppliers/QMarkupTableSupplierOpenItems.vue'
import QSelectAxiosVue from '@/controls/QSelectAxios.vue'
import { date } from 'quasar'
import { ref } from 'vue'

/* eslint-disable */
const props = defineProps({
  pageHeight: { type: Number, default: 0 /* not passing  */ }
})

// page vars
const supplierCode = ref(null)
const { formatDate, addToDate } = date

const nowTimeStamp = Date.now()
const fromTimeStamp = addToDate(nowTimeStamp, { years: -3 })
const dateFrom = ref(formatDate(fromTimeStamp, 'YYYY-MM-DD'))
const dateTo = ref(formatDate(nowTimeStamp, 'YYYY-MM-DD'))
</script>
<style lang="scss" scoped></style>
