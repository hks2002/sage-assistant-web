<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 01:09:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-28 22:12:54
* @FilePath              : sage-assistant-web/src/components/suppliers/QMarkupTableSupplierOpenItems.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-markup-table dense v-if="supplierOpenItems.length > 0" style="height: 250px">
    <thead style="position: sticky; top: 0px; z-index: 1">
      <tr>
        <td colspan="11" class="bg-teal text-h6 text-white shadow-2">
          {{ $t('S.OPEN_ITEMS') }}({{ $t('W.ALL') }}-{{ supplierOpenItems.length }})
          <q-btn dense flat icon="fas fa-download" @click="download()" />
        </td>
      </tr>
      <tr class="bg-primary text-white">
        <th class="text-center text-caption">#</th>
        <th class="text-left">{{ $t('F.Site') }}</th>
        <th class="text-left">{{ $t('F.SupplierCode') }}</th>
        <th class="text-left">{{ $t('F.PurchaseNO') }}</th>
        <th class="text-left">{{ $t('F.ProjectNO') }}</th>
        <th class="text-left">{{ $t('F.PN') }}</th>
        <th class="text-left">{{ $t('F.Description') }}</th>
        <th class="text-center">{{ $t('F.AckDate') }}</th>
        <th class="text-center">{{ $t('F.ExpectDate') }}</th>
        <th class="text-center">{{ $t('F.OrderDate') }}</th>
        <th class="text-center">{{ $t('F.DaysDelay') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in supplierOpenItems" :key="index">
        <td class="text-center">{{ index }}</td>
        <td>{{ item['site'] }}</td>
        <td>{{ item['supplierCode'] }}</td>
        <td>{{ item['purchaseNO'] }}</td>
        <td>{{ item['projectNO'] }}</td>
        <td>{{ item['PN'] }}</td>
        <td>{{ item['description'] }}</td>
        <td class="text-center">{{ item['ackDate'] }}</td>
        <td class="text-center">{{ item['expectDate'] }}</td>
        <td class="text-center">{{ item['orderDate'] }}</td>
        <td class="text-center">{{ item['daysDelay'] }}</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { jsonToExcel } from 'assets/dataUtils'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  supplierCode: String,
  dateFrom: String,
  dateTo: String
})

// common vars
const { t } = useI18n()
const showLoading = ref(false)

// component vars
const supplierOpenItems = ref([])

// actions
const doUpdate = () => {
  if (!props.supplierCode) return

  showLoading.value = true

  axiosGet('/Data/SupplierOpenItems', {
    supplierCode: props.supplierCode,
    dateFrom: props.dateFrom,
    dateTo: props.dateTo
  })
    .then((response) => {
      supplierOpenItems.value = response
    })
    .finally(() => {
      showLoading.value = false
    })
}

const download = () => {
  const header = [
    'site',
    'supplierCode',
    'purchaseNO',
    'projectNO',
    'PN',
    'description',
    'ackDate',
    'expectDate',
    'orderDate',
    'daysDelay'
  ]
  jsonToExcel(header, supplierOpenItems.value, t('{supplierCode} OpenItems', { supplierCode: props.supplierCode }))
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
