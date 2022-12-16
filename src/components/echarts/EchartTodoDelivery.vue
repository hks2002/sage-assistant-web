<!--
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-03-25 11:01:23
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-12-16 17:07:18
 * @FilePath       : \web2\src\components\echarts\EchartTodoDelivery.vue
 * @CopyRight      : Dedienne Aerospace China ZhuHai
-->
<template>
  <q-item>
    <div id="EchartTodoDelivery" style="height: 100%; width: 100%" />
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-item>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import {
  defaultDataZoom,
  defaultLegend,
  defaultScatterSerial,
  defaultToolbox,
  defaultTooltip,
  defaultXAxisTime,
  echarts
} from '@/assets/echartsCfg.js'
import _groupBy from 'lodash/groupBy'
import _map from 'lodash/map'
import _sortBy from 'lodash/sortBy'
import _uniq from 'lodash/uniq'
import { date } from 'quasar'
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: String
})

// common vars
const { t } = useI18n()
const showLoading = ref(false)

// echart vars
let eChart = null
let data = []
let legend = []
let dataByLegend = []
let dataset = []
let series = []
const dimensions = [
  'ProjectNO',
  'OrderNO',
  'OrderType',
  'PN',
  'Qty',
  'Description',
  'CustomerCode',
  'CustomerName',
  'Currency',
  'NetPrice',
  'USD',
  'Rate',
  'OrderDate',
  'RequestDate',
  'PlanedDate',
  'DaysLeft'
]

// computed vars

// actions
const doUpdate = () => {
  if (!props.site) return

  showLoading.value = true

  axiosGet('/Data/TobeDelivery?Site=' + props.site)
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
  const newDate = new Date()
  data.forEach((row) => {
    const requestDate = new Date(row.RequestDate)
    const planedDate = new Date(row.PlanedDate)
    row.DaysLeft = date.getDateDiff(Math.min(requestDate, planedDate), newDate, 'days')
  })
  data = _sortBy(data, ['DaysLeft'])
  legend = _uniq(_map(data, 'OrderType'))
  dataByLegend = _groupBy(data, 'OrderType')
  dataset = []
  series = []

  legend.forEach((value, index) => {
    dataset[index] = { source: dataByLegend[value] }
    series[index] = defaultScatterSerial(index, value, '{@ProjectNO}', dimensions, 'RequestDate', 'ProjectNO')
  })
}

const setEchart = () => {
  // data is ready,set echart option
  eChart.setOption(
    {
      title: {
        text: t('Label.Products to be delivered to customers') + ` [${props.site}]`,
        left: 'center'
      },
      legend: defaultLegend,
      toolbox: defaultToolbox(dimensions, data, t('Label.Products to be delivered to customers') + ` [${props.site}]`),
      tooltip: defaultTooltip,
      xAxis: defaultXAxisTime,
      grid: [{ left: 40, right: 40, bottom: 50 }],
      yAxis: [
        {
          type: 'category',
          show: false
        }
      ],
      dataZoom: defaultDataZoom('xy'),
      dataset: dataset,
      series: series
    },
    true
  )
}

const resize = () => {
  eChart.resize()
}

// events
onMounted(() => {
  eChart = echarts.init(document.getElementById('EchartTodoDelivery'))
  doUpdate()
})

onBeforeUnmount(() => {
  eChart.dispose()
})

onActivated(() => {
  // when use keep alive, must use activated/deactivated
  window.addEventListener('resize', resize)
  resize()
})

onDeactivated(() => {
  // when use keep alive, must use activated/deactivated
  window.removeEventListener('resize', resize)
})

watch(
  // Don't use watchEffect, it run before Mounted.
  () => [props.site],
  (...newAndold) => {
    // newAndold[1]:old
    // newAndold[0]:new
    console.debug('watch:' + newAndold[1] + ' ---> ' + newAndold[0])

    doUpdate()
  }
)
</script>
