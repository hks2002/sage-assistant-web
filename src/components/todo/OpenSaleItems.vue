/* eslint-disable no-tabs */
<template>
  <q-page class="q-pa-xs">
    <q-table
      dense
      flat
      bordered
      virtual-scroll
      virtual-scroll-slice-size="100"
      :rows="rows"
      :columns="columns"
      :visible-columns="visibleColumns"
      :rows-per-page-options="[100, 200, 500, 1000]"
      :style="{ height: 'calc(100vh - 140px)' }"
      v-model:pagination="pagination"
      @request="updatePage"
    >
      <!-- tabel top ---------------------------------------------------------------------------------->
      <template v-slot:top>
        <div class="q-gutter-sm row">
          <q-toggle dense v-model="showSODetail" :label="$t('Show Sales Details')" />
          <q-toggle dense v-model="showBomDetail" :label="$t('Show Bom Details')" />
          <q-toggle dense v-model="showPODetail" :label="$t('Show Purchase Details')" />
          <q-separator vertical />
          <div dense>{{ $t('Customer') }}:</div>
          <q-input
            dense
            v-model="filterCustomer"
            outlined
            class="col-1"
            debounce="500"
            @update:model-value="
              updatePage({
                pagination: pagination
              })
            "
          />
          <div dense>{{ $t('Supplier') }}:</div>
          <q-input
            dense
            v-model="filterSupplier"
            outlined
            class="col-1"
            debounce="500"
            @update:model-value="
              updatePage({
                pagination: pagination
              })
            "
          />
        </div>
      </template>
      <!-- tabel header ---------------------------------------------------------------------------------->
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props" v-on:click="sortData">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <!-- tabel body ---------------------------------------------------------------------------------->
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            class="text-center bg-white frezon"
            style="min-width: 25px"
            v-show="props.row.showso"
            :rowspan="props.row.rowspanso"
          >
            {{ props.row.ItemNO }}
          </q-td>
          <template v-if="props.row.showso">
            <!-- order ------------------------------------------>
            <q-td :class="soClass(props.row.OrderDeliveryFlag, 'frezon')" :rowspan="props.row.rowspanso">
              {{ props.row.TrackingNO }}
              <q-tooltip>
                {{ $t('OrderNO') }}:{{ props.row.OrderNO }}<br />
                {{ $t('OrderLine') }}:{{ props.row.OrderLine }}<br />
                {{ $t('ProjectNO') }}:{{ props.row.OrderProjectNO }}<br />
              </q-tooltip>
            </q-td>
            <q-td :class="soClass(props.row.OrderDeliveryFlag)" :rowspan="props.row.rowspanso">
              {{ props.row.OrderType }}
            </q-td>
            <q-td :class="soClass(props.row.OrderDeliveryFlag)" :rowspan="props.row.rowspanso">
              {{ props.row.OrderPN }}
              <q-tooltip>
                {{ props.row.OrderPNDesc }}
              </q-tooltip>
            </q-td>
            <template v-if="showSODetail">
              <q-td :class="soClass(props.row.OrderDeliveryFlag)" :rowspan="props.row.rowspanso">
                {{ props.row.OrderPNDesc }}
              </q-td>
            </template>
            <q-td :class="soClass(props.row.OrderDeliveryFlag, 'text-center')" :rowspan="props.row.rowspanso">
              {{ props.row.OrderQTY }}
            </q-td>
            <template v-if="showSODetail">
              <q-td :class="soClass(props.row.OrderDeliveryFlag, 'text-right')" :rowspan="props.row.rowspanso">
                {{ props.row.OrderPrice }}
              </q-td>
              <q-td :class="soClass(props.row.OrderDeliveryFlag, 'text-center')" :rowspan="props.row.rowspanso">
                {{ props.row.OrderCurrency }}
              </q-td>
              <q-td :class="soClass(props.row.OrderDeliveryFlag, 'text-center')" :rowspan="props.row.rowspanso">
                {{ props.row.CustomerCode }}
                <q-tooltip>
                  {{ props.row.CustomerName }}
                </q-tooltip>
              </q-td>
              <q-td :class="soClass(props.row.OrderDeliveryFlag, 'text-center')" :rowspan="props.row.rowspanso">
                {{ props.row.OrderDate }}
              </q-td>
            </template>
            <q-td :class="soClass(props.row.OrderDeliveryFlag, 'text-center')" :rowspan="props.row.rowspanso">
              {{ props.row.OrderRequestDate }}
            </q-td>
            <q-td
              :class="soClass(props.row.OrderDeliveryFlag, 'text-center', props.row.DaysLeft)"
              :rowspan="props.row.rowspanso"
            >
              {{ props.row.DaysLeft }}
            </q-td>
            <q-td :class="soClass(props.row.OrderDeliveryFlag, 'text-center')" :rowspan="props.row.rowspanso">
              <q-input
                v-model="props.row.OrderPlanedDate"
                debounce="2000"
                dense
                borderless
                type="date"
                style="width: 85px"
                @update:model-value="updateplanDate(props.row.OrderNO, props.row.OrderLine, props.row.OrderPlanedDate)"
              />
            </q-td>
            <q-td :class="soClass(props.row.OrderDeliveryFlag, 'text-center')" :rowspan="props.row.rowspanso">
              <q-checkbox
                v-model="props.row.OrderDeliveryFlag"
                true-value="2"
                false-value="1"
                dense
                class="text-center"
                @update:model-value="
                  updateDeliveryReady(props.row.OrderNO, props.row.OrderLine, props.row.OrderDeliveryFlag)
                "
              />
            </q-td>
            <q-td :class="soClass(props.row.OrderDeliveryFlag, 'text-left')" :rowspan="props.row.rowspanso">
              <q-input
                v-model="props.row.ProjectNote"
                debounce="2000"
                dense
                borderless
                :disable="!props.row.TrackingNO"
                @update:model-value="updateTrackNote(props.row.TrackingNO, props.row.ProjectNote)"
              />
              <q-tooltip v-if="props.row.ProjectNote">
                {{ props.row.ProjectNote }}
              </q-tooltip>
            </q-td>
          </template>
          <!-- bom ------------------------------------------>
          <template v-if="props.row.showbom">
            <q-td :class="bomClass(props.row.OrderProductFlag)" :rowspan="props.row.rowspanbom">
              {{ props.row.BomPN }}
              <q-tooltip>
                {{ $t('ProjectNO') }}:{{ props.row.BomProjectNO }}<br />
                {{ $t('WorkerOrderNO') }}:{{ props.row.WorkOrderNO }}<br />
                {{ $t('BomSeq') }}:{{ props.row.BomSeq }}<br />
                {{ $t('BomDesc') }}:{{ props.row.BomDesc }}<br />
                {{ $t('Unit') }}:{{ props.row.BomUnit }}
              </q-tooltip>
            </q-td>
            <template v-if="showBomDetail">
              <q-td :class="bomClass(props.row.OrderProductFlag, 'text-center')" :rowspan="props.row.rowspanbom">
                {{ props.row.BomQTY }}
              </q-td>
              <q-td :class="bomClass(props.row.OrderProductFlag, 'text-center')" :rowspan="props.row.rowspanbom">
                {{ props.row.ShortQty }}
              </q-td>
              <q-td :class="bomClass(props.row.OrderProductFlag, 'text-center')" :rowspan="props.row.rowspanbom">
                {{ props.row.AllQty }}
              </q-td>
              <q-td :class="bomClass(props.row.OrderProductFlag, 'text-center')" :rowspan="props.row.rowspanbom">
                {{ props.row.AvaQty }}
              </q-td>
            </template>
          </template>
          <!-- purchase ------------------------------------------>
          <template v-if="props.row.showpo">
            <q-td :class="poClass(props.row.OrderProductFlag)" :rowspan="props.row.rowspanpo">
              {{ props.row.PurchaseNO }}
              <q-tooltip>
                {{ $t('Line') }}:{{ props.row.PurchaseLine }}<br />
                {{ $t('Purchaser') }}:{{ props.row.PurchaseUser }}
              </q-tooltip>
            </q-td>
            <template v-if="showPODetail">
              <q-td :class="poClass(props.row.OrderProductFlag)" :rowspan="props.row.rowspanpo">
                {{ props.row.PurchasePN }}
                <q-tooltip>
                  {{ props.row.PurchasePNDesc }}
                </q-tooltip>
              </q-td>
              <q-td :class="poClass(props.row.OrderProductFlag, 'text-center')" :rowspan="props.row.rowspanpo">
                {{ props.row.PurchaseQTY }}
              </q-td>
              <q-td :class="poClass(props.row.OrderProductFlag, 'text-center')" :rowspan="props.row.rowspanpo">
                {{ props.row.VendorCode }}
                <q-tooltip>
                  {{ props.row.VendorName }}
                </q-tooltip>
              </q-td>
            </template>
            <q-td :class="poClass(props.row.OrderProductFlag, 'text-center')" :rowspan="props.row.rowspanpo">
              {{ props.row.PurchaseDate }}
            </q-td>
            <q-td :class="poClass(props.row.OrderProductFlag, 'text-center')" :rowspan="props.row.rowspanpo">
              {{ props.row.PurchaseExpectDate }}
            </q-td>
            <q-td :class="poClass(props.row.OrderProductFlag, 'text-center')" :rowspan="props.row.rowspanpo">
              <q-input
                v-model="props.row.PurchaseAckDate"
                debounce="1000"
                mask="####-##-##"
                dense
                borderless
                type="date"
                style="width: 85px"
                v-if="props.row.PurchaseNO"
                @update:model-value="
                  updatePurchaseAckDate(props.row.PurchaseAckDate, props.row.PurchaseNO, props.row.PurchaseLine)
                "
              />
            </q-td>
            <q-td
              v-if="props.row.showso"
              :class="poClass(props.row.OrderProductFlag, 'text-center')"
              :rowspan="props.row.rowspanso"
            >
              <q-checkbox
                v-model="props.row.OrderSADFlag"
                true-value="2"
                false-value="1"
                dense
                class="text-center"
                @update:model-value="updateSADReady(props.row.OrderNO, props.row.OrderLine, props.row.OrderSADFlag)"
              />
            </q-td>
            <q-td :class="poClass(props.row.OrderProductFlag, 'text-left')" :rowspan="props.row.rowspanpo">
              <q-input
                v-model="props.row.PurchaseNote"
                debounce="2000"
                dense
                borderless
                :disable="!props.row.PurchaseNO"
                @update:model-value="
                  updateTrackNote(props.row.PurchaseNO + '_' + props.row.PurchaseLine, props.row.PurchaseNote)
                "
              />
              <q-tooltip v-if="props.row.PurchaseNote">
                {{ props.row.PurchaseNote }}
              </q-tooltip>
            </q-td>
          </template>
          <!-- receive ------------------------------------------>
          <template v-if="props.row.showra">
            <q-td :class="raClass(props.row.OrderProductFlag, 'text-left')" :rowspan="props.row.rowspanra">
              {{ props.row.ReceiptNO }}
              <q-tooltip v-if="props.row.Receipter">{{ $t('Receipter') }}:{{ props.row.Receipter }}<br /> </q-tooltip>
            </q-td>
            <q-td :class="raClass(props.row.OrderProductFlag, 'text-center')" :rowspan="props.row.rowspanra">
              {{ props.row.ReceiptQty }}
            </q-td>
            <q-td :class="raClass(props.row.OrderProductFlag, 'text-center')" :rowspan="props.row.rowspanra">
              {{ props.row.ReceiptDate }}
            </q-td>
          </template>
          <!-- NC ------------------------------------------>
          <template v-if="props.row.showso">
            <q-td :class="qcClass(props.row.OrderProductFlag, 'text-center')" :rowspan="props.row.rowspanso">
              <q-checkbox
                v-model="props.row.OrderProductFlag"
                true-value="2"
                false-value="1"
                dense
                class="text-center"
                @update:model-value="
                  updateProductReady(
                    props.row.TrackingNO,
                    props.row.OrderNO,
                    props.row.OrderLine,
                    props.row.OrderProductFlag
                  )
                "
              />
            </q-td>
          </template>
          <template v-if="props.row.shownc">
            <q-td :class="ncClass(props.row.OrderProductFlag)" :rowspan="props.row.rowspannc">
              {{ props.row.ClaimNO }}
              <q-tooltip v-if="props.row.ClaimProjectNO">
                {{ $t('ProjectNO') }}:{{ props.row.ClaimProjectNO }}<br />
                {{ $t('Comments') }}:{{ props.row.ClaimNote }}<br />
              </q-tooltip>
            </q-td>
            <q-td :class="ncClass(props.row.OrderProductFlag, 'q-gutter-xs')" :rowspan="props.row.rowspannc">
              <span
                v-for="idx in 12"
                :key="idx"
                :class="
                  props.row['ClaimNC' + (idx - 1) + 'Cri'] == 2
                    ? 'text-red'
                    : props.row['ClaimNC' + (idx - 1) + 'Cri'] == 1
                    ? 'text-blue'
                    : ''
                "
              >
                {{ props.row['ClaimNC' + (idx - 1) + 'Type'] }}
                <q-tooltip>
                  {{ props.row['ClaimNC' + (idx - 1) + 'Date'] }}:{{ props.row['ClaimNC' + (idx - 1) + 'Desc'] }}
                </q-tooltip>
              </span>
            </q-td>
          </template>
        </q-tr>
      </template>
    </q-table>
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-page>
</template>

