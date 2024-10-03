/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-06-09 17:24:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-01-17 15:59:07                               *
 * @FilePath              : sage-assistant-web/src/components/customers/CustomerDeliveryColumns.js*
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
  {
    label: t('F.DeliveryNO'),
    field: 'deliveryNO',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.Line'),
    field: 'deliveryLine',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
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
    label: t('F.DeliveryDate'),
    field: 'deliveryDate',
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
    label: t('F.DaysDelay'),
    field: 'daysDelay',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  }
]
