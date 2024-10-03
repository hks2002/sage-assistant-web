<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 21:35:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-24 10:03:00
* @FilePath              : sage-assistant-web/src/components/echarts/EchartCustomerSummaryAmount.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <base-echart :e-chart-option="eChartOption" :show-loading="showLoading" />
</template>

<script setup>
import BaseEchart from './BaseEchart.vue'

import {
  defaultColor,
  defaultLegend,
  defaultTitle,
  defaultToolboxWithZoom,
  defaultTooltip,
  defaultYAxis2,
  formatNumber,
  genMonthSerial,
  genYearSerial,
  isFuture,
  multiLineFormatter
} from '@/assets/echartsCfg'

import { axiosGet } from '@/assets/axiosActions'
import { find, forEach, groupBy, map, sample, sumBy, uniq } from 'lodash-es'
import { date } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: String,
  orderType: String,
  customerCode: String,
  dateFrom: String,
  dateTo: String,
  interval: String
})
// common vars
const { t } = useI18n()
const showLoading = ref(false)

// echart vars
let eChartOption = {}
let data = []
let sites = []
let dataBySites = []
let targets = []
let dataByTargets = []
let dataset = []
let series = []

let currency = 'USD'
let sumTarget = 'sumUSDTarget'

// actions
function doUpdate() {
  if (
    !props.site ||
    !props.orderType ||
    !props.customerCode ||
    !date.isValid(props.dateFrom) ||
    !date.isValid(props.dateTo) ||
    !props.interval
  )
    return

  showLoading.value = true

  axiosGet('/Data/CustomerSummaryAmount', {
    Site: props.site,
    OrderType: props.orderType,
    CustomerCode: props.customerCode,
    DateFrom: props.dateFrom,
    DateTo: props.dateTo,
    Interval: props.interval
  })
    .then((response) => {
      data = response
      prepareData()
      setEchart()
    })
    .finally(() => {
      showLoading.value = false
    })
}

function prepareData() {
  dataset = []
  series = []

  sites = uniq(map(data, 'site').sort())
  dataBySites = groupBy(data, 'site')
  targets =
    props.interval === 'Month'
      ? genMonthSerial(props.dateFrom, props.dateTo)
      : genYearSerial(props.dateFrom, props.dateTo)

  currency = sites.length === 1 ? data[0]['localCurrency'] : 'USD'
  sumTarget = sites.length === 1 ? 'sumLocalTarget' : 'sumUSDTarget'

  // bar stacked
  forEach(sites, (site, index) => {
    dataset[index] = { source: dataBySites[site] }
    series[index] = {
      name: site,
      type: 'bar',
      datasetIndex: index,
      stack: 'total',
      xAxisIndex: 0,
      yAxisIndex: 0,
      label: {
        show: false,
        verticalAlign: 'middle',
        formatter: (params) => formatNumber(params.data[sumTarget]) + '\n' + currency
      },
      tooltip: {
        trigger: 'item',
        formatter: multiLineFormatter
      },
      encode: {
        x: 'target',
        y: sumTarget
      }
    }
  })

  // line series
  forEach(sites, (site) => {
    let lineData = []
    let stackVal = 0

    targets.forEach((target) => {
      if (isFuture(target, props.interval)) {
        lineData.push(null)
        return
      }

      const obj = find(dataBySites[site], (o) => {
        return o['target'] === target
      })
      stackVal = obj ? obj[sumTarget] + stackVal : stackVal
      lineData.push(stackVal)
    })

    series.push({
      name: site,
      type: 'line',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: lineData
    })
  })

  // for all
  if (sites.length > 1) {
    let lineData = []
    let stackVal = 0

    dataByTargets = groupBy(data, 'target')
    targets.forEach((target) => {
      if (isFuture(target, props.interval)) {
        lineData.push(null)
        return
      }

      const groupData = dataByTargets[target]
      stackVal = groupData ? sumBy(groupData, sumTarget) + stackVal : stackVal
      lineData.push(stackVal)
    })

    series.push({
      name: props.site,
      type: 'line',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: lineData
    })
  }
}

function setEchart() {
  const preTitle = `${props.site} ${t('S.ORDER_TYPE')}[${props.orderType}]`
  const shortTitle = `${preTitle} ${t('S.SALES_ORDER_AMOUNT')}`
  const longTitle = `${shortTitle} (${props.dateFrom}-->${props.dateTo})`

  // data is ready,set echart option
  eChartOption = {
    title: defaultTitle(shortTitle, t('S.SALES_ORDER_AMOUNT_DESCRIPTION')),
    legend: defaultLegend,
    toolbox: defaultToolboxWithZoom(longTitle, data),
    tooltip: {
      ...defaultTooltip,
      trigger: 'axis'
    },
    color: sites.length === 1 ? sample(defaultColor) : defaultColor,
    grid: [
      { left: '80', right: '40', top: '60', bottom: '50%' },
      { left: '80', right: '40', top: '60%', bottom: '40' }
    ],
    xAxis: [
      {
        gridIndex: 0,
        type: 'category',
        data: targets
      },
      {
        gridIndex: 1,
        type: 'category',
        data: targets
      }
    ],
    yAxis: [defaultYAxis2(0, currency), defaultYAxis2(1, currency)],
    dataset: dataset,
    series: series,
    graphic: {
      type: 'text',
      z: 100,
      left: '0',
      bottom: '0',
      style: {
        fill: '#333',
        width: 220,
        text: props.site === 'CHINA' || props.site === 'ALL' ? 'SO inside CHINA Excluded' : '',
        font: '14px Microsoft YaHei'
      }
    }
  }
}

// events
onMounted(() => {
  doUpdate()
})

watch(props, (value, oldValue) => {
  doUpdate()
})

watch(useI18n().locale, () => {
  setEchart()
})
</script>
