<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-02-08 09:42:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-09-02 23:57:42
* @FilePath              : sage-assistant-web/src/components/todo/OpenSaleItems.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

/* eslint-disable no-tabs */
<template>
  <q-table
    dense
    flat
    bordered
    virtual-scroll
    :virtual-scroll-item-size="20"
    :virtual-scroll-slice-size="50"
    :virtual-scroll-slice-ratio-before="0.5"
    :virtual-scroll-slice-ratio-after="0.5"
    :rows="rows"
    :columns="columns"
    :visible-columns="visibleColumns"
    :rows-per-page-options="[10, 20, 50, 100, 200, 500, 1000]"
    class="mini"
    v-model:pagination="pagination"
    @request="doUpdate"
  >
    <!-- table top ---------------------------------------------------------------------------------->
    <template v-slot:top>
      <div class="q-gutter-sm row">
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
            { label: $t('S.NORMAL_ORDER'), value: 'NOR' },
            { label: $t('S.OTHER_ORDER'), value: 'OTHER' }
          ]"
          @update:model-value="doUpdate()"
          ><q-tooltip>REPAIR:{{ $t('S.DESC_OF OTHER_ORDER') }}</q-tooltip>
        </q-btn-toggle>
        <q-separator vertical />
        <q-toggle dense v-model="showSODetail" :label="$t('S.SHOW_SALES_DETAILS')" />
        <q-toggle dense v-model="showSOComment" :label="$t('S.SHOW_SALES_COMMENT')" />
        <q-toggle dense v-model="showBomDetail" :label="$t('S.SHOW_BOM_DETAILS')" />
        <q-toggle dense v-model="showPODetail" :label="$t('S.SHOW_PURCHASE_DETAILS')" />
        <q-separator vertical />

        <q-input
          dense
          v-model="filterCustomer"
          outlined
          :label="$t('F.Customer')"
          class="col-1"
          debounce="1000"
          @update:model-value="updatePage(1)"
        />

        <q-input
          dense
          v-model="filterSupplier"
          outlined
          :label="$t('F.Vendor')"
          class="col-1"
          style="height: 20px"
          debounce="1000"
          @update:model-value="updatePage(1)"
        />
        <q-input
          dense
          v-model="filterProjectNO"
          outlined
          :label="$t('F.ProjectNO')"
          class="col-1"
          style="height: 20px"
          debounce="1000"
          @update:model-value="updatePage(1)"
        />
      </div>
    </template>
    <!-- table header ---------------------------------------------------------------------------------->
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props"> {{ col.label }}</q-th>
      </q-tr>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props" :class="props.row.itemNO % 2 == 0 ? 'strip' : ''">
        <q-td class="text-center bg-white frozen"> {{ props.row.itemNO }}:{{ props.rowIndex + 1 }} </q-td>
        <!-- order ------------------------------------------>
        <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)} frozen`">
          {{ props.row.trackingNO }}
        </q-td>
        <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)}`">
          {{ props.row.projectNO == props.row.trackingNO ? '' : props.row.projectNO }}
        </q-td>
        <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)}`">
          {{ props.row.orderType }}
        </q-td>
        <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)}`">
          {{ props.row.orderPN }}
          <q-tooltip>
            {{ props.row.orderPNDesc }}
          </q-tooltip>
        </q-td>
        <template v-if="showSODetail">
          <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)}`">
            {{ props.row.orderPNDesc }}
          </q-td>
        </template>
        <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)} text-center`">
          {{ props.row.orderQTY }}
        </q-td>
        <template v-if="showSODetail">
          <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)} text-right`">
            {{ props.row.orderPrice }}
          </q-td>
          <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)} text-center`">
            {{ props.row.orderCurrency }}
          </q-td>
          <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)} text-center`">
            {{ props.row.customerCode }}
            <q-tooltip>
              {{ props.row.customerName }}
            </q-tooltip>
          </q-td>
          <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)}`">
            {{ props.row.orderDate }}
          </q-td>
        </template>
        <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)}`">
          {{ props.row.orderRequestDate }}
        </q-td>
        <q-td :class="`${orderStyle(props.row.orderDeliveryFlag, props.row.daysLeft)} text-center`">
          {{ props.row.daysLeft }}
        </q-td>
        <q-td
          :class="
            props.row.orderPlanedDate > props.row.orderRequestDate
              ? 'bg-red' /*  over due already */
              : orderStyle(props.row.orderDeliveryFlag)
          "
        >
          <q-input
            v-model="props.row.orderPlanedDate"
            debounce="1000"
            dense
            type="date"
            @update:model-value="updatePlanDate(props.row.orderNO, props.row.orderLine, props.row.orderPlanedDate)"
          />
        </q-td>
        <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)} text-center`">
          <q-checkbox
            v-model="props.row.orderDeliveryFlag"
            true-value="2"
            false-value="1"
            dense
            class="text-center"
            @update:model-value="
              updateDeliveryReady(props.row.orderNO, props.row.orderLine, props.row.orderDeliveryFlag)
            "
          />
        </q-td>
        <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)}`">
          <q-select
            v-model="props.row.projectStatus"
            :options="optionsProjectStatus"
            map-options
            debounce="1000"
            dense
            options-dense
            @update:model-value="updateProjectStatus(props.row.orderNO, props.row.orderLine, props.row.projectStatus)"
          />
        </q-td>
        <template v-if="showSOComment">
          <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)}`">
            <q-select
              v-model="props.row.projectBlockReason"
              :options="optionsProjectBlockReason"
              map-options
              debounce="1000"
              dense
              options-dense
              @update:model-value="
                updateProjectBlockReason(props.row.orderNO, props.row.orderLine, props.row.projectBlockReason)
              "
            />
          </q-td>
          <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)}`">
            <q-input
              v-model="props.row.projectComment"
              debounce="1000"
              dense
              @update:model-value="
                updateProjectComment(props.row.orderNO, props.row.orderLine, props.row.projectComment)
              "
            />
            <q-tooltip v-if="props.row.projectComment">
              {{ props.row.projectComment }}
            </q-tooltip>
          </q-td>
          <q-td :class="`${orderStyle(props.row.orderDeliveryFlag)}`">
            <q-input
              v-model="props.row.projectAction"
              debounce="1000"
              dense
              @update:model-value="updateProjectAction(props.row.orderNO, props.row.orderLine, props.row.projectAction)"
            />
            <q-tooltip v-if="props.row.projectAction">
              {{ props.row.projectAction }}
            </q-tooltip>
          </q-td>
        </template>
        <!-- bom ------------------------------------------>
        <q-td :class="`${bomStyle(props.row.orderDeliveryFlag)}`">
          {{ props.row.bomPN }}
          <q-tooltip>
            {{ $t('F.ProjectNO') }}:{{ props.row.bomProjectNO }}<br />
            {{ $t('F.WorkerOrderNO') }}:{{ props.row.workOrderNO }}<br />
            {{ $t('F.BomSeq') }}:{{ props.row.bomSeq }}<br />
            {{ $t('F.BomDesc') }}:{{ props.row.bomDesc }}<br />
            {{ $t('F.Unit') }}:{{ props.row.bomUnit }}
          </q-tooltip>
        </q-td>
        <template v-if="showBomDetail">
          <q-td :class="`${bomStyle(props.row.orderDeliveryFlag)}`">
            {{ props.row.bomQTY }}
          </q-td>
          <q-td :class="`${bomStyle(props.row.orderDeliveryFlag)}`">
            {{ props.row.shortQty }}
          </q-td>
          <q-td :class="`${bomStyle(props.row.orderDeliveryFlag)}`">
            {{ props.row.allQty }}
          </q-td>
          <q-td :class="`${bomStyle(props.row.orderDeliveryFlag)}`">
            {{ props.row.avaQty }}
          </q-td>
        </template>
        <!-- purchase ------------------------------------------>
        <q-td :class="`${purchaseStyle(props.row.orderSADFlag)}`">
          {{ props.row.purchaseNO }}
          <q-tooltip>
            {{ $t('F.Purchaser') }}:{{ props.row.purchaseUser }}
            <br />
            {{ $t('S.Purchase PN must match BomPN or SalesPN') }}
          </q-tooltip>
        </q-td>
        <q-td :class="`${purchaseStyle(props.row.orderSADFlag)}`">
          {{ props.row.purchaseLine }}
        </q-td>
        <template v-if="showPODetail">
          <q-td :class="`${purchaseStyle(props.row.orderSADFlag)}`">
            {{ props.row.purchasePN }}
            <q-tooltip>
              {{ props.row.purchasePNDesc }}
            </q-tooltip>
          </q-td>
          <q-td :class="`${purchaseStyle(props.row.orderSADFlag)} text-center`">
            {{ props.row.purchaseQTY }}
          </q-td>
          <q-td :class="`${purchaseStyle(props.row.orderSADFlag)} text-center`">
            {{ props.row.vendorCode }}
            <q-tooltip>
              {{ props.row.vendorName }}
            </q-tooltip>
          </q-td>
        </template>
        <q-td :class="`${purchaseStyle(props.row.orderSADFlag)} text-center`">
          {{ props.row.purchaseDate }}
        </q-td>
        <q-td
          :class="
            props.row.purchaseExpectDate === undefined ||
            props.row.purchaseExpectDate === '1900-01-01' ||
            props.row.purchaseExpectDate > props.row.orderRequestDate
              ? 'bg-red' /* over due already */
              : `${purchaseStyle(props.row.orderSADFlag)} text-center`
          "
        >
          {{ props.row.purchaseExpectDate }}
        </q-td>
        <q-td
          :class="
            props.row.purchaseAckDate === undefined
              ? purchaseStyle(props.row.orderSADFlag)
              : props.row.purchaseAckDate === undefined ||
                props.row.purchaseAckDate === '1900-01-01' ||
                props.row.purchaseAckDate > props.row.orderRequestDate ||
                props.row.purchaseAckDate > props.row.purchaseExpectDate
              ? 'bg-red' /* over due already */
              : purchaseStyle(props.row.orderSADFlag)
          "
        >
          <q-input
            v-model="props.row.purchaseAckDate"
            debounce="1000"
            dense
            type="date"
            v-if="props.row.purchaseNO"
            @update:model-value="
              updatePurchaseAckDate(props.row.purchaseAckDate, props.row.purchaseNO, props.row.purchaseLine)
            "
          />
        </q-td>
        <q-td :class="`${purchaseStyle(props.row.orderSADFlag)} text-center`">
          <q-checkbox
            v-model="props.row.orderSADFlag"
            true-value="2"
            false-value="1"
            dense
            class="text-center"
            @update:model-value="updateSADReady(props.row.orderNO, props.row.orderLine, props.row.orderSADFlag)"
          >
            <q-tooltip>
              {{ props.row.orderSADDate }}
            </q-tooltip>
          </q-checkbox>
        </q-td>
        <template v-if="showPODetail">
          <q-td :class="`${purchaseStyle(props.row.orderSADFlag)}`">
            <q-input
              v-model="props.row.purchaseComment"
              dense
              :disable="!props.row.purchaseNO"
              @update:model-value="
                updatePurchaseComment(props.row.purchaseNO + '_' + props.row.purchaseLine, props.row.purchaseComment)
              "
            />
            <q-tooltip v-if="props.row.purchaseComment">
              {{ props.row.purchaseComment }}
            </q-tooltip>
          </q-td>
        </template>
        <!-- receive ------------------------------------------>
        <q-td :class="`${receiveStyle(props.row.orderProductFlag)}`">
          {{ props.row.receiptNO }}
          <q-tooltip v-if="props.row.receiptor">{{ $t('F.Receiptor') }}:{{ props.row.receiptor }}<br /> </q-tooltip>
        </q-td>
        <q-td :class="`${receiveStyle(props.row.orderProductFlag)} text-center`">
          {{ props.row.receiptQty }}
        </q-td>
        <q-td
          :class="
            props.row.purchaseNO === undefined
              ? /* No PO */ receiveStyle(props.row.orderProductFlag)
              : /* With PO */ props.row.receiptDate === undefined
              ? /* With PO, NO RA */
                getDateDiff(Date(props.row.purchaseExpectDate), Date.now(), 'days') < 0
                ? 'bg-red'
                : receiveStyle(props.row.orderProductFlag)
              : /* With PO, with RA */
              props.row.receiptDate > props.row.purchaseExpectDate
              ? 'bg-red' // if over due
              : receiveStyle(props.row.orderProductFlag)
          "
        >
          {{ props.row.receiptDate }}
        </q-td>
        <!-- QC ------------------------------------------>
        <q-td :class="`${qcStyle(props.row.orderProductFlag)} text-center`">
          <q-checkbox
            v-model="props.row.orderProductFlag"
            true-value="2"
            false-value="1"
            dense
            class="text-center"
            @update:model-value="updateProductReady(props.row.orderNO, props.row.orderLine, props.row.orderProductFlag)"
          />
        </q-td>
        <q-td
          :class="
            props.row.orderProductDate > props.row.orderRequestDate
              ? 'bg-red text-center'
              : `${qcStyle(props.row.orderProductFlag)} text-center`
          "
        >
          {{ props.row.orderProductDate }}
        </q-td>
        <!-- QA ------------------------------------------>
        <q-td :class="`${qaStyle(props.row.orderProductFlag)} text-center`">
          <div v-for="qa in props.row.QA" :key="qa.claimNO">
            {{ qa.claimNO }}
            <q-tooltip v-if="qa.claimProjectNO">
              {{ $t('F.ProjectNO') }}:{{ qa.claimProjectNO }}<br />
              {{ $t('F.Comments') }}:{{ qa.claimNote }}<br />
            </q-tooltip>
          </div>
        </q-td>
        <q-td :class="`${qaStyle(props.row.orderProductFlag)} q-gutter-xs`">
          <template v-for="qa in props.row.QA" :key="qa.claimNO">
            <template v-for="idx in 12" :key="idx">
              <span
                v-if="qa['claimNC' + (idx - 1) + 'Type'].trim().length > 0"
                :class="
                  qa['claimNC' + (idx - 1) + 'Cri'] == 2
                    ? 'text-red'
                    : qa['claimNC' + (idx - 1) + 'Cri'] == 1
                    ? 'text-blue'
                    : ''
                "
              >
                {{ qa['claimNC' + (idx - 1) + 'Type'] }}
                <q-tooltip>
                  {{ qa['claimNC' + (idx - 1) + 'Date'] }}
                  <br />
                  {{ qa.claimNO }}
                  <br />
                  {{ qa['claimNC' + (idx - 1) + 'Desc'] }}
                </q-tooltip>
              </span>
            </template>
          </template>
        </q-td>
      </q-tr>
    </template>
    <template v-slot:pagination="props">
      {{ $t('S.TRACKING_LINES') }}: {{ rows.length }}
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
    <q-inner-loading :showing="showLoading">
      <q-spinner-ios size="50px" color="primary" />
    </q-inner-loading>
  </q-table>
</template>

<script setup>
import { axios } from '@/assets/axios'
import { axiosGet } from '@/assets/axiosActions'
import { date } from 'quasar'
import { computed, inject, onMounted, ref, shallowRef, watch } from 'vue'
import { optionsProjectBlockReason, optionsProjectStatus } from './OpenSalesItemsSelectOptions'
const { getDateDiff } = date

const props = defineProps({
  site: String
})

// common vars
const showLoading = ref(false)
const ebus = inject('ebus')

// page vars
let data = []
const rows = shallowRef([])
const columns = require('@/components/todo/OpenSalesItemsColumns').default
const orderType = ref('NOR')
const showSODetail = ref(true)
const showSOComment = ref(false)
const showBomDetail = ref(true)
const showPODetail = ref(true)
const filterCustomer = ref('')
const filterSupplier = ref('')
const filterProjectNO = ref('')

const pagination = ref({
  sortBy: 'daysLeft',
  descending: false,
  page: 1,
  rowsPerPage: 100,
  rowsNumber: 0
})

// computed vars
const visibleColumns = computed(() => {
  // field definition required = true, will always shown
  let cols = []
  showSODetail.value ? cols.push('orderpndesc', 'orderprice', 'ordercurrency', 'customercode', 'orderdate') : ''
  showSOComment.value ? cols.push('projectblockreason', 'projectcomment', 'projectaction') : ''
  showBomDetail.value ? cols.push('bomqty', 'shortqty', 'allqty', 'avaqty') : ''
  showPODetail.value ? cols.push('purchasepn', 'purchaseqty', 'vendorcode', 'purchasecomment') : ''

  return cols
})

// styles
const orderStyle = (flag, daysLeft) => {
  if (daysLeft == undefined) {
    return flag === '2' ? 'bg-green' : 'bg-indigo-1'
  } else {
    return daysLeft <= 0
      ? 'bg-red' /* <0 over due already */
      : daysLeft > 0 && daysLeft <= 7
      ? 'bg-yellow' /* 1 week left */
      : daysLeft > 7 && daysLeft < 30
      ? 'bg-yellow-5' /* 1 month left */
      : flag === '2'
      ? 'bg-green' /* more than 1 week and delivery ready */
      : 'bg-indigo-1' /* more than 1 week and delivery not ready */
  }
}
const bomStyle = (flag) => {
  return flag === '2' ? 'bg-green text-center' : 'bg-blue-grey-1 text-center'
}
const purchaseStyle = (flag) => {
  return flag === '2' ? 'bg-green' : 'bg-blue-1'
}
const receiveStyle = (flag) => {
  return flag === '2' ? 'bg-green' : 'bg-green-1'
}
const qcStyle = (flag) => {
  return flag === '2' ? 'bg-green' : 'bg-green-3'
}
const qaStyle = (flag) => {
  return flag === '2' ? 'bg-green' : 'bg-red-1'
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
  const { page, rowsPerPage, rowsNumber, sortBy, descending } =
    requestProp && requestProp.pagination ? requestProp.pagination : pagination.value
  const Offset = (page - 1) * rowsPerPage || 0
  // get all rows if "ALL" (0) is selected
  const Limit = rowsPerPage === 0 ? rowsNumber : rowsPerPage

  const siteClause = `Site=${props.site}`
  const orderTypeClause = orderType.value ? `&OrderType=${orderType.value}` : ''
  const customerClause = filterCustomer.value ? `&CustomerCode=${filterCustomer.value}` : ''
  const vendorClause = filterSupplier.value ? `&VendorCode=${filterSupplier.value}` : ''
  const projectNOClause = filterProjectNO.value ? `&ProjectNO=${filterProjectNO.value}` : ''
  const offsetClause = `&Offset=${Offset}`
  const limitClause = `&Limit=${Limit}`
  const sortByClause = `&SortBy=${sortBy}&Descending=${descending ? 'DESC' : 'ASC'}`

  const queryClause = `${siteClause}${orderTypeClause}${customerClause}${vendorClause}${projectNOClause}${offsetClause}${limitClause}${sortByClause}`

  Promise.all([
    getData(`/Data/TobeTrackingSalesOrderLineCnt?${queryClause}`),
    getData(`/Data/TobeTrackingSalesOrderLine?${queryClause}`),
    getData(`/Data/TobeTrackingBOMLine?${queryClause}`),
    getData(`/Data/TobeTrackingPurchaseOrderLine?${queryClause}`),
    getData(`/Data/TobeTrackingReceiptLine?${queryClause}`),
    getData(`/Data/TobeTrackingQALine?${queryClause}`)
  ])
    .then((dataArray) => {
      data = mergeData(dataArray[1], dataArray[2], dataArray[3], dataArray[4], dataArray[5])

      rows.value = data
      // don't forget to update local pagination object
      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.rowsNumber = parseInt(dataArray[0])
      pagination.value.sortBy = sortBy
      pagination.value.descending = descending
    })
    .finally(() => {
      showLoading.value = false
    })
}

const mergeData = (SO, BOM, PO, RA, QA) => {
  let SOBOM = []
  for (let i = 0; i < SO.length; i++) {
    let matched = false
    for (let j = 0; j < BOM.length; j++) {
      if (SO[i]['projectNO'] === BOM[j]['bomProjectNO'] || SO[i]['oriProjectNO'] === BOM[j]['bomProjectNO']) {
        SOBOM.push({ ...SO[i], ...BOM[j] })
        matched = true
      }
    }
    if (!matched) {
      SOBOM.push({ ...SO[i] })
    }
  }
  //console.debug('SOBOM', SOBOM)

  let SOBOMPO = []
  for (let i = 0; i < SOBOM.length; i++) {
    let matched = false
    for (let j = 0; j < PO.length; j++) {
      // If the Purchase PN doesn't match BomPN or SalesPN, it won't shown,
      // This maybe happens, please let purchaser pay attention to this.
      if (
        (SOBOM[i]['projectNO'] === PO[j]['purchaseProjectNO'] && SOBOM[i]['bomPN'] === PO[j]['purchasePN']) ||
        (SOBOM[i]['oriProjectNO'] === PO[j]['purchaseProjectNO'] && SOBOM[i]['bomPN'] === PO[j]['purchasePN']) ||
        (SOBOM[i]['projectNO'] === PO[j]['purchaseProjectNO'] && SOBOM[i]['orderPN'] === PO[j]['purchasePN']) ||
        (SOBOM[i]['projectNO'] === PO[j]['purchaseProjectNO'] && SOBOM[i]['orderPN'] === PO[j]['purchasePN'])
      ) {
        SOBOMPO.push({ ...SOBOM[i], ...PO[j] })
        matched = true
      }
    }
    if (!matched) {
      SOBOMPO.push({ ...SOBOM[i] })
    }
  }
  //console.debug('SOBOMPO', SOBOMPO)

  let SOBOMPORA = []
  for (let i = 0; i < SOBOMPO.length; i++) {
    let matched = false
    for (let j = 0; j < RA.length; j++) {
      if (
        SOBOMPO[i]['purchaseNO'] === RA[j]['receiptPurchaseNO'] &&
        SOBOMPO[i]['purchaseLine'] === RA[j]['receiptPurchaseLine']
      ) {
        SOBOMPORA.push({ ...SOBOMPO[i], ...RA[j] })
        matched = true
      }
    }
    if (!matched) {
      SOBOMPORA.push({ ...SOBOMPO[i] })
    }
  }
  //console.debug('SOBOMPORA', SOBOMPORA)

  let SOBOMPORAQA = []
  for (let i = 0; i < SOBOMPORA.length; i++) {
    let temp = [] // collect all QA for one PJT
    for (let j = 0; j < QA.length; j++) {
      if (
        SOBOMPORA[i]['projectNO'] === QA[j]['claimProjectNO'] ||
        SOBOMPORA[i]['oriProjectNO'] === QA[j]['claimProjectNO']
      ) {
        temp.push(QA[j])
      }
    }

    SOBOMPORAQA.push({ ...SOBOMPORA[i], QA: temp })
  }
  //console.debug('SOBOMPORAQA', SOBOMPORAQA)
  return SOBOMPORAQA
}

const updatePage = (page) => {
  pagination.value.page = page
  doUpdate()
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

const reloadColumns = async () => {
  delete require.cache[require.resolve('@/components/todo/OpenSalesItemsColumns')]
  columns.value = require('@/components/todo/OpenSalesItemsColumns').default
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
  axios.put(`/Data/SageSADReady?OrderNO=${orderno}&Line=${line}&Ready=${ready}`, {}).then(
    (response) => {
      response.data.success === true
        ? updateSpanRowData('OrderNO', orderno, 'OrderLine', line, 'OrderSADFlag')
        : resetData('OrderNO', orderno, 'OrderLine', line, 'OrderSADFlag')
    },
    () => {
      resetData('OrderNO', orderno, 'OrderLine', line, 'OrderSADFlag')
    }
  )
}

const updateDeliveryReady = async (orderno, line, ready) => {
  axios.put(`/Data/SageDeliveryReady?OrderNO=${orderno}&Line=${line}&Ready=${ready}`, {}).then(
    (response) => {
      response.data.success === true
        ? updateSpanRowData('OrderNO', orderno, 'OrderLine', line, 'OrderDeliveryFlag')
        : resetData('OrderNO', orderno, 'OrderLine', line, 'OrderDeliveryFlag')
    },
    () => {
      resetData('OrderNO', orderno, 'OrderLine', line, 'OrderDeliveryFlag')
    }
  )
}

const updateProductReady = async (orderno, line, ready) => {
  axios.put(`/Data/SageProductReady?OrderNO=${orderno}&Line=${line}&Flag=${ready}`, {}).then(
    (response) => {
      response.data.success === true
        ? updateSpanRowData('OrderNO', orderno, 'OrderLine', line, 'OrderProductFlag')
        : resetData('OrderNO', orderno, 'OrderLine', line, 'OrderProductFlag')
    },
    () => {
      resetData('OrderNO', orderno, 'OrderLine', line, 'OrderProductFlag')
    }
  )
}
const updateProjectStatus = async (orderno, line, status) => {
  axios.put(`/Data/SageProjectStatus?OrderNO=${orderno}&Line=${line}&Status=${status}`, {}).then(
    (response) => {
      response.data.success === true
        ? updateSpanRowData('OrderNO', orderno, 'OrderLine', line, 'ProjectStatus')
        : resetData('OrderNO', orderno, 'OrderLine', line, 'ProjectStatus')
    },
    () => {
      resetData('OrderNO', orderno, 'OrderLine', line, 'ProjectStatus')
    }
  )
}
const updateProjectBlockReason = async (orderno, line, reason) => {
  axios.put(`/Data/SageProjectBlockReason?OrderNO=${orderno}&Line=${line}&Reason=${reason}`, {}).then(
    (response) => {
      response.data.success === true
        ? updateSpanRowData('OrderNO', orderno, 'OrderLine', line, 'ProjectBlockReason')
        : resetData('OrderNO', orderno, 'OrderLine', line, 'ProjectBlockReason')
    },
    () => {
      resetData('OrderNO', orderno, 'OrderLine', line, 'ProjectBlockReason')
    }
  )
}
const updateProjectComment = async (orderno, line, comment) => {
  axios.put(`/Data/SageProjectComment?OrderNO=${orderno}&Line=${line}&Comment=${comment}`, {}).then(
    (response) => {
      response.data.success === true
        ? updateSpanRowData('OrderNO', orderno, 'OrderLine', line, 'ProjectComment')
        : resetData('OrderNO', orderno, 'OrderLine', line, 'ProjectComment')
    },
    () => {
      resetData('OrderNO', orderno, 'OrderLine', line, 'ProjectComment')
    }
  )
}
const updateProjectAction = async (orderno, line, action) => {
  axios.put(`/Data/SageProjectAction?OrderNO=${orderno}&Line=${line}&Action=${action}`, {}).then(
    (response) => {
      response.data.success === true
        ? updateSpanRowData('OrderNO', orderno, 'OrderLine', line, 'ProjectAction')
        : resetData('OrderNO', orderno, 'OrderLine', line, 'ProjectAction')
    },
    () => {
      resetData('OrderNO', orderno, 'OrderLine', line, 'ProjectAction')
    }
  )
}
const updatePurchaseComment = async (orderno, line, comment) => {
  axios.put(`/Data/SagePurchaseComment?OrderNO=${orderno}&Line=${line}&Comment=${comment}`, {}).then(
    (response) => {
      response.data.success === true
        ? updateSpanRowData('OrderNO', orderno, 'OrderLine', line, 'PurchaseComment')
        : resetData('OrderNO', orderno, 'OrderLine', line, 'PurchaseComment')
    },
    () => {
      resetData('OrderNO', orderno, 'OrderLine', line, 'PurchaseComment')
    }
  )
}
const updatePlanDate = async (orderno, line, planDate) => {
  axios.put(`/Data/SageDeliveryPlanDate?OrderNO=${orderno}&Line=${line}&PlanDate=${planDate}`, {}).then(
    (response) => {
      response.data.success === true
        ? updateSpanRowData('OrderNO', orderno, 'OrderLine', line, 'OrderPlanedDate')
        : resetData('OrderNO', orderno, 'OrderLine', line, 'OrderPlanedDate')
    },
    () => {
      resetData('OrderNO', orderno, 'OrderLine', line, 'OrderPlanedDate')
    }
  )
}

const updatePurchaseAckDate = async (orderno, line, ackDate) => {
  axios.put(`/Data/SagePurchaseAckDate?OrderNO=${orderno}&Line=${line}&AckDate=${ackDate}`, {}).then(
    (response) => {
      response.data.success === true
        ? updateSpanRowData('PurchaseNO', orderno, 'PurchaseLine', line, 'PurchaseAckDate')
        : resetData('PurchaseNO', orderno, 'PurchaseLine', line, 'PurchaseAckDate')
    },
    () => {
      resetData('PurchaseNO', orderno, 'PurchaseLine', line, 'PurchaseAckDate')
    }
  )
}

// events
onMounted(() => {
  doUpdate({
    pagination: pagination.value
  })
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)

  doUpdate()
})

ebus.on('changeLanguage', () => {
  reloadColumns()
})
</script>

<style lang="scss" scoped>
/* background-color is very important */
/* set it to each th, td already */

/** frozen header exclude columns from nth */
thead tr th:nth-child(n + 3) {
  position: sticky;
  top: 0px;
  z-index: 1;
}
/** frozen header first left column */
.q-table--dense .q-table th:first-child {
  position: sticky;
  min-width: 40px;
  left: 0px;
  top: 0px;
  z-index: 3;
}
/** frozen header second left column */
thead tr th:nth-child(2) {
  position: sticky;
  left: 40px;
  top: 0px;
  z-index: 3;
}
/** frozen body first left column */
tbody tr td:first-child {
  position: sticky;
  left: 0px;
  z-index: 2;
}
/** frozen body second left column */
/** added 'name frozen' to avoid rowspan issue */
tbody tr td:nth-child(2).frozen {
  position: sticky;
  left: 40px;
  z-index: 2;
}

// first td left padding
.q-table td:first-child,
.q-table th:first-child {
  padding-left: 2px;
}

/* let td smaller */
th,
td {
  padding: 0px 2px 0px 2px !important;
}

.strip td {
  background-image: -webkit-linear-gradient(transparent, rgba(69, 49, 67, 0.1) 50%, transparent) !important;
}

:v-deep(.q-table .q-field__control),
:v-deep(.q-table .q-field__native),
:v-deep(.q-table .q-field__append) {
  min-height: 20px;
  height: 20px;
}

:v-deep(.q-table .q-field__native) {
  padding: 0px 0px;
}

:v-deep(.q-table input) {
  font-size: 13px;
}
</style>
