<!--
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-03-25 11:01:23
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-12-16 17:47:46
 * @FilePath       : \web2\src\components\echarts\EchartDeliveryDuration.vue
 * @CopyRight      : Dedienne Aerospace China ZhuHai
-->
<template>
  <q-item>
    <div id="EchartDeliveryDuration" style="height: 100%; width: 100%" />
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
  defaultXAxisTime,
  echarts
} from '@/assets/echartsCfg.js'
import _forEach from 'lodash/forEach'
import _groupBy from 'lodash/groupBy'
import _map from 'lodash/map'
import _uniq from 'lodash/uniq'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
let dataset = []
let series = []
const dimensions = ['SalesSite', 'PN', 'OrderDate', 'ShipDate', 'Duration']

// actions
const doUpdate = (pnRoot) => {
  if (!props.pnRoot) return

  showLoading.value = true

  axiosGet('/Data/DeliveryDuration?PnRoot=' + pnRoot)
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
  legend = _uniq(_map(data, 'SalesSite'))
  dataByLegend = _groupBy(data, 'SalesSite')
  dataset = []
  series = []

  _forEach(legend, (value, index) => {
    dataset[index] = { source: dataByLegend[value] }
    series[index] = defaultLineSerial(index, value, '{@Duration}', dimensions, 'ShipDate', 'Duration')
  })
}

const setEchart = () => {
  // data is ready,set echart option
  eChart.setOption(
    {
      title: {
        text: t('Label.Delivery Duration'),
        left: 'center'
      },
      tooltip: defaultTooltip,
      legend: defaultLegend,
      toolbox: defaultToolbox(dimensions, data, t('Label.Delivery Duration')),
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
    },
    true
  )
}

onMounted(() => {
  eChart = echarts.init(document.getElementById('EchartDeliveryDuration'))
  if (props.pnRoot) {
    doUpdate(props.pnRoot)
  }
})

onBeforeUnmount(() => {
  eChart.dispose()
})

watch(
  // Don't use watchEffect, it run before Mounted.
  () => props.pnRoot,
  (newVal, oldVal) => {
    console.debug('watch:' + oldVal + ' ---> ' + newVal)
    if (newVal) {
      doUpdate(newVal)
    }
  }
)
</script>
