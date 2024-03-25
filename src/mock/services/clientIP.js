/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-03-25 00:15:04                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import Mock from 'mockjs'

Mock.mock(RegExp('^(/Data/ClientIP)' + '.*'), () => {
  return '192.168.0.1'
})
