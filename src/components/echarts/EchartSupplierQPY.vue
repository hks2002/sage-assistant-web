<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 21:35:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-17 17:56:40
* @FilePath              : sage-assistant-web/src/components/echarts/EchartSupplierQPY.vue
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
  defaultYAxisPercent,
  genMonthSerial,
  genYearSerial,
  multiLineFormatter
} from '@/assets/echartsCfg'

import { axiosGet } from '@/assets/axiosActions'
import { filter, forEach, groupBy, map, sample, sortBy, sumBy, uniq } from 'lodash-es'
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

function getDecal(NCCnt) {
  switch (NCCnt) {
    case 0:
      return null
    case 1:
      return {
        color: 'rgba(255, 0, 0, 0.4)',
        dashArrayX: [1, 0],
        dashArrayY: [2, 5],
        rotation: Math.PI / 4
      }
    case 2:
      return {
        color: 'rgba(255, 255, 0, 0.5)',
        dashArrayX: [
          [1, 0],
          [1, 6]
        ],
        symbolSize: 0.8,
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }
    case 3:
      return {
        color: 'rgba(255, 0, 0, 0.8)',
        dashArrayX: [
          [1, 0],
          [1, 6]
        ],
        dashArrayY: [1, 0, 6, 0],
        rotation: Math.PI / 4
      }
  }
  return {
    color: 'rgba(255, 0, 0, 1)',
    dashArrayX: [
      [6, 6],
      [0, 6, 6, 0]
    ],
    dashArrayY: [6, 0]
  }
}

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

  axiosGet('/Data/SupplierQPY', {
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
    let sortedDataBySite = sortBy(dataBySites[site], 'ncByProjectCnt')

    forEach(sortedDataBySite, (json) => {
      dataset.push({ source: [json] })
      series.push({
        name: json['ncCntByProject'] + ' NC',
        //name: site,
        type: 'bar',
        datasetIndex: dataset.length - 1,
        xAxisIndex: 0,
        yAxisIndex: 0,
        encode: {
          x: 'target',
          y: 'PCT'
        },
        stack: site,
        emphasis: {
          focus: 'series'
        },
        tooltip: {
          trigger: 'item',
          formatter: multiLineFormatter
        },
        label: {
          show: false,
          verticalAlign: 'middle',
          fontSize: '12',
          formatter: (params) => {
            return params.data['PCT'] === 100 ? '' : params.data['PCT']
          }
        },
        itemStyle: {
          color: () => {
            return sites.length === 1 ? sample(defaultColor) : defaultColor[index]
          },
          decal: getDecal(json['ncCntByProject'])
        }
      })
    })
  })

  // each site 0 NC line
  forEach(sites, (site, index) => {
    let nc0 = filter(dataBySites[site], (o) => {
      return o.ncCntByProject === 0
    })

    dataset.push({ source: nc0 })
    series.push({
      name: site,
      type: 'line',
      datasetIndex: dataset.length - 1,
      gridIndex: 1,
      xAxisIndex: 1,
      yAxisIndex: 1,
      smooth: true,
      label: {
        show: false,
        position: 'center',
        fontSize: '10',
        formatter: '{@PCT}'
      },
      tooltip: {
        trigger: 'item',
        formatter: multiLineFormatter
      },
      encode: {
        x: 'target',
        y: 'PCT'
      }
    })
  })

  //for all
  if (sites.length > 1) {
    let lineData = []

    let dataByTargets = groupBy(data, 'target')
    targets.forEach((target) => {
      const groupData = dataByTargets[target]
      let nc0 = filter(groupData, (o) => {
        return o.ncCntByProject === 0
      })

      let NC0Cnt = sumBy(nc0, 'sameCnt')
      let allCnt = sumBy(nc0, 'allCnt')

      let PCT = groupData ? Math.round((NC0Cnt * 100) / allCnt) : null
      lineData.push({ target: target, site: props.site, NC0Cnt: NC0Cnt, allCnt: allCnt, PCT: PCT })
    })
    dataset.push({ source: lineData })

    series.push({
      name: props.site,
      type: 'line',
      smooth: true,
      datasetIndex: dataset.length - 1,
      gridIndex: 1,
      xAxisIndex: 1,
      yAxisIndex: 1,
      label: {
        show: false,
        fontSize: '10',
        formatter: '{@PCT}'
      },
      tooltip: {
        trigger: 'item',
        formatter: multiLineFormatter
      },
      encode: {
        x: 'target',
        y: 'PCT'
      }
    })
  }
}

function setEchart() {
  const preTitle = `${props.site} ${t('S.SUPPLIER_TYPE')}[${props.supplierType}]`
  const shortTitle = `${preTitle} ${t('S.QC_PASS_YIELD')}`
  const longTitle = `${shortTitle} (${props.dateFrom}-->${props.dateTo})`

  // data is ready,set echart option
  eChartOption = {
    title: defaultTitle(shortTitle, t('S.QC_PASS_YIELD_DESCRIPTION')),
    legend: defaultLegend,
    toolbox: defaultToolboxWithZoom(longTitle, data),
    tooltip: defaultTooltip,
    color: defaultColor,
    aria: { enable: true },
    grid: [
      { left: '50', right: '40', top: '60', bottom: '50%' },
      { left: '50', right: '40', top: '60%', bottom: '40' }
    ],
    xAxis: [
      {
        type: 'category',
        data: targets,
        gridIndex: 0
      },
      {
        type: 'category',
        data: targets,
        gridIndex: 1
      }
    ],
    yAxis: [defaultYAxisPercent, { ...defaultYAxisPercent, gridIndex: 1 }],
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
