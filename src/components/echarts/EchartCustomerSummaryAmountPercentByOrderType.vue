<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 22:26:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-17 15:08:48
* @FilePath              : sage-assistant-web/src/components/echarts/EchartCustomerSummaryAmountPercentByOrderType.vue
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
  orderType: String,
  customerCode: String,
  dateFrom: String,
  dateTo: String
})

//common vars
const showLoading = ref(false)

// component vars
let eChartOption = {}
let data = []
let series = []
let orderTypes = ['NORM', 'SERVICES']

// actions
const doUpdate = () => {
  if (
    !props.site ||
    !props.orderType ||
    !props.customerCode ||
    !date.isValid(props.dateFrom) ||
    !date.isValid(props.dateTo)
  )
    return

  showLoading.value = true

  let dataPromise = []

  orderTypes.forEach((orderType, index) => {
    dataPromise[index] = axiosGet('/Data/CustomerSummaryAmountTotalUSD', {
      Site: props.site,
      OrderType: orderType,
      CustomerCode: props.customerCode,
      DateFrom: props.dateFrom,
      DateTo: props.dateTo,
      Interval: props.interval
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

  orderTypes.forEach((orderType, index) => {
    if (data[index] === 0) return

    series[index] = {
      name: orderType,
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
  const preTitle = `${props.site} ${t('S.ORDER_TYPE')}[${props.orderType}]`
  const shortTitle = `${preTitle} ${t('S.SALES_ORDER_AMOUNT_BY_ORDER_TYPE')}`
  const longTitle = `${shortTitle} (${props.dateFrom}-->${props.dateTo})`

  // data is ready,set echart option
  eChartOption = {
    title: defaultTitle(shortTitle, t('S.SALES_ORDER_AMOUNT_DESCRIPTION')),
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
