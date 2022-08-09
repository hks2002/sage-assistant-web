/***
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-07-15 14:19:04
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-07-15 14:19:04
 * @FilePath       : \web2\src\components\todo\selectOptions.js
 * @CopyRight      : Dedienne Aerospace China ZhuHai
 */
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
export { optionsProjectStatus, optionsProjectBlockReason }
