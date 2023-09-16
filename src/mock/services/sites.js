/*********************************************************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                                                            *
 * @CreatedDate           : 2022-03-25 11:01:00                                                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                                                            *
 * @LastEditDate          : 2023-06-15 16:39:01                                                                      *
 * @FilePath              : src/mock/services/sites.js                                                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                                                          *
 ********************************************************************************************************************/

import Mock from 'mockjs'

Mock.mock(/^\/Data\/Sites$/, () => {
  return ['ZHU', 'HKG', 'SGP', 'TLS', 'MIA', 'AAA']
})
