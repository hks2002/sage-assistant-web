/*********************************************************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                                                            *
 * @CreatedDate           : 2022-05-20 12:50:00                                                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                                                            *
 * @LastEditDate          : 2023-08-14 15:53:01                                                                      *
 * @FilePath              : sage-assistant-web/src/assets/axiosActions.js                                            *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                                                          *
 ********************************************************************************************************************/

import { axios } from '@/assets/axios'
import { i18n } from '@/boot/i18n'
import { Notify } from 'quasar'

const { t } = i18n.global

/** Status Code
 *
 * Success 200
 * Error   204
 */

const axiosGet = async (url, params) => {
  /* Don't forget return Axios result: return axios */
  return axios.get(url, { params: params }).then((resp) => {
    if (resp.status == 200) {
      /* Success */
      return resp.data
    } else {
      Notify.create({
        type: 'fail',
        message: resp.data.msg || t('S.CONTACT_ADMIN')
      })

      return Promise.reject('Failed')
    }
  })
}

const axiosPost = async (url, data) => {
  /* Don't forget return Axios result: return axios */
  return axios.post(url, { data: data }).then((resp) => {
    if (resp.status == 200) {
      /* Success */
      return resp.data
    } else {
      Notify.create({
        type: 'fail',
        message: resp.data.msg || t('S.CONTACT_ADMIN')
      })

      return Promise.reject('Failed')
    }
  })
}

const axiosDelete = async (url, params) => {
  const entity = url.replace('/Data/', '')

  if (Object.keys(params).length == 0) {
    /* No Target */
    Notify.create({
      type: 'warn',
      message: t('S.AT_LEAST_ONE')
    })

    return Promise.reject('Failed')
  } else {
    /* Donn't forget return Axios result: return axios */
    return axios.delete(url, { params: params }).then((resp) => {
      if (resp.status == 200) {
        /* Success */
        Notify.create({
          type: 'fail',
          message: t('W.DELETE') + t(' {VAR_HOLD_WITH_SPACE} ', { VAR_HOLD: entity }) + t('W.SUCCESS')
        })

        return new Promise.resolve('Success')
      } else {
        Notify.create({
          type: 'fail',
          message: resp.data.msg || t('S.CONTACT_ADMIN')
        })

        return Promise.reject('Failed')
      }
    })
  }
}

const axiosCreate = async (url, data) => {
  const entity = url.replace('/Data/', '')

  if (Object.keys(data).length == 0) {
    /* No Target */
    Notify.create({
      type: 'warn',
      message: t('S.CAN_NOT_BE_EMPTY')
    })

    return Promise.reject('Failed')
  } else {
    /* Donn't forget return Axios result: return axios */
    return axios.post(url, { data: data }).then((resp) => {
      if (resp.status == 200) {
        /* Success */
        Notify.create({
          type: 'success',
          message: t('W.CREATE') + t(' {VAR_HOLD_WITH_SPACE} ', { VAR_HOLD: entity }) + t('W.SUCCESS')
        })

        return new Promise.resolve('Success')
      }
      {
        Notify.create({
          type: 'fail',
          message: resp.data.msg || t('S.CONTACT_ADMIN')
        })

        return Promise.reject('Failed')
      }
    })
  }
}

const axiosModify = async (url, params, data) => {
  const entity = url.replace('/Data/', '')

  if (Object.keys(params).length == 0) {
    /* No Target */
    Notify.create({
      type: 'warn',
      message: t('S.CAN_NOT_BE_EMPTY')
    })

    return new Promise.resolve('Failed')
  } else if (Object.keys(params)[0] === '0') {
    /* More than one Recorder */
    Notify.create({
      type: 'warn',
      message: t('S.MUST_ONLY_ONE')
    })

    return new Promise.resolve('Failed')
  } else {
    /* Donn't forget return Axios result: return axios */
    return axios.put(url, { params: params, data: data }).then((resp) => {
      if (resp.status == 200) {
        /* Success */
        Notify.create({
          type: 'success',
          message: t('W.MODIFY') + t(' {VAR_HOLD_WITH_SPACE} ', { VAR_HOLD: entity }) + t('W.SUCCESS')
        })

        return new Promise.resolve('Success')
      } else if (resp.status == 204) {
        /* Error */
        Notify.create({
          type: 'fail',
          message: t('W.MODIFY') + t(' {VAR_HOLD_WITH_SPACE} ', { VAR_HOLD: entity }) + t('W.FAILED')
        })

        return Promise.reject('Failed')
      } else {
        /* UnSupport */
        Notify.create({
          type: 'fail',
          message: t('S.CONTACT_ADMIN')
        })

        return Promise.reject('Failed')
      }
    })
  }
}
export { axiosCreate, axiosDelete, axiosGet, axiosModify, axiosPost }
