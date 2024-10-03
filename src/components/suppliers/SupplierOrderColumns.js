/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-06-09 17:24:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-01-03 13:04:37                               *
 * @FilePath              : sage-assistant-web/src/components/suppliers/SupplierOrderColumns.js*
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { i18n } from '@/boot/i18n'
const { t } = i18n.global

export default [
  {
    label: '#',
    field: 'itemNO',
    align: 'center',
    headerClasses: 'bg-primary text-white',
    headerStyle: 'width: 30px'
  },
  {
    label: t('F.Site'),
    field: 'site',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.SupplierCode'),
    field: 'supplierCode',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.SupplierName'),
    field: 'supplierName',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.PurchaseNO'),
    field: 'purchaseNO',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.PurchaseLine'),
    field: 'purchaseLine',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.ProjectNO'),
    field: 'projectNO',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.PN'),
    field: 'PN',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.Description'),
    field: 'description',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.Qty'),
    field: 'qty',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.Price'),
    field: 'price',
    align: 'right',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.Currency'),
    field: 'currency',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.LocalPrice'),
    field: 'localPrice',
    align: 'right',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.LocalCurrency'),
    field: 'localCurrency',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.OrderDate'),
    field: 'orderDate',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.AckDate'),
    field: 'ackDate',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.ExpectDate'),
    field: 'expectDate',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.LastReceiveDate'),
    field: 'lastReceiveDate',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.TotalReceiveQty'),
    field: 'totalReceiveQty',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.DaysDelay'),
    field: 'daysDelay',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  }
]
