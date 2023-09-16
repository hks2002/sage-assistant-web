<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 21:30:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-27 23:31:57
* @FilePath              : sage-assistant-web/src/components/echarts/EchartCustomerTotalQty.vue
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
import { defaultBarSerial, defaultLegend, defaultToolbox, defaultTooltip } from '@/assets/echartsCfg.js'
import _forEach from 'lodash/forEach'
import _groupBy from 'lodash/groupBy'
import _map from 'lodash/map'
import _uniq from 'lodash/uniq'
import { date } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseEchart from './BaseEchart.vue'

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
let sites = []
let dataset = []
let series = []
const dimensions = ['site', 'customerCode', 'countType', 'qty']

// actions
function doUpdate() {
  if (!props.customerCode || !date.isValid(props.dateFrom) || !date.isValid(props.dateTo)) {
    return
  }

  showLoading.value = true

  axiosGet('/Data/CustomerTotalQty', {
    customerCode: props.customerCode,
    DateFrom: props.dateFrom,
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
  legend = _uniq(_map(data, 'countType'))
  dataByLegend = _groupBy(data, 'countType')
  sites = _uniq(_map(data, 'site'))
  dataset = []
  series = []

  _forEach(legend, (value, index) => {
    dataset[index] = { source: dataByLegend[value] }
    series[index] = defaultBarSerial(index, value, '{@qty}', dimensions, 'site', 'qty')
  })
}

function setEchart() {
  // data is ready,set echart option
  eChartOption = {
    title: {
      text: `${t('S.TOTAL_QTY')} ( ${props.dateFrom}-->${props.dateTo})`,
      subtext: '',
      left: 'center'
    },
    legend: defaultLegend,
    toolbox: defaultToolbox(dimensions, data, `${t('S.TOTAL_QTY')} ( ${props.dateFrom}-->${props.dateTo})`),
    tooltip: defaultTooltip,
    xAxis: {
      type: 'category',
      data: sites
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: function (value) {
        if (isNaN(value.max)) {
          return 10
        } else {
          return null
        }
      },
      minInterval: 1,
      axisLabel: {
        formatter: '{value}'
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
  console.debug('watch:', oldValue, '--->', value)

  doUpdate()
})
</script>
