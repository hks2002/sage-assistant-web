<!--
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-03-25 11:01:23
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-12-16 17:47:22
 * @FilePath       : \web2\src\components\echarts\EchartInventoryStock.vue
 * @CopyRight      : Dedienne Aerospace China ZhuHai
-->
<template>
  <q-item>
    <div id="EchartInventoryStock" style="height: 100%; width: 100%" />
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-item>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { defaultBarStackedSerial, defaultLegend, defaultToolbox, defaultTooltip, echarts } from '@/assets/echartsCfg.js'
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
let bars = []
let dataset = []
let series = []
const dimensions = ['PN', 'StockSite', 'Qty']

// actions
const doUpdate = (pnRoot) => {
  if (!props.pnRoot) return

  showLoading.value = true

  axiosGet('/Data/InventoryStock?PnRoot=' + pnRoot)
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
  bars = _uniq(_map(data, 'StockSite'))
  legend = _uniq(_map(data, 'PN'))
  dataByLegend = _groupBy(data, 'PN')
  dataset = []
  series = []

  _forEach(legend, (value, index) => {
    dataset[index] = { source: dataByLegend[value] }
    series[index] = defaultBarStackedSerial(index, value, '{@Qty}', dimensions, 'StockSite', 'Qty')
  })
}

const setEchart = () => {
  // data is ready,set echart option
  eChart.setOption(
    {
      title: {
        text: t('Label.Stock Info'),
        left: 'center'
      },
      tooltip: defaultTooltip,
      legend: defaultLegend,
      toolbox: defaultToolbox(dimensions, data, t('Label.Stock Info')),
      grid: { bottom: 20, top: 40, right: 20 },
      xAxis: {
        type: 'category',
        data: bars
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
    },
    true
  )
}

// events
onMounted(() => {
  eChart = echarts.init(document.getElementById('EchartInventoryStock'))
  doUpdate(props.pnRoot)
})

onBeforeUnmount(() => {
  eChart.dispose()
})

// Don't use watchEffect, it run before Mounted.
watch(
  () => props.pnRoot,
  (newVal, oldVal) => {
    console.debug('watch:' + oldVal + ' ---> ' + newVal)

    doUpdate(newVal)
  }
)
</script>
