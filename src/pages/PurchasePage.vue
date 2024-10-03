<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 02:25:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-13 22:50:40
* @FilePath              : sage-assistant-web/src/pages/PurchasePage.vue
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
        option-label="supplierName"
        option-value="supplierCode"
        data-url="/Data/SupplierHelper"
        :label="$t('S.SEARCH_SUPPLIER')"
        input-style="font-weight:bolder;font-size:25px;text-transform:uppercase"
        popup-content-style="font-weight:bold;font-size:25px"
        popup-content-class="text-secondary"
        class="col-2"
        v-model="supplierCode"
        @clear="clearSupplier()"
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
        <EchartSupplierSummaryAmountPercentBySupplierTypeVue
          supplierType="ALL"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 100px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountVue
          supplierType="ALL"
          :site="site"
          :supplierCode="supplierCode"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountVue
          supplierType="DEDIENNE"
          :site="site"
          :supplierCode="supplierCode"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountVue
          supplierType="TRP"
          :site="site"
          :supplierCode="supplierCode"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountVue
          supplierType="E_PORT"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountVue
          supplierType="MEC_COMPONENT_OTHER"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountVue
          supplierType="MEC"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountVue
          supplierType="COMPONENT"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountVue
          supplierType="OTHER"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDVue
          supplierType="ALL"
          :site="site"
          :supplierCode="supplierCode"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDVue
          supplierType="DEDIENNE"
          :site="site"
          :supplierCode="supplierCode"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDVue
          supplierType="TRP"
          :site="site"
          :supplierCode="supplierCode"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDVue
          supplierType="E_PORT"
          :site="site"
          :supplierCode="supplierCode"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDVue
          supplierType="MEC_COMPONENT_OTHER"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDVue
          supplierType="MEC"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDVue
          supplierType="COMPONENT"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDVue
          supplierType="OTHER"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierDODVue
          supplierType="MEC"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierDODVue
          supplierType="COMPONENT"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierDODVue
          supplierType="DEDIENNE"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierDODVue
          supplierType="OTHER"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountBySupplierVue
          supplierType="MEC"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountBySupplierVue
          supplierType="COMPONENT"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountBySupplierVue
          supplierType="TRP"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountBySupplierVue
          supplierType="OTHER"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountTopBySupplierVue
          supplierType="MEC"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountTopBySupplierVue
          supplierType="COMPONENT"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountTopBySupplierVue
          supplierType="TRP"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierSummaryAmountTopBySupplierVue
          supplierType="OTHER"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDTopVue
          supplierType="MEC"
          sort="DESC"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDTopVue
          supplierType="COMPONENT"
          sort="DESC"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDTopVue
          supplierType="DEDIENNE"
          sort="DESC"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDTopVue
          supplierType="OTHER"
          sort="DESC"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDTopVue
          supplierType="MEC"
          sort="ASC"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDTopVue
          supplierType="COMPONENT"
          sort="ASC"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDTopVue
          supplierType="DEDIENNE"
          sort="ASC"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="height: 400px"
        />
      </div>
      <div :class="colClass">
        <EchartSupplierOTDTopVue
          supplierType="OTHER"
          sort="ASC"
          :supplierCode="supplierCode"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="height: 400px"
        />
      </div>
      <div class="col-12">
        <QTableSupplierOrdersVue
          :site="site"
          supplierType="ALL"
          :supplierCode="supplierCode"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          style="height: 500px"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import EchartSupplierDODVue from '@/components/echarts/EchartSupplierDOD.vue'
import EchartSupplierOTDVue from '@/components/echarts/EchartSupplierOTD.vue'
import EchartSupplierOTDTopVue from '@/components/echarts/EchartSupplierOTDTop.vue'
import EchartSupplierSummaryAmountVue from '@/components/echarts/EchartSupplierSummaryAmount.vue'
import EchartSupplierSummaryAmountBySupplierVue from '@/components/echarts/EchartSupplierSummaryAmountBySupplier.vue'
import EchartSupplierSummaryAmountPercentBySupplierTypeVue from '@/components/echarts/EchartSupplierSummaryAmountPercentBySupplierType.vue'
import EchartSupplierSummaryAmountTopBySupplierVue from '@/components/echarts/EchartSupplierSummaryAmountTopBySupplier.vue'
import QTableSupplierOrdersVue from '@/components/suppliers/QTableSupplierOrders.vue'
import QSelectAxiosVue from '@/controls/QSelectAxios.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { getDateRange } from '@/assets/dateUtils'
import { usePageStore } from '@/stores/PageStore'
import { storeToRefs } from 'pinia'

const $pageStore = usePageStore()
const { site } = storeToRefs($pageStore)

// page vars
const supplierCode = ref('ALL')

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

const clearSupplier = () => {
  supplierCode.value = 'ALL'
}

const router = useRouter()
if (router.currentRoute.value.query.site) {
  site.value = router.currentRoute.value.query.site
}
</script>
