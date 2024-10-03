<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2024-11-11 14:07:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-17 15:09:55
* @FilePath              : sage-assistant-web/src/components/echarts/EchartCustomerSummaryAmountTopByRepresentative.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <base-echart :e-chart-option="eChartOption" :show-loading="showLoading" />
</template>

<script setup>
import BaseEchart from './BaseEchart.vue'

import {
  defaultColor,
  defaultLegend,
  defaultTitle,
  defaultToolboxWithZoom,
  defaultTooltip,
  formatNumber,
  multiLineFormatter
} from '@/assets/echartsCfg'

import { axiosGet } from '@/assets/axiosActions'
import { forEach, groupBy, map, sample, sortBy, sumBy, uniq } from 'lodash-es'
import { date } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: String,
  orderType: String,
  customerCode: String,
  dateFrom: String,
  dateTo: String,
  limit: Number,
  showSubTitle: { type: Boolean, require: false, default: true }
})
// common vars
const { t } = useI18n()
const showLoading = ref(false)

// echart vars
let eChartOption = {}
let sites = []
let dataBySites = []
let topTarget = []
let data = []
let dataset = []
let series = []

// actions
function doUpdate() {
  if (
    !props.site ||
    !props.orderType ||
    !props.customerCode ||
    !date.isValid(props.dateFrom) ||
    !date.isValid(props.dateTo) ||
    !props.limit
  )
    return

  showLoading.value = true

  axiosGet('/Data/CustomerSummaryAmountTopByRepresentative', {
    Site: props.site,
    OrderType: props.orderType,
    CustomerCode: props.customerCode,
    DateFrom: props.dateFrom,
    DateTo: props.dateTo,
    Limit: props.limit
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

function prepareData() {
  dataset = []
  series = []
  topTarget = []

  sites = uniq(map(data, 'site').sort())
  dataBySites = groupBy(data, 'site')

  forEach(groupBy(data, 'representative'), (group) => {
    const val = sumBy(group, 'sumUSD')
    topTarget.push({ target: group.at(0)['representative'], val: val })
  })
  topTarget = sortBy(topTarget, 'val')

  forEach(sites, (site, index) => {
    dataset[index] = { source: dataBySites[site] }
    series[index] = {
      name: site,
      type: 'bar',
      datasetIndex: index,
      encode: {
        x: 'sumUSD',
        y: 'representative'
      },
      //stack: 'total',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      },
      colorBy: sites.length === 1 ? 'data' : 'series',
      label: {
        show: true,
        verticalAlign: 'middle',
        position: 'right',
        fontSize: '10',
        formatter: (params) =>
          formatNumber(params.data['sumLocal']) +
          ' ' +
          params.data['localCurrency'] +
          ' ' +
          formatNumber((100 * params.data['sumUSD']) / params.data['siteAllUSD']) +
          '%'
      },
      barMaxWidth: 40,
      tooltip: {
        trigger: 'item',
        formatter: multiLineFormatter
      }
    }
  })
}

function setEchart() {
  const shortTitle = `${props.site} ${t('S.SALES_ORDER_AMOUNT_BY_REPRESENTATIVE')} Top ${props.limit}`
  const longTitle = `${shortTitle} (${props.dateFrom}-->${props.dateTo})`

  // data is ready,set echart option
  eChartOption = {
    title: defaultTitle(shortTitle, null),
    legend: defaultLegend,
    toolbox: defaultToolboxWithZoom(longTitle, data),
    tooltip: defaultTooltip,
    color: sites.length === 1 ? sample(defaultColor) : defaultColor,
    grid: [{ left: '150', right: '60' }],
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}\nUSD'
      }
      // max: maxBy(data, 'siteAllUSD')['siteAllUSD']
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        fontSize: 10,
        width: 130,
        overflow: 'truncate'
      },
      data: map(topTarget, 'target')
    },
    dataset: dataset,
    series: series
  }
}

// events
onMounted(() => {
  doUpdate()
})

watch(props, (value, oldValue) => {
  doUpdate()
})

watch(useI18n().locale, () => {
  setEchart()
})
</script>
