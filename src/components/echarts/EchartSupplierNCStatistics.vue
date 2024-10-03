<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 21:35:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-13 01:00:29
* @FilePath              : sage-assistant-web/src/components/echarts/EchartSupplierNCStatistics.vue
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
  genMonthSerial,
  genYearSerial,
  multiLineFormatter
} from '@/assets/echartsCfg'

import { axiosGet } from '@/assets/axiosActions'
import { forEach, groupBy, map, uniq } from 'lodash-es'
import { date } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: String,
  supplierType: String,
  supplierCode: String,
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
let NCs = []
let dataset = []
let series = []

// actions
function doUpdate() {
  if (
    !props.site ||
    !props.supplierType ||
    !props.supplierCode ||
    !date.isValid(props.dateFrom) ||
    !date.isValid(props.dateTo) ||
    !props.interval
  )
    return

  showLoading.value = true

  axiosGet('/Data/SupplierNCSummary', {
    Site: props.site,
    SupplierType: props.supplierType,
    SupplierCode: props.supplierCode,
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

  forEach(sites, (site) => {
    forEach(dataBySites[site], (json) => {
      dataset.push({ source: [json] })
      NCs.push(json['NCCAT'])

      series.push({
        name: json['NCCAT'],
        type: 'bar',
        datasetIndex: dataset.length - 1,
        encode: {
          x: 'target',
          y: 'PCT'
        },
        stack: site,
        emphasis: {
          focus: 'series'
        },
        tooltip: {
          trigger: 'item',
          formatter: multiLineFormatter
        },
        label: {
          show: false,
          verticalAlign: 'middle',
          position: '',
          formatter: '{@catCnt}'
        }
      })
    })
  })
}

function setEchart() {
  const preTitle =
    props.supplierCode === 'ALL'
      ? `${props.site} ${t('S.SUPPLIER_TYPE')}[${props.supplierType}]`
      : `${props.site} ${props.supplierCode}`
  const shortTitle = `${preTitle} ${t('S.NC_STATISTICS')}`
  const longTitle = `${shortTitle} (${props.dateFrom}-->${props.dateTo})`

  // data is ready,set echart option
  eChartOption = {
    title: defaultTitle(shortTitle, null),
    legend: { ...defaultLegend, data: NCs.sort(), type: 'scroll' },
    toolbox: defaultToolboxWithZoom(longTitle, data),
    tooltip: defaultTooltip,
    color: defaultColor,
    grid: [{ left: '50', right: '40' }],
    xAxis: [
      {
        type: 'category',
        data: targets,
        gridIndex: 0
      }
    ],
    yAxis: [
      {
        type: 'value',
        nameLocation: 'start',
        axisLabel: {
          formatter: '{value}%'
        },
        max: 'dataMax',
        gridIndex: 0
      }
    ],
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
