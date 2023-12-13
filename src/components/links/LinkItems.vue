<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-06-22 23:52:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-11-30 10:34:26
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <!-- set height and width in parent -->
  <q-table
    dense
    flat
    bordered
    :rows="rows"
    :columns="columns"
    :visible-columns="visibleColumns"
    :rows-per-page-options="[50, 100, 200, 500, 1000, 0]"
    class="sticky-first-header-row-table"
    v-model:pagination="pagination"
    :loading="showLoading"
    @request="doUpdate"
  >
    <template v-slot:top>
      <div class="text-h6">{{ title }} <q-btn dense flat icon="fas fa-download" @click="download()" /></div>
      <q-toggle dense v-model="showSODetail" :label="$t('S.SHOW_SALES_DETAILS')" />
      <q-toggle dense v-model="showSOComment" :label="$t('S.SHOW_SALES_COMMENT')" />
      <q-toggle dense v-model="showBomDetail" :label="$t('S.SHOW_BOM_DETAILS')" />
      <q-toggle dense v-model="showPODetail" :label="$t('S.SHOW_PURCHASE_DETAILS')" />
      <q-separator vertical />
      {{ $t('S.SEARCH_SALES_ORDER_LINE') }}
      <q-input
        dense
        outlined
        debounce="1000"
        mask="date"
        type="date"
        class="col-3"
        :label="$t('S.FROM')"
        :value="localDateFrom"
        @update:model-value="updatePage(1)"
      />
      <q-input
        dense
        outlined
        debounce="1000"
        mask="date"
        type="date"
        class="col-3"
        :label="$t('S.TO')"
        v-model="dateTo"
        @update:model-value="updatePage(1)"
      />
      <q-input
        dense
        clearable
        outlined
        v-model="filterProjectNO"
        :label="$t('F.ProjectNO')"
        class="col-1"
        style="height: 20px; width: 250px"
        debounce="1000"
        @update:model-value="updatePage(1)"
      />
    </template>
    <template v-slot:pagination="props">
      <q-pagination
        size="sm"
        boundary-numbers
        boundary-links
        direction-links
        :max="props.pagesNumber"
        :max-pages="10"
        v-model="props.pagination.page"
        @update:model-value="updatePage"
      />{{ $q.lang.table.allRows }} {{ props.pagination.rowsNumber }}
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
import { toLower } from 'lodash'
import { uid } from 'quasar'
import { computed, inject, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: {
    type: String
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
  columns.value = []
  // set name
  columns.value.forEach((item, idx, array) => {
    array[idx].name = toLower(item.field)
  })

  // get all columns name
  columns.value.forEach((item) => {
    fieldNames.value.push(item.field)
  })
}

// computed vars
const finalFieldNames = computed(() => {
  return fieldNames.value
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
  title.value = t('S.INVOICE PAY OF CUSTOMER {projectNO} FROM {dateFrom} TO {dateTo}', {
    projectNO: props.projectNO,
    dateFrom: props.dateFrom,
    dateTo: props.dateTo
  })
}

// actions
const doUpdate = () => {
  if (!props.customerCode) return
  showLoading.value = true

  const code = props.projectNO === '%%' ? '' : props.projectNO
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
