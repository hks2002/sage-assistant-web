<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-02-08 09:42:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2023-12-13 10:12:33
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

/* eslint-disable no-tabs */
<template>
  <q-table
    id="OpenSalesItems"
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
    <!-- table top ---------------------------------------------------------------------------------->
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
          style="height: 20px; width: 250px"
          debounce="1000"
          @update:model-value="updatePage(1)"
        />
      </div>
      <q-item>
        <q-icon name="font_download" style="color: red" size="24px" />{{ $t('S.OVER_DUE') }}
        <q-icon name="font_download" style="color: green" size="24px" />{{ $t('S.DONE') }}
      </q-item>
    </template>
    <!-- table header ---------------------------------------------------------------------------------->
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td class="text-center bg-white frozen" style="padding: 0px"> {{ props.row['itemNO'] }}</q-td>
        <!-- order ------------------------------------------>
        <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])} frozen`">
          {{ props.row['trackingNO'] }}
        </q-td>
        <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])}`">
          {{ props.row['projectNO'] == props.row['trackingNO'] ? '' : props.row['projectNO'] }}
        </q-td>

        <template v-if="showSODetail">
          <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])}`">
            {{ props.row['orderType'] }}
          </q-td>
        </template>

        <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])}`">
          {{ PNWithVersion(props.row['orderPN'], props.row['orderPNVersion']) }}
          <q-tooltip>
            {{ props.row['orderPNDesc'] }}
          </q-tooltip>
        </q-td>

        <template v-if="showSODetail">
          <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])}`">
            {{ props.row['orderPNDesc'] }}
          </q-td>
        </template>

        <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])} text-center`">
          {{ props.row['orderQTY'] }}
        </q-td>

        <template v-if="showSODetail">
          <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])} text-right`">
            {{ props.row['orderPrice'] }}
          </q-td>
          <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])} text-center`">
            {{ props.row['orderCurrency'] }}
          </q-td>
          <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])} text-center`">
            {{ props.row['customerCode'] }}
            <q-tooltip>
              {{ props.row['customerName'] }}
            </q-tooltip>
          </q-td>
          <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])}`">
            {{ props.row['orderDate'] }}
          </q-td>
        </template>

        <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])}`">
          {{ props.row['orderRequestDate'] }}
        </q-td>
        <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'], props.row['daysLeft'])} text-center`">
          {{ props.row['daysLeft'] }}
        </q-td>
        <q-td
          :class="
            props.row['orderPlanedDate'] > props.row['orderRequestDate']
              ? 'bg-red' /*  over due already */
              : orderStyle(props.row['orderDeliveryFlag'])
          "
        >
          <q-input
            v-model="props.row['orderPlanedDate']"
            debounce="1000"
            dense
            type="date"
            @update:model-value="
              updatePlanDate(props.row['orderNO'], props.row['orderLine'], props.row['orderPlanedDate'])
            "
          />
        </q-td>

        <!-- Purchase status ------------------------------------------>
        <q-td :class="`${purchaseStyle(props.row['orderSADFlag'])} text-center`">
          <q-checkbox
            v-model="props.row['orderSADFlag']"
            true-value="2"
            false-value="1"
            dense
            class="text-center"
            @update:model-value="
              updateSADReady(props.row['orderNO'], props.row['orderLine'], props.row['orderSADFlag'])
            "
          >
          </q-checkbox>
        </q-td>
        <q-td :class="`${purchaseStyle(props.row['orderSADFlag'])} text-center`">
          {{ props.row['orderSADDate'] }}
        </q-td>
        <!-- QA status ------------------------------------------>
        <q-td :class="`${qaStyle(props.row.orderProductFlag)} text-center`">
          <div v-for="qa in props.row.QA" :key="qa.claimNO">
            {{ qa.claimNO }}
            <q-tooltip v-if="qa.claimProjectNO">
              {{ $t('F.ProjectNO') }}:{{ qa.claimProjectNO }}<br />
              {{ $t('F.Comments') }}:{{ qa.claimNote }}<br /> </q-tooltip
            ><br />
          </div>
        </q-td>
        <q-td :class="`${qaStyle(props.row.orderProductFlag)} text-center`">
          <div v-for="qa in props.row.QA" :key="qa.claimNO">{{ qa.claimDate }}<br /></div>
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
              </span> </template
            ><br />
          </template>
        </q-td>
        <!-- QC status ------------------------------------------>
        <q-td :class="`${qcStyle(props.row['orderProductFlag'])} text-center`">
          <q-checkbox
            v-model="props.row['orderProductFlag']"
            true-value="2"
            false-value="1"
            dense
            class="text-center"
            @update:model-value="
              updateProductReady(props.row['orderNO'], props.row['orderLine'], props.row['orderProductFlag'])
            "
          />
        </q-td>
        <q-td
          :class="
            props.row['orderProductDate'] > props.row['orderRequestDate']
              ? 'bg-red text-center'
              : `${qcStyle(props.row['orderProductFlag'])} text-center`
          "
        >
          {{ props.row['orderProductDate'] }}
        </q-td>
        <!-- Delivery OK ------------------------------------------>
        <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])} text-center`">
          <q-checkbox
            v-model="props.row['orderDeliveryFlag']"
            true-value="2"
            false-value="1"
            dense
            class="text-center"
            @update:model-value="
              updateDeliveryReady(props.row['orderNO'], props.row['orderLine'], props.row['orderDeliveryFlag'])
            "
          />
        </q-td>
        <!-- Status reason and comment ------------------------------------------>
        <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])}`">
          <q-select
            v-model="props.row['projectStatus']"
            :options="optionsProjectStatus"
            map-options
            debounce="1000"
            dense
            options-dense
            @update:model-value="
              updateProjectStatus(props.row['orderNO'], props.row['orderLine'], props.row['projectStatus'])
            "
          />
        </q-td>

        <template v-if="showSOComment">
          <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])}`">
            <q-select
              v-model="props.row['projectBlockReason']"
              :options="optionsProjectBlockReason"
              map-options
              debounce="1000"
              dense
              options-dense
              @update:model-value="
                updateProjectBlockReason(props.row['orderNO'], props.row['orderLine'], props.row['projectBlockReason'])
              "
            />
          </q-td>
          <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])}`">
            <q-input
              v-model="props.row['projectComment']"
              debounce="1000"
              dense
              @update:model-value="
                updateProjectComment(props.row['orderNO'], props.row['orderLine'], props.row['projectComment'])
              "
            />
            <q-tooltip v-if="props.row['projectComment']">
              {{ props.row['projectComment'] }}
            </q-tooltip>
          </q-td>
          <q-td :class="`${orderStyle(props.row['orderDeliveryFlag'])}`">
            <q-input
              v-model="props.row['projectAction']"
              debounce="1000"
              dense
              @update:model-value="
                updateProjectAction(props.row['orderNO'], props.row['orderLine'], props.row['projectAction'])
              "
            />
            <q-tooltip v-if="props.row['projectAction']">
              {{ props.row['projectAction'] }}
            </q-tooltip>
          </q-td>
        </template>
        <q-td colspan="100">
          {{ PNWithVersion(props.row['orderPN'], props.row['orderPNVersion']) + ' ' + props.row['orderPNDesc'] }}
        </q-td>
      </q-tr>

      <template v-for="(ra, idx) in props.row['SOBOMPORA']" :key="idx">
        <!-- bom ------------------------------------------>
        <q-tr v-show="true">
          <q-td class="text-center">{{ props.row['itemNO'] }}:{{ idx + 1 }}</q-td>
          <q-td :colspan="SOcolspan"></q-td>
          <template v-if="showBomDetail">
            <q-td>
              {{ ra['bomPN'] }}
              <q-tooltip>
                {{ $t('F.ProjectNO') }}:{{ ra['bomProjectNO'] }}<br />
                {{ $t('F.WorkerOrderNO') }}:{{ ra['workOrderNO'] }}<br />
                {{ $t('F.BomSeq') }}:{{ ra['bomSeq'] }}<br />
                {{ $t('F.BomDesc') }}:{{ ra['bomDesc'] }}<br />
                {{ $t('F.Unit') }}:{{ ra['bomUnit'] }}
              </q-tooltip>
            </q-td>
            <q-td>
              {{ ra['bomQTY'] }}
            </q-td>
            <q-td>
              {{ ra['shortQty'] }}
            </q-td>
            <q-td>
              {{ ra['allQty'] }}
            </q-td>
            <q-td>
              {{ ra['avaQty'] }}
            </q-td>
          </template>
          <!-- purchase ------------------------------------------>
          <template v-if="showPODetail">
            <q-td
              :class="`${purchaseStyle(
                ra['purchaseNO'],
                ra['receiptNO'],
                ra['purchaseExpectDate)'],
                ra['purchaseAckDate']
              )}`"
            >
              {{ ra['purchaseNO'] }}
              <q-tooltip>
                {{ $t('F.Purchaser') }}:{{ ra['purchaseUser'] }}
                <br />
                {{ $t('S.Purchase PN must match BomPN or SalesPN') }}
              </q-tooltip>
            </q-td>
            <q-td
              :class="`${purchaseStyle(
                ra['purchaseNO'],
                ra['receiptNO'],
                ra['purchaseExpectDate)'],
                ra['purchaseAckDate']
              )}`"
            >
              {{ ra['purchaseLine'] }}
            </q-td>
            <q-td
              :class="`${purchaseStyle(
                ra['purchaseNO'],
                ra['receiptNO'],
                ra['purchaseExpectDate)'],
                ra['purchaseAckDate']
              )}`"
            >
              {{ PNWithVersion(ra['purchasePN'], ra['purchasePNVersion']) }}
              <q-tooltip>
                {{ ra['purchasePNDesc'] }}
              </q-tooltip>
            </q-td>
            <q-td
              :class="`${purchaseStyle(
                ra['purchaseNO'],
                ra['receiptNO'],
                ra['purchaseExpectDate)'],
                ra['purchaseAckDate']
              )}  text-center`"
            >
              {{ ra['purchaseQTY'] }}
            </q-td>
            <q-td
              :class="`${purchaseStyle(
                ra['purchaseNO'],
                ra['receiptNO'],
                ra['purchaseExpectDate)'],
                ra['purchaseAckDate']
              )}  text-center`"
            >
              {{ ra['vendorCode'] }}
              <q-tooltip>
                {{ ra['vendorName'] }}
              </q-tooltip>
            </q-td>
            <q-td
              :class="`${purchaseStyle(
                ra['purchaseNO'],
                ra['receiptNO'],
                ra['purchaseExpectDate)'],
                ra['purchaseAckDate']
              )}  text-center`"
            >
              {{ ra['purchaseDate'] }}
            </q-td>
            <q-td
              :class="`${purchaseStyle(
                ra['purchaseNO'],
                ra['receiptNO'],
                ra['purchaseExpectDate)'],
                ra['purchaseAckDate']
              )}`"
            >
              {{ ra['purchaseExpectDate'] }}
            </q-td>
            <q-td
              :class="`${purchaseStyle(
                ra['purchaseNO'],
                ra['receiptNO'],
                ra['purchaseExpectDate)'],
                ra['purchaseAckDate']
              )}`"
            >
              <q-input
                v-model="ra['purchaseAckDate']"
                debounce="1000"
                dense
                type="date"
                v-if="ra['purchaseNO']"
                @update:model-value="updatePurchaseAckDate(ra['purchaseAckDate'], ra['purchaseNO'], ra['purchaseLine'])"
              />
            </q-td>
            <q-td
              :class="`${purchaseStyle(
                ra['purchaseNO'],
                ra['receiptNO'],
                ra['purchaseExpectDate)'],
                ra['purchaseAckDate']
              )}`"
            >
              <q-input
                v-model="ra['purchaseComment']"
                dense
                :disable="!ra['purchaseNO']"
                @update:model-value="
                  updatePurchaseComment(ra['purchaseNO'] + '_' + ra['purchaseLine'], ra['purchaseComment'])
                "
              />
              <q-tooltip v-if="ra['purchaseComment']">
                {{ ra['purchaseComment'] }}
              </q-tooltip>
            </q-td>

            <!-- receive ------------------------------------------>
            <q-td
              :class="`${receiveStyle(
                ra['purchaseNO'],
                ra['receiptNO'],
                ra['purchaseExpectDate)'],
                ra['receiptDate']
              )}`"
            >
              {{ ra['receiptNO'] }}
              <q-tooltip v-if="ra['receiptor']">{{ $t('F.Receiptor') }}:{{ ra['receiptor'] }}<br /> </q-tooltip>
            </q-td>
            <q-td
              :class="`${receiveStyle(
                ra['purchaseNO'],
                ra['receiptNO'],
                ra['purchaseExpectDate)'],
                ra['receiptDate']
              )}`"
            >
              {{ ra['receiptQty'] }}
            </q-td>
            <q-td
              :class="`${receiveStyle(
                ra['purchaseNO'],
                ra['receiptNO'],
                ra['purchaseExpectDate)'],
                ra['receiptDate']
              )}`"
            >
              {{ ra['receiptDate'] }}
            </q-td>
          </template>
        </q-tr>
      </template>
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
import { axios } from '@/assets/axios'
import { axiosGet } from '@/assets/axiosActions'
import { tableToExcel } from '@/assets/dataUtils'
import { toLower } from 'lodash'
import { date } from 'quasar'
import { computed, inject, onMounted, ref, shallowRef, watch, onBeforeUnmount } from 'vue'
import { optionsProjectBlockReason, optionsProjectStatus } from './OpenSalesItemsSelectOptions'

const props = defineProps({
  site: String
})

// common vars
const showLoading = ref(false)
const ebus = inject('ebus')
const { getDateDiff } = date

// page vars
let data = []
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

const columns = ref(require('@/components/todo/OpenSalesItemsColumns').default)

// add name and sortable
let AllHeader = []
columns.value.forEach((item, idx, array) => {
  array[idx].name = toLower(item.field)
  if (item.field === 'daysLeft' || item.field === 'orderPlanedDate') {
    array[idx].sortable = true
  }
  AllHeader.push(item.field)
})
const rows = shallowRef([])

const SODetailsHeader = ['orderType', 'orderPNDesc', 'orderPrice', 'orderCurrency', 'customerCode', 'orderDate']
const SOCommentHeader = ['projectBlockReason', 'projectComment', 'projectAction']
const BomDetailsHeader = ['bomQTY', 'bomPN', 'shortQty', 'allQty', 'avaQty']
const PODetailsHeader = ['purchasePN', 'purchaseQTY', 'vendorCode', 'purchaseComment']

// computed vars
const finalHeader = computed(() => {
  let Header = AllHeader
  if (!showSODetail.value) Header = Header.filter((header) => !SODetailsHeader.includes(header))
  if (!showSOComment.value) Header = Header.filter((header) => !SOCommentHeader.includes(header))
  if (!showBomDetail.value) Header = Header.filter((header) => !BomDetailsHeader.includes(header))
  if (!showPODetail.value) Header = Header.filter((header) => !PODetailsHeader.includes(header))
  return Header
})
const visibleColumns = computed(() => {
  let cols = []
  finalHeader.value.forEach((item) => {
    cols.push(toLower(item))
  })
  return cols
})

const SOcolspan = computed(() => {
  let colspan = 16
  if (showSODetail.value) colspan += SODetailsHeader.length
  if (showSOComment.value) colspan += SOCommentHeader.length
  return colspan
})

const reloadColumns = async () => {
  delete require.cache[require.resolve('@/components/todo/OpenSalesItemsColumns')]
  columns.value = require('@/components/todo/OpenSalesItemsColumns').default
}
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
const purchaseStyle = (PONO, RANO, exceptDate, ackDate) => {
  return PONO === undefined
    ? // no po
      'bg-blue-1'
    : RANO === undefined
      ? // with po, no ra
        ackDate > exceptDate
        ? 'bg-red' /* over due already */
        : 'bg-blue-1'
      : // with po, with ra
        'bg-green'
}
const receiveStyle = (PONO, RANO, exceptDate, receiptDate) => {
  return PONO === undefined
    ? // no po
      'bg-green-1'
    : RANO === undefined
      ? // with po, no ra
        getDateDiff(Date(exceptDate), Date.now(), 'days') < 0
        ? 'bg-red' /* over due already */
        : 'bg-green-1'
      : // with po, with ra
        receiptDate > exceptDate
        ? 'bg-red' /* over due already */
        : 'bg-green'
}

const qcStyle = (flag) => {
  return flag === '2' ? 'bg-green' : 'bg-green-3'
}
const qaStyle = (flag) => {
  return flag === '2' ? 'bg-green' : 'bg-red-1'
}

const PNWithVersion = (PN, Version) => {
  return Version && Version != '' && Version != ' ' && Version != '-' ? PN + '_' + Version : PN
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
    getData(`/Data/TobeTrackingSalesOrderLine?${queryClause}`),
    getData(`/Data/TobeTrackingBOMLine?${queryClause}`),
    getData(`/Data/TobeTrackingPurchaseOrderLine?${queryClause}`),
    getData(`/Data/TobeTrackingReceiptLine?${queryClause}`),
    getData(`/Data/TobeTrackingQALine?${queryClause}`),
    getData(`/Data/TobeTrackingSalesOrderLineCnt?${queryClause}`)
  ])
    .then((dataArray) => {
      data = mergeData(dataArray[0], dataArray[1], dataArray[2], dataArray[3], dataArray[4])

      rows.value = data
      // don't forget to update local pagination object
      pagination.value.page = page
      pagination.value.rowsPerPage = rowsPerPage
      pagination.value.rowsNumber = parseInt(dataArray[5])
      pagination.value.sortBy = sortBy
      pagination.value.descending = descending
    })
    .finally(() => {
      showLoading.value = false
    })
}

const mergeData = (SO, BOM, PO, RA, QA) => {
  for (let i = 0; i < SO.length; i++) {
    let SOBOM = []
    for (let j = 0; j < BOM.length; j++) {
      if (SO[i]['projectNO'] === BOM[j]['bomProjectNO'] || SO[i]['oriProjectNO'] === BOM[j]['bomProjectNO']) {
        SOBOM.push(BOM[j])
      }
    }

    let SOBOMPO = []
    for (let i = 0; i < SOBOM.length; i++) {
      let match = false
      for (let j = 0; j < PO.length; j++) {
        // If the Purchase PN doesn't match BomPN or SalesPN, it won't shown,
        // This maybe happens, please let purchaser pay attention to this.
        if (SOBOM[i]['bomProjectNO'] === PO[j]['purchaseProjectNO'] && SOBOM[i]['bomPN'] === PO[j]['purchasePN']) {
          SOBOMPO.push({ ...SOBOM[i], ...PO[j] })
          match = true
        }
      }
      if (!match) {
        SOBOMPO.push(SOBOM[i])
      }
    }

    for (let j = 0; j < PO.length; j++) {
      // If the Purchase PN doesn't match BomPN or SalesPN, it won't shown,
      // This maybe happens, please let purchaser pay attention to this.
      if (
        (SO[i]['projectNO'] === PO[j]['purchaseProjectNO'] && SO[i]['orderPN'] === PO[j]['purchasePN']) ||
        (SO[i]['oriProjectNO'] === PO[j]['purchaseProjectNO'] && SO[i]['orderPN'] === PO[j]['purchasePN'])
      ) {
        SOBOMPO.push(PO[j])
      }
    }

    let SOBOMPORA = []
    for (let i = 0; i < SOBOMPO.length; i++) {
      let match = false
      for (let j = 0; j < RA.length; j++) {
        if (
          SOBOMPO[i]['purchaseNO'] === RA[j]['receiptPurchaseNO'] &&
          SOBOMPO[i]['purchaseLine'] === RA[j]['receiptPurchaseLine']
        ) {
          SOBOMPORA.push({ ...SOBOMPO[i], ...RA[j] })
          match = true
        }
      }
      if (!match) {
        SOBOMPORA.push(SOBOMPO[i])
      }
    }
    SOBOMPORA.forEach((item, idx, array) => {
      array[idx].idx = idx
    })

    SO[i]['SOBOMPORA'] = SOBOMPORA

    let SOQA = []
    for (let j = 0; j < QA.length; j++) {
      if (SO[i]['projectNO'] === QA[j]['claimProjectNO'] || SO[i]['oriProjectNO'] === QA[j]['claimProjectNO']) {
        SOQA.push(QA[j])
      }
    }
    SO[i]['QA'] = SOQA
  }

  return SO
}

const updatePage = (page) => {
  pagination.value.page = page
  doUpdate()
}

const download = () => {
  tableToExcel('OpenSalesItems', 'OpenSalesItems')
}

/**
 * reset data value for specific filed
 */
const resetData = (searchField1, field1Value, searchField2, field2Value, resetField) => {
  // find origin json
  let origin = {}
  if (searchField1 === 'orderNO') {
    for (let i = 0; i < data.length; i++) {
      if (data[i][searchField1] === field1Value && data[i][searchField2] === field2Value) {
        origin = data[i]
        break
      }
    }

    for (let j = 0; j < rows.value.length; j++) {
      if (rows.value[j][searchField1] === field1Value && rows.value[j][searchField2] === field2Value) {
        rows.value[j][resetField] = origin[resetField]
      }
    }
  }

  if (searchField1 === 'purchaseNO') {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i]['SOBOMPORA'].length; j++) {
        if (
          data[i]['SOBOMPORA'][j][searchField1] === field1Value &&
          data[i]['SOBOMPORA'][j][searchField2] === field2Value
        ) {
          origin = data[i]['SOBOMPORA'][j]
          break
        }
      }
    }

    for (let i = 0; i < rows.value.length; i++) {
      for (let j = 0; j < rows.value[i]['SOBOMPORA'].length; j++) {
        if (
          rows.value[i]['SOBOMPORA'][j][searchField1] === field1Value &&
          rows.value[i]['SOBOMPORA'][j][searchField2] === field2Value
        ) {
          rows.value[i]['SOBOMPORA'][j][resetField] = origin[resetField]
        }
      }
    }
  }
}

const doNothing = () => {}

const updateSADReady = async (orderno, line, ready) => {
  axios.put(`/Data/SageSADReady?OrderNO=${orderno}&Line=${line}&Ready=${ready}`, {}).then(
    (response) => {
      response.data.success === true ? doNothing() : resetData('orderNO', orderno, 'orderLine', line, 'orderSADFlag')
    },
    () => {
      resetData('orderNO', orderno, 'orderLine', line, 'orderSADFlag')
    }
  )
}

const updateDeliveryReady = async (orderno, line, ready) => {
  axios.put(`/Data/SageDeliveryReady?OrderNO=${orderno}&Line=${line}&Ready=${ready}`, {}).then(
    (response) => {
      response.data.success === true
        ? doNothing()
        : resetData('orderNO', orderno, 'orderLine', line, 'orderDeliveryFlag')
    },
    () => {
      resetData('orderNO', orderno, 'orderLine', line, 'orderDeliveryFlag')
    }
  )
}

const updateProductReady = async (orderno, line, ready) => {
  axios.put(`/Data/SageProductReady?OrderNO=${orderno}&Line=${line}&Flag=${ready}`, {}).then(
    (response) => {
      response.data.success === true
        ? doNothing()
        : resetData('orderNO', orderno, 'orderLine', line, 'orderProductFlag')
    },
    () => {
      resetData('orderNO', orderno, 'orderLine', line, 'orderProductFlag')
    }
  )
}

const updateProjectStatus = async (orderno, line, status) => {
  axios.put(`/Data/SageProjectStatus?OrderNO=${orderno}&Line=${line}&Status=${status}`, {}).then(
    (response) => {
      response.data.success === true ? doNothing() : resetData('orderNO', orderno, 'orderLine', line, 'projectStatus')
    },
    () => {
      resetData('orderNO', orderno, 'orderLine', line, 'projectStatus')
    }
  )
}

const updateProjectBlockReason = async (orderno, line, reason) => {
  axios.put(`/Data/SageProjectBlockReason?OrderNO=${orderno}&Line=${line}&Reason=${reason}`, {}).then(
    (response) => {
      response.data.success === true
        ? doNothing()
        : resetData('orderNO', orderno, 'orderLine', line, 'projectBlockReason')
    },
    () => {
      resetData('orderNO', orderno, 'orderLine', line, 'projectBlockReason')
    }
  )
}

const updateProjectComment = async (orderno, line, comment) => {
  axios.put(`/Data/SageProjectComment?OrderNO=${orderno}&Line=${line}&Comment=${comment}`, {}).then(
    (response) => {
      response.data.success === true ? doNothing() : resetData('orderNO', orderno, 'orderLine', line, 'projectComment')
    },
    () => {
      resetData('orderNO', orderno, 'orderLine', line, 'projectComment')
    }
  )
}

const updateProjectAction = async (orderno, line, action) => {
  axios.put(`/Data/SageProjectAction?OrderNO=${orderno}&Line=${line}&Action=${action}`, {}).then(
    (response) => {
      response.data.success === true ? doNothing() : resetData('orderNO', orderno, 'orderLine', line, 'projectAction')
    },
    () => {
      resetData('orderNO', orderno, 'orderLine', line, 'projectAction')
    }
  )
}

const updatePurchaseComment = async (orderno, line, comment) => {
  axios.put(`/Data/SagePurchaseComment?OrderNO=${orderno}&Line=${line}&Comment=${comment}`, {}).then(
    (response) => {
      response.data.success === true ? doNothing() : resetData('orderNO', orderno, 'orderLine', line, 'purchaseComment')
    },
    () => {
      resetData('orderNO', orderno, 'orderLine', line, 'purchaseComment')
    }
  )
}
const updatePlanDate = async (orderno, line, planDate) => {
  axios.put(`/Data/SageDeliveryPlanDate?OrderNO=${orderno}&Line=${line}&PlanDate=${planDate}`, {}).then(
    (response) => {
      response.data.success === true ? doNothing() : resetData('orderNO', orderno, 'orderLine', line, 'orderPlanedDate')
    },
    () => {
      resetData('orderNO', orderno, 'orderLine', line, 'orderPlanedDate')
    }
  )
}

const updatePurchaseAckDate = async (orderno, line, ackDate) => {
  axios.put(`/Data/SagePurchaseAckDate?OrderNO=${orderno}&Line=${line}&AckDate=${ackDate}`, {}).then(
    (response) => {
      response.data.success === true
        ? doNothing()
        : resetData('purchaseNO', orderno, 'purchaseLine', line, 'purchaseAckDate')
    },
    () => {
      resetData('purchaseNO', orderno, 'purchaseLine', line, 'purchaseAckDate')
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

onBeforeUnmount(() => {
  ebus.off('changeLanguage')
})
</script>

<style lang="scss" scoped></style>