<script setup>
import { axiosGet, axiosModify } from '@/assets/axiosActions'
import { ebus } from '@/assets/ebus'
import {
  updateSageDeliveryPlanDate,
  updateSageDeliveryReady,
  updateSageProductReady,
  updateSagePurchaseAckDate,
  updateSageSADReady
} from '@/assets/sageSvcs'
import { cloneDeep, filter, map, orderBy, uniq } from 'lodash'
import { SessionStorage } from 'quasar'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: String
})

// common vars
const { t } = useI18n()
const showLoading = ref(false)

// page vars
let data = []
const rows = ref([])
const columns = ref([])
const showSODetail = ref(false)
const showBomDetail = ref(true)
const showPODetail = ref(false)
const filterCustomer = ref('')
const filterSupplier = ref('')
const pagination = ref({
  sortBy: 'daysleft',
  descending: false,
  page: 1,
  rowsPerPage: 100,
  rowsNumber: 0
})
// computed vars
const visibleColumns = computed(() => {
  let cols = [
    '#',
    'trackingno',
    'ordertype',
    'orderpn',
    'orderqty',
    'orderrequestdate',
    'daysleft',
    'ordersadflag',
    'orderplaneddate',
    'projectnote',
    'orderdeliveryflag',
    'bompn',
    'purchaseno',
    'purchasedate',
    'purchaseexpectdate',
    'purchaseackdate',
    'purchasenote',
    'receiptno',
    'receiptqty',
    'receiptdate',
    'orderproductflag',
    'claimno',
    'ncdetail'
  ]
  if (showSODetail.value) {
    cols.push('orderpndesc', 'orderprice', 'ordercurrency', 'customercode', 'orderdate')
  }
  if (showBomDetail.value) {
    cols.push('bomqty', 'shortqty', 'allqty', 'avaqty')
  }
  if (showPODetail.value) {
    cols.push('purchasepn', 'purchaseqty', 'vendorcode')
  }

  return cols
})

