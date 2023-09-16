<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-17 23:07:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-28 17:08:25
* @FilePath              : sage-assistant-web/src/pages/InvoicePayPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page>
    <WaitInputLottieVue v-if="!customerCode && isAuthorized('GESSIH')" />
    <ExceptionLottieVue :ErrorCode="403" v-if="!isAuthorized('GESSIH')" />

    <div class="row q-gutter-sm q-px-sm q-pt-sm" v-if="isAuthorized('GESSIH')">
      <QSelectAxios
        option-label="customerName"
        option-value="customerCode"
        data-url="/Data/CustomerHelper"
        :label="$t('S.SEARCH_CUSTOMER')"
        input-style="font-weight:bolder;font-size:25px;text-transform:uppercase"
        popup-content-style="font-weight:bold;font-size:25px"
        popup-content-class="text-secondary"
        class="col-grow"
        @input-value="checkInputAll"
        @update:model-value="searchCustomer"
      />
      <q-toggle v-model="proSearch" :label="$t('S.PRO_SEARCH')" class="col-1" />
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
      <q-input
        v-model="dateTo"
        dense
        outlined
        debounce="1000"
        mask="date"
        type="date"
        :label="$t('W.TO')"
        class="col-3"
      />
    </div>
    <q-list class="q-pa-sm" v-if="customerCode">
      <q-markup-table-invoice-pay-vue
        :customerCode="customerCode"
        :dateFrom="dateFrom"
        :dateTo="dateTo"
        :site="site"
        :proSearch="proSearch"
      />
    </q-list>
  </q-page>
</template>

<script setup>
import { isAuthorized } from '@/assets/auth'
import { getCookies } from '@/assets/storage'
import QMarkupTableInvoicePayVue from '@/components/Financial/QMarkupTableInvoicePay.vue'
import ExceptionLottieVue from '@/components/lottie/ExceptionLottie.vue'
import WaitInputLottieVue from '@/components/lottie/WaitInputLottie.vue'
import QSelectAxios from '@/controls/QSelectAxios.vue'
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
const customerCode = ref(null)
const proSearch = ref(false)
const { formatDate, addToDate } = date
const nowTimeStamp = Date.now()
const fromTimeStamp = addToDate(nowTimeStamp, { years: -3 })
const dateFrom = ref(formatDate(fromTimeStamp, 'YYYY-MM-DD'))
const dateTo = ref(formatDate(nowTimeStamp, 'YYYY-MM-DD'))

// check if searchAll
const checkInputAll = (inputText) => {
  if (inputText === '%%') {
    customerCode.value = '%%'
  }
}

const searchCustomer = (Code) => {
  customerCode.value = Code
}

// events
ebus.on('changeSite', () => {
  site.value = getCookies('site')
})
onBeforeUnmount(() => {
  ebus.off('changeSite')
})
</script>
