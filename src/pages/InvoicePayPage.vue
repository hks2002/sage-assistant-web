<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 23:07:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-24 14:40:36
* @FilePath              : sage-assistant-web/src/pages/InvoicePayPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page :style-fn="$pageStore.setPageHeightStyle">
    <div class="row q-gutter-sm q-pa-sm">
      <q-btn-group outline>
        <q-btn
          dense
          outline
          no-caps
          color="primary"
          icon="watch_later"
          :label="$t('S.LAST_5YEAR')"
          @click="updateDateRange('lastNYear', 5)"
        />
        <q-btn
          dense
          outline
          no-caps
          color="primary"
          icon="watch_later"
          :label="$t('S.LAST_YEAR')"
          @click="updateDateRange('lastNYear', 1)"
        />
        <q-btn
          dense
          outline
          no-caps
          color="primary"
          icon="watch_later"
          :label="$t('S.THIS_YEAR')"
          @click="updateDateRange('lastNYear', 0)"
        />
      </q-btn-group>
      <QSelectAxiosVue
        option-label="customerName"
        option-value="customerCode"
        v-model="customerCode"
        data-url="/Data/CustomerHelper"
        :label="$t('S.SEARCH_CUSTOMER')"
        input-style="font-weight:bolder;font-size:25px;text-transform:uppercase"
        popup-content-style="font-weight:bold;font-size:25px"
        popup-content-class="text-secondary"
        class="col-2"
        @clear="clearCustomer()"
      />
      <q-input
        v-model="dateFrom"
        dense
        outlined
        debounce="1000"
        mask="date"
        type="date"
        :label="$t('S.FROM')"
        class="col-1"
      />
      <q-input
        v-model="dateTo"
        dense
        outlined
        debounce="1000"
        mask="date"
        type="date"
        :label="$t('S.TO')"
        class="col-1"
      />
      <div class="q-gutter-sm">
        <q-radio dense v-model="colClass" val="col-3" :label="$t('S.SMALL')" />
        <q-radio dense v-model="colClass" val="col-6" :label="$t('S.BIG')" />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-pa-sm" :style="$pageStore.setDomHeightStyle(56)">
      <div :class="colClass">
        <EchartFinancialInvoiceSummaryAmount
          dateType="NEW"
          payStatus="ALL"
          :customerCode="customerCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartFinancialInvoiceSummaryAmount
          dateType="PAY"
          payStatus="Paid"
          :customerCode="customerCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartFinancialInvoiceSummaryAmount
          dateType="DUE"
          payStatus="Paid"
          :customerCode="customerCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartFinancialInvoiceSummaryAmount
          dateType="DUE"
          payStatus="PU-Paid"
          :customerCode="customerCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div class="col-12">
        <q-table-invoice-pay-vue
          :customerCode="customerCode"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :site="site"
          :style="$pageStore.setDomHeightStyle(80)"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import EchartFinancialInvoiceSummaryAmount from '@/components/echarts/EchartFinancialInvoiceSummaryAmount.vue'
import QTableInvoicePayVue from '@/components/Financial/QTableInvoicePay.vue'
import QSelectAxiosVue from '@/controls/QSelectAxios.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { getDateRange } from '@/assets/dateUtils'
import { usePageStore } from '@/stores/PageStore'
import { storeToRefs } from 'pinia'
const $pageStore = usePageStore()

// page vars
const { site } = storeToRefs($pageStore)

const colClass = ref('col-3')
const customerCode = ref('ALL')
const showBy = ref('Month')

const dateRange = ref(getDateRange('lastNYear', 0))
const dateFrom = ref(dateRange.value.dateFrom)
const dateTo = ref(dateRange.value.dateTo)

const updateDateRange = (rangeName, n) => {
  dateRange.value = getDateRange(rangeName, n)
  dateFrom.value = dateRange.value.dateFrom
  dateTo.value = dateRange.value.dateTo
  if (rangeName === 'lastNYear' && n > 1) {
    showBy.value = 'Year'
  } else {
    showBy.value = 'Month'
  }
}

const clearCustomer = () => {
  customerCode.value = 'ALL'
}

const router = useRouter()
if (router.currentRoute.value.query.site) {
  site.value = router.currentRoute.value.query.site
}
</script>
