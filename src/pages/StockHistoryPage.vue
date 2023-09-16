<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 02:58:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-06-23 02:59:58
* @FilePath              : src/pages/StockHistoryPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page>
    <ExceptionLottie :ErrorCode="403" v-if="!isAuthorized('CONSSAR')" />
    <q-list class="row q-gutter-sm q-pt-sm q-px-sm" v-if="isAuthorized('CONSSAR')">
      <q-input
        dense
        clearable
        outlined
        hide-hint
        hide-bottom-space
        debounce="1000"
        class="col"
        input-class="text-uppercase"
        hint="MS 856A NUT SCREW"
        :label="$t('S.FILTER_PN_OR_NAME')"
        v-model="PnOrName"
        @update:model-value="doUpdate"
      >
      </q-input>
      <q-input
        dense
        outlined
        hide-bottom-space
        debounce="1000"
        mask="date"
        type="date"
        class="col-3"
        :label="$t('W.FROM')"
        v-model="dateFrom"
        @update:model-value="doUpdate"
      />
      <q-input
        dense
        outlined
        hide-bottom-space
        debounce="1000"
        mask="date"
        type="date"
        class="col-3"
        :label="$t('W.TO')"
        v-model="dateTo"
        @update:model-value="doUpdate"
      />
    </q-list>
    <q-list class="row q-gutter-sm q-pa-sm" v-if="isAuthorized('CONSSAR')">
      <QMarkupTableStockHistoryVue
        :PnOrName="PnOrName"
        :dateFrom="dateFrom"
        :dateTo="dateTo"
        :style="{ height: tableHeight + 'px' }"
      />
    </q-list>
  </q-page>
</template>

<script setup>
import { isAuthorized } from '@/assets/auth'
import ExceptionLottie from '@/components/lottie/ExceptionLottie.vue'
import QMarkupTableStockHistoryVue from '@/components/stock/QMarkupTableStockHistory'
import { date, useQuasar } from 'quasar'
import { computed, ref } from 'vue'

/* eslint-disable */
const props = defineProps({
  pageHeight: { type: Number, default: 0 /* not passing  */ }
})

// common vars
const $q = useQuasar()

// page vars
const PnOrName = ref('')
const { formatDate, addToDate } = date
const nowTimeStamp = Date.now()
const fromTimeStamp = addToDate(nowTimeStamp, { months: -1 })
const dateFrom = ref(formatDate(fromTimeStamp, 'YYYY-MM-DD'))
const dateTo = ref(formatDate(nowTimeStamp, 'YYYY-MM-DD'))

// computed vars
const tableHeight = computed(() => {
  // should consider element margin/padding value
  return props.pageHeight - 36 - 36
})

// actions
const doUpdate = () => {
  // it doesn't need actually.
}
</script>
<style lang="scss" scoped></style>
