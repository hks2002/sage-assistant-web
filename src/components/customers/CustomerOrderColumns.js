/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-06-09 17:24:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-01-03 16:37:13                               *
 * @FilePath              : sage-assistant-web/src/components/customers/CustomerOrderColumns.js*
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
    label: t('F.CustomerCode'),
    field: 'customerCode',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.CustomerName'),
    field: 'customerName',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  ,
  {
    label: t('F.OrderType'),
    field: 'orderType',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.OrderNO'),
    field: 'orderNO',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.PurchaseLine'),
    field: 'orderLine',
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
    label: t('F.NetPrice'),
    field: 'netPrice',
    align: 'right',
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
    label: t('F.RequestDate'),
    field: 'orderRequestDate',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.PlanDate'),
    field: 'orderPlanedDate',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.LastDeliveryNO'),
    field: 'lastDeliveryNO',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.TotalDeliveryQty'),
    field: 'totalDeliveryQty',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.LastShipDate'),
    field: 'lastShipDate',
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
