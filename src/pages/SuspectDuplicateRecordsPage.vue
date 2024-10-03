<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 23:07:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-22 09:41:18
* @FilePath              : sage-assistant-web/src/pages/SuspectDuplicateRecordsPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page :style-fn="$pageStore.setPageHeightStyle">
    <div class="row q-gutter-sm q-pa-sm">
      <q-input
        v-model="dateFrom"
        dense
        outlined
        debounce="1000"
        mask="date"
        type="date"
        :label="$t('S.FROM')"
        class="col-3"
      />
    </div>
    <q-list class="row q-gutter-sm q-pa-sm" :style="$pageStore.setDomHeightStyle(56)">
      <q-markup-table-duplicated-p-o-vue class="col-5" :dateFrom="dateFrom" :site="site" />
      <q-markup-table-duplicated-r-a-vue class="col" :dateFrom="dateFrom" :site="site" />
    </q-list>
  </q-page>
</template>

<script setup>
import QMarkupTableDuplicatedPOVue from '@/components/suspectDuplicateRecords/QMarkupTableDuplicatedPO.vue'
import QMarkupTableDuplicatedRAVue from '@/components/suspectDuplicateRecords/QMarkupTableDuplicatedRA.vue'
import { storeToRefs } from 'pinia'
import { date } from 'quasar'
import { ref } from 'vue'

import { usePageStore } from '@/stores/PageStore'
const $pageStore = usePageStore()
// computed vars

// page vars
const { site } = storeToRefs($pageStore)

// page vars
const { formatDate, addToDate } = date
const nowTimeStamp = Date.now()
const fromTimeStamp = addToDate(nowTimeStamp, { years: -3 })
const dateFrom = ref(formatDate(fromTimeStamp, 'YYYY-MM-DD'))
</script>
