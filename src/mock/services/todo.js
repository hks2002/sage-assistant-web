/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-11-16 12:57:39                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import Mock from 'mockjs'

Mock.mock(RegExp('^(/Data/TobeDealWithOrderLine)' + '.*'), () => {
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-10': [
      {
        salesOrderNO: /(Z|H|S|T|M)CC\d{6}/,
        projectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        PN: /([A-Z]){6}/,
        Description: () => {
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
        orderCategory: /(Methods|InteralProd|ExternalProd|Design|Stock|Trading|Services|SalesAdmin)/
      }
    ]
  })
  return list.data
})

Mock.mock(/^(\/Data\/TobeDelivery)/, () => {
  // list = {data:[{},{}]}

  const list = Mock.mock({
    'data|1-10': [
      {
        projectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        orderNO: /(Z|H|S|T|M)CC\d{6}/,
        orderType: /(NOR|REP|PRS|RCL)/,
        PN: /([A-Z]){6}/,
        'qty|1-100': 1,
        description: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        customerCode: /\d{5}/,
        customerName: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        currency: /(RMB|USD|EUR|HKD)/,
        'netPrice|1000-2000': 1,
        'USD|10-200000': 1,
        'rate|6-9': 1,
        orderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        requestDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        planedDate: () => {
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
    'data|1-10': [
      {
        projectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        orderType: /(NOR|REP|PRS|RCL)/,
        workOrderNO: /(Z|H|S|T|M)OF\d{8}/,
        'bomSeq|1-100': 1,
        customerCode: /0000\d{1}/,
        customerName: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        forPN: /([A-Z]){6}/,
        PN: /([A-Z]){6}/,
        description: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        'qty|1-100': 1,
        'shortQty|1-100': 1,
        'allQty|1-100': 1,
        unit: 'UN',
        createDate: () => {
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
    'data|1-10': [
      {
        projectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        purchaseNO: /(Z|H|S|T|M)CF\d{6}/,
        'line|1-100': 1,
        vendorCode: /0000\d{1}/,
        vendorName: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        PN: /([A-Z]){6}/,
        'qty|1-100': 1,
        unit: 'UN',
        description: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        'netPrice|1000-2000': 1,
        currency: /(RMB|USD|EUR|HKD)/,
        'USD|10-200000': 1,
        'rate|6-9': 1,
        ackDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        expectDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        orderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        createUser: /0000[A-Z]{1}/
      }
    ]
  })
  return list.data
})

Mock.mock(RegExp('^(/Data/TobeClosedWO)' + '.*'), () => {
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-10': [
      {
        projectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        orderNO: /(Z|H|S|T|M)CC\d{6}/,
        workOrderNO: /(Z|H|S|T|M)OF\d{6}/,
        wOStatus: /(Firm|Closed|Planned|Suggested)/,
        productionStatus: /(Pending|Process|Completed|Cancelled)/,
        orderType: /(NOR|REP|PRS|RCL)/,
        customerCode: /0000\d{1}/,
        customerName: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        PN: /([A-Z]){6}/,
        'qty|1-100': 1,
        orderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        }
      }
    ]
  })
  return list.data
})

Mock.mock(RegExp('^(/Data/TobeTrackingSalesOrderLineCnt)' + '.*'), () => {
  return 50
})

Mock.mock(RegExp('^(/Data/TobeTrackingSalesOrderLine)' + '.*'), () => {
  const list = Mock.mock({
    'data|50-50': [
      {
        itemNO: /\d{1,2}/,
        orderNO: /(Z|H|S|T|M)CC\d{6}/,
        orderLine: /\d{1,2}/,
        trackingNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        orderProjectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        orderType: /(NOR|REP)-(Services|Trading|ExternalProd|Services|Methods|Methods|Trading)/,
        orderPN: /([A-Z]){6}/,
        orderPNDesc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        orderQTY: () => {
          return Mock.mock('@integer(1, 100)')
        },
        orderPrice: () => {
          return Mock.mock('@integer(20, 100000)')
        },
        orderCurrency: /(RMB|USD|EUR|HKD)/,
        customerCode: /0000\d{1}/,
        customerName: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        orderDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        orderRequestDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        orderPlanedDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        orderSADFlag: /(1|2)/,
        orderProductFlag: /(1|2)/,
        orderDeliveryFlag: /(1|2)/,
        projectStatus: /(1|2|3|4)/,
        projectBlockReason: /(1|2|3|4|5|6)/,
        projectComment: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        projectAction: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        daysLeft: () => {
          return Mock.mock('@integer(-300, 100)')
        }
      }
    ]
  })
  return list.data
})

Mock.mock(RegExp('^(/Data/TobeTrackingBOMLine)' + '.*'), () => {
  const list = Mock.mock({
    'data|50-50': [
      {
        bomProjectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        workOrderNO: /(Z|H|S|T|M)OF\d{6}/,
        bomSeq: /\d{1,2}000/,
        bomPN: /([A-Z]){6}/,
        bomDesc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        bomQTY: () => {
          return Mock.mock('@integer(1, 100)')
        },
        bomUnit: 'UN',
        shortQty: () => {
          return Mock.mock('@integer(1, 100)')
        },
        allQty: () => {
          return Mock.mock('@integer(1, 100)')
        },
        bomRequestDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        stockPN: /([A-Z]){6}/,
        avaQty: () => {
          return Mock.mock('@integer(1, 100)')
        }
      }
    ]
  })
  return list.data
})

Mock.mock(RegExp('^(/Data/TobeTrackingPurchaseOrderLine)' + '.*'), () => {
  const list = Mock.mock({
    'data|50-50': [
      {
        purchaseNO: /(Z|H|S|T|M)CF\d{6}/,
        purchaseLine: /\d{1,2}/,
        purchaseProjectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
        purchasePN: /([A-Z]){6}/,
        PurchasePNDesc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        purchaseQTY: () => {
          return Mock.mock('@integer(1, 100)')
        },
        purchaseUnit: 'UN',
        vendorCode: /0000\d{1}/,
        vendorName: () => {
          return Mock.mock('@sentence(3, 5)')
        },
        purchaseAckDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        purchaseExpectDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        purchaseDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        purchaseUser: /0000[A-Z]{1}/
      }
    ]
  })
  return list.data
})

Mock.mock(RegExp('^(/Data/TobeTrackingReceiptLine)' + '.*'), () => {
  const list = Mock.mock({
    'data|50-50': [
      {
        receiptNO: /(Z|H|S|T|M)RA\d{6}/,
        receiptLine: /\d{1,2}000/,
        receiptPurchaseNO: /(Z|H|S|T|M)CF\d{6}/,
        receiptPurchaseLine: /\d{1,2}000/,
        receiptDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        receipter: /0000[A-Z]{1}/,
        receiptQty: () => {
          return Mock.mock('@integer(1, 100)')
        }
      }
    ]
  })
  return list.data
})

Mock.mock(RegExp('^(/Data/TobeTrackingQALine)' + '.*'), () => {
  const list = Mock.mock({
    'data|50-50': [
      {
       claimProjectNO: /(Z|H|S|T|M)CC\d{6}-\d{1,2}/,
       claimNO: /(Z|H|S|T|M)(DSRE|DSRP|DSRC)\d{6}/,
       claimNote: () => {
          return Mock.mock('@sentence(3, 5)')
        },
       claimNC0Cri: /(0|1|2)/,
       claimNC0Type: /([A-Z]){2}/,
       claimNC0Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
       claimNC0Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
       claimNC1Cri: /(0|1|2)/,
       claimNC1Type: /([A-Z]){2}/,
       claimNC1Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
       claimNC1Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
       claimNC2Cri: /(0|1|2)/,
       claimNC2Type: /([A-Z]){2}/,
       claimNC2Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
       claimNC2Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
       claimNC3Cri: /(0|1|2)/,
       claimNC3Type: /([A-Z]){2}/,
       claimNC3Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
       claimNC3Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
       claimNC4Cri: /(0|1|2)/,
       claimNC4Type: /([A-Z]){2}/,
       claimNC4Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
       claimNC4Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
       claimNC5Cri: /(0|1|2)/,
       claimNC5Type: /([A-Z]){2}/,
       claimNC5Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
       claimNC5Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
       claimNC6Cri: /(0|1|2)/,
       claimNC6Type: /([A-Z]){2}/,
       claimNC6Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
       claimNC6Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
       claimNC7Cri: /(0|1|2)/,
       claimNC7Type: /([A-Z]){2}/,
       claimNC7Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
       claimNC7Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
       claimNC8Cri: /(0|1|2)/,
       claimNC8Type: /([A-Z]){2}/,
       claimNC8Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
       claimNC8Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
       claimNC9Cri: /(0|1|2)/,
       claimNC9Type: /([A-Z]){2}/,
       claimNC9Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
       claimNC9Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
       claimNC10Cri: /(0|1|2)/,
       claimNC10Type: /([A-Z]){2}/,
       claimNC10Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
       claimNC10Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        },
       claimNC11Cri: /(0|1|2)/,
       claimNC11Type: /([A-Z]){2}/,
       claimNC11Date: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
       claimNC11Desc: () => {
          return Mock.mock('@sentence(3, 5)')
        }
      }
    ]
  })
  return list.data
})
