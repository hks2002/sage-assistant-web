<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-11-14 15:52:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-07-16 09:33:20
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <!-- set height and width in parent -->
  <q-markup-table dense>
    <thead style="position: sticky; top: 0px; z-index: 1">
      <tr>
        <td :colspan="17" class="bg-teal text-h6 text-white shadow-2">
          {{ title }}
          <q-btn dense flat icon="fas fa-download" @click="download()" />
        </td>
      </tr>
      <tr class="bg-primary text-white">
        <th class="text-center text-caption">#</th>
        <th class="text-left">{{ $t('F.ProjectNO') }}</th>
        <th class="text-left">{{ $t('F.PN') }}</th>
        <th class="text-center">{{ $t('F.Seq') }}</th>
        <th class="text-left">{{ $t('F.PurchaseNO') }}</th>
        <th class="text-left">{{ $t('F.PurchaseLine') }}</th>
        <th class="text-left">{{ $t('F.PurchaseDate') }}</th>
        <th class="text-left">{{ $t('F.Purchaser') }}</th>
        <th class="text-left">{{ $t('F.ReceiptNO') }}</th>
        <th class="text-left">{{ $t('F.ReceiptLine') }}</th>
        <th class="text-left">{{ $t('F.ReceiptDate') }}</th>
        <th class="text-left">{{ $t('F.Receiptor') }}</th>
        <th class="text-center">{{ $t('F.Qty') }}</th>
        <th class="text-right">{{ $t('F.Amount') }}</th>
        <th class="text-center">{{ $t('F.Currency') }}</th>
        <th class="text-center">{{ $t('F.TotalReceiptQty') }}</th>
        <th class="text-right">{{ $t('F.TotalSalesQty') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in duplicatedRA" :key="index">
        <td class="text-center">{{ index }}</td>
        <td>{{ item['projectNO'] }}</td>
        <td class="text-left">{{ item['PN'] }}</td>
        <td class="text-center">{{ item['seq'] }}</td>
        <td class="text-left">{{ item['purchaseNO'] }}</td>
        <td class="text-left">{{ item['purchaseLine'] }}</td>
        <td class="text-left">{{ item['purchaseDate'] }}</td>
        <td class="text-left">{{ item['purchaser'] }}</td>
        <td class="text-left">{{ item['receiptNO'] }}</td>
        <td class="text-left">{{ item['receiptLine'] }}</td>
        <td class="text-left">{{ item['receiptDate'] }}</td>
        <td class="text-left">{{ item['receiptor'] }}</td>
        <td class="text-center">{{ item['receiptQty'] }}</td>
        <td class="text-right">{{ item['receiptAmount'] }}</td>
        <td class="text-center">{{ item['currency'] }}</td>
        <td class="text-center">{{ item['totalReceiptQty'] }}</td>
        <td class="text-right">{{ item['totalSalesQty'] }}</td>
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
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
  dateFrom: {
    type: String,
    require: true
  },
  site: {
    type: String,
    require: false,
    default: null
  },
  onlyForSales: {
    type: Boolean,
    require: false,
    default: false
  }
})

// common vars
const showLoading = ref(false)

// components vars
const duplicatedRA = ref([])

// actions
const doUpdate = () => {
  if (!props.site) {
    return
  }

  showLoading.value = true

  axiosGet('/Data/DuplicatedRA', {
    Site: props.site,
    DateFrom: props.dateFrom,
    OnlyForSales: props.onlyForSales ? 'Y' : 'N'
  })
    .then((data) => {
      duplicatedRA.value = data
    })
    .finally(() => {
      showLoading.value = false
    })
}

const download = () => {
  const header = [
    'projectNO',
    'PN',
    'purchaseNO',
    'purchaseLine',
    'purchaser',
    'receiptNO',
    'receiptLine',
    'receiptor',
    'receiptQty',
    'receiptAmount',
    'currency',
    'totalReceiptQty',
    'totalSalesQty',
    'seq'
  ]
  jsonToExcel(header, duplicatedRA.value, title.value)
}

const title = computed(() =>
  t('S.DUPLICATE RECEIPT FROM {dateFrom} OF {site}', {
    dateFrom: props.dateFrom,
    site: props.site
  })
)

// events
onMounted(() => {
  doUpdate()
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)

  doUpdate()
})
</script>
