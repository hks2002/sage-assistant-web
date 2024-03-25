/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-03-25 12:11:48                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { getQueryParameters } from '@/assets/mockExt'
import orderBy from 'lodash'
import Mock from 'mockjs'

// Mock.setup({ timeout: '500-1000' })
Mock.mock(RegExp('^(/Data/PNHelper)' + '.*'), (options) => {
  const PnOrPnRoot = getQueryParameters(options)['PN']
  const PnRoot = PnOrPnRoot.split('_')[0]
  const PnVer = PnOrPnRoot.split('_')[1]

  if (PnVer) {
    return [{ PNROOT: PnRoot, PN: PnRoot + '_' + PnVer }]
  }
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-10': [
      {
        PNROOT: PnRoot,
        PN: () => {
          return PnRoot + '_' + Mock.mock('@character("ABCDEFG")')
        }
      }
    ]
  })

  return list.data
  // return [{ PNROOT: '123', PN: '123_A' }, { PNROOT: '456', PN: '456_B' }, { PNROOT: '789', PN: '789_C' }]
})

Mock.mock(RegExp('^(/Data/PNsInFamily)' + '.*'), (options) => {
  const PnRoot = getQueryParameters(options)['PnRoot']

  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-10': [
      {
        'ROWID|+1': 1,
        PNROOT: PnRoot,
        PN: () => {
          return PnRoot + '_' + Mock.mock('@character("ABCDEFG")')
        },
        cat: /(P|C|S)000[1-5]/,
        version: /[A-Z]/,
        comment: /[A-Z][A-Z]/,
        desc1: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        desc2: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        desc3: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        'status|1-2': 1,
        createDate: () => {
          return Mock.mock('@datetime("yyyy-MM-dd")')
        }
      }
    ]
  })

  return list.data
})

Mock.mock(RegExp('^(/Data/QuoteHistory)' + '.*'), (options) => {
  const PnRoot = getQueryParameters(options)['PnRoot']

  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-10': [
      {
        currency: /(RMB|USD|EUR|HKD)/,
        customerCode: /\d{5}/,
        customerName: () => {
          return Mock.mock('@title(3, 5)')
        },
        'netPrice|1000-2000': 1,
        orderFlag: /\d[01]/,
        orderNO: /((H|Z|S|T|M)CC[0-9]{6})?/,
        PN: () => {
          return PnRoot + '_' + Mock.mock('@character("ABCDEFG")')
        },
        'qty|1-200': 1,
        quoteDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        quoteNO: /(H|Z|S|T|M)DC[0-9]{6}/,
        'USD|1000-2000': 1,
        'rate|6-9': 1,
        tradeTerm: /(DDU|CFR|FOB|DAF|CIP|EXW|DAP)/,
        salesSite: /(ZHU|HKG|SGP|TLS|MIA)/
      }
    ]
  })
  return orderBy(list.data, ['orderDate'], ['asc'])
})

Mock.mock(RegExp('^(/Data/SalesHistory)' + '.*'), (options) => {
  const PnRoot = getQueryParameters(options)['PnRoot']

  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-100': [
      {
        currency: /(RMB|USD|EUR|HKD)/,
        customerCode: /\d{5}/,
        customerName: () => {
          return Mock.mock('@title(3, 5)')
        },
        orderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        orderNO: /(H|Z|S|T|M)CC[0-9]{6}/,
        'netPrice|1000-2000': 1,
        PN: () => {
          return PnRoot + '_' + Mock.mock('@character("ABCDEFG")')
        },
        'qty|1-100': 1,
        'rate|6-9': 1,
        'USD|1000-2000': 1,
        tradeTerm: /(DDU|CFR|FOB|DAF|CIP|EXW|DAP)/,
        salesSite: /(ZHU|HKG|SGP|TLS|MIA)/
      }
    ]
  })
  return orderBy(list.data, ['orderDate'], ['asc'])
})

Mock.mock(RegExp('^(/Data/CostHistory)' + '.*'), (options) => {
  const PnRoot = getQueryParameters(options)['PnRoot']

  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-10': [
      {
        currency: /(RMB|USD|EUR|HKD)/,
        vendorCode: /\d{5}/,
        vendorName: () => {
          return Mock.mock('@title(3, 5)')
        },
        orderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        projectNO: /(H|Z|S|T|M)CC[0-9]{6}-[1-9]{1}/,
        'netPrice|1000-2000': 1,
        orderPN: () => {
          return PnRoot + '_' + Mock.mock('@character("ABCDEFG")')
        },
        purchasePN: () => {
          return PnRoot + '_' + Mock.mock('@character("ABCDEFG")')
        },
        purchaseNO: /(H|Z|S|T|M)CF[0-9]{6}/,
        description: () => {
          return Mock.mock('@title(3, 5)')
        },
        line: /[0-9]{1}/,
        'qty|1-100': 1,
        'rate|6-9': 1,
        'USD|1000-2000': 1,
        purchaseSite: /(ZHU|HKG|SGP|TLS|MIA)/
      }
    ]
  })
  return orderBy(list.data, ['orderDate'], ['asc'])
})

Mock.mock(RegExp('^(/Data/InventoryStock)' + '.*'), (options) => {
  const PnRoot = getQueryParameters(options)['PnRoot']

  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-10': [
      {
        stockSite: /(ZHU|HKG|SGP|TLS|MIA)/,
        PN: () => {
          return PnRoot + '_' + Mock.mock('@character("ABCDEFG")')
        },
        'qty|1-365': 1,
        Type: /(P|C)/
      }
    ]
  })

  return list.data
})

Mock.mock(RegExp('^(/Data/DeliveryDuration)' + '.*'), (options) => {
  const PnRoot = getQueryParameters(options)['PnRoot']

  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-10': [
      {
        salesSite: /(ZHU|HKG|SGP|TLS|MIA)/,
        PN: () => {
          return PnRoot + '_' + Mock.mock('@character("ABCDEFG")')
        },
        orderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        shipDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        'duration|1-365': 1
      }
    ]
  })

  return list.data
})
