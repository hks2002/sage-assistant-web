<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-09-06 13:24:26
* @FilePath              : sage-assistant-web/src/components/echarts/EchartDeliveryDuration.vue
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
  defaultLegend,
  defaultLineSerial,
  defaultToolbox,
  defaultTooltip,
  defaultXAxisTime
} from '@/assets/echartsCfg.js'
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
let dataset = []
let series = []
const dimensions = ['salesSite', 'PN', 'orderDate', 'shipDate', 'duration']

// actions
const doUpdate = () => {
  if (!props.pnRoot) return

  showLoading.value = true

  axiosGet('/Data/DeliveryDuration?PnRoot=' + props.pnRoot)
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
  legend = _uniq(_map(data, 'salesSite'))
  dataByLegend = _groupBy(data, 'salesSite')
  dataset = []
  series = []

  _forEach(legend, (value, index) => {
    dataset[index] = { source: dataByLegend[value] }
    series[index] = defaultLineSerial(index, value, '{@duration}', dimensions, 'shipDate', 'duration')
  })
}

const setEchart = () => {
  // data is ready,set echart option
  eChartOption = {
    title: {
      text: t('S.DELIVERY_DURATION'),
      left: 'center'
    },
    tooltip: defaultTooltip,
    legend: defaultLegend,
    toolbox: defaultToolbox(dimensions, data, t('S.DELIVERY_DURATION')),
    grid: { bottom: 40, top: 40, right: 20 },
    xAxis: defaultXAxisTime,
    yAxis: {
      type: 'value',
      min: 0,
      max: function (value) {
        if (isNaN(value.max)) {
          return 90
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
