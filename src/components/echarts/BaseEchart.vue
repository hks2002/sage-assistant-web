<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-08-25 09:31:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-02-18 14:48:51
* @FilePath              : sage-assistant-web/src/components/echarts/BaseEchart.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-card class="q-pa-none">
    <div :id="props.eChartId" style="width: 100%; height: 100%"></div>
    <q-resize-observer @resize="onResize" />
    <q-inner-loading :showing="props.showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-card>
</template>

<script setup>
import { echarts } from '@/assets/echartsCfg'
import { cloneDeep } from 'lodash-es'
import { Screen, uid } from 'quasar'
import { onBeforeUnmount, onMounted, watch } from 'vue'

const props = defineProps({
  eChartOption: { type: Object, require: true },
  showLoading: { type: Boolean, require: false, default: false },
  eChartId: { type: String, require: false, default: () => uid() }
})

// echart vars
let eChartInstance = null

let oldHeight = '400px'
let oldClass = 'col-12'
let isMaximized = false

const doUpdate = () => {
  if (!eChartInstance) return

  if (props.eChartOption?.toolbox?.feature?.myMaximize || props.eChartOption?.toolbox?.feature?.myRestore) {
    // for maximize
    props.eChartOption.toolbox.feature.myMaximize.onclick = () => {
      if (Screen.gt.lg) {
        document.getElementById(props.eChartId).parentElement.style.height = '1080px'
      } else if (Screen.gt.md) {
        document.getElementById(props.eChartId).parentElement.style.height = '900px'
      } else if (Screen.gt.sm) {
        document.getElementById(props.eChartId).parentElement.style.height = '800px'
      } else if (Screen.gt.xs) {
        document.getElementById(props.eChartId).parentElement.style.height = '600px'
      } else {
        document.getElementById(props.eChartId).parentElement.style.height = '400px'
      }
      document.getElementById(props.eChartId).parentElement.parentElement.classList.add('col-12')
      isMaximized = true
    }

    // for restore
    props.eChartOption.toolbox.feature.myRestore.onclick = () => {
      document.getElementById(props.eChartId).parentElement.style.height = oldHeight
      document.getElementById(props.eChartId).parentElement.parentElement.className = oldClass
      isMaximized = false
    }
  }

  if (isMaximized) {
    let eChartOptionCopy = cloneDeep(props.eChartOption)

    // title
    eChartOptionCopy.title = {
      ...eChartOptionCopy.title,
      textStyle: { ...eChartOptionCopy.title?.textStyle, fontSize: 20 },
      subtextStyle: { ...eChartOptionCopy.title?.subtextStyle, fontSize: 18 }
    }
    // series label
    eChartOptionCopy.series?.forEach((item, index) => {
      eChartOptionCopy.series[index] = {
        ...item,
        label: { ...item.label, show: eChartOptionCopy.series?.length > 5 ? false : true, fontSize: 18 }
      }
    })

    // grid
    if (eChartOptionCopy.grid?.constructor === Array) {
      const gridSize = eChartOptionCopy.grid?.length
      eChartOptionCopy.grid?.forEach((item, index) => {
        if (index === 0) {
          eChartOptionCopy.grid[index] = {
            ...item,
            top: '5%',
            left: '8%',
            right: '5%'
          }
        } else if (index === gridSize - 1) {
          eChartOptionCopy.grid[index] = {
            ...item,
            left: '8%',
            right: '5%',
            bottom: '5%'
          }
        } else {
          eChartOptionCopy.grid[index] = {
            ...item,
            left: '8%',
            right: '5%'
          }
        }
      })
    }
    if (eChartOptionCopy.grid?.constructor === Object) {
      eChartOptionCopy.grid = {
        ...eChartOptionCopy.grid,
        left: '8%',
        right: '5%',
        top: '5%',
        bottom: '5%'
      }
    }

    // xAxis label
    if (eChartOptionCopy.xAxis?.constructor === Array) {
      eChartOptionCopy.xAxis?.forEach((item, index) => {
        eChartOptionCopy.xAxis[index] = {
          ...item,
          axisLabel: { ...item.axisLabel, fontSize: 18 }
        }
      })
    }
    if (eChartOptionCopy.xAxis?.constructor === Object) {
      eChartOptionCopy.xAxis = {
        ...eChartOptionCopy.xAxis,
        axisLabel: { ...eChartOptionCopy.xAxis.axisLabel, fontSize: 18 }
      }
    }

    // yAxis label
    if (eChartOptionCopy.yAxis?.constructor === Array) {
      eChartOptionCopy.yAxis?.forEach((item, index) => {
        eChartOptionCopy.yAxis[index] = {
          ...item,
          axisLabel: { ...item.axisLabel, fontSize: 18 },
          nameTextStyle: { ...item.nameTextStyle, fontSize: 18 }
        }
      })
    }
    if (eChartOptionCopy.yAxis?.constructor === Object) {
      eChartOptionCopy.yAxis = {
        ...eChartOptionCopy.yAxis,
        axisLabel: { ...eChartOptionCopy.yAxis.axisLabel, fontSize: 18 },
        nameTextStyle: { ...eChartOptionCopy.yAxis.nameTextStyle, fontSize: 18 }
      }
    }

    eChartInstance.setOption(eChartOptionCopy, true)
  } else {
    // hide subtitle
    eChartInstance.setOption({ ...props.eChartOption, title: { ...props.eChartOption.title, subtext: null } }, true)
  }
}

const onResize = () => {
  if (!eChartInstance) return
  eChartInstance.resize()
  doUpdate()
}

onMounted(() => {
  oldHeight = document.getElementById(props.eChartId).parentElement.style?.height || '400px'
  oldClass = document.getElementById(props.eChartId).parentElement.parentElement.className || 'col-12'

  eChartInstance = echarts.init(document.getElementById(props.eChartId), null, {
    // height: 'auto',
    // width: 'auto',
    renderer: 'svg'
  })
})

onBeforeUnmount(() => {
  if (!eChartInstance) return

  // call dispose to avoid display blank when DOM removed
  eChartInstance.dispose()
})

// watch props.eChartOption only
watch(
  () => props.eChartOption,
  () => {
    doUpdate()
  }
)
</script>