// actions
const doUpdate = () => {
  if (!props.site) return

  showLoading.value = true

  axiosGet('/Data/TobeTracking?Site=' + props.site)
    .then((response) => {
      data = response
      updatePage({
        pagination: pagination.value
      })
    })
    .finally(() => {
      showLoading.value = false
    })
}

const getPageData = (startRow, count, sortBy, descending) => {
  let fdata = cloneDeep(data)
  // handle sortBy, sortBy is colname, using field to sort data
  if (sortBy) {
    const col = columns.value.find((element) => {
      return element.name === sortBy
    })

    descending ? (fdata = orderBy(fdata, [col.field], ['desc'])) : (fdata = orderBy(fdata, [col.field], ['asc']))
  } else {
    fdata = orderBy(fdata, ['DaysLeft', 'ItemNO'], ['asc', 'asc'])
  }

  if (filterCustomer.value.trim().length > 0) {
    fdata = filter(fdata, { CustomerCode: filterCustomer.value.trim() })
  }
  if (filterSupplier.value.trim().length > 0) {
    fdata = filter(fdata, { VendorCode: filterSupplier.value.trim() })
  }

  //return fdata.slice(startRow, startRow + count)
  let aa = filter(fdata, (element) => {
    return element.ItemNO > startRow && element.ItemNO <= startRow + count
  })
  return aa
}

