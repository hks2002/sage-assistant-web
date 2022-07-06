/***
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-06-09 17:24:01
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-06-14 17:42:37
 * @FilePath       : \web2\src\components\todo\OpenSalesItemsColumns.js
 * @CopyRight      : Dedienne Aerospace China ZhuHai
 */
import { i18n } from '@/assets/i18n'
const { t } = i18n.global

export default [
  { name: '#', label: '#', align: 'center', headerClasses: 'bg-white' },
  //{ name: 'orderno', label: t('OrderNO'), field: 'OrderNO', align: 'left', sortable: true },
  //{ name: 'orderline', label: t('OrderLine'), field: 'OrderLine', align: 'left', sortable: true },
  {
    name: 'trackingno',
    label: t('TrackingNO'),
    field: 'TrackingNO',
    align: 'left',
    headerClasses: 'bg-indigo-1'
  },
  //{ name: 'orderprojectno', label: t('OrderProjectNO'), field: 'OrderProjectNO', align: 'left', sortable: true },
  {
    name: 'ordertype',
    label: t('OrderType'),
    field: 'OrderType',
    align: 'left',
    headerClasses: 'bg-indigo-1'
  },
  {
    name: 'orderpn',
    label: t('PN'),
    field: 'OrderPN',
    align: 'left',
    headerClasses: 'bg-indigo-1'
  },
  {
    name: 'orderpndesc',
    label: t('Desc'),
    field: 'OrderPNDesc',
    align: 'left',
    headerClasses: 'bg-indigo-1'
  },
  {
    name: 'orderqty',
    label: t('QTY'),
    field: 'OrderQTY',
    align: 'center',
    headerClasses: 'bg-indigo-1'
  },
  {
    name: 'orderprice',
    label: t('Price'),
    field: 'OrderPrice',
    align: 'right',
    headerClasses: 'bg-indigo-1'
  },
  {
    name: 'ordercurrency',
    label: t('Currency'),
    field: 'OrderCurrency',
    align: 'center',
    headerClasses: 'bg-indigo-1'
  },
  {
    name: 'customercode',
    label: t('Customer'),
    field: 'CustomerCode',
    align: 'left',
    headerClasses: 'bg-indigo-1'
  },
  //{ name: 'customername', label: t('CustomerName'), field: 'CustomerName', align: 'left', sortable: true },
  {
    name: 'orderdate',
    label: t('OrderDate'),
    field: 'OrderDate',
    align: 'center',
    headerClasses: 'bg-indigo-1'
  },
  {
    name: 'orderrequestdate',
    label: t('RequestDate'),
    field: 'OrderRequestDate',
    align: 'center',
    headerClasses: 'bg-indigo-1'
  },
  {
    name: 'daysleft',
    label: t('DaysLeft'),
    field: 'DaysLeft',
    align: 'center',
    sortable: true,
    headerClasses: 'bg-indigo-1'
  },
  {
    name: 'orderplaneddate',
    label: t('PlanDate'),
    field: 'OrderPlanedDate',
    align: 'center',
    sortable: true,
    headerClasses: 'bg-indigo-1'
  },
  {
    name: 'orderdeliveryflag',
    label: t('D-Ready'),
    field: 'OrderDeliveryFlag',
    align: 'center',
    headerClasses: 'bg-indigo-1'
  },
  {
    name: 'projectnote',
    label: t('Note'),
    field: 'ProjectNote',
    align: 'left',
    headerClasses: 'bg-indigo-1',
    headerStyle: 'min-width: 100px'
  },
  //{ name: 'bomprojectno', label: t('BomProjectNO'), field: 'BomProjectNO', align: 'left', sortable: true },
  //{    name: 'workorderno',    label: t('WorkOrderNO'),    field: 'WorkOrderNO',    align: 'left',    headerClasses: 'bg-blue-grey-1'  },
  //{ name: 'bomseq', label: t('BomSeq'), field: 'BomSeq', align: 'left', sortable: true },
  {
    name: 'bompn',
    label: t('BomPN'),
    field: 'BomPN',
    align: 'left',
    headerClasses: 'bg-blue-grey-1'
  },
  //{ name: 'bomdesc', label: t('Desc'), field: 'BomDesc', align: 'left', sortable: false },
  {
    name: 'bomqty',
    label: t('QTY'),
    field: 'BomQTY',
    align: 'center',
    headerClasses: 'bg-blue-grey-1'
  },
  //{ name: 'bomunit', label: t('Unit'), field: 'BomUnit', align: 'center', sortable: false },
  {
    name: 'shortqty',
    label: t('Short'),
    field: 'ShortQty',
    align: 'center',
    headerClasses: 'bg-blue-grey-1'
  },
  {
    name: 'allqty',
    label: t('Alloc'),
    field: 'AllQty',
    align: 'center',
    headerClasses: 'bg-blue-grey-1'
  },
  {
    name: 'avaqty',
    label: t('Avail'),
    field: 'AvaQty',
    align: 'center',
    headerClasses: 'bg-blue-grey-1'
  },
  //{ name: 'bomrequestdate', label: t('RequestDate'), field: 'BomRequestDate', align: 'center', sortable: true },
  //{ name: 'stockpn', label: t('StockPN'), field: 'StockPN', align: 'left', sortable: true },
  {
    name: 'purchaseno',
    label: t('PurchaseNO'),
    field: 'PurchaseNO',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  //{ name: 'purchaseline', label: t('PurchaseLine'), field: 'PurchaseLine', align: 'left', sortable: true },
  //{ name: 'purchaseprojectno', label: t('PurchaseProjectNO'), field: 'PurchaseProjectNO', align: 'left', sortable: true },
  {
    name: 'purchasepn',
    label: t('PurchasePN'),
    field: 'PurchasePN',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  //{ name: 'purchasepndesc', label: t('PurchasePNDesc'), field: 'PurchasePNDesc', align: 'left', sortable: true },
  {
    name: 'purchaseqty',
    label: t('QTY'),
    field: 'PurchaseQTY',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  //{ name: 'purchaseunit', label: t('PurchaseUnit'), field: 'PurchaseUnit', align: 'left', sortable: true },
  {
    name: 'vendorcode',
    label: t('Vendor'),
    field: 'VendorCode',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  //{ name: 'vendorname', label: t('VendorName'), field: 'VendorName', align: 'left', sortable: true },
  {
    name: 'purchasedate',
    label: t('PurchaseDate'),
    field: 'PurchaseDate',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  {
    name: 'purchaseexpectdate',
    label: t('ExpectDate'),
    field: 'PurchaseExpectDate',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  {
    name: 'purchaseackdate',
    label: t('AckDate'),
    field: 'PurchaseAckDate',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  {
    name: 'ordersadflag',
    label: t('SAD'),
    field: 'OrderSADFlag',
    align: 'center',
    headerClasses: 'bg-blue-1'
  },
  {
    name: 'purchasenote',
    label: t('Note'),
    field: 'PurchaseNote',
    align: 'left',
    headerClasses: 'bg-blue-1',
    headerStyle: 'min-width: 100px'
  },
  //{ name: 'purchaseuser', label: t('PurchaseUser'), field: 'PurchaseUser', align: 'left', sortable: true },
  {
    name: 'receiptno',
    label: t('ReceiptNO'),
    field: 'ReceiptNO',
    align: 'left',
    headerClasses: 'bg-green-1'
  },
  //{ name: 'receiptline', label: t('ReceiptLine'), field: 'ReceiptLine', align: 'left', sortable: true },
  //{ name: 'receiptpurchaseno', label: t('ReceiptPurchaseNO'), field: 'ReceiptPurchaseNO', align: 'left', sortable: true },
  //{ name: 'receiptpurchaseline', label: t('ReceiptPurchaseLine'), field: 'ReceiptPurchaseLine', align: 'left', sortable: true },
  {
    name: 'receiptqty',
    label: t('Qty'),
    field: 'ReceiptQty',
    align: 'center',
    headerClasses: 'bg-green-1'
  },
  {
    name: 'receiptdate',
    label: t('ReceiptDate'),
    field: 'ReceiptDate',
    align: 'left',
    classes: 'bg-green-1',
    headerClasses: 'bg-green-1'
  },
  //{ name: 'receipter', label: t('Receipter'), field: 'Receipter', align: 'left', sortable: true },
  //{ name: 'claimprojectno', label: t('ClaimProjectNO'), field: 'ClaimProjectNO', align: 'left', sortable: true },
  {
    name: 'orderproductflag',
    label: t('QC-PASS'),
    field: 'OrderProductFlag',
    align: 'center',
    headerClasses: 'bg-green-3'
  },
  {
    name: 'claimno',
    label: t('NC NO'),
    field: 'ClaimNO',
    align: 'left',
    headerClasses: 'bg-red-1'
  },
  {
    name: 'ncdetail',
    label: t('NC Code'),
    field: 'NCCode',
    align: 'left',
    headerClasses: 'bg-red-1'
  }
  //{ name: 'claimnote', label: t('ClaimNote'), field: 'ClaimNote', align: 'left', sortable: true },
  //{ name: 'claimnc0cri', label: t('ClaimNC0Cri'), field: 'ClaimNC0Cri', align: 'left', sortable: true },
  //{ name: 'claimnc0type', label: t('ClaimNC0Type'), field: 'ClaimNC0Type', align: 'left', sortable: true },
  //{ name: 'claimnc0date', label: t('ClaimNC0Date'), field: 'ClaimNC0Date', align: 'left', sortable: true },
  //{ name: 'claimnc0desc', label: t('ClaimNC0Desc'), field: 'ClaimNC0Desc', align: 'left', sortable: true },
  //{ name: 'claimnc1cri', label: t('ClaimNC1Cri'), field: 'ClaimNC1Cri', align: 'left', sortable: true },
  //{ name: 'claimnc1type', label: t('ClaimNC1Type'), field: 'ClaimNC1Type', align: 'left', sortable: true },
  //{ name: 'claimnc1date', label: t('ClaimNC1Date'), field: 'ClaimNC1Date', align: 'left', sortable: true },
  //{ name: 'claimnc1desc', label: t('ClaimNC1Desc'), field: 'ClaimNC1Desc', align: 'left', sortable: true },
  //{ name: 'claimnc2cri', label: t('ClaimNC2Cri'), field: 'ClaimNC2Cri', align: 'left', sortable: true },
  //{ name: 'claimnc2type', label: t('ClaimNC2Type'), field: 'ClaimNC2Type', align: 'left', sortable: true },
  //{ name: 'claimnc2date', label: t('ClaimNC2Date'), field: 'ClaimNC2Date', align: 'left', sortable: true },
  //{ name: 'claimnc2desc', label: t('ClaimNC2Desc'), field: 'ClaimNC2Desc', align: 'left', sortable: true },
  //{ name: 'claimnc3cri', label: t('ClaimNC3Cri'), field: 'ClaimNC3Cri', align: 'left', sortable: true },
  //{ name: 'claimnc3type', label: t('ClaimNC3Type'), field: 'ClaimNC3Type', align: 'left', sortable: true },
  //{ name: 'claimnc3date', label: t('ClaimNC3Date'), field: 'ClaimNC3Date', align: 'left', sortable: true },
  //{ name: 'claimnc3desc', label: t('ClaimNC3Desc'), field: 'ClaimNC3Desc', align: 'left', sortable: true },
  //{ name: 'claimnc4cri', label: t('ClaimNC4Cri'), field: 'ClaimNC4Cri', align: 'left', sortable: true },
  //{ name: 'claimnc4type', label: t('ClaimNC4Type'), field: 'ClaimNC4Type', align: 'left', sortable: true },
  //{ name: 'claimnc4date', label: t('ClaimNC4Date'), field: 'ClaimNC4Date', align: 'left', sortable: true },
  //{ name: 'claimnc4desc', label: t('ClaimNC4Desc'), field: 'ClaimNC4Desc', align: 'left', sortable: true },
  //{ name: 'claimnc5cri', label: t('ClaimNC5Cri'), field: 'ClaimNC5Cri', align: 'left', sortable: true },
  //{ name: 'claimnc5type', label: t('ClaimNC5Type'), field: 'ClaimNC5Type', align: 'left', sortable: true },
  //{ name: 'claimnc5date', label: t('ClaimNC5Date'), field: 'ClaimNC5Date', align: 'left', sortable: true },
  //{ name: 'claimnc5desc', label: t('ClaimNC5Desc'), field: 'ClaimNC5Desc', align: 'left', sortable: true },
  //{ name: 'claimnc6cri', label: t('ClaimNC6Cri'), field: 'ClaimNC6Cri', align: 'left', sortable: true },
  //{ name: 'claimnc6type', label: t('ClaimNC6Type'), field: 'ClaimNC6Type', align: 'left', sortable: true },
  //{ name: 'claimnc6date', label: t('ClaimNC6Date'), field: 'ClaimNC6Date', align: 'left', sortable: true },
  //{ name: 'claimnc6desc', label: t('ClaimNC6Desc'), field: 'ClaimNC6Desc', align: 'left', sortable: true },
  //{ name: 'claimnc7cri', label: t('ClaimNC7Cri'), field: 'ClaimNC7Cri', align: 'left', sortable: true },
  //{ name: 'claimnc7type', label: t('ClaimNC7Type'), field: 'ClaimNC7Type', align: 'left', sortable: true },
  //{ name: 'claimnc7date', label: t('ClaimNC7Date'), field: 'ClaimNC7Date', align: 'left', sortable: true },
  //{ name: 'claimnc7desc', label: t('ClaimNC7Desc'), field: 'ClaimNC7Desc', align: 'left', sortable: true },
  //{ name: 'claimnc8cri', label: t('ClaimNC8Cri'), field: 'ClaimNC8Cri', align: 'left', sortable: true },
  //{ name: 'claimnc8type', label: t('ClaimNC8Type'), field: 'ClaimNC8Type', align: 'left', sortable: true },
  //{ name: 'claimnc8date', label: t('ClaimNC8Date'), field: 'ClaimNC8Date', align: 'left', sortable: true },
  //{ name: 'claimnc8desc', label: t('ClaimNC8Desc'), field: 'ClaimNC8Desc', align: 'left', sortable: true },
  //{ name: 'claimnc9cri', label: t('ClaimNC9Cri'), field: 'ClaimNC9Cri', align: 'left', sortable: true },
  //{ name: 'claimnc9type', label: t('ClaimNC9Type'), field: 'ClaimNC9Type', align: 'left', sortable: true },
  //{ name: 'claimnc9date', label: t('ClaimNC9Date'), field: 'ClaimNC9Date', align: 'left', sortable: true },
  //{ name: 'claimnc9desc', label: t('ClaimNC9Desc'), field: 'ClaimNC9Desc', align: 'left', sortable: true },
  //{ name: 'claimnc10cri', label: t('ClaimNC10Cri'), field: 'ClaimNC10Cri', align: 'left', sortable: true },
  //{ name: 'claimnc10type', label: t('ClaimNC10Type'), field: 'ClaimNC10Type', align: 'left', sortable: true },
  //{ name: 'claimnc10date', label: t('ClaimNC10Date'), field: 'ClaimNC10Date', align: 'left', sortable: true },
  //{ name: 'claimnc10desc', label: t('ClaimNC10Desc'), field: 'ClaimNC10Desc', align: 'left', sortable: true },
  //{ name: 'claimnc11cri', label: t('ClaimNC11Cri'), field: 'ClaimNC11Cri', align: 'left', sortable: true },
  //{ name: 'claimnc11type', label: t('ClaimNC11Type'), field: 'ClaimNC11Type', align: 'left', sortable: true },
  //{ name: 'claimnc11date', label: t('ClaimNC11Date'), field: 'ClaimNC11Date', align: 'left', sortable: true },
  //{ name: 'claimnc11desc', label: t('ClaimNC11Desc'), field: 'ClaimNC11Desc', align: 'left', sortable: true },
]
