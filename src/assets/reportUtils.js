/***
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-03-25 11:01:23
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-05-28 23:04:29
 * @FilePath       : \web2\src\assets\reportUtils.js
 * @CopyRight      : Dedienne Aerospace China ZhuHai
 */
import { axios } from '@/assets/axios'
import { notifyError } from '@/assets/common'

const validateInput = (rpt, value) => {
  let rtn = false
  switch (rpt) {
    case 'SA': {
      const reg1 = /^[A-Z]CC[\d]{6}$/
      const reg2 = /^[A-Z]DSR[P|C][\d]{6}$/
      const reg3 = /^[A-Z]REP[\d]{7}$/
      const reg4 = /^[A-Z]RCL[\d]{7}$/
      const reg5 = /^[A-Z]LC[\d]{6}$/
      if (
        reg1.test(value) ||
        reg2.test(value) ||
        reg3.test(value) ||
        reg4.test(value) ||
        reg5.test(value)
      ) {
        rtn = true
      }
      break
    }
    case 'COC': {
      const reg1 = /^[A-Z]CC[\d]{6}-[\d]{1,3}$/
      const reg2 = /^[A-Z]DSR[P|C][\d]{6}$/
      const reg3 = /^[A-Z]REP[\d]{7}-[\d]{1,3}$/
      const reg4 = /^[A-Z]RCL[\d]{7}-[\d]{1,3}$/
      if (
        reg1.test(value) ||
        reg2.test(value) ||
        reg3.test(value) ||
        reg4.test(value)
      ) {
        rtn = true
      }
      break
    }
    case 'Delivery': {
      const reg1 = /^[A-Z]BL[\d]{6}$/
      if (reg1.test(value)) {
        rtn = true
      }
      break
    }
    case 'Invoice': {
      const reg1 = /^[A-Z]FC[\d]{7}$/
      const reg2 = /^[A-Z]PC[\d]{6}$/
      if (reg1.test(value) || reg2.test(value)) {
        rtn = true
      }
      break
    }
    case 'Invoice2': {
      const reg1 = /^[A-Z]CC[\d]{6}$/
      const reg2 = /^[A-Z]DSR[P|C][\d]{6}$/
      const reg3 = /^[A-Z]REP[\d]{7}$/
      const reg4 = /^[A-Z]RCL[\d]{7}$/
      const reg5 = /^[A-Z]LC[\d]{6}$/
      if (
        reg1.test(value) ||
        reg2.test(value) ||
        reg3.test(value) ||
        reg4.test(value) ||
        reg5.test(value)
      ) {
        rtn = true
      }
      break
    }
    case 'PurchaseOrder': {
      const reg1 = /^[A-Z]CF[\d]{7}$/
      if (reg1.test(value)) {
        rtn = true
      }
      break
    }
    case 'Receipt': {
      const reg1 = /^[A-Z]RA[\d]{7}$/
      if (reg1.test(value)) {
        rtn = true
      }
      break
    }
    case 'Receipt2': {
      const reg1 = /^[A-Z]{3}-[\d]{5}-[\d]{8}-[\d]{8}$/
      if (reg1.test(value)) {
        rtn = true
      }
      break
    }
    case 'WorkOrder': {
      const reg1 = /^[A-Z]OF[\d]{8}$/
      const reg2 = /^[A-Z]CC[\d]{6}-[\d]{1,3}$/
      if (reg1.test(value) || reg2.test(value)) {
        rtn = true
      }
      break
    }
    case 'SOA': {
      const reg1 = /^[A-Z]{3}$/
      const reg2 = /^[A-Z]{3}[\d]{5}$/
      if (reg1.test(value) || reg2.test(value)) {
        rtn = true
      }
      break
    }
    default:
      return false
  }

  if (rtn === false) {
    notifyError('Wrong Input')
  }

  return rtn
}

const pdfUrltoDataUri = async (url) => {
  // return the datauri
  return await axios({
    methods: 'GET',
    url: url,
    responseType: 'arraybuffer' // * This is very important, without it, it doesn't work, <mockjs> ndeed change it also, done by mockExt */
  }).then(
    (response) => {
      return pdfArraybufferToBase64(response.data)
    },
    (error) => {
      console.log(error)
      return '/#/exception/500'
    }
  )
}

const pdfArraybufferToBase64 = (buffer) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return 'data:application/pdf;base64,' + window.btoa(binary)
}

export { validateInput, pdfUrltoDataUri }
