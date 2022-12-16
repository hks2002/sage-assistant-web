<!--
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-03-25 11:01:23
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-12-16 17:16:15
 * @FilePath       : \web2\src\components\echarts\EchartTodoPurchaseBom.vue
 * @CopyRight      : Dedienne Aerospace China ZhuHai
-->
<template>
  <q-item>
    <div id="EchartTodoPurchaseBom" style="height: 100%; width: 100%" />
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
} from 'assets/echartsCfg.js'
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
  'OrderType',
  'WorkOrderNO',
  'BomSeq',
  'CustomerCode',
  'CustomerName',
  'ForPN',
  'PN',
  'Description',
  'Qty',
  'ShortQty',
  'AllQty',
  'Unit',
  'CreateDate',
  'Days'
]

// computed vars

// actions
const doUpdate = () => {
  if (!props.site) return

  showLoading.value = true

  axiosGet('/Data/TobePurchaseBom?Site=' + props.site)
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
    row.Days = date.getDateDiff(row.CreateDate, newDate, 'days')
  })
  data = _sortBy(data, ['Days'], ['desc'])

  legend = _uniq(_map(data, 'OrderType'))
  dataByLegend = _groupBy(data, 'OrderType')
  dataset = []
  series = []

  legend.forEach((value, index) => {
    dataset[index] = { source: dataByLegend[value] }
    series[index] = defaultScatterSerial(index, value, '{@ProjectNO}', dimensions, 'CreateDate', 'ProjectNO')
  })
}

const setEchart = () => {
  // data is ready,set echart option
  eChart.setOption(
    {
      title: {
        text: t('Label.BOMs need to be purchased based on stock level') + ` [${props.site}]`,
        left: 'center'
      },
      legend: defaultLegend,
      toolbox: defaultToolbox(
        dimensions,
        data,
        t('Label.BOMs need to be purchased based on stock level') + ` [${props.site}]`
      ),
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
    },
    true
  )
}

const resize = () => {
  eChart.resize()
}

// events
onMounted(() => {
  eChart = echarts.init(document.getElementById('EchartTodoPurchaseBom'))
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
