/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-03-25 12:13:14                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { getQueryParameters } from '@/assets/mockExt'
import orderBy from 'lodash-es'
import Mock from 'mockjs'

Mock.mock(RegExp('^(/Data/SupplierHelper)' + '.*'), (options) => {
  const query = getQueryParameters(options)
  const CodeOrName = query['SupplierName']

  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-10': [
      {
        supplierCode: CodeOrName,
        supplierName: () => {
          return CodeOrName + '_' + Mock.mock('@title(3, 5)')
        }
      }
    ]
  })

  return list.data
})

Mock.mock(RegExp('^(/Data/SupplierDetails)' + '.*'), (options) => {
  const query = getQueryParameters(options)
  const SupplierCode = query['SupplierCode']
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-2': [
      {
        supplierCode: SupplierCode,
        supplierName0: () => {
          return Mock.mock('@title(3, 5)')
        },
        supplierName1: () => {
          return Mock.mock('@title(3, 5)')
        },
        postCode: /[0-9]{6}/,
        country: /[A-Z]{3}/,
        state: /[A-Z]{1}[a-z]{2,6}/,
        city: /[A-Z]{1}[a-z]{2,6}/,
        address0: () => {
          return Mock.mock('@title(3, 5)')
        },
        address1: () => {
          return Mock.mock('@title(3, 5)')
        },
        tel0: /\d{3}-\d{8}|\d{4}-\d{7}/,
        tel1: /\d{3}-\d{8}|\d{4}-\d{7}/,
        tel2: /\d{3}-\d{8}|\d{4}-\d{7}/,
        tel3: /\d{3}-\d{8}|\d{4}-\d{7}/,
        tel4: /\d{3}-\d{8}|\d{4}-\d{7}/,
        mobile0: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
        fax0: /\d{3}-\d{8}|\d{4}-\d{7}/,
        email0: /^\w{2,6}@\w{2,6}\.\w{2,6}$/,
        email1: /^\w{2,6}@\w{2,6}\.\w{2,6}$/,
        email2: /^\w{2,6}@\w{2,6}\.\w{2,6}$/,
        email3: /^\w{2,6}@\w{2,6}\.\w{2,6}$/,
        email4: /^\w{2,6}@\w{2,6}\.\w{2,6}$/,
        website: /^\w+([-+.]\w+)@\w+\.\w+([-.]\w+)$/
      }
    ]
  })

  return list.data
})

Mock.mock(RegExp('^(/Data/SupplierDeliveryHistory)' + '.*'), (options) => {
  const query = getQueryParameters(options)
  const SupplierCode = query['SupplierCode']
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-500': [
      {
        site: /ZHU|HKG|TLS|SGP|MIA|CIN|QAT/,
        supplierCode: SupplierCode,
        purchaseNO: /(H|Z|S|T|M)CF[0-9]{6}/,
        projectNO: /(H|Z|S|T|M)CC[0-9]{6}-\d/,
        PN: /[A-Z]{5,8}/,
        description: () => {
          return Mock.mock('@title(3, 5)')
        },
        ackDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        expectDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        orderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        receiptNO: /(H|Z|S|T|M)RA[0-9]{6}/,
        receiptDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        daysNeed: () => {
          return Mock.mock('@integer(20, 365)')
        }
      }
    ]
  })
  return orderBy(list.data, ['receiptDate'], ['asc'])
})

Mock.mock(RegExp('^(/Data/SupplierDelayHistory)' + '.*'), (options) => {
  const query = getQueryParameters(options)
  const SupplierCode = query['SupplierCode']
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-500': [
      {
        site: /ZHU|HKG|TLS|SGP|MIA|CIN|QAT/,
        supplierCode: SupplierCode,
        purchaseNO: /(H|Z|S|T|M)CF[0-9]{6}/,
        projectNO: /(H|Z|S|T|M)CC[0-9]{6}-\d/,
        PN: /[A-Z]{5,8}/,
        description: () => {
          return Mock.mock('@title(3, 5)')
        },
        ackDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        expectDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        orderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        receiptNO: /(H|Z|S|T|M)RA[0-9]{6}/,
        receiptDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        daysDelay: () => {
          return Mock.mock('@integer(20, 365)')
        }
      }
    ]
  })

  return list.data
})

Mock.mock(RegExp('^(/Data/SupplierOpenAmount)' + '.*'), (options) => {
  const query = getQueryParameters(options)
  const SupplierCode = query['SupplierCode']
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-5': [
      {
        site: /ZHU/,
        supplierCode: SupplierCode,
        currency: /(RMB|USD|EUR|HKD)/,
        'amount|1000-2000': 1,
        'USD|1000-20000': 1,
        'rate|6-9': 1
      },
      {
        site: /HKG/,
        supplierCode: SupplierCode,
        currency: /(RMB|USD|EUR|HKD)/,
        'amount|1000-2000': 1,
        'USD|1000-20000': 1,
        'rate|6-9': 1
      },
      {
        site: /TLS/,
        supplierCode: SupplierCode,
        currency: /(RMB|USD|EUR|HKD)/,
        'amount|1000-2000': 1,
        'USD|1000-20000': 1,
        'rate|6-9': 1
      },
      {
        site: /SGP/,
        supplierCode: SupplierCode,
        currency: /(RMB|USD|EUR|HKD)/,
        'amount|1000-2000': 1,
        'USD|1000-20000': 1,
        'rate|6-9': 1
      },
      {
        site: /MIA/,
        supplierCode: SupplierCode,
        currency: /(RMB|USD|EUR|HKD)/,
        'amount|1000-2000': 1,
        'USD|1000-20000': 1,
        'rate|6-9': 1
      }
    ]
  })

  return list.data
})

