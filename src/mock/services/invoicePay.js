/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-04-01 10:30:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-11-17 12:11:25                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { getQueryParameters } from '@/assets/mockExt'
import Mock from 'mockjs'

Mock.mock(RegExp('^(/Data/FinancialInvoicePay)' + '.*'), (options) => {
  const query = getQueryParameters(options)
  const CustomerCode = query['CustomerCode']

  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-500': [
      {
        site: /ZHU|HKG|TLS|SGP|MIA|CIN|QAT/,
        customer: CustomerCode,
        name: () => {
          return Mock.mock('@title(3, 10)')
        },
        invoiceNO: /(H|Z|S|T|M)FC[0-9]{6}/,
        currency: /RMB|USD/,
        'amount|1000-2000': 1,
        'amountLocal|1000-2000': 1,
        'pay|1000-2000': 1,
        'payLocal|1000-2000': 1,
        orderNO: /(H|Z|S|T|M)CC[0-9]{6}/,
        createDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        dueDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        payDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        fapiao: /Fapiao-[0-9]{8}/,
        custRef: /(H|Z|S|T|M)XXX[0-9]{6}/,
        status: /Paid|P-Paid/
      }
    ]
  })

  return list.data
})

Mock.mock(RegExp('^(/Data/FinancialInvoicePayPro)' + '.*'), (options) => {
  const query = getQueryParameters(options)
  const CustomerCode = query['CustomerCode']

  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-500': [
      {
        site: /ZHU|HKG|TLS|SGP|MIA|CIN|QAT/,
        customer: CustomerCode,
        name: () => {
          return Mock.mock('@title(3, 10)')
        },
        invoiceNO: /(H|Z|S|T|M)FC[0-9]{6}/,
        currency: /RMB|USD/,
        'amount|1000-2000': 1,
        'amountLocal|1000-2000': 1,
        'pay|1000-2000': 1,
        'payLocal|1000-2000': 1,
        orderNO: /(H|Z|S|T|M)CC[0-9]{6}/,
        createDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        dueDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        payDate: () => {
          return Mock.mock('@date("yyyy-MM-dd")')
        },
        fapiao: /Fapiao-[0-9]{8}/,
        custRef: /(H|Z|S|T|M)XXX[0-9]{6}/,
        Status: /Paid|P-Paid/,
        matchedBy: /(FCCR_A|FCCR_M|FCAC|FCODODCR)/,
        payNO: /(ZCBC|BOC)[0-9]{10}/,
        payCurrency: /RMB|USD/,
        'payInPayNO|1000-2000': 1,
        desc0: () => {
          return Mock.mock('@title(3, 10)')
        },
        desc1: () => {
          return Mock.mock('@title(3, 10)')
        }
      }
    ]
  })

  return list.data
})
