<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 22:26:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-12 23:17:28
* @FilePath              : sage-assistant-web/src/components/echarts/EchartSupplierSummaryAmountPercentBySupplierType.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <base-echart :e-chart-option="eChartOption" :show-loading="showLoading" />
</template>

<script setup>
import BaseEchart from './BaseEchart.vue'

import { defaultColor, defaultLegend, defaultTitle, multiLineFormatter } from '@/assets/echartsCfg'

import { axiosGet } from '@/assets/axiosActions'
import { sum } from 'lodash-es'
import { date } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  site: String,
  supplierType: String,
  supplierCode: String,
  dateFrom: String,
  dateTo: String,
  showSubTitle: { type: Boolean, require: false, default: true }
})

//common vars
const showLoading = ref(false)

// component vars
let eChartOption = {}
let data = []
let series = []
let supplierTypes = ['MEC', 'COMPONENT', 'TRP', 'E_PORT', 'OTHER']

// actions
const doUpdate = () => {
  if (
    !props.site ||
    !props.supplierType ||
    !props.supplierCode ||
    !date.isValid(props.dateFrom) ||
    !date.isValid(props.dateTo)
  )
    return

  data = []

  showLoading.value = true

  let dataPromise = []

  supplierTypes.forEach((supplierType, index) => {
    dataPromise[index] = axiosGet('/Data/SupplierSummaryAmountTotalUSD', {
      Site: props.site,
      SupplierType: supplierType,
      SupplierCode: props.supplierCode,
      DateFrom: props.dateFrom,
      DateTo: props.dateTo
    })
  })

  Promise.all(dataPromise)
    .then((dataArray) => {
      data = dataArray
      prepareData()
      setEchart()
      showLoading.value = false
    })
    .finally(() => {
      showLoading.value = false
    })
}

function prepareData() {
  series = []

  supplierTypes.forEach((supplierType, index) => {
    if (data[index] === 0) return

    series[index] = {
      name: supplierType,
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        position: 'inside',
        formatter: (params) => {
          return params.seriesName + ' ' + ((params.value * 100) / sum(data)).toFixed(1) + '%'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: multiLineFormatter
      },
      data: [data[index]]
    }
  })
}

function setEchart() {
  const preTitle = `${props.site} ${t('S.SUPPLIER_TYPE')}[${props.supplierType}]`
  const shortTitle = `${preTitle} ${t('S.PURCHASE_ORDER_AMOUNT')}`
  const longTitle = `${shortTitle} (${props.dateFrom}-->${props.dateTo})`

  // data is ready,set echart option
  eChartOption = {
    title: defaultTitle(shortTitle, t('S.PURCHASE_ORDER_AMOUNT_DESCRIPTION')),
    legend: defaultLegend,
    color: defaultColor,
    grid: [{ left: '40', right: '40', bottom: '20' }],
    yAxis: { show: false, type: 'category', data: [''] },
    xAxis: {
      type: 'value',
      max: sum(data)
    },
    series: series
  }
}

// events
onMounted(() => {
  doUpdate()
})

watch(props, (value, oldValue) => {
  doUpdate()
})
</script>
