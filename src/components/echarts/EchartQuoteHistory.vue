<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-27 23:33:31
* @FilePath              : sage-assistant-web/src/components/echarts/EchartQuoteHistory.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-item>
    <base-echart :e-chart-option="eChartOption" />
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-item>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import {
  AttachedPieSerial,
  defaultDataZoom,
  defaultLegend,
  defaultLineSerial,
  defaultToolbox,
  defaultTooltip,
  defaultXAxisTime,
  defaultYAxisUSD
} from '@/assets/echartsCfg.js'
import _forEach from 'lodash/forEach'
import _get from 'lodash/get'
import _groupBy from 'lodash/groupBy'
import _map from 'lodash/map'
import _sumBy from 'lodash/sumBy'
import _uniq from 'lodash/uniq'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseEchart from './BaseEchart.vue'

const props = defineProps({
  pnRoot: String
})

// common vars
const { t } = useI18n()
const showLoading = ref(false)

// echart vars
let eChartOption = {}
let data = []
let legend = []
let dataByLegend = []
let dataCountedByLegend = []
let dataset = []
let series = []
const dimensions = [
  'salesSite',
  'quoteNO',
  'quoteDate',
  'PN',
  'qty',
  'currency',
  'netPrice',
  'USD',
  'rate',
  'tradeTerm',
  'customerCode',
  'customerName',
  'orderFlag',
  'orderNO'
]
let dataZoomStartValue = '1900-01-01'

// actions
function doUpdate() {
  if (!props.pnRoot) return

  showLoading.value = true

  axiosGet('/Data/QuoteHistory?PnRoot=' + props.pnRoot)
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
  const len = data.length
  if (len >= 20) {
    dataZoomStartValue = _get(data[len - 20], 'quoteDate')
  } else if (len > 0) {
    dataZoomStartValue = _get(data[0], 'quoteDate')
  }

  legend = _uniq(_map(data, 'salesSite'))
  dataByLegend = _groupBy(data, 'salesSite')
  dataCountedByLegend = []
  dataset = []
  series = []

  _forEach(dataByLegend, (value) => {
    const o = {}
    Object.defineProperty(o, 'salesSite', {
      enumerable: true,
      value: _get(value[0], 'salesSite')
    })
    Object.defineProperty(o, 'qty', {
      enumerable: true,
      value: _sumBy(value, 'qty')
    })
    dataCountedByLegend.push(o)
  })

  legend.forEach((value, index) => {
    dataset[index] = { source: dataByLegend[value] }
    series[index] = defaultLineSerial(index, value, '{@netPrice} {@currency}', dimensions, 'quoteDate', 'USD')
  })

  // add pie
  dataset.push({ source: dataCountedByLegend })
  const seriesBySite = AttachedPieSerial(
    dataset.length - 1,
    '{@salesSite} \nQty:{@qty}\n{d}%',
    ['salesSite', 'qty'],
    'salesSite',
    'qty'
  )
  series.push(seriesBySite)
}

function setEchart() {
  // data is ready,set echart option
  eChartOption = {
    title: {
      text: t('S.QUOTES HISTORY'),
      //subtext: t('label.Currency Rate Data From State Administration of Foreign Exchange'),
      left: 'center'
    },
    legend: defaultLegend,
    grid: [{ left: '5%', right: '25%' }],
    toolbox: defaultToolbox(dimensions, data, t('S.QUOTES HISTORY')),
    tooltip: defaultTooltip,
    dataZoom: defaultDataZoom('x', dataZoomStartValue),
    xAxis: defaultXAxisTime,
    yAxis: defaultYAxisUSD,
    dataset: dataset,
    series: series
  }
}

// events
onMounted(() => {
  doUpdate()
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)

  doUpdate()
})
</script>
