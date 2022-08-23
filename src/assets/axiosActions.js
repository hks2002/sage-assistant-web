/***
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-05-20 12:50:44
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-05-28 23:03:07
 * @FilePath       : \web2\src\assets\axiosActions.js
 * @CopyRight      : Dedienne Aerospace China ZhuHai
 */
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
      let msg = t('Contact your admin')
      if (resp.data.message) {
        msg = resp.data.message
      }
      Notify.create({
        type: 'negative',
        message: msg
      })

      return Promise.reject('Failed')
    }
  })
}

const axiosPost = async (url, data, axiosConfig) => {
  /* Don't forget return Axios result: return axios */
  return axios.post(url, data, axiosConfig).then((resp) => {
    if (resp.status == 200) {
      /* Success */
      return resp.data
    } else {
      let msg = t('Contact your admin')
      if (resp.data.message) {
        msg = resp.data.message
      }
      Notify.create({
        type: 'negative',
        message: msg
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
      type: 'warning',
      message: t('At least select one')
    })

    return Promise.reject('Failed')
  } else {
    /* Donn't forget return Axios result: return axios */
    return axios.delete(url, { params: params }).then((resp) => {
      if (resp.status == 200) {
        /* Success */
        Notify.create({
          type: 'positive',
          message: t('Delete {entity} Success', { entity: entity })
        })

        return new Promise.resolve('Success')
      } else {
        let msg = t('Contact your admin')
        if (resp.data.message) {
          msg = resp.data.message
        }
        Notify.create({
          type: 'negative',
          message: msg
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
      type: 'warning',
      message: t('Can not be empty')
    })

    return Promise.reject('Failed')
  } else {
    /* Donn't forget return Axios result: return axios */
    return axios.post(url, { data: data }).then((resp) => {
      if (resp.status == 200) {
        /* Success */
        Notify.create({
          type: 'positive',
          message: t('Create {entity} Success', { entity: entity })
        })

        return new Promise.resolve('Success')
      }
      {
        let msg = t('Contact your admin')
        if (resp.data.message) {
          msg = resp.data.message
        }
        Notify.create({
          type: 'negative',
          message: msg
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
      type: 'warning',
      message: t('Must select one record')
    })

    return new Promise.resolve('Failed')
  } else if (Object.keys(params)[0] === '0') {
    /* More than one Recoder */
    Notify.create({
      type: 'warning',
      message: t('Must only one record')
    })

    return new Promise.resolve('Failed')
  } else {
    /* Donn't forget return Axios result: return axios */
    return axios.put(url, { params: params, data: data }).then((resp) => {
      if (resp.status == 200) {
        /* Success */
        Notify.create({
          type: 'positive',
          message: t('Modify {entity} Success', { entity: entity })
        })

        return new Promise.resolve('Success')
      } else if (resp.status == 204) {
        /* Error */
        Notify.create({
          type: 'negative',
          message: t('Modify {entity} Failed', { entity: entity })
        })

        return new Promise((res, rej) => {
          rej('Failed')
        })
      } else {
        /* Unsupport */
        Notify.create({
          type: 'negative',
          message: t('Contact your admin')
        })

        return new Promise((res, rej) => {
          rej('Failed')
        })
      }
    })
  }
}
export { axiosGet, axiosPost, axiosDelete, axiosCreate, axiosModify }
