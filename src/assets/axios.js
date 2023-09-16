/*********************************************************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                                                            *
 * @CreatedDate           : 2022-03-25 11:01:00                                                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                                                            *
 * @LastEditDate          : 2023-08-14 13:52:51                                                                      *
 * @FilePath              : sage-assistant-web/src/assets/axios.js                                                   *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                                                          *
 ********************************************************************************************************************/

/**
 * Run Default setting, interceptor
 */
import axios from 'axios'
import { i18n } from 'boot/i18n'
import { Notify, SessionStorage } from 'quasar'
const { t } = i18n.global

// This is the default configuration called in axios.js
axios.defaults.headers.patch['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.withCredentials = true // Allow send cookies
axios.defaults.timeout = 60000

// This is the default configuration called in axios.js
axios.interceptors.request.use(
  (config) => {
    const token = SessionStorage.getItem('authorization')

    if (token) {
      const tokenCfg = {
        headers: { authorization: token }
      }
      Object.assign(config, tokenCfg)
    }

    //console.debug('\u001b[31m' + '[Axios] ', 'Request config:', config)
    return Promise.resolve(config)
  },
  (error) => {
    // It seems never happens, Most error handing please go to response interceptor
    console.error('\u001b[31m' + '[Axios] ', 'Request error:', error)
    return Promise.reject(error)
  }
)

// This is the default configuration called in axios.js
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('\u001b[31m' + '[Axios] ', 'Response error:', error)

    switch (error.response.status) {
      case 401:
      case 403:
        Notify.create({
          type: 'warn',
          message: error.response.data.msg || t('S.NOT_AUTHORIZED')
        })
        break
      case 404:
        Notify.create({
          type: 'error',
          message: t('S.NOT_FOUND')
        })
        break
      case 500:
        Notify.create({
          type: 'error',
          message: t('S.SERVER_ERROR')
        })
        break
      default:
        Notify.create({
          type: 'error',
          message: t('S.CONTACT_ADMIN')
        })
    }

    return Promise.reject(error.response.data)
  }
)

export { axios }
