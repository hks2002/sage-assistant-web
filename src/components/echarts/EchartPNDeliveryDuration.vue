<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-20 00:45:01
* @FilePath              : sage-assistant-web/src/components/echarts/EchartPNDeliveryDuration.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <base-echart :e-chart-option="eChartOption" :show-loading="showLoading" />
</template>

<script setup>
import BaseEchart from './BaseEchart.vue'

import {
  defaultLegend,
  defaultToolbox,
  defaultTooltip,
  defaultXAxisTime,
  multiLineFormatter
} from '@/assets/echartsCfg.js'

import { axiosGet } from '@/assets/axiosActions'
import { forEach, groupBy, map, uniq } from 'lodash-es'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

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
  legend = uniq(map(data, 'salesSite'))
  dataByLegend = groupBy(data, 'salesSite')
  dataset = []
  series = []

  forEach(legend, (legendName, index) => {
    dataset[index] = { source: dataByLegend[legendName] }
    series[index] = {
      name: legendName,
      type: 'line',
      datasetIndex: index,
      label: {
        show: true,
        position: 'bottom',
        formatter: '{@duration}'
      },
      tooltip: {
        trigger: 'item',
        formatter: multiLineFormatter
      },
      encode: {
        x: 'shipDate',
        y: 'duration'
      }
    }
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
    toolbox: defaultToolbox(t('S.DELIVERY_DURATION'), data),
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
