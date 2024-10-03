/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-06-09 17:24:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-11-29 19:28:20                               *
 * @FilePath              : sage-assistant-web/src/components/todo/OpenSalesItemsSOColumns.js*
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { i18n } from '@/boot/i18n'
const { t } = i18n.global

export default [
  {
    label: '#',
    field: '#',
    align: 'center',
    headerClasses: 'bg-primary text-white',
    headerStyle: 'width: 30px'
  },
  {
    label: '',
    field: '#',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.TrackingNO'),
    field: 'trackingNO',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.OrderProjectNO'),
    field: 'orderProjectNO',
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
    label: t('F.PN'),
    field: 'orderPN',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.Desc'),
    field: 'orderPNDesc',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.QTY'),
    field: 'orderQty',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.Price'),
    field: 'orderPrice',
    align: 'right',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.Currency'),
    field: 'orderCurrency',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.Customer'),
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
    label: t('F.OrderDate'),
    field: 'orderDate',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.RequestDate'),
    field: 'orderRequestDate',
    align: 'center',
    headerClasses: 'bg-primary text-white',
    sortable: true
  },
  {
    label: t('F.Priority'),
    field: 'priority',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.PlanDate'),
    field: 'orderPlanedDate',
    align: 'center',
    headerClasses: 'bg-primary text-white',
    sortable: true
  },
  {
    label: t('F.DaysLeft'),
    field: 'daysLeft',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.ProJectStatus'),
    field: 'projectStatus',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.BlockReason'),
    field: 'projectBlockReason',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.MARK'),
    field: 'mark',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.PAINT'),
    field: 'paint',
    align: 'left',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: 'M',
    field: 'requireManual',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: 'T',
    field: 'requireTest',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: 'C',
    field: 'requireCalibration',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: 'BOM',
    field: 'BOM',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.Purchase'),
    field: 'Purchase',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.Receipt'),
    field: 'Receipt',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.QC'),
    field: 'QC',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.Pack'),
    field: 'Pack',
    align: 'center',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.NC Cnt'),
    field: 'claimCnt',
    align: 'center',
    headerClasses: 'bg-red-6 text-white'
  },
  {
    label: t('F.NC NO'),
    field: 'claimNO',
    align: 'left',
    headerClasses: 'bg-red-6 text-white'
  },
  {
    label: t('F.NC DATE'),
    field: 'claimDate',
    align: 'left',
    headerClasses: 'bg-red-6 text-white'
  },
  {
    label: t('F.NC Code'),
    field: 'nCCode',
    align: 'left',
    headerClasses: 'bg-red-6 text-white'
  },
  {
    label: t('F.AssignTo') + '🖊',
    field: 'assignToLineNote',
    align: 'left',
    headerStyle: 'min-width: 150px',
    headerClasses: 'bg-primary text-white'
  },
  {
    label: t('F.Note') + '🖊',
    field: 'statusLineNote',
    align: 'left',
    headerStyle: 'min-width: 150px',
    headerClasses: 'bg-primary text-white'
  }
]
