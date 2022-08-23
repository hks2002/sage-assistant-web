/***
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-06-09 17:24:01
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-06-14 17:42:37
 * @FilePath       : \web2\src\components\todo\OpenSalesItemsColumns.js
 * @CopyRight      : Dedienne Aerospace China ZhuHai
 */
import { i18n } from '@/boot/i18n'
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
    name: 'projectstatus',
    label: t('Status'),
    field: 'ProjectStatus',
    align: 'left',
    headerClasses: 'bg-indigo-1',
    headerStyle: 'min-width: 100px'
  },
  {
    name: 'projectblockreason',
    label: t('Reason'),
    field: 'ProjectBlockReason',
    align: 'left',
    headerClasses: 'bg-indigo-1',
    headerStyle: 'min-width: 100px'
  },
  {
    name: 'projectcomment',
    label: t('Comment'),
    field: 'ProjectComment',
    align: 'left',
    headerClasses: 'bg-indigo-1',
    headerStyle: 'min-width: 100px'
  },
  {
    name: 'projectaction',
    label: t('Action'),
    field: 'ProjectAction',
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
    name: 'purchasecomment',
    label: t('Comment'),
    field: 'PurchaseComment',
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
    label: t('QC-OK'),
    field: 'OrderProductFlag',
    align: 'center',
    headerClasses: 'bg-green-3'
  },
  {
    name: 'orderproductdate',
    label: t('Date'),
    field: 'OrderProductDate',
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
]
