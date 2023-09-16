<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-09-06 13:23:26
* @FilePath              : sage-assistant-web/src/components/echarts/EchartInventoryStock.vue
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
let bars = []
let dataset = []
let series = []
const dimensions = ['PN', 'stockSite', 'qty']

// actions
const doUpdate = () => {
  if (!props.pnRoot) return

  showLoading.value = true

  axiosGet('/Data/InventoryStock?PnRoot=' + props.pnRoot)
    .then((response) => {
      data = response
      prepareData()
      setEchart()
    })
    .finally(() => {
      showLoading.value = false
    })
}

const prepareData = () => {
  bars = _uniq(_map(data, 'stockSite'))
  legend = _uniq(_map(data, 'PN'))
  dataByLegend = _groupBy(data, 'PN')
  dataset = []
  series = []

  _forEach(legend, (value, index) => {
    dataset[index] = { source: dataByLegend[value] }
    series[index] = defaultBarStackedSerial(index, value, '{@qty}', dimensions, 'stockSite', 'qty')
  })
}

const setEchart = () => {
  // data is ready,set echart option
  eChartOption = {
    title: {
      text: t('S.STOCK_INFO'),
      left: 'center'
    },
    tooltip: defaultTooltip,
    legend: defaultLegend,
    toolbox: defaultToolbox(dimensions, data, t('S.STOCK_INFO')),
    grid: { bottom: 20, top: 40, right: 20 },
    xAxis: {
      type: 'category',
      data: bars
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
