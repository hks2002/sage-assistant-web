/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2024-10-16 18:59:07                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-01-24 00:01:30                               *
 * @FilePath              : sage-assistant-web/src/components/Financial/QTableInvoicePayColumns.js*
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { i18n } from '@/boot/i18n'
const { t } = i18n.global

export default [
  {
    field: 'idx',
    label: '#',
    align: 'left'
  },
  {
    field: 'site',
    label: t('F.Site'),
    align: 'center'
  },
  {
    field: 'customer',
    label: t('F.Customer'),
    align: 'center'
  },
  {
    field: 'name',
    label: t('F.Name'),
    align: 'left'
  },
  {
    field: 'invoiceNO',
    label: t('F.InvoiceNO'),
    align: 'left'
  },
  {
    field: 'currency',
    label: t('F.Currency'),
    align: 'center'
  },
  {
    field: 'amount',
    label: t('F.Amount'),
    align: 'right'
  },
  {
    field: 'pay',
    label: t('F.Pay'),
    align: 'right',
    sortable: true
  },
  {
    field: 'remaining',
    label: t('F.Remaining'),
    align: 'right',
    sortable: true
  },
  {
    field: 'amountLocal',
    label: t('F.AmountLocal'),
    align: 'right'
  },
  {
    field: 'payLocal',
    label: t('F.PayLocal'),
    align: 'right'
  },
  {
    field: 'orderNO',
    label: t('F.OrderNO'),
    align: 'left'
  },
  {
    field: 'createDate',
    label: t('F.CreateDate'),
    align: 'left'
  },
  {
    field: 'dueDate',
    label: t('F.DueDate'),
    align: 'left'
  },
  {
    field: 'payDate',
    label: t('F.PayDate'),
    align: 'left'
  },
  {
    field: 'fapiao',
    label: t('F.Fapiao'),
    align: 'left'
  },
  {
    field: 'custRef',
    label: t('F.CustRef'),
    align: 'left'
  },
  {
    field: 'status',
    label: t('F.Status'),
    align: 'center'
  },
  {
    field: 'matchedBy',
    label: t('F.MatchedBy'),
    align: 'center'
  },
  {
    field: 'matchedCode',
    label: t('F.MatchedCode'),
    align: 'center'
  },
  {
    field: 'payNO',
    label: t('F.PayNO'),
    align: 'left'
  },
  {
    field: 'payCurrency',
    label: t('F.PayCurrency'),
    align: 'center'
  },
  {
    field: 'payAmount',
    label: t('F.PayInPayNO'),
    align: 'left'
  },
  {
    field: 'desc0',
    label: t('F.Desc0'),
    align: 'left'
  },
  {
    field: 'desc1',
    label: t('F.Desc1'),
    align: 'left'
  }
]
