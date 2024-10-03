<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-23 01:09:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2025-01-13 23:15:23
* @FilePath              : sage-assistant-web/src/components/suppliers/QTableSupplierOrders.vue
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
    id="supplierOrders"
    row-key="#"
    class="sticky-header-column--dense"
    :rows="rows"
    :columns="POcolumns"
    :rows-per-page-options="[50, 100, 200, 500, 1000, 0]"
    :loading="showLoading"
    v-model:pagination="pagination"
    @request="doUpdate"
  >
    <template v-slot:top>
      <div class="col-12 text-h6 text-center">{{ title }}</div>
      <div class="col-12 q-gutter-sm row">
        <q-btn dense flat icon="fas fa-download" color="primary" @click="download()" :label="t('S.DOWNLOAD')" />
        <q-select
          dense
          outlined
          debounce="1000"
          :options="['ORDER', 'ACK', 'EXPRCP']"
          class="col-1"
          :label="$t('S.SEARCH_DATE_TYPE')"
          v-model="dateType"
        />
        <q-checkbox dense v-model="closeFlag" :label="t('S.CLOSE_STATUS')" />
        <q-checkbox dense v-model="openFlag" :label="t('S.OPEN_STATUS')" />
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
import { computed, onMounted, ref, shallowRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: String,
  supplierCode: String,
  dateFrom: String,
  dateTo: String
})

const dateType = ref('ORDER')
const closeFlag = ref(true)
const openFlag = ref(true)
const orderStatus = computed(() => {
  if (closeFlag.value && openFlag.value) {
    return 'ALL'
  }
  if (closeFlag.value && !openFlag.value) {
    return 'CLOSED'
  }
  if (!closeFlag.value && openFlag.value) {
    return 'OPEN'
  }
})

// common vars
const { t } = useI18n()
const showLoading = ref(false)

// component vars
const rows = ref([])
const POcolumns = shallowRef([])
const pagination = ref({
  sortBy: '',
  descending: false,
  page: 1,
  rowsPerPage: 100,
  rowsNumber: 100
})
const title = ref('')
const setTitle = () => {
  title.value = `${props.supplierCode} ${props.site} ${t('S.PURCHASE_ORDERS')} (${props.dateFrom}--->${props.dateTo})`
}

const loadColumns = () => {
  delete require.cache[require.resolve('@/components/suppliers/SupplierOrderColumns')]

  Promise.resolve(require('@/components/suppliers/SupplierOrderColumns').default).then((cols) => {
    // add low case name
    cols.forEach((item, idx, array) => {
      array[idx].name = item.field.toLowerCase()
    })
    POcolumns.value = cols
  })
}
loadColumns()

// actions
const doUpdate = (requestProp) => {
  if (!props.site || !props.supplierCode || !date.isValid(props.dateFrom) || !date.isValid(props.dateTo)) return

  showLoading.value = true

  setTitle()

  // if doesn't passing pagination, use preset pagination
  const { page, rowsPerPage, rowsNumber } = requestProp?.pagination ? requestProp.pagination : pagination.value
  const requestParam = {
    Site: props.site,
    SupplierType: 'ALL',
    SupplierCode: props.supplierCode,
    DateType: dateType.value,
    DateFrom: props.dateFrom,
    DateTo: props.dateTo,
    OrderStatus: orderStatus.value,
    Offset: (page - 1) * rowsPerPage || 0,
    Limit: rowsPerPage === 0 ? rowsNumber : rowsPerPage
  }

  Promise.all([getData('/Data/SupplierOrdersCnt', requestParam), getData('/Data/SupplierOrders', requestParam)])
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
  if (!props.site || !props.supplierCode || !date.isValid(props.dateFrom) || !date.isValid(props.dateTo)) return

  showLoading.value = true
  const requestParam = {
    Site: props.site,
    SupplierType: 'ALL',
    SupplierCode: props.supplierCode,
    DateType: dateType.value,
    DateFrom: props.dateFrom,
    DateTo: props.dateTo,
    OrderStatus: orderStatus.value,
    Offset: 0,
    Limit: 99999
  }

  getData('/Data/SupplierOrders', requestParam)
    .then((data) => {
      jsonToExcel(title.value + '_' + props.site, props.supplierCode, data)
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
watch(orderStatus, (value, oldValue) => {
  doUpdate()
})

watch(useI18n().locale, () => {
  setTitle()
  loadColumns()
})
</script>
