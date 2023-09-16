/*********************************************************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                                                            *
 * @CreatedDate           : 2022-03-25 11:01:00                                                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                                                            *
 * @LastEditDate          : 2023-06-15 16:43:07                                                                      *
 * @FilePath              : src/mock/services/todo.js                                                                *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                                                          *
 ********************************************************************************************************************/

import Mock from 'mockjs'

Mock.mock(RegExp('^(/Data/TobeDealWithOrderLine)' + '.*'), () => {
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-100': [
      {
        SalesOrderNO: /(Z|H|S|T|M)CC\d{6}/,
        ProjectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        PN: /([A-Z]){6}/,
        Description: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        'Qty|1-100': 1,
        Unit: 'UN',
        OrderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        OrderType: /(NOR|REP|PRS|RCL)/,
        DemandDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        CustomerCode: /\d{5}/,
        CustomerName: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        OrderCategory: /(Methods|InteralProd|ExternalProd|Design|Stock|Trading|Services|SalesAdmin)/
      }
    ]
  })
  return list.data
})

Mock.mock(/^(\/Data\/TobeDelivery)/, () => {
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

Mock.mock(RegExp('^(/Data/TobePurchaseBom)' + '.*'), () => {
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

Mock.mock(RegExp('^(/Data/TobeReceive)' + '.*'), () => {
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

Mock.mock(RegExp('^(/Data/TobeClosedWO)' + '.*'), () => {
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-100': [
      {
        ProjectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        OrderNO: /(Z|H|S|T|M)CC\d{6}/,
        WorkOrderNO: /(Z|H|S|T|M)OF\d{6}/,
        WOStatus: /(Firm|Closed|Planned|Suggested)/,
        ProductionStatus: /(Pending|Process|Complted|Cancelled)/,
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

Mock.mock(RegExp('^(/Data/TobeTracking)' + '.*'), () => {
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|200-500': [
      {
        ItemNO: /\d{1,2}/,
        OrderNO: /(Z|H|S|T|M)CC\d{6}/,
        OrderLine: /\d{1,2}/,
        TrackingNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        OrderProjectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        OrderType: /(NOR|REP)-(Services|Trading|ExternalProd|Services|Methods|Methods|Trading)/,
        OrderPN: /([A-Z]){6}/,
        OrderPNDesc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        OrderQTY: () => {
          return Mock.mock('@integer(1, 100)')
        },
        OrderPrice: () => {
          return Mock.mock('@integer(20, 100000)')
        },
        OrderCurrency: /(RMB|USD|EUR|HKD)/,
        CustomerCode: /0000\d{1}/,
        CustomerName: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        OrderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        OrderRequestDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        OrderPlanedDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        OrderSADFlag: /(1|2)/,
        OrderProductFlag: /(1|2)/,
        OrderDeliveryFlag: /(1|2)/,
        ProjectStatus: /(1|2|3|4)/,
        ProjectBlockReason: /(1|2|3|4|5|6)/,
        ProjectComment: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        ProjectAction: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        DaysLeft: () => {
          return Mock.mock('@integer(-300, 100)')
        },
        BomProjectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        WorkOrderNO: /(Z|H|S|T|M)OF\d{6}/,
        BomSeq: /\d{1,2}000/,
        BomPN: /([A-Z]){6}/,
        BomDesc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        BomQTY: () => {
          return Mock.mock('@integer(1, 100)')
        },
        BomUnit: 'UN',
        ShortQty: () => {
          return Mock.mock('@integer(1, 100)')
        },
        AllQty: () => {
          return Mock.mock('@integer(1, 100)')
        },
        BomRequestDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        StockPN: /([A-Z]){6}/,
        AvaQty: () => {
          return Mock.mock('@integer(1, 100)')
        },
        PurchaseNO: /(Z|H|S|T|M)CF\d{6}/,
        PurchaseLine: /\d{1,2}/,
        PurchaseProjectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        PurchasePN: /([A-Z]){6}/,
        PurchasePNDesc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        PurchaseQTY: () => {
          return Mock.mock('@integer(1, 100)')
        },
        PurchaseUnit: 'UN',
        VendorCode: /0000\d{1}/,
        VendorName: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        PurchaseAckDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        PurchaseExpectDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        PurchaseDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        PurchaseUser: /0000[A-Z]{1}/,
        ReceiptNO: /(Z|H|S|T|M)RA\d{6}/,
        ReceiptLine: /\d{1,2}000/,
        ReceiptPurchaseNO: /(Z|H|S|T|M)CF\d{6}/,
        ReceiptPurchaseLine: /\d{1,2}000/,
        ReceiptDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        Receipter: /0000[A-Z]{1}/,
        ReceiptQty: () => {
          return Mock.mock('@integer(1, 100)')
        },
        ClaimProjectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        ClaimNO: /(Z|H|S|T|M)(DSRE|DSRP|DSRC)\d{6}/,
        ClaimNote: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        ClaimNC0Cri: /(0|1|2)/,
        ClaimNC0Type: /([A-Z]){2}/,
        ClaimNC0Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        ClaimNC0Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        ClaimNC1Cri: /(0|1|2)/,
        ClaimNC1Type: /([A-Z]){2}/,
        ClaimNC1Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        ClaimNC1Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        ClaimNC2Cri: /(0|1|2)/,
        ClaimNC2Type: /([A-Z]){2}/,
        ClaimNC2Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        ClaimNC2Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        ClaimNC3Cri: /(0|1|2)/,
        ClaimNC3Type: /([A-Z]){2}/,
        ClaimNC3Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        ClaimNC3Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        ClaimNC4Cri: /(0|1|2)/,
        ClaimNC4Type: /([A-Z]){2}/,
        ClaimNC4Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        ClaimNC4Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        ClaimNC5Cri: /(0|1|2)/,
        ClaimNC5Type: /([A-Z]){2}/,
        ClaimNC5Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        ClaimNC5Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        ClaimNC6Cri: /(0|1|2)/,
        ClaimNC6Type: /([A-Z]){2}/,
        ClaimNC6Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        ClaimNC6Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        ClaimNC7Cri: /(0|1|2)/,
        ClaimNC7Type: /([A-Z]){2}/,
        ClaimNC7Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        ClaimNC7Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        ClaimNC8Cri: /(0|1|2)/,
        ClaimNC8Type: /([A-Z]){2}/,
        ClaimNC8Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        ClaimNC8Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        ClaimNC9Cri: /(0|1|2)/,
        ClaimNC9Type: /([A-Z]){2}/,
        ClaimNC9Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        ClaimNC9Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        ClaimNC10Cri: /(0|1|2)/,
        ClaimNC10Type: /([A-Z]){2}/,
        ClaimNC10Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        ClaimNC10Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        ClaimNC11Cri: /(0|1|2)/,
        ClaimNC11Type: /([A-Z]){2}/,
        ClaimNC11Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        ClaimNC11Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        }
      }
    ]
  })
  return list.data
})
