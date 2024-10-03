<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-02-08 09:42:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-11-29 19:27:55
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
    virtual-scroll-item-size="32"
    virtual-scroll-slice-size="10"
    virtual-scroll-slice-ratio-before="2"
    virtual-scroll-slice-ratio-after="2"
    id="OpenSalesItems"
    row-key="itemNO"
    class="open-sale-items-table"
    :rows="rows"
    :columns="SOcolumns"
    :visible-columns="visibleSOColumns"
    :rows-per-page-options="[5, 10, 50, 100, 200, 500, 1000, 0]"
    :loading="showLoading"
    v-model:pagination="pagination"
    @request="doUpdate"
  >
    <!-- table top ---------------------------------------------------------------------------------->
    <template v-slot:top>
      <template class="q-gutter-sm row">
        <q-option-group
          no-caps
          inline
          color="primary"
          :options="[
            { label: $t('S.ALL_ORDER'), value: '' },
            { label: $t('S.NORMAL_ORDER'), value: 'NOR' },
            { label: $t('S.SERVICE_ORDER'), value: 'OTHER' }
          ]"
          v-model="orderType"
          @update:model-value="doUpdate()"
        />

        <q-separator vertical />
        <q-toggle dense v-model="expandAllPORows" :label="$t('S.EXPAND_ALL_PO_ROWS')" />

        <q-separator vertical />
        <q-toggle dense v-model="showSODetail" :label="$t('S.SHOW_SALES_DETAILS')" />
        <q-toggle dense v-model="showPODetail" :label="$t('S.SHOW_PURCHASE_DETAILS')" />

        <q-separator vertical />
        <q-input
          dense
          clearable
          outlined
          class="col-1"
          debounce="1000"
          :label="$t('F.Customer')"
          v-model="filterCustomer"
          @update:model-value="updatePage(1)"
        />
        <q-input
          dense
          clearable
          outlined
          class="col-1"
          debounce="1000"
          style="height: 20px"
          :label="$t('F.Vendor')"
          v-model="filterSupplier"
          @update:model-value="updatePage(1)"
        />
        <q-input
          dense
          clearable
          outlined
          class="col-1"
          debounce="1000"
          input-class="text-uppercase"
          style="height: 20px; width: 250px"
          :label="$t('F.ProjectNO')"
          v-model="filterProjectNO"
          @update:model-value="updatePage(1)"
        />
        <q-input
          dense
          clearable
          outlined
          class="col-1"
          debounce="1000"
          input-class="text-uppercase"
          style="height: 20px; width: 250px"
          :label="$t('F.AssignTo')"
          v-model="filterAssignTo"
          @update:model-value="updatePage(1)"
        />
      </template>

      <q-separator vertical />
      <q-btn dense flat icon="fas fa-download" color="primary" @click="download()" />
    </template>
    <!-- table body ---------------------------------------------------------------------------------->
    <template v-slot:body="props">
      <q-tr :props="props" @dblclick="rowDblClick(props)">
        <q-td class="text-center" style="width: 30px">
          {{ props.row['itemNO'] }}
        </q-td>
        <q-td class="text-center" style="width: 45px">
          <q-toggle
            size="xs"
            color="accent"
            checked-icon="add"
            unchecked-icon="remove"
            :disable="props.row['SOBOM'].length === 0"
            v-model="props.expand"
          />
        </q-td>
        <q-td style="width: 100px">
          {{ props.row['trackingNO'] }}
        </q-td>
        <q-td>
          {{ props.row['projectNO'] === props.row['trackingNO'] ? '' : props.row['projectNO'] }}
        </q-td>
        <q-td>
          {{ props.row['orderType'] }}
        </q-td>
        <q-td>
          {{ props.row['orderPN'] + '_' + props.row['orderPNVersion'] }}
          <q-tooltip>
            {{ props.row['orderPNDesc'] }}
          </q-tooltip>
        </q-td>
        <template v-if="showSODetail">
          <q-td>
            {{ props.row['orderPNDesc'] }}
          </q-td>
        </template>
        <q-td class="text-center">
          {{ props.row['orderQty'] }}
        </q-td>
        <q-td class="text-right">
          {{ props.row['orderPrice'] }}
        </q-td>
        <q-td class="text-center">
          {{ props.row['orderCurrency'] }}
        </q-td>
        <q-td class="text-center">
          {{ props.row['customerCode'] }}
          <q-tooltip>
            {{ props.row['customerName'] }}
          </q-tooltip>
        </q-td>
        <template v-if="showSODetail">
          <q-td>
            {{ props.row['customerName'] }}
          </q-td>
        </template>
        <q-td>
          {{ props.row['orderDate'] }}
        </q-td>
        <q-td>
          {{ props.row['orderRequestDate'] }}
        </q-td>
        <q-td class="text-center">
          {{ props.row['priority'] }}
        </q-td>
        <q-td>
          {{ props.row['orderPlanedDate'] }}
        </q-td>
        <q-td :class="`${colorStyle(props.row['daysLeft'])} text-center`">
          {{ props.row['daysLeft'] }}
        </q-td>
        <q-td>
          {{ props.row['projectStatus'] }}
        </q-td>
        <template v-if="showSODetail">
          <q-td>
            {{ props.row['projectBlockReason'] }}
          </q-td>
        </template>
        <q-td>
          {{ props.row['mark'] }}
        </q-td>
        <q-td>
          {{ props.row['paint'] }}
        </q-td>
        <q-td>{{ props.row['requireManual'] }} </q-td>
        <q-td>{{ props.row['requireTest'] }} </q-td>
        <q-td>{{ props.row['requireCalibration'] }}</q-td>
        <q-td class="text-center">
          <q-circular-progress
            show-value
            size="md"
            font-size="13px"
            class="q-ma-none"
            track-color="grey"
            :value="props.row['SOBOMAllocVsTotal']"
            :color="colorStyle2(props.row['SOBOMAllocVsTotal'], props.row['SOBOMTotal'])"
          >
            {{ props.row['SOBOMAlloc'] }}/{{ props.row['SOBOMTotal'] }}
          </q-circular-progress>
        </q-td>
        <q-td class="text-center">
          <q-circular-progress
            show-value
            size="md"
            font-size="13px"
            class="q-ma-none"
            track-color="grey"
            :value="props.row['POTotalVsSOBOMShort']"
            :color="colorStyle2(props.row['POTotalVsSOBOMShort'], props.row['SOBOMShort'])"
          >
            {{ props.row['POTotal'] }}/{{ props.row['SOBOMShort'] }}
          </q-circular-progress>
          <q-circular-progress
            show-value
            size="md"
            font-size="13px"
            class="q-ma-none"
            track-color="grey"
            :center-color="colorStyle4(props.row['POPnogPNQty'] + props.row['POFinalPNQty'], props.row['orderQty'])"
            :value="props.row['POPnogPNQtyVsSOQty']"
            :color="colorStyle3(props.row['POPnogPNQty'], props.row['orderQty'])"
          >
            {{ props.row['POPnogPNQty'] }}/{{ props.row['orderQty'] }}
          </q-circular-progress>
          <q-circular-progress
            show-value
            size="md"
            font-size="13px"
            class="q-ma-none"
            track-color="grey"
            :center-color="colorStyle4(props.row['POPnogPNQty'] + props.row['POFinalPNQty'], props.row['orderQty'])"
            :value="props.row['POFinalPNQtyVsSOQty']"
            :color="colorStyle3(props.row['POFinalPNQty'], props.row['orderQty'])"
          >
            {{ props.row['POFinalPNQty'] }}/{{ props.row['orderQty'] }}
          </q-circular-progress>
        </q-td>
        <q-td class="text-center">
          <q-circular-progress
            show-value
            size="md"
            font-size="13px"
            class="q-ma-none"
            track-color="grey"
            :value="props.row['RABomPNLineVsPOBomPNLine']"
            :color="colorStyle2(props.row['RABomPNLineVsPOBomPNLine'], props.row['POBomPNLine'])"
          >
            {{ props.row['RABomPNLine'] }}/{{ props.row['POBomPNLine'] }}
          </q-circular-progress>
          <q-circular-progress
            show-value
            size="md"
            font-size="13px"
            class="q-ma-none"
            track-color="grey"
            :value="props.row['RAPnogPNQtyVsPOPnogPNQty']"
            :color="colorStyle2(props.row['RAPnogPNQtyVsPOPnogPNQty'], props.row['POPnogPNQty'])"
          >
            {{ props.row['RAPnogPNQty'] }}/{{ props.row['POPnogPNQty'] }}
          </q-circular-progress>
          <q-circular-progress
            show-value
            size="md"
            font-size="13px"
            class="q-ma-none"
            track-color="grey"
            :value="props.row['RAFinalPNQtyVsPOFinalPNQty']"
            :color="colorStyle2(props.row['RAFinalPNQtyVsPOFinalPNQty'], props.row['POFinalPNQty'])"
          >
            {{ props.row['RAFinalPNQty'] }}/{{ props.row['POFinalPNQty'] }}
          </q-circular-progress>
        </q-td>
        <q-td class="text-center">
          <q-circular-progress
            show-value
            size="md"
            font-size="13px"
            class="q-ma-none"
            track-color="grey"
            :value="props.row['IQCPassQtyVsSOQty']"
            :color="colorStyle2(props.row['IQCCntPass'], props.row['orderQty'])"
          >
            {{ props.row['IQCCntPass'] }}/{{ props.row['orderQty'] }}
          </q-circular-progress>
          <q-circular-progress
            show-value
            size="md"
            font-size="13px"
            class="q-ma-none"
            track-color="grey"
            :value="props.row['TQCPassQtyVsSOQty']"
            :color="colorStyle2(props.row['TQCCntPass'], props.row['orderQty'])"
          >
            {{ props.row['TQCCntPass'] }}/{{ props.row['orderQty'] }}
          </q-circular-progress>
          <q-circular-progress
            show-value
            size="md"
            font-size="13px"
            class="q-ma-none"
            track-color="grey"
            :value="props.row['FQCPassQtyVsSOQty']"
            :color="colorStyle2(props.row['FQCCntPass'], props.row['orderQty'])"
          >
            {{ props.row['FQCCntPass'] }}/{{ props.row['orderQty'] }}
          </q-circular-progress>
        </q-td>
        <q-td class="text-center">
          <q-circular-progress
            show-value
            size="md"
            font-size="13px"
            class="q-ma-none"
            track-color="grey"
            :value="props.row['PCKPassQtyVsSOQty']"
            :color="colorStyle2(props.row['PCKCntPass'], props.row['orderQty'])"
          >
            {{ props.row['PCKCntPass'] }}/{{ props.row['orderQty'] }}
          </q-circular-progress>
        </q-td>
        <!-- NC status ------------------------------------------>
        <q-td class="text-center">
          {{ props.row['IQCCntNC'] + props.row['FQCCntNC'] }}
        </q-td>
        <q-td>
          <template v-for="nc in props.row.NC" :key="nc.claimNO">
            <div>
              {{ nc.claimNO }}
              <q-tooltip v-if="nc.claimNote.trim().length > 0">
                {{ nc.claimNote }}
              </q-tooltip>
            </div>
          </template>
        </q-td>
        <q-td>
          <template v-for="nc in props.row.NC" :key="nc.claimNO">
            {{ nc.claimDate }}
            <br />
          </template>
        </q-td>
        <q-td class="q-gutter-xs">
          <template v-for="nc in props.row.NC" :key="nc.claimNO">
            <template v-for="idx in 12" :key="idx">
              <span
                v-if="nc['claimNC' + (idx - 1) + 'Type'].trim().length > 0"
                :class="
                  nc['claimNC' + (idx - 1) + 'Cri'] === 2
                    ? 'text-red'
                    : nc['claimNC' + (idx - 1) + 'Cri'] === 1
                      ? 'text-blue'
                      : ''
                "
              >
                {{ nc['claimNC' + (idx - 1) + 'Type'] }}
                <q-tooltip>
                  {{ nc['claimNC' + (idx - 1) + 'Date'] }}
                  <br />
                  {{ nc.claimNO }}
                  <br />
                  {{ nc['claimNC' + (idx - 1) + 'Desc'] }}
                </q-tooltip>
              </span>
            </template>
            <br />
          </template>
        </q-td>
        <q-td>
          {{ props.row['assignToLineNote'].note }}
          <q-popup-edit
            auto-save
            v-slot="scope"
            v-model="props.row['assignToLineNote'].note"
            @update:model-value="
              (newVal) => {
                updateSOAssignToLineNote(props.row, newVal)
              }
            "
          >
            <q-input dense autofocus debounce="1000" v-model="scope.value" />
          </q-popup-edit>
        </q-td>
        <q-td style="min-width: 150px">
          {{ props.row['statusLineNote'].note }}
          <q-popup-edit
            auto-save
            v-slot="scope"
            v-model="props.row['statusLineNote'].note"
            @update:model-value="
              (newVal) => {
                updateSOStatusLineNote(props.row, newVal)
              }
            "
          >
            <q-input dense autofocus debounce="1000" v-model="scope.value" />
          </q-popup-edit>
        </q-td>
      </q-tr>
      <!-- PO details ------------------------------------------>
      <q-tr v-if="expandAllPORows || (props.expand && props.row['SOBOM'].length > 0)" :props="props">
        <q-td> </q-td>
        <q-td> </q-td>
        <q-td colspan="100%">
          <q-list>
            <q-item class="q-pl-none p-pr-none">
              <q-table
                dense
                flat
                bordered
                hide-no-data
                hide-pagination
                :pagination="{ rowsPerPage: 0 }"
                :rows="props.row['SOBOM']"
                :columns="POcolumns"
                :visible-columns="visiblePOColumns"
                :hide-header="props.row['SOBOM'].length === 0"
              >
                <!-- table body -->
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td style="width: 100px">
                      {{ props.row['bomProjectNO'] }}
                    </q-td>
                    <q-td>
                      {{ props.row['workOrderNO'] }}
                    </q-td>
                    <q-td class="text-right">
                      {{ props.row['bomLine'] }}
                    </q-td>
                    <q-td>
                      {{ props.row['bomPN'] }}
                    </q-td>
                    <q-td v-if="showPODetail">
                      {{ props.row['bomDesc'] }}
                    </q-td>
                    <q-td>
                      {{ props.row['creator'] }}
                    </q-td>
                    <q-td>
                      {{ props.row['bomRequestDate'] }}
                    </q-td>
                    <q-td class="text-center">
                      {{ props.row['bomQty'] }}
                    </q-td>
                    <q-td class="text-center">
                      {{ props.row['avaQty'] }}
                    </q-td>
                    <q-td class="text-center">
                      {{ props.row['allQty'] }}
                    </q-td>
                    <q-td class="text-center">
                      {{ props.row['shortQty'] }}
                    </q-td>
                    <q-td>
                      {{ props.row['lineNote']['note'] }}
                      <q-popup-edit
                        auto-save
                        v-slot="scope"
                        v-model="props.row['lineNote']['note']"
                        v-if="props.row['bomLine']"
                        @update:model-value="
                          (newVal) => {
                            updateBOMLineNote(props.row, newVal)
                          }
                        "
                      >
                        <q-input dense autofocus debounce="1000" v-model="scope.value" />
                      </q-popup-edit>
                    </q-td>
                    <q-td>
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        {{ po['purchaseNO'] }}
                        <br />
                      </template>
                    </q-td>
                    <q-td>
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        {{ po['purchaseLine'] }}
                        <br />
                      </template>
                    </q-td>
                    <q-td>
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        {{ po['purchasePN'] }}
                        <br />
                      </template>
                    </q-td>
                    <q-td v-if="showPODetail">
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        {{ po['purchasePNDesc'] }}
                        <br />
                      </template>
                    </q-td>
                    <q-td class="text-center">
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        {{ po['purchaseQty'] }}
                        <br />
                      </template>
                    </q-td>
                    <q-td class="text-right">
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        {{ po['purchasePrice'] }}
                        <br />
                      </template>
                    </q-td>
                    <q-td class="text-center">
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        {{ po['localCurrency'] }}
                        <br />
                      </template>
                    </q-td>
                    <q-td>
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        {{ po['vendorCode'] }}
                        <br />
                      </template>
                    </q-td>
                    <q-td v-if="showPODetail">
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        {{ po['vendorName'] }}
                        <br />
                      </template>
                    </q-td>
                    <q-td>
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        {{ po['purchaseUser'] }}
                        <br />
                      </template>
                    </q-td>
                    <q-td>
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        {{ po['purchaseDate'] }}
                        <br />
                      </template>
                    </q-td>
                    <q-td>
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        {{ po['purchaseAckDate'] }}
                        <br />
                      </template>
                    </q-td>
                    <q-td class="text-center">
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        <span :class="po['RA'] ? '' : colorStyle(po['daysLeft'])">{{ po['daysLeft'] }}</span>
                        <br />
                      </template>
                    </q-td>
                    <q-td>
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        {{ po['purchaseExpectDate'] }}
                        <br />
                      </template>
                    </q-td>
                    <q-td>
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        <template v-for="ra in po['RA']" :key="ra['receiptNO'] + ra['receiptLine']">
                          {{ ra['receiptNO'] }}
                          <br />
                        </template>
                      </template>
                    </q-td>
                    <q-td class="text-center">
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        <template v-for="ra in po['RA']" :key="ra['receiptNO'] + ra['receiptLine']">
                          {{ ra['receiptQty'] }}
                          <br />
                        </template>
                      </template>
                    </q-td>
                    <q-td>
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        <template v-for="ra in po['RA']" :key="ra['receiptNO'] + ra['receiptLine']">
                          {{ ra['receiptDate'] }}
                          <br />
                        </template>
                      </template>
                    </q-td>
                    <q-td>
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        <template v-for="ra in po['RA']" :key="ra['receiptNO'] + ra['receiptLine']">
                          {{ ra['receiptor'] }}
                          <br />
                        </template>
                      </template>
                    </q-td>
                    <q-td>
                      <template v-for="po in props.row.PO" :key="po['purchaseNO'] + po['purchaseLine']">
                        <div>
                          {{ po['lineNote'].note }}
                          <q-popup-edit
                            auto-save
                            v-slot="scope"
                            v-model="po['lineNote'].note"
                            @update:model-value="
                              (newVal) => {
                                updatePOLineNote(po, newVal)
                              }
                            "
                          >
                            <q-input dense autofocus debounce="1000" v-model="scope.value" />
                          </q-popup-edit>
                        </div>
                      </template>
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-item>
          </q-list>
        </q-td>
      </q-tr>
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
      />{{ $q.lang.table.allRows }} {{ scope.pagination.rowsNumber }}
    </template>
    <template v-slot:loading>
      <q-inner-loading showing>
        <q-spinner-ios size="50px" color="primary" />
      </q-inner-loading>
    </template>
  </q-table>
