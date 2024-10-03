<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 21:35:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-12 23:57:34
* @FilePath              : sage-assistant-web/src/components/echarts/EchartSupplierOTD.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <base-echart :e-chart-option="eChartOption" :show-loading="showLoading" />
</template>

<script setup>
import BaseEchart from './BaseEchart.vue'

import { axiosGet } from '@/assets/axiosActions'
import {
  defaultColor,
  defaultLegend,
  defaultTitle,
  defaultToolboxWithZoom,
  defaultTooltip,
  defaultYAxisPercent,
  genMonthSerial,
  genYearSerial,
  multiLineFormatter
} from '@/assets/echartsCfg'

import { forEach, groupBy, map, sample, sumBy, uniq } from 'lodash-es'
import { date } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: String,
  supplierType: String,
  supplierCode: String,
  dateFrom: String,
  dateTo: String,
  interval: String
})
// common vars
const { t } = useI18n()
const showLoading = ref(false)

// echart vars
let eChartOption = {}
let data = []
let sites = []
let dataBySites = []
let targets = []
let dataset = []
let series = []

// actions
function doUpdate() {
  if (
    !props.site ||
    !props.supplierType ||
    !props.supplierCode ||
    !date.isValid(props.dateFrom) ||
    !date.isValid(props.dateTo) ||
    !props.interval
  )
    return

  showLoading.value = true

  axiosGet('/Data/SupplierOTD', {
    Site: props.site,
    SupplierType: props.supplierType,
    SupplierCode: props.supplierCode,
    DateFrom: props.dateFrom,
    DateTo: props.dateTo,
    Interval: props.interval
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

  sites = uniq(map(data, 'site').sort())
  dataBySites = groupBy(data, 'site')
  targets =
    props.interval === 'Month'
      ? genMonthSerial(props.dateFrom, props.dateTo)
      : genYearSerial(props.dateFrom, props.dateTo)

  forEach(sites, (site, index) => {
    dataset[index] = { source: dataBySites[site] }
    series[index] = {
      name: site,
      type: 'line',
      datasetIndex: index,
      smooth: true,
      label: {
        show: false,
        position: 'center',
        fontSize: '10',
        formatter: '{@OTD}'
      },
      tooltip: {
        trigger: 'item',
        formatter: multiLineFormatter
      },
      encode: {
        x: 'target',
        y: 'OTD'
      }
    }
  })

  // for all
  if (sites.length > 1) {
    let lineData = []

    let dataByTargets = groupBy(data, 'target')
    targets.forEach((target) => {
      const groupData = dataByTargets[target]
      let OTCnt = sumBy(groupData, 'OTCnt')
      let allCnt = sumBy(groupData, 'allCnt')

      let OTD = groupData ? Math.round((OTCnt * 100) / allCnt) : null
      lineData.push({ target: target, site: props.site, OTCnt: OTCnt, allCnt: allCnt, OTD: OTD })
    })
    dataset.push({ source: lineData })

    series.push({
      name: props.site,
      type: 'line',
      smooth: true,
      datasetIndex: dataset.length - 1,
      label: {
        show: false,
        fontSize: '10',
        formatter: '{@OTD}'
      },
      tooltip: {
        trigger: 'item',
        formatter: multiLineFormatter
      },
      encode: {
        x: 'target',
        y: 'OTD'
      }
    })
  }

  // for bar
  let len = series.length
  forEach(sites, (site, index) => {
    dataset[len + index] = { source: dataBySites[site] }
    series[len + index] = {
      name: site,
      type: 'bar',
      datasetIndex: len + index,
      gridIndex: 1,
      xAxisIndex: 1,
      yAxisIndex: 1,
      stack: 'total',
      label: {
        show: false,
        position: 'top',
        fontSize: '10',
        formatter: '{@OTCnt}:{@allCnt}'
      },
      tooltip: {
        trigger: 'item',
        formatter: multiLineFormatter
      },
      encode: {
        x: 'target',
        y: 'allCnt'
      }
    }
  })
}

function setEchart() {
  const preTitle = `${props.site} ${t('S.SUPPLIER_TYPE')}[${props.supplierType}]`
  const shortTitle = `${preTitle} ${t('S.PURCHASE_ORDER_OTD')}`
  const longTitle = `${shortTitle} (${props.dateFrom}-->${props.dateTo})`

  // data is ready,set echart option
  eChartOption = {
    title: defaultTitle(shortTitle, t('S.PURCHASE_ORDER_OTD_DESCRIPTION')),
    legend: defaultLegend,
    toolbox: defaultToolboxWithZoom(longTitle, data),
    tooltip: defaultTooltip,
    color: sites.length === 1 ? sample(defaultColor) : defaultColor,
    grid: [
      { left: '60', right: '40', top: '60', bottom: '50%' },
      { left: '60', right: '40', top: '60%', bottom: '40' }
    ],
    xAxis: [
      { type: 'category', data: targets },
      { type: 'category', data: targets, gridIndex: 1 }
    ],
    yAxis: [defaultYAxisPercent, { type: 'value', gridIndex: 1 }],
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
