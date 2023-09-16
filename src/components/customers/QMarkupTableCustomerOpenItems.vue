<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 20:58:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-08-28 22:13:56
* @FilePath              : sage-assistant-web/src/components/customers/QMarkupTableCustomerOpenItems.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-markup-table dense v-if="customerOpenItems.length > 0" style="height: 250px">
    <thead style="position: sticky; top: 0px; z-index: 1">
      <tr>
        <td colspan="11" class="bg-teal text-h6 text-white shadow-2">
          {{ $t('S.OPEN_ITEMS') }}({{ $t('W.ALL') }}-{{ customerOpenItems.length }})
          <q-btn dense flat icon="fas fa-download" @click="download()" />
        </td>
      </tr>
      <tr class="bg-primary text-white">
        <th class="text-center text-caption">#</th>
        <th class="text-left">{{ $t('F.Site') }}</th>
        <th class="text-left">{{ $t('F.CustomerCode') }}</th>
        <th class="text-left">{{ $t('F.OrderNO') }}</th>
        <th class="text-left">{{ $t('F.ProjectNO') }}</th>
        <th class="text-left">{{ $t('F.PN') }}</th>
        <th class="text-left">{{ $t('F.Description') }}</th>
        <th class="text-center">{{ $t('F.ShipDate') }}</th>
        <th class="text-center">{{ $t('F.DemandDate') }}</th>
        <th class="text-center">{{ $t('F.OrderDate') }}</th>
        <th class="text-center">{{ $t('F.DaysDelay') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in customerOpenItems" :key="index">
        <td class="text-center">{{ index }}</td>
        <td>{{ item['site'] }}</td>
        <td>{{ item['customerCode'] }}</td>
        <td>{{ item['orderNO'] }}</td>
        <td>{{ item['projectNO'] }}</td>
        <td>{{ item['PN'] }}</td>
        <td>{{ item['description'] }}</td>
        <td class="text-center">{{ item['shipDate'] }}</td>
        <td class="text-center">{{ item['demandDate'] }}</td>
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
  customerCode: String,
  dateFrom: String,
  dateTo: String
})

// common vars
const { t } = useI18n()
const showLoading = ref(false)

// component vars
const customerOpenItems = ref([])

// actions
const doUpdate = () => {
  showLoading.value = true

  axiosGet('/Data/CustomerOpenItems', {
    customerCode: props.customerCode,
    DateFrom: props.dateFrom,
    dateTo: props.dateTo
  })
    .then((response) => {
      customerOpenItems.value = response
    })
    .finally(() => {
      showLoading.value = false
    })
}

const download = () => {
  const header = [
    'site',
    'customerCode',
    'orderNO',
    'projectNO',
    'PN',
    'description',
    'shipDate',
    'demandDate',
    'orderDate',
    'daysDelay'
  ]
  jsonToExcel(header, customerOpenItems.value, t('{customerCode} OpenItems', { customerCode: props.customerCode }))
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
