/*********************************************************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                                                            *
 * @CreatedDate           : 2022-06-09 17:24:00                                                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                                                            *
 * @LastEditDate          : 2023-09-03 00:02:12                                                                      *
 * @FilePath              : sage-assistant-web/src/components/todo/OpenSalesItemsColumns.js                          *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                                                          *
 ********************************************************************************************************************/

import { i18n } from '@/boot/i18n'
const { t } = i18n.global

export default [
  {
    name: '#',
    label: '#',
    align: 'center',
    headerClasses: 'bg-white',
    required: true
  },
  {
    name: 'trackingno',
    label: t('F.TrackingNO'),
    field: 'trackingNO',
    align: 'left',
    headerClasses: 'bg-indigo-1',
    required: true
  },
  {
    name: 'orderprojectno',
    label: t('F.OrderProjectNO'),
    field: 'orderProjectNO',
    align: 'left',
    headerClasses: 'bg-indigo-1',
    sortable: true,
    required: true
  },
  {
    name: 'ordertype',
    label: t('F.OrderType'),
    field: 'orderType',
    align: 'left',
    headerClasses: 'bg-indigo-1',
    required: true
  },
  {
    name: 'orderpn',
    label: t('F.PN'),
    field: 'orderPN',
    align: 'left',
    headerClasses: 'bg-indigo-1',
    required: true
  },
  {
    name: 'orderpndesc',
    label: t('F.Desc'),
    field: 'orderPNDesc',
    align: 'left',
    headerClasses: 'bg-indigo-1',
    required: false
  },
  {
    name: 'orderqty',
    label: t('F.QTY'),
    field: 'orderQTY',
    align: 'center',
    headerClasses: 'bg-indigo-1',
    required: true
  },
  {
    name: 'orderprice',
    label: t('F.Price'),
    field: 'orderPrice',
    align: 'right',
    headerClasses: 'bg-indigo-1',
    required: false
  },
  {
    name: 'ordercurrency',
    label: t('F.Currency'),
    field: 'orderCurrency',
    align: 'center',
    headerClasses: 'bg-indigo-1',
    required: false
  },
  {
    name: 'customercode',
    label: t('F.Customer'),
    field: 'customerCode',
    align: 'left',
    headerClasses: 'bg-indigo-1',
    required: false
  },
  //{ name: 'customername', label: t('CustomerName'), field: 'CustomerName', align: 'left', sortable: true },
  {
    name: 'orderdate',
    label: t('F.OrderDate'),
    field: 'orderDate',
    align: 'center',
    headerClasses: 'bg-indigo-1',
    required: false
  },
  {
    name: 'orderrequestdate',
    label: t('F.RequestDate'),
    field: 'orderRequestDate',
    align: 'center',
    headerClasses: 'bg-indigo-1',
    required: true
  },
  {
    name: 'daysleft',
    label: t('F.DaysLeft'),
    field: 'daysLeft',
    align: 'center',
    sortable: true,
    headerClasses: 'bg-indigo-1',
    required: true
  },
  {
    name: 'orderplaneddate',
    label: t('F.PlanDate'),
    field: 'orderPlanedDate',
    align: 'center',
    sortable: true,
    headerClasses: 'bg-indigo-1',
    required: true
  },
  {
    name: 'orderdeliveryflag',
    label: t('F.D-Ready'),
    field: 'orderDeliveryFlag',
    align: 'center',
    headerClasses: 'bg-indigo-1',
    required: true
  },
  {
    name: 'projectstatus',
    label: t('F.Status'),
    field: 'projectStatus',
    align: 'left',
    headerClasses: 'bg-indigo-1',
    headerStyle: 'min-width: 100px',
    required: true
  },
  {
    name: 'projectblockreason',
    label: t('F.Reason'),
    field: 'projectBlockReason',
    align: 'left',
    headerClasses: 'bg-indigo-1',
    headerStyle: 'min-width: 100px',
    required: false
  },
  {
    name: 'projectcomment',
    label: t('F.Comment'),
    field: 'projectComment',
    align: 'left',
    headerClasses: 'bg-indigo-1',
    headerStyle: 'min-width: 100px',
    required: false
  },
  {
    name: 'projectaction',
    label: t('F.Action'),
    field: 'projectAction',
    align: 'left',
    headerClasses: 'bg-indigo-1',
    headerStyle: 'min-width: 100px',
    required: false
  },
  {
    name: 'bompn',
    label: t('F.BomPN'),
    field: 'bomPN',
    align: 'left',
    headerClasses: 'bg-blue-grey-1',
    required: true
  },
  {
    name: 'bomqty',
    label: t('F.QTY'),
    field: 'bomQTY',
    align: 'center',
    headerClasses: 'bg-blue-grey-1',
    required: false
  },
  {
    name: 'shortqty',
    label: t('F.Short'),
    field: 'shortQty',
    align: 'center',
    headerClasses: 'bg-blue-grey-1',
    required: false
  },
  {
    name: 'allqty',
    label: t('F.Alloc'),
    field: 'allQty',
    align: 'center',
    headerClasses: 'bg-blue-grey-1',
    required: false
  },
  {
    name: 'avaqty',
    label: t('F.Avail'),
    field: 'avaQty',
    align: 'center',
    headerClasses: 'bg-blue-grey-1',
    required: false
  },
  {
    name: 'purchaseno',
    label: t('F.PurchaseNO'),
    field: 'purchaseNO',
    align: 'left',
    headerClasses: 'bg-blue-1',
    required: true
  },
  {
    name: 'purchaseline',
    label: t('F.PurchaseLine'),
    field: 'purchaseLine',
    align: 'left',
    headerClasses: 'bg-blue-1',
    required: true
  },
  {
    name: 'purchasepn',
    label: t('F.PurchasePN'),
    field: 'purchasePN',
    align: 'left',
    headerClasses: 'bg-blue-1',
    required: false
  },
  {
    name: 'purchaseqty',
    label: t('F.QTY'),
    field: 'purchaseQTY',
    align: 'left',
    headerClasses: 'bg-blue-1',
    required: false
  },
  {
    name: 'vendorcode',
    label: t('F.Vendor'),
    field: 'vendorCode',
    align: 'left',
    headerClasses: 'bg-blue-1',
    required: false
  },
  {
    name: 'purchasedate',
    label: t('F.PurchaseDate'),
    field: 'purchaseDate',
    align: 'left',
    headerClasses: 'bg-blue-1',
    required: true
  },
  {
    name: 'purchaseexpectdate',
    label: t('F.ExpectDate'),
    field: 'purchaseExpectDate',
    align: 'left',
    headerClasses: 'bg-blue-1',
    required: true
  },
  {
    name: 'purchaseackdate',
    label: t('F.AckDate'),
    field: 'purchaseAckDate',
    align: 'left',
    headerClasses: 'bg-blue-1',
    required: true
  },
  {
    name: 'ordersadflag',
    label: t('F.SAD'),
    field: 'orderSADFlag',
    align: 'center',
    headerClasses: 'bg-blue-1',
    required: true
  },
  {
    name: 'purchasecomment',
    label: t('F.Comment'),
    field: 'purchaseComment',
    align: 'left',
    headerClasses: 'bg-blue-1',
    headerStyle: 'min-width: 100px',
    required: false
  },
  {
    name: 'receiptno',
    label: t('F.ReceiptNO'),
    field: 'receiptNO',
    align: 'left',
    headerClasses: 'bg-green-1',
    required: true
  },
  {
    name: 'receiptqty',
    label: t('F.Qty'),
    field: 'receiptQty',
    align: 'center',
    headerClasses: 'bg-green-1',
    required: true
  },
  {
    name: 'receiptdate',
    label: t('F.ReceiptDate'),
    field: 'receiptDate',
    align: 'left',
    classes: 'bg-green-1',
    headerClasses: 'bg-green-1',
    required: true
  },
  {
    name: 'orderproductflag',
    label: t('F.QC-OK'),
    field: 'orderProductFlag',
    align: 'center',
    headerClasses: 'bg-green-3',
    required: true
  },
  {
    name: 'orderproductdate',
    label: t('F.Date'),
    field: 'orderProductDate',
    align: 'center',
    headerClasses: 'bg-green-3',
    required: true
  },
  {
    name: 'claimno',
    label: t('F.NC NO'),
    field: 'claimNO',
    align: 'left',
    headerClasses: 'bg-red-1',
    required: true
  },
  {
    name: 'ncdetail',
    label: t('F.NC Code'),
    field: 'nCCode',
    align: 'left',
    headerClasses: 'bg-red-1',
    required: true
  }
]
