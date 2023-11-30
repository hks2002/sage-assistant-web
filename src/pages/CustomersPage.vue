<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-04-08 09:36:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-30 11:00:36
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <ExceptionLottie :ErrorCode="403" v-if="!isAuthorized('GESSOH')" />
  <WaitInputLottieVue v-if="!customerCode && isAuthorized('GESSOH')" />

  <div class="row q-gutter-sm q-pa-sm" v-if="isAuthorized('GESSOH')">
    <QSelectAxiosVue
      option-label="customerName"
      option-value="customerCode"
      data-url="/Data/CustomerHelper"
      :label="$t('S.SEARCH_CUSTOMER')"
      input-style="font-weight:bolder;font-size:25px;text-transform:uppercase"
      popup-content-style="font-weight:bold;font-size:25px"
      popup-content-class="text-secondary"
      class="col-grow"
      v-model="customerCode"
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
  <QCardCustomerInfoVue :customerCode="customerCode" class="q-mx-sm q-pt-sm" v-if="customerCode" />
  <QMarkupTableCustomerOpenItemsVue
    :customerCode="customerCode"
    :dateFrom="dateFrom"
    :dateTo="dateTo"
    class="row q-mx-sm q-mt-sm col-grow"
    v-if="customerCode"
  />
  <div class="row q-mx-sm q-mt-sm" v-if="customerCode">
    <EchartCustomerOpenQtyVue
      :customerCode="customerCode"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      style="padding: 0px; height: 200px"
      class="col-6"
    />
    <EchartCustomerOpenAmountVue
      :customerCode="customerCode"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      style="padding: 0px; height: 200px"
      class="col-6"
    />
  </div>
  <div class="row q-mx-sm q-mt-sm" v-if="customerCode">
    <EchartCustomerTotalQtyVue
      :customerCode="customerCode"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      style="padding: 0px; height: 200px"
      class="col-6"
    />
    <EchartCustomerTotalAmountVue
      :customerCode="customerCode"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      style="padding: 0px; height: 200px"
      class="col-6"
    />
  </div>
  <div class="row q-mx-sm q-mt-sm" v-if="customerCode">
    <EchartCustomerDeliveryHistoryVue
      :customerCode="customerCode"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      style="padding: 0px; height: 200px"
      class="col-6"
    />
    <EchartCustomerDelayHistoryVue
      :customerCode="customerCode"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      style="padding: 0px; height: 200px"
      class="col-6"
    />
  </div>
</template>

<script setup>
import { isAuthorized } from '@/assets/auth'
import QCardCustomerInfoVue from '@/components/customers/QCardCustomerInfo.vue'
import QMarkupTableCustomerOpenItemsVue from '@/components/customers/QMarkupTableCustomerOpenItems.vue'
import EchartCustomerDelayHistoryVue from '@/components/echarts/EchartCustomerDelayHistory.vue'
import EchartCustomerDeliveryHistoryVue from '@/components/echarts/EchartCustomerDeliveryHistory.vue'
import EchartCustomerOpenAmountVue from '@/components/echarts/EchartCustomerOpenAmount.vue'
import EchartCustomerOpenQtyVue from '@/components/echarts/EchartCustomerOpenQty.vue'
import EchartCustomerTotalAmountVue from '@/components/echarts/EchartCustomerTotalAmount.vue'
import EchartCustomerTotalQtyVue from '@/components/echarts/EchartCustomerTotalQty.vue'
import ExceptionLottie from '@/components/lottie/ExceptionLottie.vue'
import WaitInputLottieVue from '@/components/lottie/WaitInputLottie.vue'
import QSelectAxiosVue from '@/controls/QSelectAxios.vue'
import { date } from 'quasar'
import { ref } from 'vue'

// page vars
const customerCode = ref(null)
const { formatDate, addToDate } = date

const nowTimeStamp = Date.now()
const fromTimeStamp = addToDate(nowTimeStamp, { years: -3 })
const dateFrom = ref(formatDate(fromTimeStamp, 'YYYY-MM-DD'))
const dateTo = ref(formatDate(nowTimeStamp, 'YYYY-MM-DD'))
</script>
<style lang="scss" scoped></style>
