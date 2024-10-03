/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-03-25 12:12:45                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { getQueryParameters } from '@/assets/mockExt'
import { forEach } from 'lodash-es'
import Mock from 'mockjs'

Mock.mock(RegExp('^(/Data/StockSummary)' + '.*'), () => {
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-1000': [
      {
        G: /[A-Z]/,
        A: '',
        location: /[A-Z]MAG\d{2}/,
        PN: /[0-9A-Z]{5,8}/,
        optionPN: /(123|456)/,
        description: () => {
          return Mock.mock('@title(5, 10)')
        },
        'qty|1-10': 1,
        cost: () => {
          return Mock.mock('@float(60, 10000, 3, 5)')
        }
      }
    ]
  })
  forEach(list.data, (value) => {
    value.A = value.PN.slice(0, 1)
  })

  return list.data
})

Mock.mock(RegExp('^(/Data/StockHistory)' + '.*'), (options) => {
  const query = getQueryParameters(options)
  const PnOrName = query['PnOrName']
  const DateFrom = query['DateFrom']
  const DateTo = query['DateTo']

  // list = {data:[{},{}]}
  if (DateFrom || DateTo) {
    const list = Mock.mock({
      'data|1-2000': [
        {
          location: /[A-Z]MAG\d{2}/,
          seq: () => {
            return Mock.mock('@increment(1000)')
          },
          PN: () => {
            return PnOrName + Mock.mock('@word')
          },
          description: () => {
            return PnOrName + Mock.mock('@title(3, 5)')
          },
          'qty|1-10': 1,
          unit: 'UN',
          cost: () => {
            return Mock.mock('@float(60, 10000, 3, 5)')
          },
          projectNO: /(H|Z|S|T|M)CC[0-9]{6}-[1-9]{1}/,
          sourceNO: /(H|Z|S|T|M)CF[0-9]{6}/,
          sourceLine: () => {
            return Mock.mock({ 'number|1-100': 100 }).number * 1000
          },
          entryNO: /(H|Z|S|T|M)RA[0-9]{6}/,
          entryLine: () => {
            return Mock.mock({ 'number|1-100': 100 }).number * 1000
          },
          createUser: () => {
            return Mock.mock('@cname')
          },
          createDate: () => {
            return Mock.mock('@date("yyyy-MM-dd")')
          }
        }
      ]
    })
    return list.data
  } else {
    const list = Mock.mock({
      'data|1-20': [
        {
          location: /[A-Z]MAG\d{2}/,
          seq: () => {
            return Mock.mock('@increment(1000)')
          },
          'qty|1-10': 1,
          cost: () => {
            return Mock.mock('@float(60, 10000, 3, 5)')
          },
          projectNO: /(H|Z|S|T|M)CC[0-9]{6}-[1-9]{1}/,
          sourceNO: /(H|Z|S|T|M)CF[0-9]{6}/,
          sourceLine: () => {
            return Mock.mock({ 'number|1-100': 100 }).number * 1000
          },
          entryNO: /(H|Z|S|T|M)RA[0-9]{6}/,
          entryLine: () => {
            return Mock.mock({ 'number|1-100': 100 }).number * 1000
          },
          createUser: () => {
            return Mock.mock('@cname')
          },
          createDate: () => {
            return Mock.mock('@date("yyyy-MM-dd")')
          }
        }
      ]
    })

    return list.data
  }
})