Mock.mock(RegExp('^(/Data/SupplierOpenItems)' + '.*'), (options) => {
  const query = getQueryParameters(options)
  const SupplierCode = query['SupplierCode']
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-50': [
      {
        site: /ZHU|HKG|TLS|SGP|MIA|CIN|QAT/,
        supplierCode: SupplierCode,
        purchaseNO: /(H|Z|S|T|M)CF[0-9]{6}/,
        projectNO: /(H|Z|S|T|M)CC[0-9]{6}-\d/,
        PN: /[A-Z]{5,8}/,
        description: () => {
          return Mock.mock('@title(3, 5)')
        },
        ackDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        expectDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        orderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        daysDelay: () => {
          return Mock.mock('@integer(20, 365)')
        }
      }
    ]
  })

  return list.data
})

Mock.mock(RegExp('^(/Data/SupplierOpenQty)' + '.*'), (options) => {
  const query = getQueryParameters(options)
  const SupplierCode = query['SupplierCode']
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-5': [
      {
        site: /ZHU/,
        supplierCode: SupplierCode,
        countType: /Item|Product|Project/,
        qty: () => {
          return Mock.mock('@integer(20, 10000)')
        }
      },
      {
        site: /HKG/,
        supplierCode: SupplierCode,
        countType: /Item|Product|Project/,
        qty: () => {
          return Mock.mock('@integer(20, 10000)')
        }
      },
      {
        site: /TLS/,
        supplierCode: SupplierCode,
        countType: /Item|Product|Project/,
        qty: () => {
          return Mock.mock('@integer(20, 10000)')
        }
      },
      {
        site: /SGP/,
        supplierCode: SupplierCode,
        countType: /Item|Product|Project/,
        qty: () => {
          return Mock.mock('@integer(20, 10000)')
        }
      },
      {
        site: /MIA/,
        supplierCode: SupplierCode,
        countType: /Item|Product|Project/,
        qty: () => {
          return Mock.mock('@integer(20, 10000)')
        }
      },
      {
        site: /QAT/,
        supplierCode: SupplierCode,
        countType: /Item|Product|Project/,
        qty: () => {
          return Mock.mock('@integer(20, 10000)')
        }
      },
      {
        site: /CIN/,
        supplierCode: SupplierCode,
        countType: /Item|Product|Project/,
        qty: () => {
          return Mock.mock('@integer(20, 10000)')
        }
      }
    ]
  })

  return list.data
})

Mock.mock(RegExp('^(/Data/SupplierTotalAmount)' + '.*'), (options) => {
  const query = getQueryParameters(options)
  const SupplierCode = query['SupplierCode']
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-5': [
      {
        site: /ZHU/,
        supplierCode: SupplierCode,
        currency: /(RMB|USD|EUR|HKD)/,
        'amount|1000-2000': 1,
        'USD|1000-20000': 1,
        'rate|6-9': 1
      },
      {
        site: /HKG/,
        supplierCode: SupplierCode,
        currency: /(RMB|USD|EUR|HKD)/,
        'amount|1000-2000': 1,
        'USD|1000-20000': 1,
        'rate|6-9': 1
      },
      {
        site: /TLS/,
        supplierCode: SupplierCode,
        currency: /(RMB|USD|EUR|HKD)/,
        'amount|1000-2000': 1,
        'USD|1000-20000': 1,
        'rate|6-9': 1
      },
      {
        site: /SGP/,
        supplierCode: SupplierCode,
        currency: /(RMB|USD|EUR|HKD)/,
        'amount|1000-2000': 1,
        'USD|1000-20000': 1,
        'rate|6-9': 1
      },
      {
        site: /MIA/,
        supplierCode: SupplierCode,
        currency: /(RMB|USD|EUR|HKD)/,
        'amount|1000-2000': 1,
        'USD|1000-20000': 1,
        'rate|6-9': 1
      }
    ]
  })

  return list.data
})

Mock.mock(RegExp('^(/Data/SupplierTotalQty)' + '.*'), (options) => {
  const query = getQueryParameters(options)
  const SupplierCode = query['SupplierCode']
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-5': [
      {
        site: /ZHU/,
        supplierCode: SupplierCode,
        countType: /Item|Product|Project/,
        qty: () => {
          return Mock.mock('@integer(20, 10000)')
        }
      },
      {
        site: /HKG/,
        supplierCode: SupplierCode,
        countType: /Item|Product|Project/,
        qty: () => {
          return Mock.mock('@integer(20, 10000)')
        }
      },
      {
        site: /TLS/,
        supplierCode: SupplierCode,
        countType: /Item|Product|Project/,
        qty: () => {
          return Mock.mock('@integer(20, 10000)')
        }
      },
      {
        site: /SGP/,
        supplierCode: SupplierCode,
        countType: /Item|Product|Project/,
        qty: () => {
          return Mock.mock('@integer(20, 10000)')
        }
      },
      {
        site: /MIA/,
        supplierCode: SupplierCode,
        countType: /Item|Product|Project/,
        qty: () => {
          return Mock.mock('@integer(20, 10000)')
        }
      },
      {
        site: /QAT/,
        supplierCode: SupplierCode,
        countType: /Item|Product|Project/,
        qty: () => {
          return Mock.mock('@integer(20, 10000)')
        }
      },
      {
        site: /CIN/,
        supplierCode: SupplierCode,
        countType: /Item|Product|Project/,
        qty: () => {
          return Mock.mock('@integer(20, 10000)')
        }
      }
    ]
  })

  return list.data
})
