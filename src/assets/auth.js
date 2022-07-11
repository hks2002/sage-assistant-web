/***
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-03-25 11:01:23
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-05-28 23:02:52
 * @FilePath       : \web2\src\assets\auth.js
 * @CopyRight      : Dedienne Aerospace China ZhuHai
 */
import { axios } from '@/assets/axios'
import { axiosGet } from '@/assets/axiosActions'
import { notifyError } from '@/assets/common'
import { SessionStorage } from 'quasar'

const setAuthority = (json) => {
  const str = JSON.stringify(json)
  const authorizations = str.match(/sessions\?f=([A-Z]+)/g)
  for (let i = 0; i < authorizations.length; ++i) {
    authorizations[i] = authorizations[i].replace('sessions?f=', '')
  }
  SessionStorage.set('authorizations', authorizations)
}

const isAuthorised = (fun) => {
  const authorizations = SessionStorage.getItem('authorizations')
  if (!authorizations) return false

  const index = authorizations.findIndex((auth) => {
    return auth === fun
  })
  if (index > -1) {
    return true
  } else {
    return false
  }
}

const doReLogin = async () => {
  const token = SessionStorage.getItem('authorization')
  if (!token) return Promise.resolve(false)

  return axios.post('/auth/login/submit', {}, { headers: { authorization: token, accept: 'application/json' } }).then(
    (response) => {
      return response.status === 200 ? true : false
    },
    (error) => {
      notifyError(error.response.data.$diagnoses[0].$message)
      return false
    }
  )
}

const fetchUserProfiles = async () => {
  // post must have {}, if data is empty, otherwise forbidden
  // sage return 201 status, don't use axiosPost
  await axios
    .post('/api1/syracuse/collaboration/syracuse/userProfiles/$template/$workingCopies', {})
    .then((response) => {
      const data = response.data
      const userProfiles = {}
      userProfiles.userName = `${data.user.firstName} ${data.user.lastName}`
      userProfiles.userInfo = `${data.user.firstName} ${data.user.lastName}(${data.user.email})`
      userProfiles.sageInfo = `${data.productName} ${data.selectedEndpoint.description}`
      userProfiles.userId = data.user.$uuid
      userProfiles.roleId = data.selectedRole.$uuid
      userProfiles.locale = data.selectedLocale.code
      userProfiles.localeDesc = data.selectedLocale.description
      userProfiles.endpointId = data.selectedEndpoint.$uuid
      SessionStorage.set('userProfiles', userProfiles)
    })
}

const fetchAuthorityData = async () => {
  await axiosGet("/api1/syracuse/collaboration/syracuse/pages('x3.erp.EXPLOIT.home.$navigation')").then((response) => {
    setAuthority(response)
  })
}

export { setAuthority, isAuthorised, doReLogin, fetchUserProfiles, fetchAuthorityData }