</template>

<script setup>
import { axiosModify, getData } from '@/assets/axiosActions'
import { expandTableToExcel } from '@/assets/dataUtils'

import { computed, onMounted, ref, shallowRef, toRaw, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  site: String
})

// common vars
const showLoading = ref(false)

// page vars
let data = []
const orderType = ref('')
const expandAllPORows = ref(false)
const showSODetail = ref(false)
const showPODetail = ref(true)
const filterCustomer = ref('')
const filterSupplier = ref('')
const filterProjectNO = ref('')
const filterAssignTo = ref('')
const SOcolumns = shallowRef([])
const POcolumns = shallowRef([])
const rows = ref([])

const pagination = ref({
  sortBy: 'orderplaneddate',
  descending: false,
  page: 1,
  rowsPerPage: 100,
  rowsNumber: 100
})

const SODetailsHeader = ['orderPNDesc', 'customerName', 'projectBlockReason']
const PODetailsHeader = ['bomDesc', 'purchasePNDesc', 'vendorName']
const specialPNs = ['FACHDIV0001', 'FACHTRADRTD', 'FVENTRAAUT', 'FACHTRAAUT']

const loadColumns = () => {
  delete require.cache[require.resolve('@/components/todo/OpenSalesItemsSOColumns')]
  delete require.cache[require.resolve('@/components/todo/OpenSalesItemsPOColumns')]

  Promise.resolve(require('@/components/todo/OpenSalesItemsSOColumns').default).then((cols) => {
    // add low case name
    cols.forEach((item, idx, array) => {
      array[idx].name = item.field.toLowerCase()
    })
    SOcolumns.value = cols
  })

  Promise.resolve(require('@/components/todo/OpenSalesItemsPOColumns').default).then((cols) => {
    // add low case name
    cols.forEach((item, idx, array) => {
      array[idx].name = item.field.toLowerCase()
    })
    POcolumns.value = cols
  })
}

