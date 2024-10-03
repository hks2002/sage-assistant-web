<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 23:52:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-24 13:39:31
* @FilePath              : sage-assistant-web/src/components/Financial/QTableInvoicePay.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <!-- set height and width in parent -->
  <q-table
    dense
    class="sticky-header-column--dense"
    table-header-class="text-white"
    :rows="rows"
    :columns="columns"
    :rows-per-page-options="[100, 200, 500, 1000, 0]"
    :loading="showLoading"
  >
    <template v-slot:top>
      <div class="col-12 text-h6 text-center">{{ title }}</div>
      <div class="col-12 q-gutter-sm row">
        <q-btn dense flat icon="fas fa-download" color="primary" @click="download()" :label="t('S.DOWNLOAD')" />
        <q-select
          dense
          outlined
          debounce="1000"
          :options="['NEW', 'DUE', 'PAY']"
          class="col-1"
          :label="$t('S.SEARCH_DATE_TYPE')"
          v-model="dateType"
        />
        <q-select
          dense
          outlined
          debounce="1000"
          :options="['PU-Paid', 'P-Paid', 'U-Paid', 'Paid', 'ALL']"
          class="col-1"
          :label="$t('F.Status')"
          v-model="payStatus"
        />
      </div>
    </template>
    <template v-slot:body-cell-status="{ row }">
      <td :class="['text-center', row.status === 'U-Paid' ? 'unpaid' : row.status === 'P-Paid' ? 'ppaid' : '']">
        {{ row.status }}
      </td>
    </template>
    <template v-slot:loading>
      <q-inner-loading showing>
        <q-spinner-ios size="50px" color="primary" />
      </q-inner-loading>
    </template>
  </q-table>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { jsonToExcel } from 'assets/dataUtils'
import { date, uid } from 'quasar'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  customerCode: String,
  dateFrom: String,
  dateTo: String,
  site: String
})

// common vars
const showLoading = ref(false)
const { t } = useI18n()

// components vars
let dateType = ref('DUE')
let payStatus = ref('PU-Paid')
let columns = ref([])
let rows = ref([])
let fieldNames = ref([])

const loadColumns = () => {
  delete require.cache[require.resolve('@/components/Financial/QTableInvoicePayColumns.js')]

  Promise.resolve(require('@/components/Financial/QTableInvoicePayColumns.js').default).then((cols) => {
    // add low case name
    cols.forEach((item, idx, array) => {
      array[idx].name = item.field.toLowerCase()
      array[idx].sortable = true

      fieldNames.value.push(item.field)
    })
    columns.value = cols
  })
}

const title = ref('')
const setTitle = () => {
  title.value = t('S.INVOICE PAY OF CUSTOMER {customerCode} FROM {dateType} {dateFrom} TO {dateTo} {payStatus}', {
    customerCode: props.customerCode,
    dateType: dateType.value,
    payStatus: payStatus.value,
    dateFrom: props.dateFrom,
    dateTo: props.dateTo
  })
}

// actions
const doUpdate = () => {
  if (!props.customerCode) return
  showLoading.value = true

  axiosGet('/Data/FinancialInvoicePay', {
    Site: props.site,
    CustomerCode: props.customerCode,
    DateFrom: props.dateFrom,
    DateTo: props.dateTo,
    DateType: dateType.value,
    PayStatus: payStatus.value
  })
    .then((response) => {
      response.forEach((item, idx) => {
        item.idx = idx + 1
        item.id = uid()
        item.amount = item.amount.toFixed(2)
        item.amountLocal = item.amountLocal.toFixed(2)
        item.pay = item.pay.toFixed(2)
        item.payLocal = item.payLocal.toFixed(2)
        if (props.proSearch && item.payInPayNO) {
          item.payInPayNO = item.payInPayNO.toFixed(2)
        }
      })
      rows.value = response
    })
    .finally(() => {
      showLoading.value = false
    })
}

const download = () => {
  if (!props.site || !props.customerCode || !date.isValid(props.dateFrom) || !date.isValid(props.dateTo)) return

  showLoading.value = true

  axiosGet('/Data/FinancialInvoicePayPro', {
    Site: props.site,
    CustomerCode: props.customerCode,
    DateFrom: props.dateFrom,
    DateTo: props.dateTo,
    DateType: dateType.value,
    PayStatus: payStatus.value
  })
    .then((data) => {
      jsonToExcel(title.value + '_' + props.site, props.customerCode, data)
    })
    .finally(() => {
      showLoading.value = false
    })
}

// events
onMounted(() => {
  loadColumns()
  setTitle()
  doUpdate()
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)
  doUpdate()
})
watch(dateType, (value, oldValue) => {
  setTitle()
  doUpdate()
})
watch(payStatus, (value, oldValue) => {
  setTitle()
  doUpdate()
})

watch(useI18n().locale, () => {
  loadColumns()
  setTitle()
})
</script>
<style lang="scss">
tr:has(> td.unpaid) {
  background-color: #ff8c8c;
}
tr:has(> td.ppaid) {
  background-color: #cfcd4b;
}
</style>
