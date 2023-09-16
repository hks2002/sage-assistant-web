<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 21:33:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-28 00:02:43
* @FilePath              : sage-assistant-web/src/components/echarts/EchartSupplierOpenAmount.vue
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
import { defaultBarStackedSerial, defaultLegend, defaultToolbox, defaultTooltip } from '@/assets/echartsCfg.js'
import _forEach from 'lodash/forEach'
import _groupBy from 'lodash/groupBy'
import _map from 'lodash/map'
import _uniq from 'lodash/uniq'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseEchart from './BaseEchart.vue'

const props = defineProps({
  supplierCode: String,
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
const dimensions = ['site', 'supplierCode', 'amount', 'currency', 'USD', 'rate']

// actions
function doUpdate() {
  if (!props.supplierCode) return

  showLoading.value = true

  axiosGet('/Data/SupplierOpenAmount', {
    supplierCode: props.supplierCode
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
  legend = _uniq(_map(data, 'currency'))
  dataByLegend = _groupBy(data, 'currency')
  sites = _uniq(_map(data, 'site'))
  dataset = []
  series = []

  _forEach(legend, (value, index) => {
    dataset[index] = { source: dataByLegend[value] }
    series[index] = defaultBarStackedSerial(index, value, '{@USD}', dimensions, 'site', 'USD')
  })
}

function setEchart() {
  // data is ready,set echart option
  eChartOption = {
    title: {
      text: t('S.OPEN_AMOUNT_ALL'),
      subtext: '',
      left: 'center'
    },
    legend: defaultLegend,
    toolbox: defaultToolbox(dimensions, data, t('S.OPEN_AMOUNT_ALL')),
    tooltip: defaultTooltip,
    xAxis: {
      type: 'category',
      data: sites
    },
    yAxis: {
      type: 'value',
      name: 'USD',
      nameLocation: 'start',
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
