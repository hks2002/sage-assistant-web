/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-07-15 14:19:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-11-29 19:28:10                               *
 * @FilePath              : sage-assistant-web/src/components/todo/OpenSalesItemsSelectOptions.js*
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

const optionsProjectStatus = [
  {
    /** */ value: '0',
    label: '',
    disable: true
  },
  {
    value: '1',
    label: 'In hold'
  },
  {
    value: '2',
    label: 'In progress'
  },
  {
    value: '3',
    label: 'PO Cancelled'
  },
  {
    value: '4',
    label: 'Delivered'
  },
  {
    value: '5',
    label: 'Customer StandBy'
  }
]
const optionsProjectBlockReason = [
  {
    value: '0',
    label: '',
    disable: true
  },
  {
    value: '1',
    label: '-'
  },
  {
    value: '2',
    label: 'AMENDMENT'
  },
  {
    value: '3',
    label: 'PAYMENT'
  },
  {
    value: '4',
    label: 'TECHNICAL DATA'
  },
  {
    value: '5',
    label: 'DEVIATION REQUEST'
  },
  {
    value: '6',
    label: 'QUALIFICATION'
  },
  {
    value: '7',
    label: 'WAITING TOOL'
  }
]
export { optionsProjectBlockReason, optionsProjectStatus }
