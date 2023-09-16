/*********************************************************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                                                            *
 * @CreatedDate           : 2022-03-25 11:01:00                                                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                                                            *
 * @LastEditDate          : 2023-06-15 16:34:52                                                                      *
 * @FilePath              : src/mock/services/currencyRate.js                                                        *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                                                          *
 ********************************************************************************************************************/

import { getQueryParameters } from '@/assets/mockExt'
import Mock from 'mockjs'

Mock.mock(RegExp('^(/Data/CurrencyRateBatch)' + '.*'), (options) => {
  const query = getQueryParameters(options, 'query')

  const allQ = query.split('_')
  const allRes = []

  for (let i = 0, l = allQ.length; i < l; i++) {
    const sour = allQ[i].substring(0, 3)
    if (sour === 'USD') {
      allRes[i] = Mock.mock('@float(6, 8.5, 3, 5)')
    } else if (sour === 'EUR') {
      allRes[i] = Mock.mock('@float(6.5, 9.6, 3, 5)')
    } else if (sour === 'HKD') {
      allRes[i] = Mock.mock('@float(0.78, 0.94, 3, 5)')
    } else {
      allRes[i] = 1
    }
  }

  return allRes
})
