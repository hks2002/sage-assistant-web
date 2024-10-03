<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-03-25 11:01:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-19 22:49:43
* @FilePath              : sage-assistant-web/src/components/echarts/EchartTodoDealNewSO.vue
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
  multiLineFormatter
} from '@/assets/echartsCfg.js'

import { axiosGet } from '@/assets/axiosActions'
import { groupBy, map, uniq } from 'lodash-es'
import { date } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: String
})

// common vars
const { t } = useI18n()
const showLoading = ref(false)

// echart vars
let eChartOption = {}
let data = []
let orderTypes = []
let dataByOrderTypes = []
let dataset = []
let series = []
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
    row['days'] = date.getDateDiff(row.planedDate, newDate, 'days')
  })

  orderTypes = uniq(map(data, 'orderType'))
  dataByOrderTypes = groupBy(data, 'orderType')
  dataset = []
  series = []

  orderTypes.forEach((orderType, index) => {
    dataset[index] = { source: dataByOrderTypes[orderType] }
    series[index] = {
      name: orderType,
      type: 'scatter',
      datasetIndex: index,
      label: {
        show: true,
        position: 'bottom',
        formatter: '{@projectNO}'
      },
      tooltip: {
        trigger: 'item',
        formatter: multiLineFormatter
      },
      encode: {
        x: 'planedDate',
        y: 'projectNO'
      },
      markLine: {
        lineStyle: {
          color: 'red'
        },
        data: [
          [
            {
              xAxis: '2025-01-01',
              y: '10%'
            },
            {
              xAxis: '2025-01-01',
              y: '90%'
            }
          ]
        ]
      }
    }
  })
}

function setEchart() {
  const title = t('S.TODO_TO_BE_DEAL_WITH') + ` [${props.site}]`
  // data is ready,set echart option
  eChartOption = {
    title: {
      text: title,
      left: 'center'
    },
    legend: defaultLegend,
    toolbox: defaultToolbox(title, data),
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
