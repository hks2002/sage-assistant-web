/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-05-20 12:50:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-11-29 19:02:15                               *
 * @FilePath              : sage-assistant-web/src/assets/axiosActions.js     *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { axios } from '@/assets/axios'
import { i18n } from '@/boot/i18n'
import { Notify } from 'quasar'

const { t } = i18n.global

/**
 * Asynchronous function for making GET requests using Axios.
 * This function is designed to encapsulate the GET request process, handling both successful and failed responses.
 *
 * @param {string} url - The URL for the request.
 * @param {Object} params - The query parameters to be sent with the GET request.
 * @returns {Promise} - Returns a Promise that resolves with the response data upon success, or rejects with an error message upon failure.
 */
const axiosGet = async (url, params) => {
  return axios.get(url, { params: params }).then((resp) => {
    if (resp.status == 200) {
      /* Success */
      return resp.data
    } else {
      /* Code for 20X */
      Notify.create({
        type: 'fail',
        message: resp.data.msg || t('S.CONTACT_ADMIN')
      })

      return Promise.reject('Failed')
    }
  })
}

/**
 * Fetches data from a specified URL using the axiosGet function.
 * This function further encapsulates the axiosGet function, primarily handling the resolution and rejection of Promises.
 * In case of a successful request, it returns the response data; in case of failure, it returns an empty array.
 *
 * @param {string} url - The URL for the request.
 * @param {Object} param - The query parameters to be sent with the GET request.
 * @returns {Promise} - Returns a Promise that resolves with the response data upon success, or an empty array upon failure.
 */
const getData = (url, param) => {
  return axiosGet(url, param)
    .then(
      (response) => {
        // Upon successful request, return the response data
        return response
      },
      () => {
        // In case of failure, return an empty array
        return []
      }
    )
    .catch((err) => {
      // Log error information and return an empty array in case of a request failure
      console.error(err)
      return []
    })
}

/**
 * Asynchronously sends a POST request using the Axios library.
 * Primarily used for interacting with the backend API to submit data or request resources.
 *
 * @param {string} url - The URL of the backend API endpoint, indicating where to send the POST request.
 * @param {object} data - The data object to send to the server, containing the specific request parameters or data.
 * @returns {Promise} - Returns a Promise object, which resolves with the response data from the server when the request is successful (status code 200),
 * and rejects with an error message when the request fails (other status codes).
 */
const axiosPost = async (url, data) => {
  return axios.post(url, { data: data }).then((resp) => {
    // Check the HTTP status code of the response to determine if the request was successful
    if (resp.status == 200) {
      /* Success */
      // If the request is successful, return the response data
      return resp.data
    } else {
      /* Code for 20X */
      // If the request fails, display a failure notification with the message from the response data, or a default message
      Notify.create({
        type: 'fail',
        message: resp.data.msg || t('S.CONTACT_ADMIN')
      })

      // When the request fails, return a rejected Promise with an error message
      return Promise.reject('Failed')
    }
  })
}

/**
 * Performs a DELETE request using Axios.
 *
 * @param {string} url - The URL for the request.
 * @param {string} entityName - The name of the entity, used for success messages.
 * @param {Object} params - The request parameters.
 * @returns {Promise} - Returns a Promise that resolves or rejects based on the request result.
 */
const axiosDelete = async (url, entityName, params) => {
  // Check if params is empty
  if (Object.keys(params).length == 0) {
    // No Target
    // Display a warning notification when params is empty, indicating at least one target must be selected
    Notify.create({
      type: 'warn',
      message: t('S.AT_LEAST_ONE')
    })

    // Return a rejected Promise
    return Promise.reject('Failed')
  } else {
    // Execute the DELETE request and handle the response
    return axios.delete(url, { params: params }).then((resp) => {
      // Check if the response is successful
      if (resp.data.success) {
        // Success
        // Display a success notification upon successful request
        Notify.create({
          type: 'success',
          message: t('S.DELETE') + t('{VAR_HOLD_WITH_SPACE}', { VAR_HOLD_WITH_SPACE: entityName }) + t('S.SUCCESS')
        })

        // Return a resolved Promise
        return Promise.resolve('Success')
      } else {
        // Display a failure notification upon unsuccessful request
        Notify.create({
          type: 'fail',
          message: resp.data.msg || t('S.CONTACT_ADMIN')
        })

        // Return a rejected Promise
        return Promise.reject('Failed')
      }
    })
  }
}

/**
 * Asynchronously creates an entity using the given data via an HTTP POST request.
 *
 * This function uses the Axios library to send a POST request to the specified URL, thereby creating an entity.
 * Before sending the request, it checks if the data object is empty. If it is empty, it shows a warning notification
 * and rejects the promise. If the data is not empty, it sends the request and handles the response:
 * - If the response's success attribute is true, it shows a success notification and resolves the promise.
 * - If the success attribute is false, it shows a failure notification and rejects the promise.
 *
 * @param {string} url The URL to send the POST request to.
 * @param {string} entityName The name of the entity being created, used for display in notifications.
 * @param {object} data The data object containing the information for creating the entity.
 * @returns {Promise} Returns a Promise that indicates the success or failure of the creation operation.
 */
