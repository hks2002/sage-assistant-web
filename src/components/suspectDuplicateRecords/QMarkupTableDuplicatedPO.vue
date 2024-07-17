<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-11-14 15:52:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-07-16 09:55:26
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <!-- set height and width in parent -->
  <q-markup-table dense>
    <thead style="position: sticky; top: 0px; z-index: 1">
      <tr>
        <td :colspan="11" class="bg-teal text-h6 text-white shadow-2">
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
        <th class="text-center">{{ $t('F.Qty') }}</th>
        <th class="text-center">{{ $t('F.TotalPurchaseQty') }}</th>
        <th class="text-center">{{ $t('F.TotalSalesQty') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in duplicatedPO" :key="index">
        <td class="text-center">{{ index }}</td>
        <td>{{ item['projectNO'] }}</td>
        <td class="text-left">{{ item['PN'] }}</td>
        <td class="text-center">{{ item['seq'] }}</td>
        <td class="text-left">{{ item['purchaseNO'] }}</td>
        <td class="text-left">{{ item['purchaseLine'] }}</td>
        <td class="text-left">{{ item['purchaseDate'] }}</td>
        <td class="text-center">{{ item['purchaser'] }}</td>
        <td class="text-center">{{ item['purchaseQty'] }}</td>
        <td class="text-center">{{ item['totalPurchaseQty'] }}</td>
        <td class="text-center">{{ item['totalSalesQty'] }}</td>
      </tr>
    </tbody></q-markup-table
  >
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
const duplicatedPO = ref([])

// actions
const doUpdate = () => {
  if (!props.site) {
    return
  }

  showLoading.value = true

  axiosGet('/Data/DuplicatedPO', {
    Site: props.site,
    DateFrom: props.dateFrom,
    OnlyForSales: props.onlyForSales ? 'Y' : 'N'
  })
    .then((data) => {
      duplicatedPO.value = data
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
    'purchaseQty',
    'totalPurchaseQty',
    'totalSalesQty',
    'seq'
  ]
  jsonToExcel(header, duplicatedPO.value, title.value)
}

const title = computed(() =>
  t('S.DUPLICATE PURCHASE ORDERS FROM {dateFrom} OF {site}', {
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
