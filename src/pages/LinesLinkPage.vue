<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-11-15 23:10:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-11-29 19:32:47
* @FilePath              : sage-assistant-web/src/pages/LinesLinkPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page :style-fn="$pageStore.setTabPageHeightStyle">
    <q-table
      id="LinkItems"
      dense
      flat
      bordered
      :rows="rows"
      :columns="columns"
      :visible-columns="visibleColumns"
      :rows-per-page-options="[50, 100, 200, 500, 1000, 0]"
      class="sticky-first-header-two-column-table"
      v-model:pagination="pagination"
      :loading="showLoading"
      @request="doUpdate"
    >
      <template v-slot:top>
        <div class="q-gutter-sm row">
          <q-btn dense flat icon="fas fa-download" color="primary" @click="download()" />
          <q-btn-toggle
            v-model="orderType"
            dense
            no-caps
            rounded
            unelevated
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
              { label: $t('S.SEARCH_SALES_ORDER_LINE'), value: 'SO' },
              { label: $t('S.SEARCH_PURCHASE_ORDER_LINE'), value: 'PO' }
            ]"
            @update:model-value="doUpdate()"
          />
          <q-input
            dense
            outlined
            debounce="1000"
            mask="date"
            type="date"
            class="col-1"
            :label="$t('S.FROM')"
            v-model="dateFrom"
            @update:model-value="updatePage(1)"
          />
          <q-input
            dense
            outlined
            debounce="1000"
            mask="date"
            type="date"
            class="col-1"
            :label="$t('S.TO')"
            v-model="dateTo"
            @update:model-value="updatePage(1)"
          />
          <q-input
            dense
            clearable
            outlined
            v-model="filterCustomer"
            :label="$t('F.Customer')"
            class="col-1"
            debounce="1000"
            @update:model-value="updatePage(1)"
          />

          <q-input
            dense
            clearable
            outlined
            v-model="filterSupplier"
            :label="$t('F.Vendor')"
            class="col-1"
            style="height: 20px"
            debounce="1000"
            @update:model-value="updatePage(1)"
          />
          <q-input
            dense
            clearable
            outlined
            v-model="filterProjectNO"
            :label="$t('F.ProjectNO')"
            class="col-1"
            style="height: 20px; width: 200px"
            debounce="1000"
            @update:model-value="updatePage(1)"
          />
          <q-item>{{ $t('S.PROJECT0001_LOOK_RANGE') }}</q-item>
        </div>
      </template>
      <template v-slot:body-cell-idx="props">
        <q-td class="text-center bg-white frozen" style="padding: 0px"> {{ props.row['idx'] }}</q-td>
      </template>
      <template v-slot:body-cell-ordertrackingno="props">
        <q-td class="text-left bg-white frozen" style="padding: 0px">
          <template v-for="(so, idx) in props.row['SO']" :key="idx"> {{ so['orderTrackingNO'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-orderno="props">
        <q-td>
          <template v-for="(so, idx) in props.row['SO']" :key="idx"> {{ so['orderNO'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-orderline="props">
        <q-td>
          <template v-for="(so, idx) in props.row['SO']" :key="idx"> {{ so['orderLine'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-ordercustomercode="props">
        <q-td>
          <template v-for="(so, idx) in props.row['SO']" :key="idx"> {{ so['orderCustomerCode'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-orderdate="props">
        <q-td>
          <template v-for="(so, idx) in props.row['SO']" :key="idx"> {{ so['orderDate'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-orderpn="props">
        <q-td>
          <template v-for="(so, idx) in props.row['SO']" :key="idx"> {{ so['orderPN'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-orderpndescription="props">
        <q-td>
          <template v-for="(so, idx) in props.row['SO']" :key="idx"> {{ so['orderPNDescription'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-orderqty="props">
        <q-td>
          <template v-for="(so, idx) in props.row['SO']" :key="idx"> {{ so['orderQty'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-orderunit="props">
        <q-td>
          <template v-for="(so, idx) in props.row['SO']" :key="idx"> {{ so['orderUnit'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-orderamount="props">
        <q-td>
          <template v-for="(so, idx) in props.row['SO']" :key="idx"> {{ so['orderAmount'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-ordercurrency="props">
        <q-td>
          <template v-for="(so, idx) in props.row['SO']" :key="idx"> {{ so['orderCurrency'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-orderstatus="props">
        <q-td>
          <template v-for="(so, idx) in props.row['SO']" :key="idx"> {{ so['orderStatus'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-purchaseno="props">
        <q-td>
          <template v-for="(po, idx) in props.row['PO']" :key="idx"> {{ po['purchaseNO'] }}<br /> </template>
        </q-td>
      </template>

      <template v-slot:body-cell-purchaseline="props">
        <q-td>
          <template v-for="(po, idx) in props.row['PO']" :key="idx"> {{ po['purchaseLine'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-purchasedate="props">
        <q-td>
          <template v-for="(po, idx) in props.row['PO']" :key="idx"> {{ po['purchaseDate'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-purchasepn="props">
        <q-td>
          <template v-for="(po, idx) in props.row['PO']" :key="idx"> {{ po['purchasePN'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-purchasepndescription="props">
        <q-td>
          <template v-for="(po, idx) in props.row['PO']" :key="idx"> {{ po['purchasePNDescription'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-purchaseqty="props">
        <q-td>
          <template v-for="(po, idx) in props.row['PO']" :key="idx"> {{ po['purchaseQty'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-purchaseunit="props">
        <q-td>
          <template v-for="(po, idx) in props.row['PO']" :key="idx"> {{ po['purchaseUnit'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-purchaseamount="props">
        <q-td>
          <template v-for="(po, idx) in props.row['PO']" :key="idx"> {{ po['purchaseAmount'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-purchasecurrency="props">
        <q-td>
          <template v-for="(po, idx) in props.row['PO']" :key="idx"> {{ po['purchaseCurrency'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-purchasevendorcode="props">
        <q-td>
          <template v-for="(po, idx) in props.row['PO']" :key="idx"> {{ po['purchaseVendorCode'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-receiptno="props">
        <q-td>
          <template v-for="(ra, idx) in props.row['RA']" :key="idx"> {{ ra['receiptNO'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-receiptline="props">
        <q-td>
          <template v-for="(ra, idx) in props.row['RA']" :key="idx"> {{ ra['receiptLine'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-receiptdate="props">
        <q-td>
          <template v-for="(ra, idx) in props.row['RA']" :key="idx"> {{ ra['receiptDate'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-receiptpn="props">
        <q-td>
          <template v-for="(ra, idx) in props.row['RA']" :key="idx"> {{ ra['receiptPN'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-receiptpndescription="props">
        <q-td>
          <template v-for="(ra, idx) in props.row['RA']" :key="idx"> {{ ra['receiptPNDescription'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-receiptqty="props">
        <q-td>
          <template v-for="(ra, idx) in props.row['RA']" :key="idx"> {{ ra['receiptQty'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-receiptunit="props">
        <q-td>
          <template v-for="(ra, idx) in props.row['RA']" :key="idx"> {{ ra['receiptUnit'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-receiptamount="props">
        <q-td>
          <template v-for="(ra, idx) in props.row['RA']" :key="idx"> {{ ra['receiptAmount'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-receiptcurrency="props">
        <q-td>
          <template v-for="(ra, idx) in props.row['RA']" :key="idx"> {{ ra['receiptCurrency'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-receiptvendorcode="props">
        <q-td>
          <template v-for="(ra, idx) in props.row['RA']" :key="idx"> {{ ra['receiptVendorCode'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-deliveryno="props">
        <q-td>
          <template v-for="(dl, idx) in props.row['DL']" :key="idx"> {{ dl['deliveryNO'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-deliveryline="props">
        <q-td>
          <template v-for="(dl, idx) in props.row['DL']" :key="idx"> {{ dl['deliveryLine'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-deliverydate="props">
        <q-td>
          <template v-for="(dl, idx) in props.row['DL']" :key="idx"> {{ dl['deliveryDate'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-deliverypn="props">
        <q-td>
          <template v-for="(dl, idx) in props.row['DL']" :key="idx"> {{ dl['deliveryPN'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-deliverypndescription="props">
        <q-td>
          <template v-for="(dl, idx) in props.row['DL']" :key="idx"> {{ dl['deliveryPNDescription'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-deliveryqty="props">
        <q-td>
          <template v-for="(dl, idx) in props.row['DL']" :key="idx"> {{ dl['deliveryQty'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-deliveryunit="props">
        <q-td>
          <template v-for="(dl, idx) in props.row['DL']" :key="idx"> {{ dl['deliveryUnit'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-invoiceno="props">
        <q-td>
          <template v-for="(iv, idx) in props.row['IV']" :key="idx"> {{ iv['invoiceNO'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-invoiceline="props">
        <q-td>
          <template v-for="(iv, idx) in props.row['IV']" :key="idx"> {{ iv['invoiceLine'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-invoicedate="props">
        <q-td>
          <template v-for="(iv, idx) in props.row['IV']" :key="idx"> {{ iv['invoiceDate'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-invoicepn="props">
        <q-td>
          <template v-for="(iv, idx) in props.row['IV']" :key="idx"> {{ iv['invoicePN'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-invoicepndescription="props">
        <q-td>
          <template v-for="(iv, idx) in props.row['IV']" :key="idx"> {{ iv['invoicePNDescription'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-invoiceqty="props">
        <q-td>
          <template v-for="(iv, idx) in props.row['IV']" :key="idx"> {{ iv['invoiceQty'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-invoiceunit="props">
        <q-td>
          <template v-for="(iv, idx) in props.row['IV']" :key="idx"> {{ iv['invoiceUnit'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-invoiceamount="props">
        <q-td>
          <template v-for="(iv, idx) in props.row['IV']" :key="idx"> {{ iv['invoiceAmount'] }}<br /> </template>
        </q-td>
      </template>
      <template v-slot:body-cell-invoicecurrency="props">
        <q-td>
          <template v-for="(iv, idx) in props.row['IV']" :key="idx"> {{ iv['invoiceCurrency'] }}<br /> </template>
        </q-td>
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
  </q-page>
</template>

<script setup>
import { axiosGet } from '@/assets/axiosActions'
import { tableToExcel } from '@/assets/dataUtils'
import { date } from 'quasar'
import { computed, onMounted, ref, shallowRef, watch } from 'vue'

import { usePageStore } from '@/stores/PageStore'
import { storeToRefs } from 'pinia'
const $pageStore = usePageStore()

// computed vars
const heightStyle = computed(() => {
  return { height: `${$pageStore.getTabPageDomHeight(56 + 10)}px` }
})

// page vars
const { site } = storeToRefs($pageStore)

// common vars
const showLoading = ref(false)

// page vars
const orderType = ref('SO')
const { formatDate, addToDate } = date
const nowTimeStamp = Date.now()
const fromTimeStamp = addToDate(nowTimeStamp, { years: -2 })
const dateFrom = ref(formatDate(fromTimeStamp, 'YYYY-MM-DD'))
const dateTo = ref(formatDate(nowTimeStamp, 'YYYY-MM-DD'))

// page vars
let data = []
const filterCustomer = ref('')
const filterSupplier = ref('')
const filterProjectNO = ref('')

const pagination = ref({
  page: 1,
  rowsPerPage: 100,
  rowsNumber: 0
})

const columns = ref(require('@/components/linkItems/linkItemsFields').default)

// add name and sortable
let AllHeader = []
columns.value.forEach((item, idx, array) => {
  array[idx].name = item.field.toLowerCase()
  AllHeader.push(item.field)
})
const rows = shallowRef([])

// computed vars
const finalHeader = computed(() => {
  let Header = AllHeader
  return Header
})
const visibleColumns = computed(() => {
  let cols = []
  finalHeader.value.forEach((item) => {
    cols.push(item.toLowerCase())
  })
  return cols
})

const reloadColumns = async () => {
  delete require.cache[require.resolve('@/components/linkItems/linkItemsFields')]
  columns.value = require('@/components/linkItems/linkItemsFields').default
}

// actions
const getData = (url) => {
  return axiosGet(url)
    .then(
      (response) => {
        return response
      },
      () => {
        return []
      }
    )
    .catch((err) => {
      console.error(err)
      return []
    })
}

const doUpdate = (requestProp) => {
  if (!props.site) return

  showLoading.value = true

  // if doesn't passing pagination, use preset pagination
  const { page, rowsPerPage, rowsNumber } =
    requestProp && requestProp.pagination ? requestProp.pagination : pagination.value
  const Offset = (page - 1) * rowsPerPage || 0
  // get all rows if "ALL" (0) is selected
  const Limit = rowsPerPage === 0 ? rowsNumber : rowsPerPage

  const siteClause = `Site=${props.site}`
  const orderTypeClause = orderType.value ? `&OrderType=${orderType.value}` : ''
  const customerClause = filterCustomer.value ? `&CustomerCode=${filterCustomer.value}` : ''
  const vendorClause = filterSupplier.value ? `&VendorCode=${filterSupplier.value}` : ''
  const projectNOClause = filterProjectNO.value ? `&ProjectNO=${filterProjectNO.value}` : ''
  const dateRangeClause = `&DateFrom=${dateFrom.value}&DateTo=${dateTo.value}`
  const offsetClause = `&Offset=${Offset}`
  const limitClause = `&Limit=${Limit}`

  const queryClause = `${siteClause}${orderTypeClause}${customerClause}${vendorClause}${projectNOClause}${dateRangeClause}${offsetClause}${limitClause}`

  Promise.all([
    getData(`/Data/LinksSalesLine?${queryClause}`),
    getData(`/Data/LinksPurchaseLine?${queryClause}`),
    getData(`/Data/LinksReceiptLine?${queryClause}`),
    getData(`/Data/LinksDeliveryLine?${queryClause}`),
    getData(`/Data/LinksInvoiceLine?${queryClause}`),
    getData(`/Data/LinksLineCnt?${queryClause}`)
  ])
    .then((dataArray) => {
      data = mergeData(dataArray[0], dataArray[1], dataArray[2], dataArray[3], dataArray[4])

      rows.value = data
      // don't forget to update local pagination object
      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.rowsNumber = parseInt(dataArray[5])
    })
    .finally(() => {
      showLoading.value = false
    })
}

const mergeData = (SO, PO, RA, DL, IV) => {
  let data = []
  if (orderType.value === 'SO') {
    for (let i = 0; i < SO.length; i++) {
      let SOPO = []
      for (let j = 0; j < PO.length; j++) {
        if (
          // to avoid undefined projectNO
          PO[j]['purchaseProjectNO'] &&
          (SO[i]['orderProjectNO'] === PO[j]['purchaseProjectNO'] ||
            SO[i]['orderTrackingNO'] === PO[j]['purchaseProjectNO'])
        ) {
          SOPO.push(PO[j])
        }
      }

      let SORA = []

      for (let j = 0; j < RA.length; j++) {
        // to avoid undefined projectNO

        if (
          RA[j]['receiptProjectNO'] &&
          (SO[i]['orderProjectNO'] === RA[j]['receiptProjectNO'] ||
            SO[i]['orderTrackingNO'] === RA[j]['receiptProjectNO'])
        ) {
          SORA.push(RA[j])
        }
      }

      let SODL = []
      for (let j = 0; j < DL.length; j++) {
        if (
          SO[i]['orderProjectNO'] === DL[j]['deliveryProjectNO'] ||
          SO[i]['orderTrackingNO'] === DL[j]['deliveryProjectNO']
        ) {
          SODL.push(DL[j])
        }
      }

      let SOIV = []
      for (let j = 0; j < IV.length; j++) {
        if (
          SO[i]['orderProjectNO'] === IV[j]['invoiceProjectNO'] ||
          SO[i]['orderTrackingNO'] === IV[j]['invoiceProjectNO']
        ) {
          SOIV.push(IV[j])
        }
      }

      data.push({ idx: i + 1, SO: [SO[i]], PO: SOPO, RA: SORA, DL: SODL, IV: SOIV })
    }
    return data
  } else {
    for (let i = 0; i < PO.length; i++) {
      let SOPO = []
      for (let j = 0; j < SO.length; j++) {
        if (
          // to avoid undefined projectNO
          PO[j]['purchaseProjectNO'] &&
          (SO[i]['orderProjectNO'] === PO[j]['purchaseProjectNO'] ||
            SO[i]['orderTrackingNO'] === PO[j]['purchaseProjectNO'])
        ) {
          SOPO.push(PO[j])
        }
      }

      let PORA = []

      for (let j = 0; j < RA.length; j++) {
        // to avoid undefined projectNO

        if (RA[j]['receiptProjectNO'] && PO[i]['purchaseProjectNO'] === RA[j]['receiptProjectNO']) {
          PORA.push(RA[j])
        }
      }

      let PODL = []
      for (let j = 0; j < DL.length; j++) {
        if (PO[j]['purchaseProjectNO'] === DL[j]['deliveryProjectNO']) {
          PODL.push(DL[j])
        }
      }

      let POIV = []
      for (let j = 0; j < IV.length; j++) {
        if (PO[j]['purchaseProjectNO'] === IV[j]['invoiceProjectNO']) {
          POIV.push(IV[j])
        }
      }

      data.push({ idx: i + 1, SO: SOPO, PO: [PO[i]], RA: PORA, DL: PODL, IV: POIV })
    }

    return data
  }
}

const download = () => {
  tableToExcel('LinkItems', 'LinkItems')
}

const updatePage = (page) => {
  pagination.value.page = page
  doUpdate()
}

// events
onMounted(() => {
  doUpdate({
    pagination: pagination.value
  })
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)
  doUpdate({
    pagination: pagination.value
  })
})
</script>
