<template>
  <q-page>
    <q-tabs
      v-model="tab"
      dense
      align="left"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      narrow-indicator
    >
      <q-tab name="Tracking" :label="$t('Tracking')" />
      <q-tab name="Delivery" :label="$t('Delivery')" />
      <q-tab name="Receive" :label="$t('Receive')" />
      <q-tab name="New-Order" :label="$t('New-Order')" />
      <q-tab name="Short-Bom" :label="$t('Short-Bom')" />
      <q-tab name="Orphan-WO" :label="$t('Orphan-WO')" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated keep-alive :style="tabPanelHeight">
      <q-tab-panel name="Tracking" class="q-pa-none">
        <OpenSaleItems
          :site="site"
          :style="tabPanelMinHeight"
          v-if="isAuthorized('GESPOH') || isAuthorized('GESSOH')"
        />
        <ExceptionLottie :ErrorCode="403" v-else />
      </q-tab-panel>
      <q-tab-panel name="Delivery" class="q-pa-none">
        <echart-todo-delivery
          :site="site"
          :style="tabPanelHeight"
          v-if="isAuthorized('GESPOH') || isAuthorized('GESSOH')"
        />
        <ExceptionLottie :ErrorCode="403" v-else />
      </q-tab-panel>

      <q-tab-panel name="Receive" class="q-pa-none">
        <echart-todo-receive
          :site="site"
          :style="tabPanelHeight"
          v-if="isAuthorized('GESPOH') || isAuthorized('GESSOH')"
        />
        <ExceptionLottie :ErrorCode="403" v-else />
      </q-tab-panel>

      <q-tab-panel name="New-Order" class="q-pa-none">
        <echart-todo-deal-with-order-line
          :site="site"
          :style="tabPanelHeight"
          v-if="isAuthorized('GESPOH') || isAuthorized('GESSOH')"
        />
        <ExceptionLottie :ErrorCode="403" v-else />
      </q-tab-panel>
      <q-tab-panel name="Short-Bom" class="q-pa-none">
        <echart-todo-purchase-bom
          :site="site"
          :style="tabPanelHeight"
          v-if="isAuthorized('GESPOH') || isAuthorized('GESSOH')"
        />
        <ExceptionLottie :ErrorCode="403" v-else />
      </q-tab-panel>
      <q-tab-panel name="Orphan-WO" class="q-pa-none">
        <echart-todo-closed-w-o :site="site" :style="tabPanelHeight" v-if="isAuthorized('GESMFG')" />
        <ExceptionLottie :ErrorCode="403" v-else />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { isAuthorized } from '@/assets/auth'
import { ebus } from '@/assets/ebus'
import EchartTodoClosedWO from '@/components/echarts/EchartTodoClosedWO.vue'
import EchartTodoDealWithOrderLine from '@/components/echarts/EchartTodoDealWithOrderLine.vue'
import EchartTodoDelivery from '@/components/echarts/EchartTodoDelivery.vue'
import EchartTodoPurchaseBom from '@/components/echarts/EchartTodoPurchaseBom.vue'
import EchartTodoReceive from '@/components/echarts/EchartTodoReceive.vue'
import ExceptionLottie from '@/components/lottie/ExceptionLottie.vue'
import OpenSaleItems from '@/components/todo/OpenSaleItems.vue'
import { LocalStorage } from 'quasar'
import { computed, onBeforeUnmount, ref } from 'vue'

/* eslint-disable */
const props = defineProps({
  pageHeight: { type: Number, default: 0 /* not passing  */ },
  tabHeaderHeight: { type: Number, default: 36 /* dense */ }
})

// page vars
const tab = ref('Tracking')
const site = ref(LocalStorage.getItem('site'))

// computed vars
const tabPanelHeight = computed(() => {
  /** for q-tab-panels */
  return props.pageHeight > 0 ? { height: props.pageHeight - props.tabHeaderHeight + 'px' } : null
})
const tabPanelMinHeight = computed(() => {
  /** for element in q-tab-panel, it's not fixed height */
  return props.pageHeight > 0 ? { minHeight: props.pageHeight - props.tabHeaderHeight + 'px' } : null
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
