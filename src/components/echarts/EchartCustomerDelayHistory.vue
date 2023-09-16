<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-14 15:54:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-27 23:33:05
* @FilePath              : sage-assistant-web/src/components/echarts/EchartCustomerDelayHistory.vue
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
import { jsonToMultiLine } from '@/assets/dataUtils'
import {
  defaultDataZoom,
  defaultLegend,
  defaultToolbox,
  defaultTooltip,
  defaultXAxisTime,
  mergerOption
} from '@/assets/echartsCfg'
import BaseEchart from './BaseEchart.vue'

import _forEach from 'lodash/forEach'
import _groupBy from 'lodash/groupBy'
import _map from 'lodash/map'
import _uniq from 'lodash/uniq'
import { date } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
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
let legend = []
let dataByLegend = []
let dataset = []
let series = []
const dimensions = [
  'site',
  'customerCode',
  'orderNO',
  'projectNO',
  'PN',
  'description',
  'shipDate',
  'demandDate',
  'orderDate',
  'deliveryNO',
  'daysDelay'
]

// actions
function doUpdate() {
  if (!props.customerCode || !date.isValid(props.dateFrom) || !date.isValid(props.dateTo)) {
    return
  }

  showLoading.value = true

  axiosGet('/Data/CustomerDelayHistory', {
    customerCode: props.customerCode,
    dateFrom: props.dateFrom,
    dateTo: props.dateTo
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
  legend = _uniq(_map(data, 'site'))
  dataByLegend = _groupBy(data, 'site')
  dataset = []
  series = []

  _forEach(legend, (value, index) => {
    // dataset
    dataset[index] = { source: dataByLegend[value] }
    // series
    series[index] = {
      type: 'scatter',
      name: value,
      datasetIndex: index,
      symbolSize: 5,
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          return jsonToMultiLine(dimensions, params.data)
        }
      },
      dimensions: dimensions,
      encode: {
        x: 'shipDate',
        y: 'daysDelay'
      }
    }
  })
}

function setEchart() {
  // data is ready,set echart option
  eChartOption = {
    title: {
      text: `${t('S.DELAY_HISTORY')} ( ${props.dateFrom}-->${props.dateTo})`,
      subtext: '',
      left: 'center'
    },
    legend: defaultLegend,
    toolbox: defaultToolbox(dimensions, data, `${t('S.DELAY_HISTORY')} ( ${props.dateFrom}-->${props.dateTo})`),
    tooltip: defaultTooltip,
    dataZoom: defaultDataZoom('x'),
    xAxis: mergerOption(defaultXAxisTime, { name: 'Except' }),
    yAxis: {
      min: 0,
      max: function (value) {
        if (isNaN(value.max)) {
          return 90
        } else {
          return null
        }
      },
      minInterval: 1
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
  console.debug('watch:', oldValue, '--->', value)

  doUpdate()
})
</script>
