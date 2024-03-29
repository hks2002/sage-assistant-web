/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-11-16 17:35:42                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import Mock from 'mockjs'

Mock.mock(RegExp('^(/Data/LinksSalesOrder)' + '.*'), () => {
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-100': [
      {
        salesOrderNO: /(Z|H|S|T|M)CC\d{6}/,
        projectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        PN: /([A-Z]){6}/,
        description: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        'qty|1-100': 1,
        unit: 'UN',
        orderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        orderType: /(NOR|REP|PRS|RCL)/,
        demandDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        customerCode: /\d{5}/,
        customerName: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        orderCategory: /(Methods|InternalProd|ExternalProd|Design|Stock|Trading|Services|SalesAdmin)/
      }
    ]
  })
  return list.data
})

Mock.mock(/^(\/Data\/LinksDelivery)/, () => {
  // list = {data:[{},{}]}

  const list = Mock.mock({
    'data|1-100': [
      {
        ProjectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        OrderNO: /(Z|H|S|T|M)CC\d{6}/,
        OrderType: /(NOR|REP|PRS|RCL)/,
        PN: /([A-Z]){6}/,
        'Qty|1-100': 1,
        Description: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        CustomerCode: /\d{5}/,
        CustomerName: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        Currency: /(RMB|USD|EUR|HKD)/,
        'NetPrice|1000-2000': 1,
        'USD|10-200000': 1,
        'Rate|6-9': 1,
        OrderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        RequestDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        PlanedDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        }
      }
    ]
  })
  return list.data
})

Mock.mock(RegExp('^(/Data/LinksPurchaseBom)' + '.*'), () => {
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-100': [
      {
        ProjectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        OrderType: /(NOR|REP|PRS|RCL)/,
        WorkOrderNO: /(Z|H|S|T|M)OF\d{8}/,
        'BomSeq|1-100': 1,
        CustomerCode: /0000\d{1}/,
        CustomerName: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        ForPN: /([A-Z]){6}/,
        PN: /([A-Z]){6}/,
        Description: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        'Qty|1-100': 1,
        'ShortQty|1-100': 1,
        'AllQty|1-100': 1,
        Unit: 'UN',
        CreateDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        }
      }
    ]
  })
  return list.data
})

Mock.mock(RegExp('^(/Data/LinksReceive)' + '.*'), () => {
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-100': [
      {
        ProjectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        PurchaseNO: /(Z|H|S|T|M)CF\d{6}/,
        'Line|1-100': 1,
        VendorCode: /0000\d{1}/,
        VendorName: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        PN: /([A-Z]){6}/,
        'Qty|1-100': 1,
        Unit: 'UN',
        Description: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        'NetPrice|1000-2000': 1,
        Currency: /(RMB|USD|EUR|HKD)/,
        'USD|10-200000': 1,
        'Rate|6-9': 1,
        AckDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        ExpectDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        OrderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        CreateUser: /0000[A-Z]{1}/
      }
    ]
  })
  return list.data
})

Mock.mock(RegExp('^(/Data/LinksWO)' + '.*'), () => {
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-100': [
      {
        ProjectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        OrderNO: /(Z|H|S|T|M)CC\d{6}/,
        WorkOrderNO: /(Z|H|S|T|M)OF\d{6}/,
        WOStatus: /(Firm|Closed|Planned|Suggested)/,
        ProductionStatus: /(Pending|Process|Completed|Cancelled)/,
        OrderType: /(NOR|REP|PRS|RCL)/,
        CustomerCode: /0000\d{1}/,
        CustomerName: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        PN: /([A-Z]){6}/,
        'Qty|1-100': 1,
        OrderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        }
      }
    ]
  })
  return list.data
})
