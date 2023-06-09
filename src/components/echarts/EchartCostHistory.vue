<!--
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-03-25 11:01:23
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-12-16 17:49:18
 * @FilePath       : \web2\src\components\echarts\EchartCostHistory.vue
 * @CopyRight      : Dedienne Aerospace China ZhuHai
-->
<template>
  <q-item>
    <div id="EchartCostHistory" style="height: 100%; width: 100%" />
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
  defaultLineSerial,
  defaultToolbox,
  defaultTooltip,
  defaultXAxisTime,
  defaultYAxisUSD,
  echarts
} from '@/assets/echartsCfg.js'
import { notifyError } from 'assets/common'
import _forEach from 'lodash/forEach'
import _get from 'lodash/get'
import _groupBy from 'lodash/groupBy'
import _map from 'lodash/map'
import _sumBy from 'lodash/sumBy'
import _uniq from 'lodash/uniq'
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  pnRoot: String
})

// common vars
const { t } = useI18n()
const showLoading = ref(false)

// echart vars
let eChart = null
let data = []
let legend = []
let dataByLegend = []
let dataBySiteProject = []
let dataSumBySiteProject = []
let dataset = []
let series = []
const dimensions = [
  'PurchaseSite',
  'ProjectNO',
  'OrderPN',
  'OrderDate',
  'PurchaseNO',
  'Line',
  'VendorCode',
  'VendorName',
  'PurchasePN',
  'Description',
  'Qty',
  'Currency',
  'NetPrice',
  'USD',
  'Rate'
]
const miniDimensions = ['PurchaseSite', 'ProjectNO', 'OrderPN', 'OrderDate', 'USD']
let dataZoomStartValue = '1900-01-01'

// actions
const doUpdate = () => {
  if (!props.pnRoot) return

  showLoading.value = true

  axiosGet('/Data/CostHistory?PnRoot=' + props.pnRoot)
    .then((response) => {
      data = response
      prepareData()
      setEchart()
    })
    .catch((e) => {
      console.error(e)
      notifyError(t('Loading Cost History Failed!'))
    })
    .finally(() => {
      showLoading.value = false
    })
}

const prepareData = () => {
  const len = data.length
  if (len >= 20) {
    dataZoomStartValue = _get(data[len - 20], 'OrderDate')
  } else if (len > 0) {
    dataZoomStartValue = _get(data[0], 'OrderDate')
  }
  dataSumBySiteProject = []
  dataset = []
  series = []

  dataBySiteProject = _groupBy(data, function (n) {
    return _get(n, 'PurchaseSite') + _get(n, 'ProjectNO')
  })
  _forEach(dataBySiteProject, (value) => {
    const o = {}
    Object.defineProperty(o, 'PurchaseSite', {
      enumerable: true,
      value: _get(value[0], 'PurchaseSite')
    })
    Object.defineProperty(o, 'ProjectNO', {
      enumerable: true,
      value: _get(value[0], 'ProjectNO')
    })
    Object.defineProperty(o, 'OrderPN', {
      enumerable: true,
      value: _get(value[0], 'OrderPN')
    })
    Object.defineProperty(o, 'OrderDate', {
      enumerable: true,
      value: _get(value[0], 'OrderDate')
    })
    Object.defineProperty(o, 'USD', {
      enumerable: true,
      value: _sumBy(value, 'USD')
    })
    dataSumBySiteProject.push(o)
  })
  legend = _uniq(_map(data, 'PurchaseSite'))
  dataByLegend = _groupBy(dataSumBySiteProject, 'PurchaseSite')

  _forEach(legend, (value, index) => {
    dataset[index] = { source: dataByLegend[value] }
    series[index] = defaultLineSerial(index, value, '{@USD} USD', miniDimensions, 'OrderDate', 'USD')
  })
}

const setEchart = () => {
  // data is ready,set echart option
  eChart.setOption(
    {
      title: {
        text: t('Label.Sales Order Cost History'),
        // subtext: t('Label.Currency Rate Data From State Administration of Foreign Exchange'),
        left: 'center'
      },
      legend: defaultLegend,
      grid: [{ left: '5%', right: '25%' }],
      toolbox: defaultToolbox(dimensions, data, t('Label.Sales Order Cost History')),
      tooltip: defaultTooltip,
      dataZoom: defaultDataZoom(dataZoomStartValue),
      xAxis: defaultXAxisTime,
      yAxis: defaultYAxisUSD,
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
  eChart = echarts.init(document.getElementById('EchartCostHistory'))
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
  () => [props.pnRoot],
  (...newAndold) => {
    // newAndold[1]:old
    // newAndold[0]:new
    console.debug('watch:' + newAndold[1] + ' ---> ' + newAndold[0])

    doUpdate()
  }
)
</script>
