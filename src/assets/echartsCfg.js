/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-11-30 11:11:29                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

const echarts = require('echarts/lib/echarts')
import { jsonToExcel, jsonToMultiLine, jsonToTable } from 'assets/dataUtils.js'
import { BarChart, LineChart, PieChart, SankeyChart, ScatterChart } from 'echarts/charts'
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent
} from 'echarts/components'
import _cloneDeep from 'lodash/cloneDeep'
import _get from 'lodash/get'
import _merge from 'lodash/merge'
import { Dialog, date } from 'quasar'

echarts.use([
  GridComponent,
  ToolboxComponent,
  DataZoomComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  SankeyChart
])

// --------------------------------- default setting ------------------------------
const defaultSeriesColor = [
  '#40a9ff',
  '#f759ab',
  '#ffa940',
  '#bae637',
  '#9254de',
  '#36cfc9',
  '#ffec3d',
  '#ff7a45',
  '#597ef7',
  '#73d13d',
  '#ffc53d',
  '#ff4d4f',
  '#69c0ff',
  '#ff85c0',
  '#ffc069',
  '#d3f261',
  '#b37feb',
  '#5cdbd3',
  '#fff566',
  '#ff9c6e',
  '#85a5ff',
  '#95de64',
  '#ffd666',
  '#ff7875'
]

const defaultTooltip = {
  backgroundColor: 'rgba(255,255,255,0.8)',
  borderWidth: '1',
  extraCssText: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);',
  textStyle: {
    fontStyle: 'normal',
    fontFamily: 'Arial',
    fontSize: 10,
    lineHeight: 10
  },
  confine: true
}

const defaultXAxisTime = {
  type: 'time',
  splitLine: {
    show: true
  },
  axisLabel: {
    show: true,
    showMaxLabel: true,
    showMinLabel: true,
    formatter: '{MM}-{dd}\n{yyyy}'
  }
}

const defaultYAxisUSD = {
  min: 0,
  max: function (value) {
    if (isNaN(value.max)) {
      return 1000
    } else {
      return null
    }
  },
  minInterval: 100,
  axisLabel: {
    formatter: '{value}\nUSD'
  }
}

const defaultDataZoom = function (axises, xStartValue, yStartValue) {
  const dataZoom = []
  if (axises.toLowerCase().indexOf('x') > -1) {
    if (xStartValue) {
      dataZoom.push({
        type: 'slider',
        height: 15,
        bottom: '5px',
        startValue: xStartValue,
        end: 100,
        xAxisIndex: [0]
      })
    } else {
      dataZoom.push({
        type: 'slider',
        height: 15,
        bottom: '5px',
        startValue: 0,
        end: 100,
        xAxisIndex: [0]
      })
    }

    dataZoom.push({
      type: 'inside',
      xAxisIndex: [0]
    })
  }
  if (axises.toLowerCase().indexOf('y') > -1) {
    if (yStartValue) {
      dataZoom.push({
        type: 'slider',
        width: 10,
        startValue: yStartValue,
        end: 100,
        yAxisIndex: [0]
      })
    } else {
      dataZoom.push({
        type: 'slider',
        width: 10,
        startValue: 0,
        end: 100,
        yAxisIndex: [0]
      })
    }

    dataZoom.push({
      type: 'inside',
      yAxisIndex: [0]
    })
  }

  return dataZoom
}

