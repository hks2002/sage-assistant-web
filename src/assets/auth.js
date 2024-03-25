/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-03-25 10:00:28                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { axiosPost } from '@/assets/axiosActions'
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

const fetchUserProfiles = async () => {
  // post must have {}, if data is empty, otherwise forbidden
  // sage return 201 status, don't use axiosPost
  const token = SessionStorage.getItem('authorization')
  if (!token) return Promise.reject()
  //const nty = Notify.create({ type: 'ongoing', message: t('S.LOAD_PROFILE') })

  return axiosPost('/Data/Profile', {})
    .then((response) => {
      if (response.success) {
        SessionStorage.set('userProfiles', response.profile)
        return Promise.resolve(response.profile)
      } else {
        return Promise.reject()
      }
    })
    .finally(() => {
      //nty()
    })
}

const fetchAuthorityData = async () => {
  // post must have {}, if data is empty, otherwise forbidden
  // sage return 201 status, don't use axiosPost
  const token = SessionStorage.getItem('authorization')
  if (!token) return Promise.reject()
  //const nty = Notify.create({ type: 'ongoing', message: t('S.LOAD_AUTHORITY') })

  return axiosPost('/Data/Function', {})
    .then((response) => {
      if (response.success) {
        SessionStorage.set('authorizations', response.functions)
        return Promise.resolve(response.functions)
      } else {
        return Promise.reject()
      }
    })
    .finally(() => {
      // nty()
    })
}

export { fetchAuthorityData, fetchUserProfiles, isAuthorized }
