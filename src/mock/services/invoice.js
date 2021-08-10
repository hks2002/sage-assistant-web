import Mock from 'mockjs'
import { getQueryParameter } from '../mockExt'

Mock.mock(RegExp('^(/Data/InvoiceNO)' + '.*'), options => {
  console.debug('\u001b[35m' + '[Mocking] ', 'InvoiceNO')
  const InvoiceNO = getQueryParameter(options, 'InvoiceNO')
  // list = {data:[]}
  const list = Mock.mock({
    'data|1-10': [() => {
      return 'ZFC' + InvoiceNO + Mock.mock(/\d{8}/)
    }]
  })

  return list.data
})

Mock.mock(RegExp('^(/Data/InvoiceHeader)' + '.*'), options => {
  console.debug('\u001b[35m' + '[Mocking] ', 'InvoiceHeader')
  const Lbdm = getQueryParameter(options, 'Lbdm')
  const fphm = getQueryParameter(options, 'fphm')
  // list = {data:[{}]}
  const list = Mock.mock({
    'data|1': [
      {
        Facility: /(ZHU|HKG|SGP)/,
        Currency: /(RMB|USD)/,
        InvoiceNO: /((H|Z|S|T|M)FC[0-9]{6})?/,
        InvoiceStatus: /(Posted|NotePosted)/,
        Note: () => { return Mock.mock('@string("number", 10)') },
        CreateDate: () => { return Mock.mock('@datetime("yyyy-MM-dd")') },
        CreateUser: () => { return Mock.mock('@cname') },
        FaPiao: () => { return Mock.mock('@string("number", 10)') },
        Customer: () => { return Mock.mock('@ctitle(5, 10)') },
        Address: () => { return Mock.mock('@county(true)') + Mock.mock('@csentence') },
        AmountTaxInclude: () => { return Mock.mock('@float(60, 10000, 3, 5)') },
        AmountTaxNotInclude: () => { return Mock.mock('@float(60, 10000, 3, 5)') },
        AmountTax: () => { return Mock.mock('@float(60, 10000, 3, 5)') },
        CurrRate: Mock.mock('@float(6, 8.5, 3, 5)')
      }
    ]
  })

  return list.data
})

Mock.mock(RegExp('^(/Data/InvoiceBody)' + '.*'), options => {
  console.debug('\u001b[35m' + '[Mocking] ', 'InvoiceBody')
  const Lbdm = getQueryParameter(options, 'Lbdm')
  const fphm = getQueryParameter(options, 'fphm')
  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-10': [
      {
        Line: () => { return Mock.mock({ 'number|1-100': 100 }).number * 1000 },
        PN: () => { return Mock.mock('@word') },
        Description: () => { return Mock.mock('@ctitle(5, 10)') },
        Qty: () => { return Mock.mock({ 'number|1-100': 100 }).number },
        Unit: () => { return Mock.mock('@cword') },
        NetPrice: () => { return Mock.mock('@float(60, 10000, 3, 5)') },
        AmountNoTax: () => { return Mock.mock('@float(60, 10000, 3, 5)') },
        AmountTaxInclude: () => { return Mock.mock('@float(60, 10000, 3, 5)') },
        AmountTax: () => { return Mock.mock('@float(60, 10000, 3, 5)') },
        TaxRate: /(0.13|0.17|0)/
      }
    ]
  })

  return list.data
})
