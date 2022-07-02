<template>
  <q-page class="row">
    <div class="column col-md-4 col-lg-4 col-xl-3 q-pa-xs">
      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> A </q-avatar>
          <q-tooltip>{{ $t('SalesOrder Acknowledge') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            v-model="OrderNO4SA"
            :label="$t('OrderNO')"
            outlined
            clearable
            hint="ZCC200002 ZREP2019001"
            :hide-hint="true"
            input-class="text-uppercase"
            class="q-pa-xs"
            @keydown="clickTarget($event, 'showSA')"
          >
          </q-input>
        </q-item-section>
        <q-item-section side>
          <q-btn dense flat disable icon="fas fa-file-pdf" />
        </q-item-section>
        <q-item-section side>
          <q-btn dense flat disable icon="fas fa-file-word" />
        </q-item-section>
        <q-item-section side>
          <q-btn id="showSA" text-color="light-green-7" dense icon="fas fa-file-pdf" @click="showPdf('SA', 'sage')" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> C </q-avatar>
          <q-tooltip>{{ $t('COC') }}</q-tooltip>
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
          <q-tooltip>{{ $t('Delivery') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('Delivery NO')"
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
          <q-tooltip>{{ $t('Invoice') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('Invoice NO')"
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
          <q-avatar color="primary" text-color="white"> I2 </q-avatar>

          <q-tooltip>{{ $t('Invoice by Sales Order') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('Order NO')"
            v-model="OrderNO4Invoice"
            outlined
            clearable
            hint="ZCC180020 or customer order"
            :hide-hint="true"
            input-class="text-uppercase"
            @keydown="clickTarget($event, 'showInvoice2')"
            class="q-pa-xs"
          >
          </q-input>
        </q-item-section>
        <q-item-section side>
          <q-btn id="showInvoice2" text-color="orange-10" dense icon="fas fa-file-pdf" @click="showPdf('Invoice2')" />
        </q-item-section>
        <q-item-section side>
          <q-btn text-color="indigo-7" dense icon="fas fa-file-word" @click="exportWord('Invoice2')" />
        </q-item-section>
        <q-item-section side>
          <q-btn dense flat disable icon="fas fa-file-pdf" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white"> P </q-avatar>
          <q-tooltip>{{ $t('Purchase Order') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('Purchase NO')"
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
          <q-tooltip>{{ $t('Receiptation') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('Receipt NO')"
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
          <q-tooltip>{{ $t('Receiptation By Site & Vendor & Duration') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('PurchaseSite-VendorCode-Duration')"
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
          <q-tooltip>{{ $t('Work Order') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('Project/Work Order NO')"
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
          <q-tooltip>{{ $t('Statement Of Account') }}</q-tooltip>
        </q-item-section>
        <q-item-section>
          <q-input
            :label="$t('Site&CustomerCode')"
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
      <iframe id="pdfwin" frameborder="0" class="fit" :src="UrlShow" @load="onSubFrameLoad" />
      <iframe frameborder="0" width="0" height="0" :src="UrlExport" />
    </div>
  </q-page>
</template>

<script setup>
import { validateInput } from '@/assets/reportUtils'
import {
  doActsForSagePrint,
  getInvoiceTransaction,
  getSageReportUrl,
  getSageSessionUrl,
  getSalesOrderTransaction
} from '@/assets/sageSvcs'
import { QSpinnerGears, useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'

const $q = useQuasar()

const UrlShow = ref('about:blank')
const UrlExport = ref('about:blank')

const COCProj = ref('')
const DeliveryNO = ref('')
const InvoiceNO = ref('')
const OrderNO4SA = ref('')
const OrderNO4Invoice = ref('')
const PurchaseNO = ref('')
const POtax = ref(true)
const ReceiptNO = ref('')
const PurchaseSiteVendorCodeDuration = ref('')
const ProjectOrWorkOrderNO = ref('')
const SiteAndBPCode = ref('')
const rptFncMap = {
  SA: 'GESSOH',
  Delivery: 'GESSDH',
  Invoice: 'GESSIH',
  PurchaseOrder: 'GESPOH'
}

onMounted(() => {
  // must change it once, other wise it doesn't show in iframe
  UrlShow.value = '/#/WaitInput'

  // preload sage module, when you revoke the first action,
  // it could skip it, and save the total times.
  getSageSessionUrl('GESSOH2~1')
  getSageSessionUrl('GESSOH2~2')
  getSageSessionUrl('GESSDH')
  getSageSessionUrl('GESSIH')
  getSageSessionUrl('GESPOH3~1')
})

/**
 * listen to subFrame load event
 */
const onSubFrameLoad = () => {
  $q.loadingBar.stop()
}

/**
 * listen to Enter event and triggle click
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
 * @return Uppercased value
 */
const getInputValue = (rpt) => {
  let vals = { val: '', val2: '' }

  switch (rpt) {
    case 'SA':
      vals.val = OrderNO4SA.value
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
    case 'Invoice2':
      vals.val = OrderNO4Invoice.value
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
    UrlShow.value = await getSageUrl(rpt, vals.val, vals.val2)
    UrlShow.value += `?disposition=inline&filename=${vals.val}.pdf`
  } else {
    UrlShow.value = getSageAssistantUrl(rpt, vals, 'showPdf')
  }

  $q.loadingBar.stop()
  $q.loading.hide()
}

const exportWord = (rpt) => {
  let vals = getInputValue(rpt)

  if (!validateInput(rpt, vals.val)) {
    return
  }

  $q.loadingBar.start()
  UrlExport.value = getSageAssistantUrl(rpt, vals, 'exportWord')

  $q.loadingBar.stop()
  $q.loading.hide()
}

/**
 * get report url from Sage Assistant
 * @param {*} rpt
 * @param {*} vals {val:val,val2:val2}
 * @param {*} type 'showPdf','exportWord'
 */
const getSageAssistantUrl = (rpt, vals, type) => {
  let url = '/#/WaitInput'
  switch (rpt) {
    case 'COC':
      url = `/Report/COC/${type}?ProjectNO=${vals.val}`
      break
    case 'Delivery':
      url = `/Report/Delivery/${type}?DeliveryNO=${vals.val}`
      break
    case 'Invoice':
      url = `/Report/Invoice/${type}?Invoice=${vals.val}`
      break
    case 'Invoice2':
      url = `/Report/Invoice2/${type}?OrderNO=${vals.val}`
      break
    case 'PurchaseOrder':
      url = `/Report/PurchaseOrder/${type}` + `?PurchaseNO=${vals.val}&TaxInclude=${vals.val2}`
      break
    case 'Receipt':
      url = `/Report/Receipt/${type}?ReceiptNO=${vals.val}`
      break
    case 'Receipt2':
      url =
        `/Report/Receipt2/${type}` +
        `?PurchaseSite=${vals.val.slice(0, 3)}` +
        `&VendorCode=${vals.val.slice(4, 9)}` +
        `&StartDay=${vals.val.slice(10, 18)}&EndDay=${vals.val.slice(19, 27)}`
      break
    case 'WorkOrder':
      url = `/Report/WorkOrder/${type}?ProjectOrWorkOrderNO=${vals.val}`
      break
    case 'SOA':
      url = `/Report/SOA/${type}?Site=` + `${vals.val.slice(0, 3)}&BPCode=${vals.val.slice(3, 8)}`
      break
    default:
      url = '/#/Exception/500'
  }
  return url
}

const getSageUrl = async (rpt, val, val2) => {
  $q.loading.show({
    message: 'Preparing to print report...',
    spinner: QSpinnerGears,
    spinnerColor: 'indigo-1'
  })

  let trans = null
  if (rpt === 'SA') {
    trans = getSalesOrderTransaction(val)
  } else if (rpt === 'Invoice') {
    trans = getInvoiceTransaction(val)
  }

  const sageSessionUrl = await getSageSessionUrl(rptFncMap[rpt] + trans)
  if (!sageSessionUrl) {
    return '/#/Exception/500'
  }

  $q.loading.show({
    message: 'Setting report data...',
    spinner: QSpinnerGears,
    spinnerColor: 'indigo-5'
  })

  const rtn = await doActsForSagePrint(sageSessionUrl, rpt, val, val2)
  if (!rtn) {
    return '/#/Exception/500'
  }

  function process(cnt) {
    $q.loading.show({
      message: `Printing report in server ${cnt}...`,
      messageColor: 'light-green',
      spinner: QSpinnerGears,
      spinnerColor: 'light-green',
      spinnerSize: Math.log2(cnt) * 20
    })
  }
  process(1)
  // passing process loading function
  const reportUrl = await getSageReportUrl(null, process)

  // hide loading
  $q.loading.hide()

  return reportUrl
}
</script>

<style lang="scss" scoped>
.q-item__section--side {
  padding-left: 4px;
}
</style>
