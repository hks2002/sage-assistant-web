<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-24 09:29:25
* @FilePath              : sage-assistant-web/src/components/echarts/EchartPNSalesHistory.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <base-echart :e-chart-option="eChartOption" :show-loading="showLoading" ref="PNSalesHistoryRef" />
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
  echarts,
  multiLineFormatter
} from '@/assets/echartsCfg.js'

import { axiosGet } from '@/assets/axiosActions'
import { forEach, get, groupBy, map, sumBy, uniq } from 'lodash-es'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  pnRoot: String
})
// common vars
const { t } = useI18n()
const showLoading = ref(false)

const PNSalesHistoryRef = ref(null)

// echart vars
let eChartOption = {}
let data = []
let sites = []
let dataBySites = []
let dataCountedBySites = []
let dataset = []
let series = []
let dataZoomStartValue = '1900-01-01'

// actions
function doUpdate() {
  if (!props.pnRoot) return

  showLoading.value = true

  axiosGet('/Data/SalesHistory?PnRoot=' + props.pnRoot)
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
  const len = data.length
  if (len >= 20) {
    dataZoomStartValue = get(data[len - 20], 'orderDate')
  } else if (len > 0) {
    dataZoomStartValue = get(data[0], 'orderDate')
  }

  sites = uniq(map(data, 'salesSite'))
  dataBySites = groupBy(data, 'salesSite')
  dataCountedBySites = []
  dataset = []
  series = []

  forEach(dataBySites, (value) => {
    const o = {
      salesSite: get(value[0], 'salesSite'),
      qty: sumBy(value, 'qty')
    }
    dataCountedBySites.push(o)
  })

  sites.forEach((site, index) => {
    dataset[index] = { source: dataBySites[site] }
    series[index] = {
      name: site,
      type: 'line',
      smooth: true,
      datasetIndex: index,
      label: {
        show: true,
        position: 'bottom',
        formatter: '{@netPrice}\n{@currency}'
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

  // add pie
  dataset.push({ source: dataCountedBySites })
  series.push({
    type: 'pie',
    datasetIndex: dataset.length - 1,
    radius: ['35%', '60%'],
    center: ['88%', '50%'],
    roseType: 'radius',
    startAngle: Math.random() * 360,
    padAngle: 1,
    label: {
      formatter: '{@salesSite} \nQty:{@qty}\n{d}%'
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => get(params.data, 'salesSite') + '<br/>' + 'Qty' + ':' + get(params.data, 'qty') + '<br/>'
    },
    labelLine: {},
    encode: {
      value: 'qty'
    }
  })
}

function setEchart() {
  // data is ready,set echart option
  eChartOption = {
    title: {
      text: t('S.SALES_HISTORY'),
      //subtext: t('Label.Currency Rate Data From State Administration of Foreign Exchange'),
      left: 'center'
    },
    legend: defaultLegend,
    grid: [{ left: '5%', right: '25%' }],
    toolbox: defaultToolbox(t('S.SALES_HISTORY'), data),
    tooltip: defaultTooltip,
    dataZoom: defaultDataZoom('x', dataZoomStartValue),
    xAxis: defaultXAxisTime,
    yAxis: defaultYAxis('USD'),
    dataset: dataset,
    series: series
  }
}

// events
onMounted(() => {
  const eChartInstance = echarts.getInstanceByDom(PNSalesHistoryRef.value.$el.children[0])
  doUpdate()
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)

  doUpdate()
})
</script>