loadColumns()
watch(useI18n().locale, () => {
  loadColumns()
})

const visibleSOColumns = computed(() => {
  let cols = []
  for (const item of SOcolumns.value) {
    if (showSODetail.value) {
      cols.push(item.name)
      continue
    } else if (!SODetailsHeader.includes(item.field)) {
      cols.push(item.name)
      continue
    }
  }
  return cols
})
const visiblePOColumns = computed(() => {
  let cols = []
  for (const item of POcolumns.value) {
    if (showPODetail.value) {
      cols.push(item.name)
      continue
    } else if (!PODetailsHeader.includes(item.field)) {
      cols.push(item.name)
      continue
    }
  }
  return cols
})

// styles
const colorStyle = (daysLeft) => {
  return daysLeft <= 0
    ? 'bg-red' /* <0 over due already */
    : daysLeft > 0 && daysLeft <= 7
      ? 'bg-yellow' /* 1 week left */
      : daysLeft > 7 && daysLeft < 30
        ? 'bg-yellow-5' /* 1 month left */
        : ''
}
const colorStyle2 = (num, total) => {
  return total === 0 ? 'white' : num < total ? 'orange' : 'green'
}

const colorStyle3 = (num, total) => {
  return num === 0 ? 'white' : num < total ? 'orange' : 'green'
}

