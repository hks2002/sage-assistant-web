<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 02:56:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-19 13:39:56
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <ExceptionLottie :ErrorCode="403" v-if="!isAuthorized('CONSSAR')" />
  <q-list class="row q-gutter-sm q-pt-sm q-px-sm" v-if="isAuthorized('CONSSAR')">
    <q-input
      dense
      clearable
      outlined
      hide-hint
      hide-bottom-space
      debounce="1000"
      class="col-grow"
      :label="$t('S.FILTER_PN')"
      :hint="$t('S.FILTER_PN_HINT')"
      input-class="text-uppercase"
      v-model="PNfilter"
    >
    </q-input>
  </q-list>
  <q-list class="row q-gutter-sm q-pt-sm q-px-sm" v-if="isAuthorized('CONSSAR')">
    <QMarkupTableStockSummaryVue :PNfilter="PNfilter" :style="{ height: tableHeight + 'px' }" />
  </q-list>
</template>

<script setup>
import { isAuthorized } from '@/assets/auth'
import ExceptionLottie from '@/components/lottie/ExceptionLottie.vue'
import QMarkupTableStockSummaryVue from '@/components/stock/QMarkupTableStockSummary'
import { useQuasar } from 'quasar'
import { computed, ref } from 'vue'

/* eslint-disable */
const props = defineProps({
  pageHeight: { type: Number, default: 0 /* not passing  */ }
})

// common vars
const $q = useQuasar()

// page vars
const PNfilter = ref('')

// computed vars
const tableHeight = computed(() => {
  // should consider element margin/padding value
  return props.pageHeight - 36 - 36
})
</script>
<style lang="sass" scoped></style>
