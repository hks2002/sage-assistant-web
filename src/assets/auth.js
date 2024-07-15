/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-07-14 00:18:13                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { SessionStorage } from 'quasar'

/**
 * Check if the user has the authority to access the function
 * @param {*} fun function code, such as 'GESSOH'
 * @returns
 */
const isAuthorized = (fun) => {
  if (process.env.DEV) return true

  const authorizations = SessionStorage.getItem('authorizations')
  if (!authorizations) return false

  const index = authorizations.findIndex((auth) => {
    return auth === fun
  })
  return index > -1 ? true : false
}

export { isAuthorized }
