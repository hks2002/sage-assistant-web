/*****************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                    *
 * @CreatedDate           : 2023-12-07 17:03:01                              *
 * @LastEditors           : Robert Huang<56649783@qq.com>                    *
 * @LastEditDate          : 2023-12-13 16:01:04                              *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                  *
 ****************************************************************************/

import { i18n } from '@/boot/i18n'
const { t } = i18n.global

export default [
  {
    label: '#',
    field: 'idx',
    align: 'center',
    headerClasses: 'bg-white'
  },
  {
    label: t('F.TrackingNO'),
    field: 'orderTrackingNO',
    align: 'left',
    headerClasses: 'bg-indigo-1'
  },
  {
    label: t('F.OrderNO'),
    field: 'orderNO',
    align: 'left',
    headerClasses: 'bg-indigo-1'
  },
  {
    label: t('F.OrderLine'),
    field: 'orderLine',
    align: 'left',
    headerClasses: 'bg-indigo-1'
  },
  {
    label: t('F.Customer'),
    field: 'orderCustomerCode',
    align: 'left',
    headerClasses: 'bg-indigo-1'
  },
  {
    label: t('F.OrderDate'),
    field: 'orderDate',
    align: 'center',
    headerClasses: 'bg-indigo-1'
  },
  {
    label: t('F.PN'),
    field: 'orderPN',
    align: 'left',
    headerClasses: 'bg-indigo-1'
  },
  {
    label: t('F.Desc'),
    field: 'orderPNDescription',
    align: 'left',
    headerClasses: 'bg-indigo-1'
  },
  {
    label: t('F.QTY'),
    field: 'orderQty',
    align: 'center',
    headerClasses: 'bg-indigo-1'
  },
  {
    label: t('F.Amount'),
    field: 'orderAmount',
    align: 'right',
    headerClasses: 'bg-indigo-1'
  },
  {
    label: t('F.Currency'),
    field: 'orderCurrency',
    align: 'center',
    headerClasses: 'bg-indigo-1'
  },
  {
    label: t('F.Status'),
    field: 'orderStatus',
    align: 'center',
    headerClasses: 'bg-indigo-1'
  },

  {
    label: t('F.PurchaseNO'),
    field: 'purchaseNO',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  {
    label: t('F.PurchaseLine'),
    field: 'purchaseLine',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  {
    label: t('F.PurchaseDate'),
    field: 'purchaseDate',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  {
    label: t('F.PurchasePN'),
    field: 'purchasePN',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  {
    label: t('F.Description'),
    field: 'purchasePNDescription',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  {
    label: t('F.QTY'),
    field: 'purchaseQty',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  {
    label: t('F.Unit'),
    field: 'purchaseUnit',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  {
    label: t('F.Amount'),
    field: 'purchaseAmount',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  {
    label: t('F.Currency'),
    field: 'purchaseCurrency',
    align: 'left',
    headerClasses: 'bg-blue-1'
  },
  {
    label: t('F.Vendor'),
    field: 'purchaseVendorCode',
    align: 'center',
    headerClasses: 'bg-blue-1'
  },
  {
    label: t('F.ReceiptNO'),
    field: 'receiptNO',
    align: 'left',
    headerClasses: 'bg-green-1'
  },
  {
    label: t('F.ReceiptLine'),
    field: 'receiptLine',
    align: 'left',
    headerClasses: 'bg-green-1'
  },
  {
    label: t('F.ReceiptDate'),
    field: 'receiptDate',
    align: 'center',
    headerClasses: 'bg-green-1'
  },
  {
    label: t('F.PN'),
    field: 'receiptPN',
    align: 'left',
    headerClasses: 'bg-green-1'
  },
  {
    label: t('F.Description'),
    field: 'receiptPNDescription',
    align: 'left',
    headerClasses: 'bg-green-1'
  },
  {
    label: t('F.Qty'),
    field: 'receiptQty',
    align: 'center',
    headerClasses: 'bg-green-1'
  },
  {
    label: t('F.Unit'),
    field: 'receiptUnit',
    align: 'center',
    headerClasses: 'bg-green-1'
  },
  {
    label: t('F.Amount'),
    field: 'receiptAmount',
    align: 'right',
    headerClasses: 'bg-green-1'
  },
  {
    label: t('F.Currency'),
    field: 'receiptCurrency',
    align: 'center',
    headerClasses: 'bg-green-1'
  },
  {
    label: t('F.Vendor'),
    field: 'receiptVendorCode',
    align: 'left',
    headerClasses: 'bg-green-1'
  },
  {
    label: t('F.DeliveryNO'),
    field: 'deliveryNO',
    align: 'left',
    headerClasses: 'bg-orange-1'
  },
  {
    label: t('F.DeliveryLine'),
    field: 'deliveryLine',
    align: 'left',
    headerClasses: 'bg-orange-1'
  },
  {
    label: t('F.Date'),
    field: 'deliveryDate',
    align: 'left',
    headerClasses: 'bg-orange-1'
  },
  {
    label: t('F.PN'),
    field: 'deliveryPN',
    align: 'left',
    headerClasses: 'bg-orange-1'
  },
  {
    label: t('F.Description'),
    field: 'deliveryPNDescription',
    align: 'left',
    headerClasses: 'bg-orange-1'
  },
  {
    label: t('F.Qty'),
    field: 'deliveryQty',
    align: 'center',
    headerClasses: 'bg-orange-1'
  },
  {
    label: t('F.Unit'),
    field: 'deliveryUnit',
    align: 'center',
    headerClasses: 'bg-orange-1'
  },
  {
    label: t('F.InvoiceNO'),
    field: 'invoiceNO',
    align: 'left',
    headerClasses: 'bg-purple-1'
  },
  {
    label: t('F.Line'),
    field: 'invoiceLine',
    align: 'left',
    headerClasses: 'bg-purple-1'
  },
  {
    label: t('F.Date'),
    field: 'invoiceDate',
    align: 'left',
    headerClasses: 'bg-purple-1'
  },
  {
    label: t('F.PN'),
    field: 'invoicePN',
    align: 'left',
    headerClasses: 'bg-purple-1'
  },
  {
    label: t('F.Description'),
    field: 'invoicePNDescription',
    align: 'left',
    headerClasses: 'bg-purple-1'
  },
  {
    label: t('F.Qty'),
    field: 'invoiceQty',
    align: 'center',
    headerClasses: 'bg-purple-1'
  },
  {
    label: t('F.Unit'),
    field: 'invoiceUnit',
    align: 'center',
    headerClasses: 'bg-purple-1'
  },
  {
    label: t('F.Amount'),
    field: 'invoiceAmount',
    align: 'right',
    headerClasses: 'bg-purple-1'
  },
  {
    label: t('F.Currency'),
    field: 'invoiceCurrency',
    align: 'center',
    headerClasses: 'bg-purple-1'
  }
]
