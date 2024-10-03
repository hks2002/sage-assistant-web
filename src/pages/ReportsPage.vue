<!--
* @Author                : Robert Huang<56649783@qq.com>
* @CreatedDate           : 2023-05-25 01:02:00
* @LastEditors           : Robert Huang<56649783@qq.com>
* @LastEditDate          : 2024-11-29 19:33:37
* @FilePath              : sage-assistant-web/src/pages/ReportsPage.vue
* @CopyRight             : Dedienne Aerospace China ZhuHai
-->

<template>
  <q-page class="row" :style-fn="$pageStore.setTabPageHeightStyle">
    <div class="column col-md-4 col-lg-4 col-xl-3 q-pa-xs">
      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> A </q-avatar>
          <q-tooltip>{{ $t('S.ACK') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            v-model="OrderNO"
            :label="$t('F.OrderNO')"
            outlined
            clearable
            hint="ZCC200002 ZREP2019001"
            :hide-hint="true"
            input-class="text-uppercase"
            class="q-pa-xs"
            @keydown="clickTarget($event, 'showSalesOrder')"
          >
          </q-input>
        </q-item-section>
        <q-item-section side>
          <q-btn
            id="showSalesOrder"
            text-color="orange-10"
            dense
            icon="fas fa-file-pdf"
            @click="showPdf('SalesOrder')"
          />
        </q-item-section>
        <q-item-section side>
          <q-btn text-color="indigo-7" dense icon="fas fa-file-word" @click="exportWord('SalesOrder')" />
        </q-item-section>
        <q-item-section side>
          <q-btn
            id="showSalesOrder"
            text-color="light-green-7"
            dense
            icon="fas fa-file-pdf"
            @click="showPdf('SalesOrder', 'sage')"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> C </q-avatar>
          <q-tooltip>{{ $t('S.COC') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            v-model="COCProj"
            :label="$t('ProjectNO & Order Line')"
            outlined
            clearable
            hint="ZCC200002-1 ZCC190001-11 ZREP2019001-1 ZDSRP190001"
            :hide-hint="true"
            input-class="text-uppercase"
            class="q-pa-xs"
            @keydown="clickTarget($event, 'showCOC')"
          >
          </q-input>
        </q-item-section>
        <q-item-section side>
          <q-btn id="showCOC" text-color="orange-10" dense icon="fas fa-file-pdf" @click="showPdf('COC')" />
        </q-item-section>
        <q-item-section side>
          <q-btn text-color="indigo-7" dense icon="fas fa-file-word" @click="exportWord('COC')" />
        </q-item-section>
        <q-item-section side>
          <q-btn dense flat disable icon="fas fa-file-pdf" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> D </q-avatar>
          <q-tooltip>{{ $t('S.DELIVERY') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('F.DeliveryNO')"
            v-model="DeliveryNO"
            outlined
            clearable
            hint="ZBL190001"
            :hide-hint="true"
            input-class="text-uppercase"
            @keydown="clickTarget($event, 'showDelivery')"
            class="q-pa-xs"
          >
          </q-input>
        </q-item-section>
        <q-item-section side>
          <q-btn id="showDelivery" text-color="orange-10" dense icon="fas fa-file-pdf" @click="showPdf('Delivery')" />
        </q-item-section>
        <q-item-section side>
          <q-btn text-color="indigo-7" dense icon="fas fa-file-word" @click="exportWord('Delivery')" />
        </q-item-section>
        <q-item-section side>
          <q-btn
            id="showDeliverySage"
            text-color="light-green-7"
            dense
            icon="fas fa-file-pdf"
            @click="showPdf('Delivery', 'sage')"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> I </q-avatar>
          <q-tooltip>{{ $t('S.INVOICE') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('F.InvoiceNO')"
            v-model="InvoiceNO"
            outlined
            clearable
            hint="ZFC1901001 ZPC190001"
            :hide-hint="true"
            input-class="text-uppercase"
            @keydown="clickTarget($event, 'showInvoice')"
            class="q-pa-xs"
          >
          </q-input>
        </q-item-section>
        <q-item-section side>
          <q-btn id="showInvoice" text-color="orange-10" dense icon="fas fa-file-pdf" @click="showPdf('Invoice')" />
        </q-item-section>
        <q-item-section side>
          <q-btn text-color="indigo-7" dense icon="fas fa-file-word" @click="exportWord('Invoice')" />
        </q-item-section>
        <q-item-section side>
          <q-btn
            id="showInvoiceSage"
            text-color="light-green-7"
            dense
            icon="fas fa-file-pdf"
            @click="showPdf('Invoice', 'sage')"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> P </q-avatar>
          <q-tooltip>{{ $t('S.PURCHASE_ORDER') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('F.PurchaseNO')"
            v-model="PurchaseNO"
            outlined
            clearable
            hint="HCF2100015"
            :hide-hint="true"
            input-class="text-uppercase"
            @keydown="clickTarget($event, 'showPO')"
            class="q-pa-xs"
          >
            <q-checkbox v-model="POtax" label="Tax" />
          </q-input>
        </q-item-section>
        <q-item-section side>
          <q-btn id="showPO" text-color="orange-10" dense icon="fas fa-file-pdf" @click="showPdf('PurchaseOrder')" />
        </q-item-section>
        <q-item-section side>
          <q-btn text-color="indigo-7" dense icon="fas fa-file-word" @click="exportWord('PurchaseOrder')" />
        </q-item-section>
        <q-item-section side>
          <q-btn
            id="showPurchaseOrderSage"
            text-color="light-green-7"
            dense
            icon="fas fa-file-pdf"
            @click="showPdf('PurchaseOrder', 'sage')"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> R </q-avatar>
          <q-tooltip>{{ $t('S.RECEIPT') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('F.ReceiptNO')"
            v-model="ReceiptNO"
            outlined
            clearable
            hint="ZRA1900607"
            :hide-hint="true"
            input-class="text-uppercase"
            @keydown="clickTarget($event, 'showReceipt')"
            class="q-pa-xs"
          >
          </q-input>
        </q-item-section>
        <q-item-section side>
          <q-btn id="showReceipt" text-color="orange-10" dense icon="fas fa-file-pdf" @click="showPdf('Receipt')" />
        </q-item-section>
        <q-item-section side>
          <q-btn text-color="indigo-7" dense icon="fas fa-file-word" @click="exportWord('Receipt')" />
        </q-item-section>
        <q-item-section side>
          <q-btn dense flat disable icon="fas fa-file-pdf" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> R2 </q-avatar>
          <q-tooltip>{{ $t('S.R2_TOOLTIP') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('S.SITE_VENDOR_CODE_DURATION')"
            v-model="PurchaseSiteVendorCodeDuration"
            outlined
            clearable
            hint="ZHU-20715-20201001-20201031"
            :hide-hint="true"
            input-class="text-uppercase"
            @keydown="clickTarget($event, 'showReceipt2')"
            class="q-pa-xs"
          >
          </q-input>
        </q-item-section>
        <q-item-section side>
          <q-btn id="showReceipt2" text-color="orange-10" dense icon="fas fa-file-pdf" @click="showPdf('Receipt2')" />
        </q-item-section>
        <q-item-section side>
          <q-btn text-color="indigo-7" dense icon="fas fa-file-word" @click="exportWord('Receipt2')" />
        </q-item-section>
        <q-item-section side>
          <q-btn dense flat disable icon="fas fa-file-pdf" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> W </q-avatar>
          <q-tooltip>{{ $t('S.WORKER_ORDER') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('S.PROJECT_OR_WORK_ORDER_NO')"
            v-model="ProjectOrWorkOrderNO"
            outlined
            clearable
            hint="HCC200033-1 OR ZOF1901001"
            :hide-hint="true"
            input-class="text-uppercase"
            @keydown="clickTarget($event, 'showWO')"
            class="q-pa-xs"
          >
          </q-input>
        </q-item-section>
        <q-item-section side>
          <q-btn id="showWO" text-color="orange-10" dense icon="fas fa-file-pdf" @click="showPdf('WorkOrder')" />
        </q-item-section>
        <q-item-section side>
          <q-btn text-color="indigo-7" dense icon="fas fa-file-word" @click="exportWord('WorkOrder')" />
        </q-item-section>
        <q-item-section side>
          <q-btn dense flat disable icon="fas fa-file-pdf" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> S </q-avatar>
          <q-tooltip>{{ $t('S.SOA') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('S.SITE_AND_BP_CODE')"
            v-model="SiteAndBPCode"
            outlined
            clearable
            hint="ZHU00870 OR ZHU"
            :hide-hint="true"
            input-class="text-uppercase"
            @keydown="clickTarget($event, 'showSOA')"
            class="q-pa-xs"
          >
          </q-input>
        </q-item-section>
        <q-item-section side>
          <q-btn id="showSOA" text-color="orange-10" dense icon="fas fa-file-pdf" @click="showPdf('SOA')" />
        </q-item-section>
        <q-item-section side>
          <q-btn text-color="indigo-7" dense icon="fas fa-file-word" @click="exportWord('SOA')" />
        </q-item-section>
        <q-item-section side>
          <q-btn dense flat disable icon="fas fa-file-pdf" />
        </q-item-section>
      </q-item>
    </div>
    <q-separator vertical inset />
    <div class="column col q-pa-xs">
      <iframe id="pdfWin" frameborder="0" class="fit" :src="UrlShow" @load="onSubFrameLoad" />
      <iframe frameborder="0" width="0" height="0" :src="UrlExport" />
    </div>
  </q-page>
</template>

<script setup>
import { axios } from '@/assets/axios'
import { validateInput } from '@/assets/reportUtils'
import { QSpinnerGears, useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'

import { usePageStore } from '@/stores/PageStore'
const $pageStore = usePageStore()

const $q = useQuasar()

const UrlShow = ref('about:blank')
const UrlExport = ref('about:blank')

const COCProj = ref('')
const DeliveryNO = ref('')
const InvoiceNO = ref('')
const OrderNO = ref('')
const PurchaseNO = ref('')
const POtax = ref(true)
const ReceiptNO = ref('')
const PurchaseSiteVendorCodeDuration = ref('')
const ProjectOrWorkOrderNO = ref('')
const SiteAndBPCode = ref('')

onMounted(() => {
  // must change it once, otherwise it doesn't show in iframe
  UrlShow.value = '/#/WaitInput'
})

/**
 * listen to subFrame load event
 */
const onSubFrameLoad = () => {
  $q.loadingBar.stop()
}

/**
 * listen to Enter event and trigger click
 * @param {*} evt
 * @param {*} clickTarget
 */
const clickTarget = (evt, clickTarget) => {
  try {
    if (evt.key === 'Enter') {
      const btn = document.querySelector('#' + clickTarget)
      btn.click()
      return false
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * get rpt input value.
 * @param {*} rpt  report
 * @return UpperCased value
 */
const getInputValue = (rpt) => {
  let vals = { val: '', val2: '' }

  switch (rpt) {
    case 'SalesOrder':
      vals.val = OrderNO.value
      break
    case 'COC':
      vals.val = COCProj.value
      break
    case 'Delivery':
      vals.val = DeliveryNO.value
      break
    case 'Invoice':
      vals.val = InvoiceNO.value
      break
    case 'PurchaseOrder':
      vals.val = PurchaseNO.value
      vals.val2 = POtax.value
      break
    case 'Receipt':
      vals.val = ReceiptNO.value
      break
    case 'Receipt2':
      vals.val = PurchaseSiteVendorCodeDuration.value
      break
    case 'WorkOrder':
      vals.val = ProjectOrWorkOrderNO.value
      break
    case 'SOA':
      vals.val = SiteAndBPCode.value
      break
    default:
  }

  vals.val = vals.val.toUpperCase()

  return vals
}

const showPdf = async (rpt, fromWhere) => {
  let vals = getInputValue(rpt)

  if (!validateInput(rpt, vals.val)) {
    return
  }

  $q.loadingBar.start()

  if (fromWhere === 'sage') {
    // Here is Promise
    getSageUrl(rpt, vals.val, vals.val2).then((url) => {
      UrlShow.value = url
      $q.loadingBar.stop()
      $q.loading.hide()
    })
  } else {
    UrlShow.value = getSageAssistantUrl(rpt, vals, 'pdf')
    $q.loadingBar.stop()
    $q.loading.hide()
  }
}

const exportWord = (rpt) => {
  let vals = getInputValue(rpt)

  if (!validateInput(rpt, vals.val)) {
    return
  }

  $q.loadingBar.start()
  UrlExport.value = getSageAssistantUrl(rpt, vals, 'doc')

  $q.loadingBar.stop()
  $q.loading.hide()
}

/**
 * get report url from Sage Assistant
 * @param {*} rpt
 * @param {*} vals {val:val,val2:val2}
 * @param {*} type 'pdf','doc'
 */
const getSageAssistantUrl = (rpt, vals, type) => {
  let url = '/#/WaitInput'
  switch (rpt) {
    case 'SalesOrder':
      url = `/Report/SalesOrder/${type}?OrderNO=${vals.val}&FileName=${vals.val}`
      break
    case 'COC':
      url = `/Report/COC/${type}?ProjectNO=${vals.val}&FileName=${vals.val}`
      break
    case 'Delivery':
      url = `/Report/Delivery/${type}?DeliveryNO=${vals.val}&FileName=${vals.val}`
      break
    case 'Invoice':
      url = `/Report/Invoice/${type}?InvoiceNO=${vals.val}&FileName=${vals.val}&Language=ENG`
      break
    case 'PurchaseOrder':
      url = `/Report/PurchaseOrder/${type}` + `?PurchaseNO=${vals.val}&TaxInclude=${vals.val2}&FileName=${vals.val}`
      break
    case 'Receipt':
      url = `/Report/Receipt/${type}?ReceiptNO=${vals.val}&FileName=${vals.val}`
      break
    case 'Receipt2':
      url =
        `/Report/Receipt2/${type}` +
        `?PurchaseSite=${vals.val.slice(0, 3)}` +
        `&VendorCode=${vals.val.slice(4, 9)}` +
        `&StartDay=${vals.val.slice(10, 18)}&EndDay=${vals.val.slice(19, 27)}&FileName=${vals.val}`
      break
    case 'WorkOrder':
      url = `/Report/WorkOrder/${type}?ProjectOrWorkOrderNO=${vals.val}&FileName=${vals.val}`
      break
    case 'SOA':
      url =
        vals.val.length === 3
          ? `/Report/SOA/${type}?Site=${vals.val.slice(0, 3)}&FileName=${vals.val}`
          : `/Report/SOA-VENDOR/${type}?Site=` +
            `${vals.val.slice(0, 3)}&Customer=${vals.val.slice(3, 8)}&FileName=${vals.val}`
      break
    default:
      url = '/#/Exception/500'
  }
  return url
}

const getSageUrl = async (rpt, val, val2) => {
  $q.loading.show({
    message: 'Printing report ...',
    messageColor: 'light-green',
    spinner: QSpinnerGears,
    spinnerColor: 'light-green',
    spinnerSize: 40
  })

  return await axios.post(`/Data/PrintUUID?ReportType=${rpt}&ReportNO=${val}&Opt=${val2}`, {}).then(
    async (response) => {
      if (response.status === 200 && response.data.success) {
        $q.loading.show({
          message: 'Report printed',
          messageColor: 'green',
          spinner: QSpinnerGears,
          spinnerColor: 'green',
          spinnerSize: 40
        })
        // response.data.printUUID
        // passing process loading function
        const reportUrl = await axios.post(`/Data/ReportUUID?PrintUUID=${response.data.printUUID}`, {}).then(
          (resp) => {
            if (resp.status === 200 && resp.data.success) {
              $q.loading.show({
                message: 'Report completed',
                messageColor: 'green',
                spinner: QSpinnerGears,
                spinnerColor: 'green',
                spinnerSize: 80
              })
              // response.data.reportUUID
              return `/Data/ReportFile?ReportNO=${val}&ReportUUID=${resp.data.reportUUID}`
            } else {
              return '/#/Exception/500'
            }
          },
          // ReportUUID reject
          () => {
            return '/#/Exception/500'
          }
        )

        return reportUrl
      } else {
        return '/#/Exception/500'
      }
    },
    // PrintUUID reject
    () => {
      return '/#/Exception/500'
    }
  )
}
</script>

<style lang="scss" scoped></style>
