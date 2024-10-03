/*****************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                    *
 * @CreatedDate           : Invalid Date                                     *
 * @LastEditors           : Robert Huang<56649783@qq.com>                    *
 * @LastEditDate          : 2025-01-08 20:53:37                              *
 * @FilePath              : sage-assistant-web/src/assets/dateUtils.js       *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                  *
 ****************************************************************************/

import { date } from 'quasar'

const { formatDate, addToDate } = date

const getLastNYear = (n) => {
  console.assert(n >= 0, 'n must be greater or equal than 0')
  const nowTimeStamp = Date.now()
  return {
    dateFrom: formatDate(date.startOfDate(addToDate(nowTimeStamp, { years: -1 * n }), 'year'), 'YYYY-MM-DD'),
    dateTo: formatDate(date.endOfDate(addToDate(nowTimeStamp, { years: n === 0 ? 0 : -1 }), 'year'), 'YYYY-MM-DD')
  }
}

const getLastNMonth = (n) => {
  console.assert(n >= 0, 'n must be greater or equal than 0')
  const nowTimeStamp = Date.now()
  return {
    dateFrom: formatDate(date.startOfDate(addToDate(nowTimeStamp, { months: -1 * n }), 'month'), 'YYYY-MM-DD'),
    dateTo: formatDate(date.endOfDate(addToDate(nowTimeStamp, { months: n === 0 ? 0 : -1 }), 'month'), 'YYYY-MM-DD')
  }
}

const getDateRange = (rangeName, n) => {
  switch (rangeName) {
    case 'lastNMonth':
      return getLastNMonth(n)
    case 'lastNYear':
      return getLastNYear(n)
    default:
      return getLastNYear(n)
  }
}

export { getDateRange }
