<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2024-11-11 14:07:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-13 01:08:22
* @FilePath              : sage-assistant-web/src/components/echarts/EchartSupplierSummaryAmountTopBySupplier.vue
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
import { forEach, groupBy, map, maxBy, sortBy, sumBy, uniq } from 'lodash-es'
import { date } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: String,
  supplierType: String,
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
let data = []
let dataBySites = []
let topTarget = []
let dataset = []
let series = []

// actions
function doUpdate() {
  if (
    !props.site ||
    !props.supplierType ||
    !date.isValid(props.dateFrom) ||
    !date.isValid(props.dateTo) ||
    !props.limit
  )
    return

  showLoading.value = true

  axiosGet('/Data/SupplierSummaryAmountTop', {
    Site: props.site,
    SupplierType: props.supplierType,
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

  forEach(groupBy(data, 'supplierName'), (group) => {
    const val = sumBy(group, 'sumUSD')
    topTarget.push({ target: group.at(0)['supplierName'], val: val })
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
        y: 'supplierName'
      },
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
  const preTitle = `${props.site} ${t('S.SUPPLIER_TYPE')}[${props.supplierType}]`
  const shortTitle = `${preTitle} ${t('S.PURCHASE_ORDER_AMOUNT')} Top ${props.limit}`
  const longTitle = `${shortTitle} (${props.dateFrom}-->${props.dateTo})`

  // data is ready,set echart option
  eChartOption = {
    title: defaultTitle(shortTitle, null),
    legend: defaultLegend,
    toolbox: defaultToolboxWithZoom(longTitle, data),
    tooltip: defaultTooltip,
    color: defaultColor,
    grid: [{ left: '80', right: '40' }],
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}\nUSD'
      },
      max: data.length > 0 ? maxBy(data, 'siteAllUSD')['siteAllUSD'] : 100
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        fontSize: 10,
        width: 60,
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