const updatePage = (props) => {
  const { page, rowsPerPage, sortBy, descending } = props.pagination

  // update rowsCount with appropriate value
  const a = uniq(map(data, 'ItemNO'))
  pagination.value.rowsNumber = a.length

  // get all rows if "All" (0) is selected
  const fetchCount = rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage

  // calculate starting row of data
  const startRow = (page - 1) * rowsPerPage

  const returnedData = getPageData(startRow, fetchCount, sortBy, descending)

  // clear out existing data and add new
  rows.value.splice(0, rows.value.length, ...returnedData)

  // run span compute
  spanRows()

  // don't forget to update local pagination object
  pagination.value.page = page
  pagination.value.rowsPerPage = rowsPerPage
  pagination.value.sortBy = sortBy
  pagination.value.descending = descending
}

const sortData = () => {
  updatePage({
    pagination: pagination.value
  })
}

const reloadColumns = async () => {
  delete require.cache[require.resolve('@/components/todo/OpenSalesItemsColumns')]
  columns.value = require('@/components/todo/OpenSalesItemsColumns').default
}

const soClass = (val, cls, val2) => {
  return val === '2' ? (cls ? `bg-green ${cls}` : 'bg-green') : cls ? `bg-indigo-1 ${cls}` : 'bg-indigo-1'
}
const bomClass = (val, cls) => {
  return val === '2' ? (cls ? `bg-green ${cls}` : 'bg-green') : cls ? `bg-blue-grey-1 ${cls}` : 'bg-blue-grey-1'
}
const poClass = (val, cls) => {
  return val === '2' ? (cls ? `bg-green ${cls}` : 'bg-green') : cls ? `bg-blue-1 ${cls}` : 'bg-blue-1'
}
const raClass = (val, cls) => {
  return val === '2' ? (cls ? `bg-green ${cls}` : 'bg-green') : cls ? `bg-green-1 ${cls}` : 'bg-green-1'
}
const qcClass = (val, cls) => {
  return val === '2' ? (cls ? `bg-green ${cls}` : 'bg-green') : cls ? `bg-green-3 ${cls}` : 'bg-green-3'
}
const ncClass = (val, cls) => {
  return val === '2' ? (cls ? `bg-green ${cls}` : 'bg-green') : cls ? `bg-red-1 ${cls}` : 'bg-red-1'
}

