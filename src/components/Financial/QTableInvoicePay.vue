<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 23:52:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-03-25 12:10:03
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <!-- set height and width in parent -->
  <q-table
    dense
    class="sticky-first-header-row-table"
    :rows="rows"
    :columns="columns"
    :visibleColumns="visibleColumns"
    :rows-per-page-options="[50, 100, 200, 500, 1000, 0]"
    :style="{ height: tableHeight + 'px' }"
  >
    <template v-slot:top>
      <div class="text-h6">{{ title }} <q-btn dense flat icon="fas fa-download" @click="download()" /></div>
    </template>
    <template v-slot:body-cell-status="{ row }">
      <td :class="['text-center', row.status === 'U-Paid' ? 'unpaid' : row.status === 'P-Paid' ? 'ppaid' : '']">
        {{ row.status }}
      </td>
    </template>
  </q-table>
  <q-inner-loading :showing="showLoading">
    <q-spinner-ios size="50px" color="primary" />
  </q-inner-loading>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { jsonToExcel } from 'assets/dataUtils'
import toLower from 'lodash/toLower'
import { uid } from 'quasar'
import { computed, inject, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  customerCode: {
    type: String,
    require: false,
    default: null
  },
  dateFrom: {
    type: String,
    require: true
  },
  dateTo: {
    type: String,
    require: true
  },
  dateType: {
    type: String,
    require: true
  },
  proSearch: {
    type: Boolean,
    require: false,
    default: false
  },
  site: {
    type: String,
    require: false,
    default: null
  }
})

// common vars
const showLoading = ref(false)
const { t } = useI18n()
const bodyHeight = inject('bodyHeight')
const ebus = inject('ebus')

// components vars
let columns = ref([])
let rows = ref([])
let fieldNames = ref([])

const loadColumns = () => {
  columns.value = [
    {
      field: 'idx',
      label: '#',
      align: 'left'
    },
    {
      field: 'site',
      label: t('F.Site'),
      align: 'center'
    },
    {
      field: 'customer',
      label: t('F.Customer'),
      align: 'center'
    },
    {
      field: 'name',
      label: t('F.Name'),
      align: 'left'
    },
    {
      field: 'invoiceNO',
      label: t('F.InvoiceNO'),
      align: 'left'
    },
    {
      field: 'currency',
      label: t('F.Currency'),
      align: 'center'
    },
    {
      field: 'amount',
      label: t('F.Amount'),
      align: 'right'
    },
    {
      field: 'pay',
      label: t('F.Pay'),
      align: 'right',
      sortable: true
    },
    {
      field: 'amountLocal',
      label: t('F.AmountLocal'),
      align: 'right'
    },
    {
      field: 'payLocal',
      label: t('F.PayLocal'),
      align: 'right'
    },
    {
      field: 'orderNO',
      label: t('F.OrderNO'),
      align: 'left'
    },
    {
      field: 'createDate',
      label: t('F.CreateDate'),
      align: 'left'
    },
    {
      field: 'dueDate',
      label: t('F.DueDate'),
      align: 'left'
    },
    {
      field: 'payDate',
      label: t('F.PayDate'),
      align: 'left'
    },
    {
      field: 'fapiao',
      label: t('F.Fapiao'),
      align: 'left'
    },
    {
      field: 'custRef',
      label: t('F.CustRef'),
      align: 'left'
    },
    {
      field: 'status',
      label: t('F.Status'),
      align: 'center'
    },
    {
      field: 'matchedBy',
      label: t('F.MatchedBy'),
      align: 'center'
    },
    {
      field: 'payNO',
      label: t('F.PayNO'),
      align: 'left'
    },
    {
      field: 'payCurrency',
      label: t('F.PayCurrency'),
      align: 'center'
    },
    {
      field: 'payInPayNO',
      label: t('F.PayInPayNO'),
      align: 'left'
    },
    {
      field: 'desc0',
      label: t('F.Desc0'),
      align: 'left'
    },
    {
      field: 'desc1',
      label: t('F.Desc1'),
      align: 'left'
    }
  ]
  // set name and sortable
  columns.value.forEach((item, idx, array) => {
    array[idx].name = toLower(item.field)
    array[idx].sortable = true
  })

  // get all columns name
  columns.value.forEach((item) => {
    fieldNames.value.push(item.field)
  })
}

// computed vars
const proFieldNames = ['matchedBy', 'payNO', 'payCurrency', 'payInPayNO', 'desc0', 'desc1']
const finalFieldNames = computed(() => {
  return props.proSearch ? fieldNames.value : fieldNames.value.filter((fieldName) => !proFieldNames.includes(fieldName))
})

const visibleColumns = computed(() => {
  let cols = []
  finalFieldNames.value.forEach((item) => {
    cols.push(toLower(item))
  })
  return cols
})

const tableHeight = computed(() => {
  return bodyHeight.value - 80
})

const title = ref('')
const setTitle = () => {
  title.value = t('S.INVOICE PAY OF CUSTOMER {customerCode} FROM {dateFrom} TO {dateTo}', {
    customerCode: props.customerCode,
    dateFrom: props.dateFrom,
    dateTo: props.dateTo
  })
}

// actions
const doUpdate = () => {
  if (!props.customerCode) return
  showLoading.value = true

  const code = props.customerCode === '%%' ? '' : props.customerCode
  const proSuffix = props.proSearch ? 'Pro' : ''

  axiosGet('/Data/FinancialInvoicePay' + proSuffix, {
    Site: props.site,
    CustomerCode: code,
    DateFrom: props.dateFrom,
    DateTo: props.dateTo,
    DateType: props.dateType
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
  jsonToExcel(finalFieldNames.value, rows.value, props.customerCode + '-Invoice Pay')
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

ebus.on('changeLanguage', () => {
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
