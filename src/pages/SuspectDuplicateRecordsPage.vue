<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 23:07:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-07-19 01:21:42
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <div class="row q-gutter-sm q-px-sm q-pt-sm">
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
  <q-list class="row q-gutter-sm q-pt-sm q-pa-sm">
    <q-markup-table-duplicated-p-o-vue class="col-5" :dateFrom="dateFrom" :site="site" />
    <q-markup-table-duplicated-r-a-vue class="col" :dateFrom="dateFrom" :site="site" />
  </q-list>
</template>

<script setup>
import QMarkupTableDuplicatedPOVue from '@/components/suspectDuplicateRecords/QMarkupTableDuplicatedPO.vue'
import QMarkupTableDuplicatedRAVue from '@/components/suspectDuplicateRecords/QMarkupTableDuplicatedRA.vue'
import { date, LocalStorage } from 'quasar'
import { inject, onBeforeUnmount, ref } from 'vue'
/* eslint-disable */
const props = defineProps({
  pageHeight: { type: Number, default: 0 /* not passing  */ }
})

// common vars
const ebus = inject('ebus')
const site = ref(LocalStorage.getItem('site'))

// page vars
const { formatDate, addToDate } = date
const nowTimeStamp = Date.now()
const fromTimeStamp = addToDate(nowTimeStamp, { years: -3 })
const dateFrom = ref(formatDate(fromTimeStamp, 'YYYY-MM-DD'))

// events
ebus.on('changeSite', (newSite) => {
  site.value = newSite
})
onBeforeUnmount(() => {
  ebus.off('changeSite')
})
</script>
