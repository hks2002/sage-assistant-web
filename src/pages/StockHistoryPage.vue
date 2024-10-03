<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 02:58:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-22 10:59:36
* @FilePath              : sage-assistant-web/src/pages/StockHistoryPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page :style-fn="$pageStore.setPageHeightStyle">
    <div class="row q-gutter-sm q-pa-sm">
      <q-input
        dense
        clearable
        outlined
        hide-hint
        hide-bottom-space
        debounce="1000"
        class="col-3"
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
        class="col-1"
        :label="$t('S.FROM')"
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
        class="col-1"
        :label="$t('S.TO')"
        v-model="dateTo"
        @update:model-value="doUpdate"
      />
    </div>
    <div class="row q-col-gutter-sm q-pa-sm" :style="$pageStore.setDomHeightStyle(56)">
      <div class="col-12">
        <QMarkupTableStockHistoryVue
          :site="site"
          :PnOrName="PnOrName"
          :dateFrom="dateFrom"
          :dateTo="dateTo"
          :style="$pageStore.setDomHeightStyle(80)"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import QMarkupTableStockHistoryVue from '@/components/stock/QMarkupTableStockHistory'
import { storeToRefs } from 'pinia'
import { date } from 'quasar'
import { ref } from 'vue'

import { usePageStore } from '@/stores/PageStore'
const $pageStore = usePageStore()

// computed vars

// page vars
const { site } = storeToRefs($pageStore)
const PnOrName = ref('')
const { formatDate, addToDate } = date
const nowTimeStamp = Date.now()
const fromTimeStamp = addToDate(nowTimeStamp, { months: -1 })
const dateFrom = ref(formatDate(fromTimeStamp, 'YYYY-MM-DD'))
const dateTo = ref(formatDate(nowTimeStamp, 'YYYY-MM-DD'))

// actions
const doUpdate = () => {
  // it doesn't need actually.
}
</script>
<style lang="scss" scoped></style>