const defaultToolbox = function (headers, data, title) {
  return {
    feature: {
      //  use viewData instead.
      // dataView: {
      //  title: 'xx',
      //  optionToContent: () => jsonToTable(headers, data, title)
      // },
      dataZoom: {
        show: true
      },
      myTool: {
        show: true,
        title: 'View',
        icon: 'path://M17.5,17.3H33 M17.5,17.3H33 M45.4,29.5h-28 M11.5,2v56H51V14.8L38.4,2H11.5z M38.4,2.2v12.7H51 M45.4,41.7h-28',
        onclick: () => {
          Dialog.create({
            message: jsonToTable(headers, data, title),
            html: true,
            fullWidth: true,
            fullHeight: true
          })
            .onOk(() => {
              // console.log('OK')
            })
            .onCancel(() => {
              // console.log('Cancel')
            })
            .onDismiss(() => {
              // console.log('I am triggered on both OK and Cancel')
            })
        }
      },
      saveAsImage: {
        show: true
      },
      myTool2: {
        show: true,
        title: 'Download',
        icon: 'path://M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0M4.7,35.9L29.3,45.5L54.7,35.4',
        onclick: () => {
          const timeStamp = Date.now()
          const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
          jsonToExcel(headers, data, title + formattedString)
        }
      }
    }
  }
}

const defaultLegend = { left: 10, top: 20 }

const defaultEchartOption = {
  textStyle: {
    fontSize: 10
  },
  title: {
    text: 'This is title',
    subtext: 'This is subtitle',
    left: 'center'
  },
  legend: defaultLegend,
  grid: [{}],
  tooltip: defaultTooltip
}

const defaultLineSerial = function (index, value, labelFormatter, dimensions, encodeX, encodeY) {
  return {
    type: 'line',
    datasetIndex: index,
    name: value,
    label: {
      show: true,
      position: 'bottom',
      formatter: labelFormatter
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => jsonToMultiLine(dimensions, params.data)
    },
    dimensions: dimensions,
    encode: {
      x: encodeX,
      y: encodeY
    }
  }
}
const defaultBarSerial = function (index, value, labelFormatter, dimensions, encodeX, encodeY) {
  return {
    type: 'bar',
    datasetIndex: index,
    name: value,
    label: {
      show: true,
      position: 'inside',
      formatter: labelFormatter
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => jsonToMultiLine(dimensions, params.data)
    },
    dimensions: dimensions,
    encode: {
      x: encodeX,
      y: encodeY
    }
  }
}

const defaultScatterSerial = function (index, value, labelFormatter, dimensions, encodeX, encodeY) {
  return {
    type: 'scatter',
    datasetIndex: index,
    name: value,
    label: {
      show: true,
      position: 'bottom',
      formatter: labelFormatter
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => jsonToMultiLine(dimensions, params.data)
    },
    dimensions: dimensions,
    encode: {
      x: encodeX,
      y: encodeY
    }
  }
}

const defaultBarStackedSerial = function (index, value, labelFormatter, dimensions, encodeX, encodeY) {
  return mergerOption(defaultBarSerial(index, value, labelFormatter, dimensions, encodeX, encodeY), { stack: 'total' })
}

const DefaultPieSerial = function (index, labelFormatter, dimensions, summed, encode) {
  return {
    type: 'pie',
    datasetIndex: index,
    radius: [0, '30%'],
    label: {
      formatter: labelFormatter
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => _get(params.data, summed) + '<br/>' + encode + ':' + _get(params.data, encode) + '<br/>'
    },
    labelLine: {},
    dimensions: dimensions,
    encode: {
      value: encode
    }
  }
}

const AttachedPieSerial = function (index, labelFormatter, dimensions, summed, encode) {
  return mergerOption(DefaultPieSerial(index, labelFormatter, dimensions, summed, encode), { center: ['88%', '50%'] })
}

function mergerOption(defaultOption, clientOption) {
  const defaultOptionClone = _cloneDeep(defaultOption)
  return _merge(defaultOptionClone, clientOption)
}

export {
  AttachedPieSerial,
  defaultBarSerial,
  defaultBarStackedSerial,
  defaultDataZoom,
  defaultEchartOption,
  defaultLegend,
  defaultLineSerial,
  defaultScatterSerial,
  defaultSeriesColor,
  defaultToolbox,
  defaultTooltip,
  defaultXAxisTime,
  defaultYAxisUSD,
  echarts,
  mergerOption
}
