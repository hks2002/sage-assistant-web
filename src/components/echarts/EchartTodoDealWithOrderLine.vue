<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-28 00:23:37
* @FilePath              : sage-assistant-web/src/components/echarts/EchartTodoDealWithOrderLine.vue
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
  defaultScatterSerial,
  defaultToolbox,
  defaultTooltip,
  defaultXAxisTime
} from '@/assets/echartsCfg.js'
import _groupBy from 'lodash/groupBy'
import _map from 'lodash/map'
import _sortBy from 'lodash/sortBy'
import _uniq from 'lodash/uniq'
import { date } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseEchart from './BaseEchart.vue'

const props = defineProps({
  site: String
})

// common vars
const { t } = useI18n()
const showLoading = ref(false)

// echart vars
let eChartOption = {}
let data = []
let legend = []
let dataByLegend = []
let dataset = []
let series = []
const dimensions = [
  'salesOrderNO',
  'projectNO',
  'orderType',
  'orderCategory',
  'PN',
  'qty',
  'unit',
  'description',
  'customerCode',
  'customerName',
  'orderDate',
  'demandDate',
  'days'
]

// computed vars

// actions
function doUpdate() {
  if (!props.site) return

  showLoading.value = true

  axiosGet('/Data/TobeDealWithOrderLine?Site=' + props.site)
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
  const newDate = new Date()
  data.forEach((row) => {
    row.Days = date.getDateDiff(row.OrderDate, newDate, 'days')
  })
  data = _sortBy(data, ['days'], ['desc'])

  legend = _uniq(_map(data, 'orderType'))
  dataByLegend = _groupBy(data, 'orderType')
  dataset = []
  series = []

  legend.forEach((value, index) => {
    dataset[index] = { source: dataByLegend[value] }
    series[index] = defaultScatterSerial(index, value, '{@projectNO}', dimensions, 'orderDate', 'projectNO')
  })
}

function setEchart() {
  // data is ready,set echart option
  eChartOption = {
    title: {
      text: t('S.TODO_TO_BE_DEAL_WITH') + ` [${props.site}]`,
      left: 'center'
    },
    legend: defaultLegend,
    toolbox: defaultToolbox(dimensions, data, t('S.TODO_TO_BE_DEAL_WITH') + ` [${props.site}]`),
    tooltip: defaultTooltip,
    xAxis: defaultXAxisTime,
    grid: [{ left: 40, right: 40 }],
    yAxis: [
      {
        type: 'category',
        show: false
      }
    ],
    dataZoom: defaultDataZoom('xy'),
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