const spanRows = () => {
  let rowsso = 1
  let rowsbom = 1
  let rowspo = 1
  let rowsra = 1
  let rowsnc = 1

  rows.value.forEach((row, index, rows) => {
    // fisrt row at every page
    if (index == 0) {
      row.showso = true
      row.showbom = true
      row.showpo = true
      row.showra = true
      row.shownc = true

      row.rowspanso = 1
      row.rowspanbom = 1
      row.rowspanpo = 1
      row.rowspanra = 1
      row.rowspannc = 1
    }

    // second row to end at every page
    if (index > 0) {
      // span so
      if (row.TrackingNO === rows[index - 1].TrackingNO) {
        row.showso = false
        rows[index - rowsso].rowspanso = rowsso + 1
        rowsso++
      } else {
        // new so line
        row.showso = true
        rowsso = 1
        row.rowspanso = 1
      }

      // span wo
      if (
        row.TrackingNO + row.BomPN === rows[index - 1].TrackingNO + rows[index - 1].BomPN &&
        row.BomSeq === rows[index - 1].BomSeq
      ) {
        row.showbom = false
        rows[index - rowsbom].rowspanbom = rowsbom + 1
        rowsbom++
      } else {
        // new bom line
        row.showbom = true
        rowsbom = 1
        row.rowspanbom = 1
      }

      // span po
      if (
        row.TrackingNO + row.BomPN + row.PurchaseNO ===
          rows[index - 1].TrackingNO + rows[index - 1].BomPN + rows[index - 1].PurchaseNO &&
        row.PurchaseLine === rows[index - 1].PurchaseLine
      ) {
        row.showpo = false
        rows[index - rowspo].rowspanpo = rowspo + 1
        rowspo++
      } else {
        // new po line
        row.showpo = true
        rowspo = 1
        row.rowspanpo = 1
      }

      // span ra
      if (
        row.TrackingNO + row.BomPN + row.PurchaseNO + row.ReceiptNO ===
          rows[index - 1].TrackingNO + rows[index - 1].BomPN + rows[index - 1].PurchaseNO + rows[index - 1].ReceiptNO &&
        row.ReceiptLine === rows[index - 1].ReceiptLine
      ) {
        row.showra = false
        rows[index - rowsra].rowspanra = rowsra + 1
        rowsra++
      } else {
        // new ra line
        row.showra = true
        rowsra = 1
        row.rowspanra = 1
      }

      // span nc
      if (
        row.TrackingNO + row.BomPN + row.PurchaseNO + row.ReceiptNO + row.ClaimNO ===
        rows[index - 1].TrackingNO +
          rows[index - 1].BomPN +
          rows[index - 1].PurchaseNO +
          rows[index - 1].ReceiptNO +
          rows[index - 1].ClaimNO
      ) {
        row.shownc = false
        rows[index - rowsnc].rowspannc = rowsnc + 1
        rowsnc++
      } else {
        // new nc line
        row.shownc = true
        rowsnc = 1
        row.rowspannc = 1
      }
    }
  })
}

