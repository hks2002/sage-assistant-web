<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-24 09:28:30
* @FilePath              : sage-assistant-web/src/components/echarts/EchartPNCostHistory.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <base-echart :e-chart-option="eChartOption" :show-loading="showLoading" />
</template>

<script setup>
import BaseEchart from './BaseEchart.vue'

import {
  defaultDataZoom,
  defaultLegend,
  defaultToolbox,
  defaultTooltip,
  defaultXAxisTime,
  defaultYAxis,
  multiLineFormatter
} from '@/assets/echartsCfg.js'

import { axiosGet } from '@/assets/axiosActions'
import { forEach, get, groupBy, map, sumBy, uniq } from 'lodash-es'
import { Notify } from 'quasar'
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
let sites = []
let dataBySites = []
let dataBySiteProject = []
let dataSumBySiteProject = []
let dataset = []
let series = []
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
    dataZoomStartValue = get(data[len - 20], 'orderDate')
  } else if (len > 0) {
    dataZoomStartValue = get(data[0], 'orderDate')
  }
  dataSumBySiteProject = []
  dataset = []
  series = []

  dataBySiteProject = groupBy(data, function (n) {
    return get(n, 'purchaseSite') + get(n, 'projectNO')
  })
  forEach(dataBySiteProject, (value) => {
    const o = {
      purchaseSite: get(value[0], 'purchaseSite'),
      projectNO: get(value[0], 'projectNO'),
      orderPN: get(value[0], 'orderPN'),
      orderDate: get(value[0], 'orderDate'),
      USD: Math.round(sumBy(value, 'USD'))
    }
    dataSumBySiteProject.push(o)
  })
  sites = uniq(map(data, 'purchaseSite'))
  dataBySites = groupBy(dataSumBySiteProject, 'purchaseSite')

  forEach(sites, (site, index) => {
    dataset[index] = { source: dataBySites[site] }
    series[index] = {
      name: site,
      type: 'line',
      smooth: true,
      datasetIndex: index,
      label: {
        show: true,
        position: 'bottom',
        formatter: '{@USD}\nUSD'
      },
      tooltip: {
        trigger: 'item',
        formatter: multiLineFormatter
      },
      encode: {
        x: 'orderDate',
        y: 'USD'
      }
    }
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
    toolbox: defaultToolbox(t('S.PURCHASE_COST_HISTORY'), data),
    tooltip: defaultTooltip,
    dataZoom: defaultDataZoom(dataZoomStartValue),
    xAxis: defaultXAxisTime,
    yAxis: defaultYAxis('USD'),
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
