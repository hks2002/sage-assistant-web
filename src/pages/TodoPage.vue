<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 23:09:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-30 11:06:10
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-tabs
    v-model="tab"
    dense
    align="left"
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    narrow-indicator
  >
    <q-tab name="Tracking" :label="$t('S.TRACKING')" />
    <q-tab name="Delivery" :label="$t('S.DELIVERY')" />
    <q-tab name="Receive" :label="$t('S.RECEIVE')" />
    <q-tab name="New-Order" :label="$t('S.NEW_ORDER')" />
    <q-tab name="Short-Bom" :label="$t('S.SHORT_BOM')" />
    <q-tab name="Orphan-WO" :label="$t('S.ORPHAN_WO')" />
  </q-tabs>

  <q-separator />

  <q-tab-panels v-model="tab" animated keep-alive>
    <q-tab-panel name="Tracking" class="q-pa-none">
      <OpenSaleItems
        :site="site"
        :style="{ height: tabPanelHeight + 'px' }"
        v-if="isAuthorized('GESPOH') || isAuthorized('GESSOH')"
      />
      <ExceptionLottie :ErrorCode="403" v-else />
    </q-tab-panel>
    <q-tab-panel name="Delivery" class="q-pa-none">
      <echart-todo-delivery
        :site="site"
        :style="{ height: tabPanelHeight + 'px' }"
        v-if="isAuthorized('GESPOH') || isAuthorized('GESSOH')"
      />
      <ExceptionLottie :ErrorCode="403" v-else />
    </q-tab-panel>

    <q-tab-panel name="Receive" class="q-pa-none">
      <echart-todo-receive
        :site="site"
        :style="{ height: tabPanelHeight + 'px' }"
        v-if="isAuthorized('GESPOH') || isAuthorized('GESSOH')"
      />
      <ExceptionLottie :ErrorCode="403" v-else />
    </q-tab-panel>

    <q-tab-panel name="New-Order" class="q-pa-none">
      <echart-todo-deal-with-order-line
        :site="site"
        :style="{ height: tabPanelHeight + 'px' }"
        v-if="isAuthorized('GESPOH') || isAuthorized('GESSOH')"
      />
      <ExceptionLottie :ErrorCode="403" v-else />
    </q-tab-panel>
    <q-tab-panel name="Short-Bom" class="q-pa-none">
      <echart-todo-purchase-bom
        :site="site"
        :style="{ height: tabPanelHeight + 'px' }"
        v-if="isAuthorized('GESPOH') || isAuthorized('GESSOH')"
      />
      <ExceptionLottie :ErrorCode="403" v-else />
    </q-tab-panel>
    <q-tab-panel name="Orphan-WO" class="q-pa-none">
      <echart-todo-closed-w-o :site="site" :style="{ height: tabPanelHeight + 'px' }" v-if="isAuthorized('GESMFG')" />
      <ExceptionLottie :ErrorCode="403" v-else />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup>
import { isAuthorized } from '@/assets/auth'
import EchartTodoClosedWO from '@/components/echarts/EchartTodoClosedWO.vue'
import EchartTodoDealWithOrderLine from '@/components/echarts/EchartTodoDealWithOrderLine.vue'
import EchartTodoDelivery from '@/components/echarts/EchartTodoDelivery.vue'
import EchartTodoPurchaseBom from '@/components/echarts/EchartTodoPurchaseBom.vue'
import EchartTodoReceive from '@/components/echarts/EchartTodoReceive.vue'
import ExceptionLottie from '@/components/lottie/ExceptionLottie.vue'
import OpenSaleItems from '@/components/todo/OpenSaleItems.vue'
import { LocalStorage } from 'quasar'
import { computed, inject, onBeforeUnmount, ref } from 'vue'

/* eslint-disable */
const props = defineProps({
  tabHeaderHeight: { type: Number, default: 36 /* dense */ }
})

// page vars
const ebus = inject('ebus')
const tab = ref('Tracking')
const site = ref(LocalStorage.getItem('site'))
// provide by TabPages
const bodyHeight = inject('bodyHeight')

// computed vars
const tabPanelHeight = computed(() => {
  /** for q-tab-panels */
  return bodyHeight.value > 0 ? bodyHeight.value - props.tabHeaderHeight - 10 : 500
})

// events
ebus.on('changeSite', (newSite) => {
  site.value = newSite
})

onBeforeUnmount(() => {
  ebus.off('changeSite')
})
</script>
<style lang="scss" scoped></style>
