<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2022-04-01 16:30:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-30 12:56:27
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-markup-table dense bordered class="col-grow">
    <thead style="position: sticky; top: 0px; z-index: 1">
      <tr>
        <td colspan="17" class="bg-teal text-white shadow-2">
          {{ site }} {{ $t('S.STOCK_HISTORY') }} <span v-if="PnOrName">of {{ PnOrName }} </span> {{ $t('S.FROM') }}
          {{ dateFrom }} {{ $t('S.TO') }}
          {{ dateTo }}
          <q-btn dense flat icon="fas fa-download" @click="download()" />
        </td>
      </tr>
      <tr class="bg-primary text-white">
        <th class="text-center text-caption">#</th>
        <th class="text-left">{{ $t('F.Location') }}</th>
        <th class="text-left">{{ $t('F.Seq') }}</th>
        <th class="text-left">{{ $t('F.PN') }}</th>
        <th class="text-left">{{ $t('F.Description') }}</th>
        <th class="text-center">{{ $t('F.Qty') }}</th>
        <th class="text-center">{{ $t('F.Unit') }}</th>
        <th class="text-right">{{ $t('F.Cost') }}</th>
        <th class="text-left">{{ $t('F.ProjectNO') }}</th>
        <th class="text-left">{{ $t('F.SourceNO') }}</th>
        <th class="text-left">{{ $t('F.SourceLine') }}</th>
        <th class="text-left">{{ $t('F.EntryNO') }}</th>
        <th class="text-left">{{ $t('F.EntryLine') }}</th>
        <th class="text-center">{{ $t('F.CreateUser') }}</th>
        <th class="text-center">{{ $t('F.CreateDate') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in stockHistory" :key="index">
        <td class="text-center">{{ index }}</td>
        <td>{{ item['location'] }}</td>
        <td>{{ item['seq'] }}</td>
        <td>{{ item['PN'] }}</td>
        <td>{{ item['description'] }}</td>
        <td class="text-center">{{ item['qty'] }}</td>
        <td class="text-center">{{ item['unit'] }}</td>
        <td class="text-right">{{ item['cost'] }}</td>
        <td>{{ item['projectNO'] }}</td>
        <td>{{ item['sourceNO'] }}</td>
        <td>{{ item['sourceLine'] }}</td>
        <td>{{ item['entryNO'] }}</td>
        <td>{{ item['entryLine'] }}</td>
        <td class="text-center">{{ item['createUser'] }}</td>
        <td class="text-center">{{ item['createDate'] }}</td>
      </tr>
    </tbody>
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-markup-table>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { jsonToExcel } from '@/assets/dataUtils'
import { LocalStorage } from 'quasar'
import { inject, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  PnOrName: { type: String, require: false, default: '' },
  dateFrom: String,
  dateTo: String
})

// common vars
const { t } = useI18n()
const ebus = inject('ebus')
const showLoading = ref(false)
const site = ref(LocalStorage.getItem('site'))

// component vars
const stockHistory = ref([])

// actions
const doUpdate = () => {
  showLoading.value = true

  axiosGet(
    '/Data/StockHistory?Site=' +
      site.value +
      '&PnOrName=' +
      props.PnOrName +
      '&DateFrom=' +
      props.dateFrom +
      '&DateTo=' +
      props.dateTo
  )
    .then((data) => {
      stockHistory.value = data
    })
    .finally(() => {
      showLoading.value = false
    })
}

const download = () => {
  const header = [
    'Location',
    'Seq',
    'PN',
    'Description',
    'Qty',
    'Unit',
    'Cost',
    'ProjectNO',
    'SourceNO',
    'SourceLine',
    'EntryNO',
    'EntryLine',
    'CreateUser',
    'CreateDate'
  ]
  const strPNData = stockHistory.value
  // PN with #
  strPNData.forEach((value) => {
    value.PN = '#' + value.PN
  })
  const title = t('S.{site} STOCK HISTORY {dateFrom}_{dateTo}', {
    site: site.value,
    dateFrom: props.dateFrom,
    dateTo: props.dateTo
  })

  jsonToExcel(header, strPNData, title)
}

// events
onMounted(() => {
  doUpdate()
})

ebus.on('changeSite', (newSite) => {
  site.value = newSite
  doUpdate()
})

onBeforeUnmount(() => {
  ebus.off('changeSite')
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)
  doUpdate()
})
</script>
<style lang="scss" scoped></style>
