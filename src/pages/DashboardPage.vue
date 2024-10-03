<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 02:25:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-12-30 10:46:08
* @FilePath              : sage-assistant-web/src/pages/DashboardPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page :style-fn="$pageStore.setPageHeightStyle">
    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="toggleOptions()" />
    </q-page-sticky>
    <div class="row q-gutter-sm q-pa-sm" v-if="showOptions">
      <q-input
        dense
        outlined
        debounce="1000"
        mask="date"
        type="date"
        class="col-2"
        :label="$t('S.FROM')"
        v-model="dateFrom"
      />
      <q-input
        dense
        outlined
        debounce="1000"
        mask="date"
        type="date"
        class="col-2"
        :label="$t('S.TO')"
        v-model="dateTo"
      />
      <q-select
        dense
        outlined
        debounce="1000"
        :options="['Year', 'Month']"
        class="col-2"
        :label="$t('S.ShowBy')"
        v-model="showBy"
      />
      <q-checkbox dense v-model="displayBySupplierType" :label="$t('S.DISPLAY_BY_SUPPLIER_TYPE')" />
      <q-checkbox dense v-model="othersSupplierFlag" :label="$t('S.SUPPLIER_TYPE_OTHERS')" />
    </div>
    <div class="row q-col-gutter-sm q-pa-sm">
      <div class="col-4">
        <EchartSupplierSummaryAmountVue
          supplierType="ALL"
          supplierCode="ALL"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierSummaryAmountVue
          supplierType="MAIN"
          supplierCode="ALL"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierSummaryAmountVue
          supplierType="OTHERS"
          supplierCode="ALL"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierSummaryAmountTopVue
          supplierType="ALL"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierSummaryAmountTopVue
          supplierType="MAIN"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierSummaryAmountTopVue
          supplierType="OTHERS"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierOTDVue
          :site="site"
          supplierType="ALL"
          supplierCode="ALL"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierOTDVue
          supplierType="MAIN"
          supplierCode="ALL"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierOTDVue
          supplierType="OTHERS"
          supplierCode="ALL"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierOTDTopVue
          supplierType="ALL"
          supplierCode="ALL"
          sort="DESC"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierOTDTopVue
          supplierType="MAIN"
          supplierCode="ALL"
          sort="DESC"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierOTDTopVue
          supplierType="OTHERS"
          supplierCode="ALL"
          sort="DESC"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierOTDTopVue
          supplierType="ALL"
          supplierCode="ALL"
          sort="ASC"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierOTDTopVue
          supplierType="MAIN"
          supplierCode="ALL"
          sort="ASC"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierOTDTopVue
          supplierType="OTHERS"
          supplierCode="ALL"
          sort="ASC"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierQPYVue
          supplierType="ALL"
          supplierCode="ALL"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierQPYVue
          supplierType="MAIN"
          supplierCode="ALL"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierQPYVue
          supplierType="OTHERS"
          supplierCode="ALL"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierQPYTopVue
          supplierType="ALL"
          supplierCode="ALL"
          sort="DESC"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierQPYTopVue
          supplierType="MAIN"
          supplierCode="ALL"
          sort="DESC"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierQPYTopVue
          supplierType="OTHERS"
          supplierCode="ALL"
          sort="DESC"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierQPYTopVue
          supplierType="ALL"
          supplierCode="ALL"
          sort="ASC"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierQPYTopVue
          supplierType="MAIN"
          supplierCode="ALL"
          sort="ASC"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-4">
        <EchartSupplierQPYTopVue
          supplierType="OTHERS"
          supplierCode="ALL"
          sort="ASC"
          :site="site"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :limit="10"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-12">
        <EchartSupplierNCStatisticsVue
          :site="site"
          supplierType="ALL"
          supplierCode="ALL"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-12">
        <EchartSupplierNCStatisticsVue
          :site="site"
          supplierType="MAIN"
          supplierCode="ALL"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-12">
        <EchartSupplierNCStatisticsVue
          :site="site"
          supplierType="OTHERS"
          supplierCode="ALL"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :interval="showBy"
          style="padding: 0px; height: 300px"
        />
      </div>
      <div class="col-6"></div>
    </div>
  </q-page>
</template>

<script setup>
import EchartSupplierNCStatisticsVue from '@/components/echarts/EchartSupplierNCStatistics.vue'
import EchartSupplierOTDVue from '@/components/echarts/EchartSupplierOTD.vue'
import EchartSupplierOTDTopVue from '@/components/echarts/EchartSupplierOTDTop.vue'
import EchartSupplierQPYVue from '@/components/echarts/EchartSupplierQPY.vue'
import EchartSupplierQPYTopVue from '@/components/echarts/EchartSupplierQPYTop.vue'
import EchartSupplierSummaryAmountVue from '@/components/echarts/EchartSupplierSummaryAmount.vue'
import EchartSupplierSummaryAmountTopVue from '@/components/echarts/EchartSupplierSummaryAmountTopBySupplier.vue'

import { date } from 'quasar'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { usePageStore } from '@/stores/PageStore'
import { storeToRefs } from 'pinia'

const $pageStore = usePageStore()
const { site } = storeToRefs($pageStore)

// page vars
const displayBySupplierType = ref(false)
const othersSupplierFlag = ref(false)
const showBy = ref('Month')

const { formatDate, addToDate } = date
const nowTimeStamp = Date.now()
const fromTimeStamp = addToDate(nowTimeStamp, { years: -1 })
const dateFrom = ref(formatDate(date.startOfDate(fromTimeStamp, showBy.value.toLowerCase()), 'YYYY-MM-DD'))
const dateTo = ref(formatDate(nowTimeStamp, 'YYYY-MM-DD'))

const router = useRouter()
if (router.currentRoute.value.query.site) {
  site.value = router.currentRoute.value.query.site
}

const showOptions = ref(true)
const toggleOptions = () => {
  showOptions.value = !showOptions.value
}
</script>