const colorStyle4 = (sumTotal, total) => {
  return sumTotal > total ? 'red' : 'white'
}
const rowDblClick = (props) => {
  props.expand = !props.expand
}

const doUpdate = (requestProp) => {
  if (!props.site) return

  showLoading.value = true
  // if doesn't passing pagination, use preset pagination
  const { page, rowsPerPage, rowsNumber, sortBy, descending } = requestProp?.pagination
    ? requestProp.pagination
    : pagination.value
  const Offset = (page - 1) * rowsPerPage || 0
  // get all rows if "ALL" (0) is selected
  const Limit = rowsPerPage === 0 ? rowsNumber : rowsPerPage

  const siteClause = `Site=${props.site}`
  const orderTypeClause = orderType.value ? `&OrderType=${orderType.value}` : ''
  const customerClause = filterCustomer.value ? `&CustomerCode=${filterCustomer.value}` : ''
  const vendorClause = filterSupplier.value ? `&VendorCode=${filterSupplier.value}` : ''
  const projectNOClause = filterProjectNO.value ? `&ProjectNO=${filterProjectNO.value.toUpperCase()}` : ''
  const offsetClause = `&Offset=${Offset}`
  const limitClause = `&Limit=${Limit}`
  const sortByClause = `&SortBy=${sortBy}&Descending=${descending ? 'DESC' : 'ASC'}`

  const queryClause = `${siteClause}${orderTypeClause}${customerClause}${vendorClause}${projectNOClause}${offsetClause}${limitClause}${sortByClause}`

  Promise.all([
    getData(`/Data/TobeTrackingSalesOrderLineCnt?${queryClause}`),
    getData(`/Data/TobeTrackingSalesOrderLine?${queryClause}`),
    getData(`/Data/TobeTrackingBOMLine?${queryClause}`),
    getData(`/Data/TobeTrackingPurchaseOrderLine?${queryClause}`),
    getData(`/Data/TobeTrackingReceiptLine?${queryClause}`)
  ])
    .then((dataArray) => {
      if (filterAssignTo.value.length > 0) {
        data = mergeData(filterAssignToFn(dataArray[1]), dataArray[2], dataArray[3], dataArray[4])
      } else {
        data = mergeData(dataArray[1], dataArray[2], dataArray[3], dataArray[4])
      }

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

const filterAssignToFn = (data) => {
  return data.filter((item) => item['lineNote']['note'] === filterAssignTo.value)
}

const mergeData = (SO, BOM, PO, RA) => {
  for (let i = 0; i < SO.length; i++) {
    let SOBOMAlloc = 0
    let SOBOMShort = 0
    let InvalidBomLine = 0
    let POTotal = 0
    let POBomPNLine = 0
    let POPnogPNQty = 0
    let POFinalPNQty = 0
    let RABomPNLine = 0
    let RAPnogPNQty = 0
    let RAFinalPNQty = 0

    let SOBOM = []
    for (let j = 0; j < BOM.length; j++) {
      if (SO[i]['site'] !== BOM[j]['site']) {
        continue
      }

      if (SO[i]['projectNO'] === BOM[j]['bomProjectNO'] || SO[i]['oriProjectNO'] === BOM[j]['bomProjectNO']) {
        SOBOM.push(BOM[j])
        if (BOM[j]['allQty'] === BOM[j]['bomQty']) {
          SOBOMAlloc++
        }
        if (BOM[j]['shortQty'] > 0 || BOM[j]['allQty'] < BOM[j]['bomQty']) {
          SOBOMShort++
        }
      }
    }

    for (let j = 0; j < PO.length; j++) {
      if (SO[i]['site'] !== PO[j]['site']) {
        continue
      }

      if (PO[j]['purchaseProjectNO'] !== SO[i]['projectNO'] && PO[j]['purchaseProjectNO'] !== SO[i]['oriProjectNO'])
        continue

      // PO match RA
      for (let k = 0; k < RA.length; k++) {
        if (
          PO[j]['purchaseNO'] === RA[k]['receiptPurchaseNO'] &&
          PO[j]['purchaseLine'] === RA[k]['receiptPurchaseLine']
        ) {
          if (PO[j]['purchasePN'].startsWith('PNOG')) {
            RAPnogPNQty += RA[k]['receiptQty']
          } else if (PO[j]['purchasePN'] === SO[i]['orderPN']) {
            RAFinalPNQty += RA[k]['receiptQty']
          } else {
            RABomPNLine++
          }

          if (PO[j]['RA'] === undefined) {
            PO[j]['RA'] = []
          }

          PO[j]['RA'].push(RA[k])
        }
      }

      // PO match BOM
      let BomMatch = false
      for (let k = 0; k < SOBOM.length; k++) {
        if (SOBOM[k]['site'] !== PO[j]['site']) {
          continue
        }

        if (SOBOM[k]['bomPN'] === PO[j]['purchasePN']) {
          BomMatch = true

          if (PO[j]['purchasePN'].startsWith('PNOG')) {
            POPnogPNQty += PO[j]['purchaseQty']
          } else if (PO[j]['purchasePN'] === SO[i]['orderPN']) {
            POFinalPNQty += PO[j]['purchaseQty']
          } else {
            POBomPNLine++
          }

          if (SOBOM[k]['PO'] === undefined) {
            SOBOM[k]['PO'] = []
          }
          SOBOM[k]['PO'].push(PO[j])
        }
      }
      if (BomMatch) {
        continue
      }

      // here create new bom for PO not matched with SOBOM
      InvalidBomLine++
      let newBom = { PO: [], lineNote: { note: 'Invalid BOM Line' } }
      newBom['PO'].push(PO[j])
      SOBOM.push(newBom)

      if (specialPNs.includes(PO[j]['purchasePN'])) {
      } else if (PO[j]['purchasePN'].startsWith('PNOG')) {
        POPnogPNQty += PO[j]['purchaseQty']
      } else if (SO[i]['orderPN'] === PO[j]['purchasePN']) {
        POFinalPNQty += PO[j]['purchaseQty']
      } else {
        POBomPNLine++
      }
    }

    SO[i]['SOBOM'] = SOBOM

    // summary status
    let TrueBomLine = SOBOM.length - InvalidBomLine
    SO[i]['SOBOMTotal'] = TrueBomLine
    SO[i]['SOBOMAlloc'] = SOBOMAlloc
    SO[i]['SOBOMShort'] = SOBOMShort
    SO[i]['POTotal'] = POTotal
    SO[i]['POBomPNLine'] = POBomPNLine
    SO[i]['POPnogPNQty'] = POPnogPNQty
    SO[i]['POFinalPNQty'] = POFinalPNQty
    SO[i]['RABomPNLine'] = RABomPNLine
    SO[i]['RAPnogPNQty'] = RAPnogPNQty
    SO[i]['RAFinalPNQty'] = RAFinalPNQty
    SO[i]['SOBOMAllocVsTotal'] = TrueBomLine === 0 ? 100 : (SOBOMAlloc / TrueBomLine) * 100
    SO[i]['POTotalVsSOBOMShort'] = SOBOMShort === 0 ? 100 : (POTotal / SOBOMShort) * 100
    SO[i]['POPnogPNQtyVsSOQty'] = POPnogPNQty === 0 ? 100 : (POPnogPNQty / SO[i]['orderQty']) * 100
    SO[i]['POFinalPNQtyVsSOQty'] = POFinalPNQty === 0 ? 100 : (POFinalPNQty / SO[i]['orderQty']) * 100
    SO[i]['RABomPNLineVsPOBomPNLine'] = POBomPNLine === 0 ? 100 : (RABomPNLine / POBomPNLine) * 100
    SO[i]['RAPnogPNQtyVsPOPnogPNQty'] = POPnogPNQty === 0 ? 100 : (RAPnogPNQty / POPnogPNQty) * 100
    SO[i]['RAFinalPNQtyVsPOFinalPNQty'] = POFinalPNQty === 0 ? 100 : (RAFinalPNQty / POFinalPNQty) * 100

    SO[i]['TQCPassQtyVsSOQty'] = (SO[i]['TQCCntPass'] / SO[i]['orderQty']) * 100
    SO[i]['IQCPassQtyVsSOQty'] = (SO[i]['IQCCntPass'] / SO[i]['orderQty']) * 100
    SO[i]['FQCPassQtyVsSOQty'] = (SO[i]['FQCCntPass'] / SO[i]['orderQty']) * 100
    SO[i]['PCKPassQtyVsSOQty'] = (SO[i]['PCKCntPass'] / SO[i]['orderQty']) * 100
  }

  return SO
}

const updatePage = (page) => {
  pagination.value.page = page
  doUpdate()
}

const updateSOStatusLineNote = async (row, newVal) => {
  let so = toRaw(row)
  let lineNote = so['statusLineNote']
  lineNote.project = so['projectNO']
  lineNote.line = so['orderNO'] + '-' + so['orderLine']
  lineNote.note_type = 'STATUS'
  lineNote.note = newVal
  axiosModify('/Data/LineNote', lineNote)
}

const updateSOAssignToLineNote = async (soLine, newVal) => {
  let so = toRaw(soLine)
  let lineNote = so['assignLineNote']
  lineNote.project = so['projectNO']
  lineNote.line = so['orderNO'] + '-' + so['orderLine']
  lineNote.note_type = 'ASSIGN'
  lineNote.note = newVal
  axiosModify('/Data/LineNote', lineNote)
}

const updatePOLineNote = async (poLine, newVal) => {
  let po = toRaw(poLine)
  let lineNote = po['lineNote']
  lineNote.project = po['purchaseProjectNO']
  lineNote.line = po['purchaseNO'] + '-' + po['purchaseLine']
  lineNote.note_type = 'STATUS'
  lineNote.note = newVal
  axiosModify('/Data/LineNote', lineNote)
}

const updateBOMLineNote = async (bomLine, newVal) => {
  let bom = toRaw(bomLine)
  let lineNote = bom['lineNote']
  lineNote.project = bom['bomProjectNO']
  lineNote.line = bom['workOrderNO'] + '-' + bom['bomLine']
  lineNote.note_type = 'STATUS'
  lineNote.note = newVal
  axiosModify('/Data/LineNote', lineNote)
}

const download = () => {
  expandTableToExcel('OpenSalesItems', 'OpenSalesItems' + '_' + props.site, props.site)
}

// events
onMounted(() => {
  doUpdate({ pagination: pagination.value })
})

watch(props, (value, oldValue) => {
  console.debug('watch:', oldValue, '--->', value)
  doUpdate()
})
</script>

<style lang="scss">
@import '@/css/app.scss';

.open-sale-items-table {
  @extend .sticky-header-column--dense;

  thead tr th:nth-child(2) {
    position: sticky;
    left: 30px;
    z-index: 3;
    background-color: $primary;
  }

  tbody tr td:nth-child(2) {
    position: sticky;
    left: 30px;
    z-index: 1;
    background-color: white;
  }

  thead tr th:nth-child(3) {
    position: sticky;
    left: 30px+45px;
    z-index: 3;
    background-color: $primary;
  }

  tbody tr td:nth-child(3) {
    position: sticky;
    left: 30px+45px;
    z-index: 1;
    background-color: white;
  }

  thead tr th:nth-child(4) {
    position: sticky;
    left: 30px+45px+100px;
    z-index: 3;
    background-color: $primary;
  }

  tbody tr td:nth-child(4) {
    position: sticky;
    left: 30px+45px+100px;
    z-index: 1;
    background-color: white;
  }
}
</style>
