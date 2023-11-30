<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-11-15 23:10:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-30 12:52:23
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <div class="row q-gutter-sm q-px-sm q-pt-sm">
    {{ $t('S.SEARCH_SALES_ORDER_LINE') }}
    <q-input
      dense
      outlined
      debounce="1000"
      mask="date"
      type="date"
      class="col-3"
      :label="$t('S.FROM')"
      v-model="dateFrom"
    />
    <q-input
      dense
      outlined
      debounce="1000"
      mask="date"
      type="date"
      class="col-3"
      :label="$t('S.TO')"
      v-model="dateTo"
    />
  </div>
</template>

<script setup>
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
const fromTimeStamp = addToDate(nowTimeStamp, { years: -1 })
const dateFrom = ref(formatDate(fromTimeStamp, 'YYYY-MM-DD'))
const dateTo = ref(formatDate(nowTimeStamp, 'YYYY-MM-DD'))

// events
ebus.on('changeSite', (newSite) => {
  site.value = newSite
})

onBeforeUnmount(() => {
  ebus.off('changeSite')
})
</script>
