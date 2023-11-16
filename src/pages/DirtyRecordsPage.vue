<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 23:07:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-16 13:22:49
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page>
    <div class="row q-gutter-sm q-px-sm q-pt-sm">
      <q-input
        v-model="dateFrom"
        dense
        outlined
        debounce="1000"
        mask="date"
        type="date"
        :label="$t('W.FROM')"
        class="col-3"
      />
      <q-toggle dense v-model="onlyForSales" :label="$t('S.ONLY_FOR_SALES')" />
    </div>
    <q-list class="row q-gutter-sm q-pt-sm q-pa-sm">
      <q-markup-table-duplicated-p-o-vue class="col-5" :dateFrom="dateFrom" :site="site" :onlyForSales="onlyForSales" />
      <q-markup-table-duplicated-r-a-vue class="col" :dateFrom="dateFrom" :site="site" :onlyForSales="onlyForSales" />
    </q-list>
  </q-page>
</template>

<script setup>
import QMarkupTableDuplicatedPOVue from '@/components/dirtyData/QMarkupTableDuplicatedPO.vue'
import QMarkupTableDuplicatedRAVue from '@/components/dirtyData/QMarkupTableDuplicatedRA.vue'
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

const onlyForSales = ref(false)

// events
ebus.on('changeSite', (newSite) => {
  site.value = newSite
})
onBeforeUnmount(() => {
  ebus.off('changeSite')
})
</script>
