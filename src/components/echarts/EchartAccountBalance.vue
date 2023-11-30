<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 21:00:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-17 13:45:26
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-item>
    <base-echart :e-chart-option="eChartOption" />
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-item>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { defaultToolbox, defaultTooltip } from '@/assets/echartsCfg.js'
import _forEach from 'lodash/forEach'
import _groupBy from 'lodash/groupBy'
import _map from 'lodash/map'
import _uniq from 'lodash/uniq'
import { Quasar } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseEchart from './BaseEchart.vue'

const props = defineProps({
  accountNO: { type: String, require: true, default: '' },
  year: { type: String, require: true, default: '' },
  site: { type: String, require: true, default: '' },
  cat: { type: String, require: true, default: '' }
})

// common vars
const showLoading = ref(false)
const { t } = useI18n()

// echart vars
let eChartOption = {}
let data = []
let legend = []
let dataByLegend = []
let series = []
let catText = t('S.FINANCIAL_BALANCE')

if (props.cat === 'C') {
  catText = t('S.FINANCIAL_CREDIT')
} else if (props.cat === 'D') {
  catText = t('S.FINANCIAL_DEBIT')
} else if (props.cat === 'M') {
  catText = t('S.FINANCIAL_MOVEMENT')
} else {
  catText = t('S.FINANCIAL_BALANCE')
}

const dimensions = ['accountNO', 'year', 'currency']
for (let i = 0; i <= 12; i++) {
  dimensions.push(props.cat.toLowerCase() + i)
}

// actions
const doUpdate = () => {
  if (!props.site || !props.year || !props.cat || !props.accountNO) return

  showLoading.value = true

  axiosGet('/Data/FinancialBalance' + props.cat, {
    Site: props.site,
    Year: props.year,
    AccountNO: props.accountNO
  })
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
  _forEach(data, (value) => {
    value['accountAndCurrency'] = value['accountNO'] + value['currency']
  })
  legend = _uniq(_map(data, 'accountAndCurrency'))
  dataByLegend = _groupBy(data, 'accountAndCurrency')
  series = []
  _forEach(legend, (value, index) => {
    const data12 = []
    for (let i = 0; i <= 12; i++) {
      // key C1,D1,M1,B1
      const key = props.cat.toLowerCase() + i
      data12.push(dataByLegend[value][0][key])
    }
    series[index] = {
      type: 'bar',
      name: value,
      tooltip: {
        trigger: 'item'
      },
      data: data12
    }
  })
}

const setEchart = () => {
  // data is ready,set echart option
  eChartOption = {
    title: {
      text: catText,
      left: 'center'
    },
    legend: {
      data: legend,
      left: 10,
      top: 20,
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { fontSize: 10 }
    },
    toolbox: defaultToolbox(dimensions, data, 'Account ' + props.accountNO + ' ' + catText + ' of ' + props.year),
    tooltip: defaultTooltip,
    xAxis: {
      type: 'category',
      data: [t('S.FINANCIAL_OPEN'), ...Quasar.lang.props.date.monthsShort]
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: function (value) {
          if (value >= 1000000) {
            value = value / 1000000 + 'M'
          } else if (value >= 1000 && value < 1000000) {
            value = value / 1000 + 'K'
          } else if (value <= -1000 && value > -1000000) {
            value = value / 1000 + 'K'
          } else if (value <= -1000000) {
            value = value / 1000000 + 'M'
          } else {
            // no change
          }
          return value
        }
      }
    },
    series: series,
    grid: { bottom: 30 }
  }
}

// events
onMounted(() => {
  doUpdate()
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, ' ---> ', value)

  doUpdate()
})
</script>