/**
 * reset data value for specific filed
 */
const resetData = (searchField1, field1Value, searchField2, field2Value, resetField) => {
  // find origin json
  const origin = data.find((element) => {
    if (element[searchField1] === field1Value && element[searchField2] === field2Value) {
      return true
    } else {
      return false
    }
  })

  // reset all
  rows.value.forEach((element) => {
    if (element[searchField1] === field1Value && element[searchField2] === field2Value) {
      element[resetField] = origin[resetField]
    }
  })
}

/**
 * update span row data value for specific filed
 */
const updateSpanRowData = (searchField1, field1Value, searchField2, field2Value, setField) => {
  // find origin json
  const first = rows.value.find((element) => {
    if (element[searchField1] === field1Value && element[searchField2] === field2Value) {
      return true
    } else {
      return false
    }
  })

  // reset all
  rows.value.forEach((element) => {
    if (element[searchField1] === field1Value && element[searchField2] === field2Value) {
      element[setField] = first[setField]
    }
  })
}

const updateSADReady = async (orderno, line, ready) => {
  const rtn = await updateSageSADReady(orderno, line, ready)
  rtn
    ? updateSpanRowData('OrderNO', orderno, 'OrderLine', line, 'OrderSADFlag')
    : resetData('OrderNO', orderno, 'OrderLine', line, 'OrderSADFlag')
}

