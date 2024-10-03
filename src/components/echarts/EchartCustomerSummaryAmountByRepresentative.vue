<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2024-11-11 14:07:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-17 15:08:20
* @FilePath              : sage-assistant-web/src/components/echarts/EchartCustomerSummaryAmountByRepresentative.vue
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
  multiLineFormatter
} from '@/assets/echartsCfg'

import { axiosGet } from '@/assets/axiosActions'
import { groupBy, map, sortBy, sumBy, uniq } from 'lodash-es'
import { date } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: String,
  orderType: String,
  customerCode: String,
  dateFrom: String,
  dateTo: String,
  showSubTitle: { type: Boolean, require: false, default: true }
})
// common vars
const { t } = useI18n()
const showLoading = ref(false)

// echart vars
let eChartOption = {}
let sites = []
let dataBySites = []
let data = []
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

  axiosGet('/Data/CustomerSummaryAmountTopByRepresentative', {
    Site: props.site,
    OrderType: props.orderType,
    CustomerCode: props.customerCode,
    DateFrom: props.dateFrom,
    DateTo: props.dateTo,
    Limit: 999
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

  // for site summary
  sites = uniq(map(data, 'site').sort())
  dataBySites = groupBy(data, 'site')

  let pie1Data = []
  sites.forEach((site) => {
    pie1Data.push({ name: site, value: dataBySites[site][0]['siteAllUSD'] })
  })
  series.push({
    type: 'pie',
    radius: ['0%', '30%'],
    center: ['50%', '60%'],
    roseType: false,
    label: {
      show: true,
      position: 'inside',
      fontSize: 10,
      formatter: '{b}\n{d}%'
    },
    data: pie1Data
  })

  // for representative summary
  let pie2Items = uniq(map(data, 'representative'))
  let dataByPie2Items = groupBy(data, 'representative')

  let pie2Data = []
  pie2Items.forEach((item) => {
    pie2Data.push({
      representative: dataByPie2Items[item][0]['representative'],
      sumUSD: sumBy(dataByPie2Items[item], 'sumUSD')
    })
  })

  dataset[1] = { source: sortBy(pie2Data, 'sumUSD').reverse() }
  series[1] = {
    type: 'pie',
    radius: ['35%', '60%'],
    center: ['50%', '60%'],
    roseType: 'radius',
    datasetIndex: 1,
    encode: {
      itemName: 'representative',
      value: 'sumUSD',
      tooltip: 'sumUSD'
    },
    minShowLabelAngle: 3,
    startAngle: Math.random() * 360,
    padAngle: 1,
    itemStyle: {
      borderRadius: 4
    },
    label: {
      show: true,
      fontSize: '10',
      formatter: '{@representative}\n{d}% {@sumUSD} USD'
    },
    tooltip: {
      trigger: 'item',
      formatter: multiLineFormatter
    }
  }
}

function setEchart() {
  const shortTitle = `${props.site} ${t('S.SALES_ORDER_AMOUNT_BY_REPRESENTATIVE')}`
  const longTitle = `${shortTitle} (${props.dateFrom}-->${props.dateTo})`

  // data is ready,set echart option
  eChartOption = {
    title: defaultTitle(shortTitle, null),
    legend: { ...defaultLegend, type: 'scroll' },
    toolbox: defaultToolboxWithZoom(longTitle, data),
    tooltip: defaultTooltip,
    color: defaultColor,
    dataset: dataset,
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

watch(useI18n().locale, () => {
  setEchart()
})
</script>
