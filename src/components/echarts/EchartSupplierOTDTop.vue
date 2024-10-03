<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 21:35:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-13 01:08:01
* @FilePath              : sage-assistant-web/src/components/echarts/EchartSupplierOTDTop.vue
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
  limit: Number,
  sort: String
})
// common vars
const { t } = useI18n()
const showLoading = ref(false)

// echart vars
let eChartOption = {}
let data = []
let sites = []
let dataBySites = []
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
    !props.limit
  )
    return

  showLoading.value = true

  axiosGet('/Data/SupplierOTDTop', {
    Site: props.site,
    SupplierType: props.supplierType,
    SupplierCode: props.supplierCode,
    DateFrom: props.dateFrom,
    DateTo: props.dateTo,
    Limit: props.limit,
    Sort: props.sort
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

  sites = uniq(map(data, 'site'))
  dataBySites = groupBy(data, 'site')

  forEach(sites, (site, index) => {
    dataset[index] = { source: dataBySites[site] }
    series[index] = {
      type: 'bar',
      name: site,
      datasetIndex: index,
      encode: {
        x: 'OTD',
        y: 'supplierName'
      },
      colorBy: sites.length === 1 ? 'data' : 'series',
      label: {
        show: true,
        verticalAlign: 'middle',
        position: 'right',
        fontSize: '10',
        formatter: '{@OTD}'
      },
      barMaxWidth: 40,
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      },
      tooltip: {
        trigger: 'item',
        formatter: multiLineFormatter
      }
    }
  })
}

function setEchart() {
  const preTitle =
    props.supplierCode === 'ALL'
      ? `${props.site} ${t('S.SUPPLIER_TYPE')}[${props.supplierType}]`
      : `${props.site} ${props.supplierCode}`
  const direction = props.sort === 'DESC' ? 'Top' : 'Bottom'
  const shortTitle = `${preTitle} ${t('S.PURCHASE_ORDER_OTD')} ${direction} ${props.limit}`
  const longTitle = `${shortTitle} (${props.dateFrom}-->${props.dateTo})`

  // data is ready,set echart option
  eChartOption = {
    title: defaultTitle(shortTitle, t('S.PURCHASE_ORDER_OTD_DESCRIPTION')),
    legend: { ...defaultLegend, data: sites.sort() },
    toolbox: defaultToolboxWithZoom(longTitle, data),
    tooltip: defaultTooltip,
    color: defaultColor,
    grid: [{ left: '80', right: '40' }],
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}'
      },
      max: 100
    },
    yAxis: {
      type: 'category',
      inverse: true,
      axisLabel: {
        fontSize: 10
      }
    },
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
