<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2024-12-30 14:37:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-17 16:08:13
* @FilePath              : sage-assistant-web/src/pages/DeliveryPage.vue
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
        dense
        outlined
        debounce="1000"
        mask="date"
        type="date"
        class="col-1"
        :label="$t('S.FROM')"
        v-model="dateFrom"
      />
      <q-input
        dense
        outlined
        debounce="1000"
        mask="date"
        type="date"
        class="col-1"
        :label="$t('S.TO')"
        v-model="dateTo"
      />
      <div class="q-gutter-sm">
        <q-radio dense v-model="colClass" val="col-3" :label="$t('S.SMALL')" />
        <q-radio dense v-model="colClass" val="col-6" :label="$t('S.BIG')" />
      </div>
    </div>
    <div class="row q-col-gutter-sm q-pa-sm" :style="$pageStore.setDomHeightStyle(56)">
      <div class="col-12">
        <EchartCustomerSummaryAmountPercentByOrderTypeVue
          orderType="ALL"
          :customerCode="customerCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          style="height: 100px"
        />
      </div>
      <div :class="colClass">
        <EchartDeliverySummaryAmountVue
          orderType="ALL"
          :customerCode="customerCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartDeliverySummaryAmountVue
          orderType="DEDIENNE"
          :customerCode="customerCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartDeliverySummaryAmountVue
          orderType="NORM"
          :customerCode="customerCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartDeliverySummaryAmountVue
          orderType="SERVICES"
          :customerCode="customerCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartDeliverySummaryAmountByCustomerVue
          orderType="ALL"
          :customerCode="customerCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartDeliverySummaryAmountByPNFamilyVue
          orderType="ALL"
          :customerCode="customerCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          style="height: 400px"
        />
      </div>
      <div class="col-12">
        <QTableCustomerDelivery
          :site="site"
          :customerCode="customerCode"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          style="height: 500px"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import QTableCustomerDelivery from '@/components/customers/QTableCustomerDelivery.vue'
import EchartCustomerSummaryAmountPercentByOrderTypeVue from '@/components/echarts/EchartCustomerSummaryAmountPercentByOrderType.vue'
import EchartDeliverySummaryAmountVue from '@/components/echarts/EchartDeliverySummaryAmount.vue'
import EchartDeliverySummaryAmountByCustomerVue from '@/components/echarts/EchartDeliverySummaryAmountByCustomer.vue'
import EchartDeliverySummaryAmountByPNFamilyVue from '@/components/echarts/EchartDeliverySummaryAmountByPNFamily.vue'
import QSelectAxiosVue from '@/controls/QSelectAxios.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { getDateRange } from '@/assets/dateUtils'
import { usePageStore } from '@/stores/PageStore'
import { storeToRefs } from 'pinia'

const $pageStore = usePageStore()
const { site } = storeToRefs($pageStore)

// page vars
const customerCode = ref('ALL')
const showBy = ref('Month')
const colClass = ref('col-3')
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
