<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-20 00:58:04
* @FilePath              : sage-assistant-web/src/components/echarts/EchartPNInventoryStock.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <base-echart :e-chart-option="eChartOption" :show-loading="showLoading" />
</template>

<script setup>
import BaseEchart from './BaseEchart.vue'

import { defaultLegend, defaultToolbox, defaultTooltip, multiLineFormatter } from '@/assets/echartsCfg.js'

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
let PNs = []
let dataByPNs = []
let sites = []
let dataset = []
let series = []

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
  sites = uniq(map(data, 'stockSite'))
  PNs = uniq(map(data, 'PN'))
  dataByPNs = groupBy(data, 'PN')
  dataset = []
  series = []

  forEach(PNs, (PN, index) => {
    dataset[index] = { source: dataByPNs[PN] }
    series[index] = {
      name: PN,
      type: 'bar',
      datasetIndex: index,
      label: {
        show: true,
        verticalAlign: 'middle',
        position: '',
        formatter: '{@qty}'
      },
      stack: 'total',

      tooltip: {
        trigger: 'item',
        formatter: multiLineFormatter
      },
      encode: {
        x: 'stockSite',
        y: 'qty'
      }
    }
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
    toolbox: defaultToolbox(t('S.STOCK_INFO'), data),
    grid: { bottom: 20, top: 40, right: 20 },
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
