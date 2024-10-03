<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 01:09:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-17 16:08:05
* @FilePath              : sage-assistant-web/src/components/customers/QTableCustomerDelivery.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-table
    dense
    flat
    bordered
    virtual-scroll
    virtual-scroll-item-size="32"
    virtual-scroll-slice-size="10"
    virtual-scroll-slice-ratio-before="2"
    virtual-scroll-slice-ratio-after="2"
    id="deliveryLines"
    row-key="#"
    class="sticky-header-column--dense"
    :rows="rows"
    :columns="DLcolumns"
    :rows-per-page-options="[50, 100, 200, 500, 1000, 0]"
    :loading="showLoading"
    v-model:pagination="pagination"
    @request="doUpdate"
  >
    <template v-slot:top>
      <div class="col-12 text-h6 text-center">{{ title }}</div>
      <div class="col-12 q-gutter-sm row">
        <q-btn dense flat icon="fas fa-download" color="primary" @click="download()" :label="t('S.DOWNLOAD')" />
      </div>
    </template>
    <template v-slot:pagination="scope">
      <q-pagination
        size="sm"
        boundary-numbers
        boundary-links
        direction-links
        :max="scope.pagesNumber"
        :max-pages="10"
        v-model="scope.pagination.page"
        @update:model-value="updatePage"
      >
      </q-pagination>
      {{ $q.lang.table.allRows }} {{ scope.pagination.rowsNumber }}
    </template>
    <template v-slot:loading>
      <q-inner-loading showing>
        <q-spinner-ios size="50px" color="primary" />
      </q-inner-loading>
    </template>
  </q-table>
</template>

<script setup>
import { getData } from '@/assets/axiosActions'
import { jsonToExcel } from '@/assets/dataUtils'
import { date } from 'quasar'
import { onMounted, ref, shallowRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: String,
  customerCode: String,
  dateFrom: String,
  dateTo: String
})

// common vars
const { t } = useI18n()
const showLoading = ref(false)

// component vars
const rows = ref([])
const DLcolumns = shallowRef([])
const pagination = ref({
  sortBy: '',
  descending: false,
  page: 1,
  rowsPerPage: 100,
  rowsNumber: 100
})

const title = ref('')
const setTitle = () => {
  title.value = `${props.customerCode} ${props.site} ${t('S.SALES_ORDERS')} (${props.dateFrom}--->${props.dateTo})`
}

const loadColumns = () => {
  delete require.cache[require.resolve('@/components/customers/CustomerDeliveryColumns')]

  Promise.resolve(require('@/components/customers/CustomerDeliveryColumns').default).then((cols) => {
    // add low case name
    cols.forEach((item, idx, array) => {
      array[idx].name = item.field.toLowerCase()
    })
    DLcolumns.value = cols
  })
}
loadColumns()

// actions
const doUpdate = (requestProp) => {
  if (!props.site || !props.customerCode || !date.isValid(props.dateFrom) || !date.isValid(props.dateTo)) return

  showLoading.value = true

  setTitle()
  // if doesn't passing pagination, use preset pagination
  const { page, rowsPerPage, rowsNumber } = requestProp?.pagination ? requestProp.pagination : pagination.value
  const requestParam = {
    Site: props.site,
    CustomerCode: props.customerCode,
    DateFrom: props.dateFrom,
    DateTo: props.dateTo,
    Offset: (page - 1) * rowsPerPage || 0,
    Limit: rowsPerPage === 0 ? rowsNumber : rowsPerPage
  }

  Promise.all([getData('/Data/DeliveryLinesCnt', requestParam), getData('/Data/DeliveryLines', requestParam)])
    .then((dataArray) => {
      rows.value = dataArray[1]

      // don't forget to update local pagination object
      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.rowsNumber = parseInt(dataArray[0])
    })
    .finally(() => {
      showLoading.value = false
    })
}

const download = () => {
  if (!props.site || !props.customerCode || !date.isValid(props.dateFrom) || !date.isValid(props.dateTo)) return

  showLoading.value = true
  const requestParam = {
    Site: props.site,
    CustomerCode: props.customerCode,
    DateFrom: props.dateFrom,
    DateTo: props.dateTo,
    Offset: 0,
    Limit: 99999
  }

  getData('/Data/DeliveryLines', requestParam)
    .then((data) => {
      jsonToExcel(title.value + '_' + props.site, props.customerCode, data)
    })
    .finally(() => {
      showLoading.value = false
    })
}

const updatePage = (page) => {
  pagination.value.page = page
  doUpdate()
}

// events
onMounted(() => {
  doUpdate()
})

watch(props, (value, oldValue) => {
  doUpdate()
})

watch(useI18n().locale, () => {
  setTitle()
  loadColumns()
})
</script>
