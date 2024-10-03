<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 21:35:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-17 15:06:10
* @FilePath              : sage-assistant-web/src/components/echarts/EchartCustomerDOD.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <base-echart :e-chart-option="eChartOption" :show-loading="showLoading" />
</template>

<script setup>
import BaseEchart from './BaseEchart.vue'

import { axiosGet } from '@/assets/axiosActions'
import {
  defaultColor,
  defaultLegend,
  defaultTitle,
  defaultToolboxWithZoom,
  defaultTooltip,
  multiLineFormatter
} from '@/assets/echartsCfg'

import { forEach, groupBy, map, sample, uniq } from 'lodash-es'
import { date } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: String,
  orderType: String,
  customerCode: String,
  dateFrom: String,
  dateTo: String
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
let dataset = []
let series = []

// actions
function doUpdate() {
  if (
    !props.site ||
    !props.orderType ||
    !props.customerCode ||
    !date.isValid(props.dateFrom) ||
    !date.isValid(props.dateTo)
  )
    return

  showLoading.value = true

  axiosGet('/Data/CustomerDOD', {
    Site: props.site,
    OrderType: props.orderType,
    CustomerCode: props.customerCode,
    DateFrom: props.dateFrom,
    DateTo: props.dateTo
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

  forEach(sites, (site, index) => {
    dataset[index] = { source: dataBySites[site] }
    series[index] = {
      name: site,
      type: 'scatter',
      datasetIndex: index,
      tooltip: {
        trigger: 'item',
        formatter: multiLineFormatter
      },
      label: {
        show: false,
        formatter: ''
      },
      encode: {
        x: 'daysDelay',
        y: 'cnt'
      }
    }
  })
}

function setEchart() {
  const preTitle = `${props.site} ${t('S.ORDER_TYPE')}[${props.orderType}]`
  const shortTitle = `${preTitle} ${t('S.SALES_ORDER_DOD')}`
  const longTitle = `${shortTitle} (${props.dateFrom}-->${props.dateTo})`

  // data is ready,set echart option
  eChartOption = {
    title: defaultTitle(shortTitle, t('S.SALES_ORDER_OTD_DESCRIPTION')),
    legend: defaultLegend,
    toolbox: defaultToolboxWithZoom(longTitle, data),
    tooltip: defaultTooltip,
    color: sites.length === 1 ? sample(defaultColor) : defaultColor,
    grid: { left: '60', right: '40' },
    xAxis: { type: 'value', min: 'dataMin', max: 'dataMax', name: 'Days' },
    yAxis: { type: 'value', minInterval: 1 },
    dataset: dataset,
    series: series,
    dataZoom: [{ height: 20 }],
    graphic: {
      type: 'text',
      z: 100,
      left: '0',
      bottom: '0',
      style: {
        fill: '#333',
        width: 220,
        text: 'Customer-Standby Excluded, Delivered',
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
