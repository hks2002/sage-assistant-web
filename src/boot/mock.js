/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-03-19 18:07:40                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

// the mock index only works in DEV
if (process.env.DEV) {
  console.debug('\u001b[35m' + '[Boot] ', 'Mock')
  require('@/mock/index')
}
