<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 02:56:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-22 11:01:26
* @FilePath              : sage-assistant-web/src/pages/StockSummaryPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page :style-fn="$pageStore.setPageHeightStyle">
    <div class="row q-gutter-sm q-px-sm">
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
    </div>
    <div class="row q-col-gutter-sm q-pa-sm" :style="$pageStore.setDomHeightStyle(56)">
      <div class="col-12">
        <QMarkupTableStockSummaryVue :PNfilter="PNfilter" :site="site" :style="$pageStore.setDomHeightStyle(80)" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import QMarkupTableStockSummaryVue from '@/components/stock/QMarkupTableStockSummary'
import { usePageStore } from '@/stores/PageStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// common vars
const $pageStore = usePageStore()

// page vars
const PNfilter = ref('')
const { site } = storeToRefs($pageStore)
</script>
<style lang="sass" scoped></style>
