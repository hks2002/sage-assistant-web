<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-08-25 09:31:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-27 22:21:33
* @FilePath              : sage-assistant-web/src/components/echarts/BaseEchart.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <div :id="eChartId" style="height: 100%; width: 100%" />
  <q-resize-observer @resize="onResize" />
</template>

<script setup>
import { echarts } from '@/assets/echartsCfg.js'
import { uid } from 'quasar'
import { onActivated, onBeforeUnmount, onMounted, watch } from 'vue'

const props = defineProps({
  eChartOption: { type: Object, require: true }
})

// echart vars
let eChart = null

const eChartId = uid()

function onResize() {
  if (eChart) {
    eChart.resize()
  }
}
function doUpdate() {
  eChart.setOption(props.eChartOption, true)
}

onMounted(() => {
  eChart = echarts.init(document.getElementById(eChartId))
  doUpdate()
})

onBeforeUnmount(() => {
  // call dispose to avoid display blank when DOM removed
  eChart.dispose()
})

onActivated(() => {
  eChart.resize()
})

watch(props, () => {
  doUpdate()
})
</script>
