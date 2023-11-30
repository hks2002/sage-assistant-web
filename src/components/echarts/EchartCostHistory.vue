<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-27 23:33:13
* @FilePath              : sage-assistant-web/src/components/echarts/EchartCostHistory.vue
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
import { Notify } from 'quasar'
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
let dataBySiteProject = []
let dataSumBySiteProject = []
let dataset = []
let series = []
const dimensions = [
  'purchaseSite',
  'projectNO',
  'orderPN',
  'orderDate',
  'purchaseNO',
  'line',
  'vendorCode',
  'vendorName',
  'purchasePN',
  'description',
  'qty',
  'currency',
  'netPrice',
  'USD',
  'rate'
]
const miniDimensions = ['purchaseSite', 'projectNO', 'orderPN', 'orderDate', 'USD']
let dataZoomStartValue = '1900-01-01'

// actions
function doUpdate() {
  if (!props.pnRoot) return

  showLoading.value = true

  axiosGet('/Data/CostHistory?PnRoot=' + props.pnRoot)
    .then((response) => {
      data = response
      prepareData()
      setEchart()
    })
    .catch((e) => {
      Notify.create({
        type: 'error',
        message: t('S.LOADING') + t('{VAR_HOLD_WITH_SPACE}', t('S.PURCHASE_COST_HISTORY')) + t('S.FAILED')
      })
    })
    .finally(() => {
      showLoading.value = false
    })
}

function prepareData() {
  const len = data.length
  if (len >= 20) {
    dataZoomStartValue = _get(data[len - 20], 'orderDate')
  } else if (len > 0) {
    dataZoomStartValue = _get(data[0], 'orderDate')
  }
  dataSumBySiteProject = []
  dataset = []
  series = []

  dataBySiteProject = _groupBy(data, function (n) {
    return _get(n, 'purchaseSite') + _get(n, 'projectNO')
  })
  _forEach(dataBySiteProject, (value) => {
    const o = {}
    Object.defineProperty(o, 'purchaseSite', {
      enumerable: true,
      value: _get(value[0], 'purchaseSite')
    })
    Object.defineProperty(o, 'projectNO', {
      enumerable: true,
      value: _get(value[0], 'projectNO')
    })
    Object.defineProperty(o, 'orderPN', {
      enumerable: true,
      value: _get(value[0], 'orderPN')
    })
    Object.defineProperty(o, 'orderDate', {
      enumerable: true,
      value: _get(value[0], 'orderDate')
    })
    Object.defineProperty(o, 'USD', {
      enumerable: true,
      value: _sumBy(value, 'USD').toFixed(0)
    })
    dataSumBySiteProject.push(o)
  })
  legend = _uniq(_map(data, 'purchaseSite'))
  dataByLegend = _groupBy(dataSumBySiteProject, 'purchaseSite')

  _forEach(legend, (value, index) => {
    dataset[index] = { source: dataByLegend[value] }
    series[index] = defaultLineSerial(index, value, '{@USD} USD', miniDimensions, 'orderDate', 'USD')
  })
}

function setEchart() {
  // data is ready,set echart option
  eChartOption = {
    title: {
      text: t('S.PURCHASE_COST_HISTORY'),
      // subtext: t(''),
      left: 'center'
    },
    legend: defaultLegend,
    grid: [{ left: '5%', right: '5%' }],
    toolbox: defaultToolbox(dimensions, data, t('S.PURCHASE_COST_HISTORY')),
    tooltip: defaultTooltip,
    dataZoom: defaultDataZoom(dataZoomStartValue),
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