const axiosCreate = async (url, entityName, data) => {
  // Check if the data object is empty
  if (Object.keys(data).length == 0) {
    // No Target
    Notify.create({
      type: 'warn',
      message: t('S.CAN_NOT_BE_EMPTY')
    })

    // If the data is empty, reject the promise with a failure message
    return Promise.reject('Failed')
  } else {
    // If the data is not empty, send a POST request
    return axios.post(url, data).then((resp) => {
      // Determine the response handling based on the success attribute in the response data
      if (resp.data.success) {
        // json with success true
        Notify.create({
          type: 'success',
          message: t('S.CREATE') + t('{VAR_HOLD_WITH_SPACE}', { VAR_HOLD_WITH_SPACE: entityName }) + t('S.SUCCESS')
        })

        // If successful, resolve the promise with a success message
        return Promise.resolve('Success')
      } else {
        // json with success false
        Notify.create({
          type: 'fail',
          message: resp.data.msg || t('S.CONTACT_ADMIN')
        })

        // If failed, reject the promise with a failure message
        return Promise.reject('Failed')
      }
    })
  }
}

/**
 * Asynchronously modifies data at a specified URL using the PUT method
 * This function uses axios to send a PUT request to the specified URL, containing certain data
 * If the server returns a successful response, it displays a success notification and resolves the promise with 'Success'
 * If the server returns a failure response, it displays a failure notification and rejects the promise with 'Failed'
 *
 * @param {string} url - The URL for the PUT request
 * @param {object} data - The data to be sent with the PUT request
 * @returns {Promise} - A Promise that resolves to 'Success' or rejects with 'Failed' based on the server's response
 */
const axiosModify = async (url, data) => {
  return axios.put(url, data).then((resp) => {
    // Check if the server response contains a success flag
    if (resp.data.success) {
      /* json with success true */
      // Display a success notification
      Notify.create({
        type: 'success',
        message: t('S.MODIFY') + t('{VAR_HOLD_WITH_SPACE}', { VAR_HOLD_WITH_SPACE: entityName }) + t('S.SUCCESS')
      })

      // Resolve the Promise with 'Success'
      return Promise.resolve('Success')
    } else {
      /** json with success false */
      // Display a failure notification
      Notify.create({
        type: 'fail',
        message: resp.data.msg || t('S.CONTACT_ADMIN')
      })

      // Reject the Promise with 'Failed'
      return Promise.reject('Failed')
    }
  })
}

/**
 * Asynchronously modifies a batch of entities using the Axios library
 * @param {string} url - The URL for the HTTP request
 * @param {string} entityName - The name of the entity being modified
 * @param {Object} params - The query parameters for the HTTP request
 * @param {any} data - The data to be modified
 * @returns {Promise} - Returns a Promise that resolves to 'Success' or 'Failed' based on the modification result
 */
const axiosModifyBatch = async (url, entityName, params, data) => {
  // Check if the params object is empty
  if (Object.keys(params).length == 0) {
    /* No Target */
    // Display a warning notification when params is empty
    Notify.create({
      type: 'warn',
      message: t('S.CAN_NOT_BE_EMPTY')
    })

    // Resolve the Promise with 'Failed' and terminate the function
    return Promise.resolve('Failed')
  } else if (Object.keys(params)[0] === '0') {
    /* More than one Recorder */
    // Display a warning notification when the first key of params is '0'
    Notify.create({
      type: 'warn',
      message: t('S.MUST_ONLY_ONE')
    })

    // Resolve the Promise with 'Failed' and terminate the function
    return Promise.resolve('Failed')
  } else {
    /* Don't forget return Axios result: return axios */
    // Send a PUT request using Axios, including params and data
    return axios.put(url, { params: params, data: data }).then((resp) => {
      // Check if the response data indicates success
      if (resp.data.success) {
        /* json with success true */
        // Display a success notification upon successful modification
        Notify.create({
          type: 'success',
          message: t('S.MODIFY') + t('{VAR_HOLD_WITH_SPACE}', { VAR_HOLD_WITH_SPACE: entityName }) + t('S.SUCCESS')
        })

        // Resolve the Promise with 'Success'
        return Promise.resolve('Success')
      } else {
        /** json with success false */
        // Display a failure notification upon unsuccessful modification
        Notify.create({
          type: 'fail',
          message: resp.data.msg || t('S.CONTACT_ADMIN')
        })

        // Reject the Promise with 'Failed'
        return Promise.reject('Failed')
      }
    })
  }
}

export { axiosCreate, axiosDelete, axiosGet, axiosModify, axiosModifyBatch, axiosPost, getData }
