/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-01-24 09:24:38                               *
 * @FilePath              : sage-assistant-web/src/assets/echartsCfg.js       *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

const echarts = require('echarts/lib/echarts')
import { BarChart, LineChart, PieChart, SankeyChart, ScatterChart } from 'echarts/charts'
import {
  DataZoomComponent,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent
} from 'echarts/components'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'

import { Dialog, date } from 'quasar'

import { jsonToExcel, jsonToMultiLine, jsonToTable } from '@/assets/dataUtils.js'

echarts.use([
  SVGRenderer,
  CanvasRenderer,
  GridComponent,
  ToolboxComponent,
  DataZoomComponent,
  GraphicComponent,
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
const defaultColor = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
  '#40a9ff',
  '#73c0de',
  '#f759ab',
  '#ee6666',
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

const defaultTitle = (title, subtitle) => {
  return {
    text: title,
    textStyle: {
      fontSize: 12
    },
    subtext: subtitle,
    subtextStyle: {
      fontSize: 12
    },
    left: 'center',
    top: 'top'
  }
}

const defaultLegend = { left: 10, top: 20, itemGap: 5, itemWidth: 14, itemHeight: 14 }

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

const multiLineFormatter = (params) => jsonToMultiLine(params.data)

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
const defaultYAxisPercent = {
  type: 'value',
  min: 0,
  max: 100,
  nameLocation: 'start',
  axisLabel: {
    formatter: '{value} %'
  }
}

const defaultYAxis = (axisLabel) => {
  return {
    min: 0,
    max: (value) => {
      if (isNaN(value.max)) {
        return 1000
      } else {
        return null
      }
    },
    minInterval: 100,
    axisLabel: {
      formatter: `{value}\n${axisLabel}`
    }
  }
}

const defaultYAxis2 = (gridIndex, axisLabel) => {
  return {
    gridIndex: gridIndex,
    ...defaultYAxis(axisLabel)
  }
}

const defaultDataZoom = (axises, xStartValue, yStartValue) => {
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

const defaultToolbox = (title, data, headers) => {
  return {
    itemGap: 4,
    orient: 'vertical',
    feature: {
      //  use myDataView instead.
      // dataView: {
      //  title: 'xx',
      //  optionToContent: () => jsonToTable(headers, data, title)
      // },
      myDataView: {
        show: true,
        title: 'Data',
        icon: 'path://M17.5,17.3H33 M17.5,17.3H33 M45.4,29.5h-28 M11.5,2v56H51V14.8L38.4,2H11.5z M38.4,2.2v12.7H51 M45.4,41.7h-28',
        onclick: () => {
          Dialog.create({
            message: jsonToTable(title, data, headers),
            html: true,
            fullWidth: true,
            fullHeight: true,
            ok: {
              icon: 'fas fa-sign-out-alt',
              color: 'primary'
            }
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
      myDownload: {
        show: true,
        title: 'Download',
        icon: 'path://M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0M4.7,35.9L29.3,45.5L54.7,35.4',
        onclick: () => {
          const timeStamp = Date.now()
          const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD')
          jsonToExcel(title, formattedString, data, headers)
        }
      }
    }
  }
}

const defaultToolboxWithZoom = (title, data, headers) => {
  return {
    itemGap: 4,
    orient: 'vertical',
    feature: {
      myMaximize: {
        show: true,
        title: 'Maximize',
        icon: 'M 0 0 L 10 0 L 10 10 L 0 10 L 0 0 M 0 0',
        onclick: () => {} // let it empty here, will be modified later
      },
      myRestore: {
        show: true,
        title: 'Restore',
        icon: 'M 0 0 L 10 0 L 10 10 L 0 10 L 0 0 M 2 -2 L 12 -2 L 12 8',
        onclick: () => {} // let it empty here, will be modified later
      },
      ...defaultToolbox(title, data, headers).feature
    }
  }
}

const genMonthSerial = (startTxt, endTxt, includeFuture = false) => {
  const startDate = date.extractDate(startTxt, 'YYYY-MM-DD')
  let endDate = date.extractDate(endTxt, 'YYYY-MM-DD')
  let tmpDate = startDate
  let months = []

  while (tmpDate < endDate) {
    const fmtString = date.formatDate(tmpDate, 'YYYY-MM')
    tmpDate = date.addToDate(tmpDate, { months: 1 })
    months.push(fmtString)
  }
  return months
}

const genYearSerial = (startTxt, endTxt, includeFuture = false) => {
  const startDate = date.extractDate(startTxt, 'YYYY-MM-DD')
  let endDate = date.extractDate(endTxt, 'YYYY-MM-DD')
  let tmpDate = startDate
  let years = []

  while (tmpDate < endDate) {
    const fmtString = date.formatDate(tmpDate, 'YYYY')
    tmpDate = date.addToDate(tmpDate, { years: 1 })
    years.push(fmtString)
  }
  return years
}

const isFuture = (dateTxt, type) => {
  const now = Date.now()
  if (type === 'Month') {
    return date.extractDate(dateTxt, 'YYYY-MM') > now
  } else {
    return date.extractDate(dateTxt, 'YYYY') > now
  }
}

const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B'
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  } else {
    return num.toFixed(1).toString()
  }
}

export {
  defaultColor,
  defaultDataZoom,
  defaultLegend,
  defaultTitle,
  defaultToolbox,
  defaultToolboxWithZoom,
  defaultTooltip,
  defaultXAxisTime,
  defaultYAxis,
  defaultYAxis2,
  defaultYAxisPercent,
  echarts,
  formatNumber,
  genMonthSerial,
  genYearSerial,
  isFuture,
  multiLineFormatter
}
