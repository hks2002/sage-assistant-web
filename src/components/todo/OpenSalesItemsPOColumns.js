/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-06-09 17:24:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-11-29 19:28:04                               *
 * @FilePath              : sage-assistant-web/src/components/todo/OpenSalesItemsPOColumns.js*
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { i18n } from '@/boot/i18n'
const { t } = i18n.global

export default [
  {
    label: t('F.ProjectNO'),
    field: 'bomProjectNO',
    align: 'left',
    headerClasses: 'bg-blue-2 '
  },
  {
    label: t('F.WorkOrderNO'),
    field: 'workOrderNO',
    align: 'left',
    headerStyle: 'min-width: 100px',
    headerClasses: 'bg-blue-2 '
  },
  {
    label: t('F.Line'),
    field: 'bomLine',
    align: 'right',
    headerClasses: 'bg-blue-2 '
  },
  {
    label: t('F.BomPN'),
    field: 'bomPN',
    align: 'left',
    headerClasses: 'bg-blue-2 '
  },
  {
    label: t('F.Desc'),
    field: 'bomDesc',
    align: 'left',
    headerClasses: 'bg-blue-2 '
  },
  {
    label: t('F.Creator'),
    field: 'creator',
    align: 'left',
    headerClasses: 'bg-blue-2 '
  },
  {
    label: t('F.RequestDate'),
    field: 'bomRequestDate',
    align: 'left',
    headerClasses: 'bg-blue-2 '
  },
  {
    label: t('F.QTY'),
    field: 'bomQty',
    align: 'center',
    headerClasses: 'bg-blue-2 '
  },
  {
    label: t('F.Avail'),
    field: 'avaQty',
    align: 'center',
    headerClasses: 'bg-blue-2 '
  },
  {
    label: t('F.Alloc'),
    field: 'allQty',
    align: 'center',
    headerClasses: 'bg-blue-2 '
  },
  {
    label: t('F.Short'),
    field: 'shortQty',
    align: 'center',
    headerClasses: 'bg-blue-2 '
  },
  {
    label: t('F.Note') + '🖊',
    field: 'bomNote',
    align: 'left',
    headerClasses: 'bg-blue-2 ',
    headerStyle: 'min-width: 150px'
  },
  {
    label: t('F.PurchaseNO'),
    field: 'purchaseNO',
    align: 'left',
    headerClasses: 'bg-teal-2 '
  },
  {
    label: t('F.PurchaseLine'),
    field: 'purchaseLine',
    align: 'left',
    headerClasses: 'bg-teal-2 '
  },
  {
    label: t('F.PurchasePN'),
    field: 'purchasePN',
    align: 'left',
    headerClasses: 'bg-teal-2 '
  },
  {
    label: t('F.Desc'),
    field: 'purchasePNDesc',
    align: 'left',
    headerClasses: 'bg-teal-2 '
  },
  {
    label: t('F.QTY'),
    field: 'purchaseQty',
    align: 'left',
    headerClasses: 'bg-teal-2 '
  },
  {
    label: t('F.Price'),
    field: 'purchasePrice',
    align: 'right',
    headerClasses: 'bg-teal-2 '
  },
  {
    label: t('F.Currency'),
    field: 'localCurrency',
    align: 'center',
    headerClasses: 'bg-teal-2 '
  },
  {
    label: t('F.Vendor'),
    field: 'vendorCode',
    align: 'left',
    headerClasses: 'bg-teal-2 '
  },
  {
    label: t('F.Vendor'),
    field: 'vendorName',
    align: 'left',
    headerClasses: 'bg-teal-2 '
  },
  {
    label: t('F.Purchaser'),
    field: 'purchaseUser',
    align: 'left',
    headerClasses: 'bg-teal-2 '
  },
  {
    label: t('F.PurchaseDate'),
    field: 'purchaseDate',
    align: 'left',
    headerClasses: 'bg-teal-2 '
  },
  {
    label: t('F.AckDate'),
    field: 'purchaseAckDate',
    align: 'left',
    headerClasses: 'bg-teal-2 '
  },
  {
    label: t('F.DaysLeft'),
    field: 'daysLeft',
    align: 'center',
    headerClasses: 'bg-teal-2 ',
    sortable: true
  },
  {
    label: t('F.ExpectDate'),
    field: 'purchaseExpectDate',
    align: 'left',
    headerClasses: 'bg-teal-2 '
  },
  {
    label: t('F.ReceiptNO'),
    field: 'receiptNO',
    align: 'left',
    headerClasses: 'bg-green-2 '
  },
  {
    label: t('F.Qty'),
    field: 'receiptQty',
    align: 'center',
    headerClasses: 'bg-green-2 '
  },
  {
    label: t('F.ReceiptDate'),
    field: 'receiptDate',
    align: 'left',
    headerClasses: 'bg-green-2 '
  },
  {
    label: t('F.Receiptor'),
    field: 'receiptor',
    align: 'left',
    headerClasses: 'bg-green-2 '
  },
  {
    label: t('F.Note') + '🖊',
    field: 'purchaseNote',
    align: 'left',
    headerClasses: 'bg-teal-2 ',
    headerStyle: 'min-width: 150px'
  }
]