const updateDeliveryReady = async (orderno, line, ready) => {
  const rtn = await updateSageDeliveryReady(orderno, line, ready)
  rtn
    ? updateSpanRowData('OrderNO', orderno, 'OrderLine', line, 'OrderDeliveryFlag')
    : resetData('OrderNO', orderno, 'OrderLine', line, 'OrderDeliveryFlag')
}

const updateProductReady = async (trackingno, orderno, line, ready) => {
  const rtn = await updateSageProductReady(orderno, line, ready)
  rtn
    ? updateSpanRowData('OrderNO', orderno, 'OrderLine', line, 'OrderProductFlag')
    : resetData('OrderNO', orderno, 'OrderLine', line, 'OrderProductFlag')

  // sage doesn't have field for update name, so save to other database
  if (rtn) {
    const Note = ready === '2' ? 'QC PASS' : ''
    updateTrackNote(trackingno, Note)
  }
}

const updateplanDate = async (orderno, line, planDate) => {
  const rtn = await updateSageDeliveryPlanDate(orderno, line, planDate)
  rtn
    ? updateSpanRowData('OrderNO', orderno, 'OrderLine', line, 'OrderPlanedDate')
    : resetData('OrderNO', orderno, 'OrderLine', line, 'OrderPlanedDate')
}

const updatePurchaseAckDate = async (orderno, line, ackDate) => {
  const rtn = await updateSagePurchaseAckDate(orderno, line, ackDate)
  rtn
    ? updateSpanRowData('PurchaseNO', orderno, 'PurchaseLine', line, 'PurchaseAckDate')
    : resetData('PurchaseNO', orderno, 'PurchaseLine', line, 'PurchaseAckDate')
}

const updateTrackNote = (trackingCode, note) => {
  const name = SessionStorage.getItem('userProfiles').userName
  if (trackingCode) {
    axiosModify('/Data/TrackingNotes', { TrackCode: trackingCode }, { Note: note, NoteBy: name })
  }
}

// events
onMounted(() => {
  columns.value = require('@/components/todo/OpenSalesItemsColumns').default
  doUpdate()
})
ebus.on('changeLanguage', reloadColumns)
onBeforeUnmount(() => {
  ebus.off('changeLanguage', reloadColumns)
})
</script>

<style lang="scss" scopped>
/* backgroudn-color is very important */
/* set it to each th, td already */

/** frezon header exclude columns from nth */
thead tr th:nth-child(n + 3) {
  position: sticky;
  top: 0px;
  z-index: 1;
}
/** frezon header first left column */
thead tr th:first-child {
  position: sticky;
  left: 0px;
  top: 0px;
  z-index: 3;
}
/** frezon header second left column */
thead tr th:nth-child(2) {
  position: sticky;
  left: 25px;
  top: 0px;
  z-index: 3;
}
/** frezon body first left column */
tbody tr td:first-child {
  position: sticky;
  left: 0px;
  z-index: 2;
}
/** frezon body second left column */
/** added 'name frezon' to avoide rowspan issue */
tbody tr td:nth-child(2).frezon {
  position: sticky;
  left: 25px;
  z-index: 2;
}

/* let td smaller */
.q-table--dense .q-table th,
.q-table--dense .q-table td {
  padding: 0px 2px 0px 2px;
  font-size: 10px;
  height: 20px;
  min-width: 5px;
}
.q-field__native {
  font-size: 10px;
  padding: 0px;
  height: 20px;
  color: black;
}
.q-field--dense .q-field__control {
  height: 20px;
}

// first td left padding
.q-table--dense .q-table td:first-child,
.q-table--dense .q-table th:first-child {
  padding-left: 2px;
}
</style>
