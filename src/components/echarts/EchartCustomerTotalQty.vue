<template>
  <q-item>
    <div id="EchartCustomerTotalQty" style="height: 100%; width: 100%" />
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-item>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { defaultBarSerial, defaultLegend, defaultToolbox, defaultTooltip, echarts } from '@/assets/echartsCfg.js'
import _forEach from 'lodash/forEach'
import _groupBy from 'lodash/groupBy'
import _map from 'lodash/map'
import _uniq from 'lodash/uniq'
import { date } from 'quasar'
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  customerCode: String,
  dateFrom: String,
  dateTo: String
})

// common vars
const { t } = useI18n()
const showLoading = ref(false)

// echart vars
let eChart = null
let data = []
let legend = []
let dataByLegend = []
let sites = []
let dataset = []
let series = []
const dimensions = ['Site', 'CustomerCode', 'CountType', 'Qty']

// actions
const doUpdate = () => {
  if (!props.customerCode || !date.isValid(props.dateFrom) || !date.isValid(props.dateTo)) {
    return
  }

  showLoading.value = true

  axiosGet(
    '/Data/CustomerTotalQty?CustomerCode=' +
      props.customerCode +
      '&DateFrom=' +
      props.dateFrom +
      '&DateTo=' +
      props.dateTo
  )
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
  legend = _uniq(_map(data, 'CountType'))
  dataByLegend = _groupBy(data, 'CountType')
  sites = _uniq(_map(data, 'Site'))
  dataset = []
  series = []

  _forEach(legend, (value, index) => {
    dataset[index] = { source: dataByLegend[value] }
    series[index] = defaultBarSerial(index, value, '{@Qty}', dimensions, 'Site', 'Qty')
  })
}

const setEchart = () => {
  // data is ready,set echart option
  eChart.setOption(
    {
      title: {
        text: `${t('Label.Total Qty')} ( ${props.dateFrom}-->${props.dateTo})`,
        subtext: '',
        left: 'center'
      },
      legend: defaultLegend,
      toolbox: defaultToolbox(dimensions, data, `${t('Label.Total Qty')} ( ${props.dateFrom}-->${props.dateTo})`),
      tooltip: defaultTooltip,
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
    },
    true
  )
}

const resize = () => {
  eChart.resize()
}

// events
onMounted(() => {
  eChart = echarts.init(document.getElementById('EchartCustomerTotalQty'))
  // when not use keep alive, use mounted/unmounted
  window.addEventListener('resize', resize)
  doUpdate()
})

onBeforeUnmount(() => {
  // when not use keep alive, use mounted/unmounted
  window.removeEventListener('resize', resize)
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
  () => [props.customerCode, props.dateFrom, props.dateTo],
  (...newAndold) => {
    // newAndold[1]:old
    // newAndold[0]:new
    console.debug('watch:' + newAndold[1] + ' ---> ' + newAndold[0])

    doUpdate()
  }
)
</script>
