<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 23:52:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-17 11:30:02
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <!-- set height and width in parent -->
  <q-markup-table dense>
    <thead style="position: sticky; top: 0px; z-index: 1">
      <tr>
        <td :colspan="colspan" class="bg-teal text-h6 text-white shadow-2">
          {{
            $t('S.INVOICE PAY OF CUSTOMER {customerCode} FROM {dateFrom} TO {dateTo}', {
              customerCode: customerCode,
              dateFrom: dateFrom,
              dateTo: dateTo
            })
          }}
          <q-btn dense flat icon="fas fa-download" @click="download()" />
        </td>
      </tr>
      <tr class="bg-primary text-white">
        <th class="text-center text-caption">#</th>
        <th class="text-left">{{ $t('F.Site') }}</th>
        <th class="text-left">{{ $t('F.Customer') }}</th>
        <th class="text-left">{{ $t('F.Name') }}</th>
        <th class="text-left">{{ $t('F.InvoiceNO') }}</th>
        <th class="text-left">{{ $t('F.Currency') }}</th>
        <th class="text-right">{{ $t('F.Amount') }}</th>
        <th class="text-right">{{ $t('F.AmountLocal') }}</th>
        <th class="text-right">{{ $t('F.Pay') }}</th>
        <th class="text-right">{{ $t('F.PayLocal') }}</th>
        <th class="text-left">{{ $t('F.OrderNO') }}</th>
        <th class="text-center">{{ $t('F.CreateDate') }}</th>
        <th class="text-center">{{ $t('F.DueDate') }}</th>
        <th class="text-center">{{ $t('F.PayDate') }}</th>
        <th class="text-left">{{ $t('F.Fapiao') }}</th>
        <th class="text-left">{{ $t('F.CustRef') }}</th>
        <th class="text-center">{{ $t('F.Status') }}</th>
        <template v-if="proSearch">
          <th class="text-left">{{ $t('F.MatchedBy') }}</th>
          <th class="text-left">{{ $t('F.PayNO') }}</th>
          <th class="text-center">{{ $t('F.PayCurrency') }}</th>
          <th class="text-right">{{ $t('F.PayInPayNO') }}</th>
          <th class="text-left">{{ $t('F.Desc0') }}</th>
          <th class="text-left">{{ $t('F.Desc1') }}</th>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in invoicePayItems"
        :key="index"
        :style="{ backgroundColor: item['status'] !== 'Paid' ? '#ffe9e9' : '' }"
      >
        <td class="text-center">{{ index }}</td>
        <td>{{ item['site'] }}</td>
        <td class="text-left">{{ item['customer'] }}</td>
        <td class="text-left">{{ item['name'] }}</td>
        <td class="text-left">{{ item['invoiceNO'] }}</td>
        <td class="text-left">{{ item['currency'] }}</td>
        <td class="text-right">{{ item['amount'] }}</td>
        <td class="text-right">{{ item['amountLocal'] }}</td>
        <td class="text-right">{{ item['pay'] }}</td>
        <td class="text-right">{{ item['payLocal'] }}</td>
        <td class="text-left">{{ item['orderNO'] }}</td>
        <td class="text-center">{{ item['createDate'] }}</td>
        <td class="text-center">{{ item['dueDate'] }}</td>
        <td class="text-center">{{ item['payDate'] }}</td>
        <td class="text-left">{{ item['fapiao'] }}</td>
        <td class="text-left">{{ item['custRef'] }}</td>
        <td class="text-center">{{ item['status'] }}</td>
        <template v-if="proSearch">
          <td class="text-left">{{ item['matchedBy'] }}</td>
          <td class="text-left">{{ item['payNO'] }}</td>
          <td class="text-center">{{ item['payCurrency'] }}</td>
          <td class="text-right">{{ item['payInPayNO'] }}</td>
          <td class="text-left">{{ item['desc0'] }}</td>
          <td class="text-left">{{ item['desc1'] }}</td>
        </template>
      </tr>
    </tbody>
    <q-inner-loading :showing="showLoading">
      <q-spinner-hourglass size="50px" color="primary" />
    </q-inner-loading>
  </q-markup-table>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { jsonToExcel } from 'assets/dataUtils'
import { onMounted, ref, watch } from 'vue'

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

// components vars
const invoicePayItems = ref([])
const colspan = ref(17)

// actions
const doUpdate = () => {
  if (!props.customerCode) return

  showLoading.value = true

  const code = props.customerCode === '%%' ? '' : props.customerCode
  const proSuffix = props.proSearch ? 'Pro' : ''
  colspan.value = props.proSearch ? 23 : 17

  axiosGet('/Data/FinancialInvoicePay' + proSuffix, {
    Site: props.site,
    CustomerCode: code,
    DateFrom: props.dateFrom,
    DateTo: props.dateTo,
    DateType: props.dateType
  })
    .then((response) => {
      invoicePayItems.value = response
    })
    .finally(() => {
      showLoading.value = false
    })
}
const download = () => {
  const header = [
    'site',
    'customer',
    'name',
    'invoiceNO',
    'currency',
    'amount',
    'amountLocal',
    'pay',
    'payLocal',
    'orderNO',
    'createDate',
    'dueDate',
    'payDate',
    'fapiao',
    'custRef',
    'status'
  ]
  if (props.proSearch) {
    header.push('MatchedBy')
    header.push('PayNO')
    header.push('PayCurrency')
    header.push('PayInPayNO')
    header.push('Desc0')
    header.push('Desc1')
  }
  jsonToExcel(header, invoicePayItems.value, props.customerCode + '-Invoice Pay')
}

// events
onMounted(() => {
  doUpdate()
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)

  doUpdate()
})
</script>
