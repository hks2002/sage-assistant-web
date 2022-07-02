/***
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-03-25 11:01:23
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-05-28 23:05:57
 * @FilePath       : \web2\src\assets\sageSvcs.js
 * @CopyRight      : Dedienne Aerospace China ZhuHai
 */
import { doReLogin } from '@/assets/auth'
import { axios } from '@/assets/axios'
import { notifyError } from '@/assets/common'
import { ACT, actData, doAct, noRevise, selData, setData, sSData, tgt } from '@/assets/sageActs'
import { date, SessionStorage } from 'quasar'
import { v4 as uuidv4 } from 'uuid'

const srvEnv = process.env.DEV ? 'EXPLOITEST' : 'EXPLOIT'

/**
 * Every action needs get session first.
 * @param {*} transPage  fun: GESSOH, GESPOH trans:'2~1, 2~1' ......
 * @returns session url
 */
const getSageSessionUrl = async (transPage) => {
  // reuse last session url
  const url = SessionStorage.getItem(transPage)
  if (url) return url

  const fnc = transPage.substring(0, 6)
  const trans = transPage.substring(6)

  const sessionRequestUrl = `/trans/x3/erp/${srvEnv}/$sessions?f=${fnc}/2//M&trackngId=${uuidv4()}`

  const sageSessionUrl = await axios
    .post(sessionRequestUrl, { settings: {} })
    .then(
      async (response) => {
        // Sage set function session url at headers.location
        // Having  headers.location means success
        if (response.status === 200 && response.headers.location) {
          const url = response.headers.location
          // if provide transaction
          if (trans) {
            const rtn = await doAct(url, transPage, selData(ACT.SELECT_LIST, tgt('B', 'bA', 0), trans))
            if (!rtn) return false
          }
          SessionStorage.set(transPage, url)
          return url
        }

        // If server return pop message, always return false
        if (response.status === 200 && response.data.sap && response.data.sap.target.type === 'box') {
          notifyError(response.data.sap.target.box.li)
          return false
        }

        // If return data is not application/json, means false, mostly is login page
        if (response.status === 200 && response.headers['content-type'] !== 'application/json') {
          const rtn = await doReLogin()
          if (rtn) return getSageSessionUrl(transPage)
        }

        // unmatch above knonw condition, always return false
        SessionStorage.remove(transPage)
        return false
      },
      (error) => {
        console.log(error)
        SessionStorage.remove(transPage)
        return false
      }
    )
    .catch((error) => {
      console.log(error)
      SessionStorage.remove(transPage)
      return false
    })

  return sageSessionUrl
}

const transPageDefaultVal = {
  'GESSOH2~1': 'TCC100008',
  'GESSOH2~2': 'TLC110001',
  'GESPOH3~1': 'TCF100001',
  GESSDH: 'TBL100001',
  GESSIH: 'TFC100001'
}

/**
 * Return select transaction val by provided orderNO
 * @param {*} orderNO
 * @returns
 */
const getSalesOrderTransaction = (orderNO) => {
  const reg1 = /^[A-Z](CC|DSR|REP|RCL)[\d]{6,7}$/
  const reg2 = /^[A-Z](OL|LC)[\d]{6}$/
  return reg1.test(orderNO) ? '2~1' : reg2.test(orderNO) ? '2~2' : '2~1'
}

/**
 * Return select transaction val by provided invoiceNO
 * @param {*} invoiceNO
 * @returns
 */
const getInvoiceTransaction = (invoiceNO) => {
  const reg1 = /[A-Z]FC.*/
  const reg2 = /[A-Z]PC.*/
  return reg1.test(invoiceNO) ? '3~2' : reg2.test(invoiceNO) ? '3~3' : '3~2'
}

/**
 * After call it, call getSageReportUrl also
 *
 * If success, localStorage will set 'printUUID'
 *
 * @param {*} url
 * @returns printUUID
 */
const getSagePrintUUID = async (url) => {
  // send the print action
  const sagePrintUUID = await axios
    .put(`${url}/requestSvc?act=${ACT.GET_PRINT_URL}&trackngId=${uuidv4()}`, actData(ACT.GET_PRINT_URL))
    .then(
      (response) => {
        // message means error
        if (response.data.sap.target.type === 'box') {
          notifyError(response.data.sap.target.box.li)
          return false
        }

        // success
        if (response.data.sap && response.data.sap.jobs && response.data.sap.jobs.report) {
          const uuid = response.data.sap.jobs.report.submitted[0].uuid // here need
          localStorage.setItem('printUUID', uuid)
          return uuid // here need
        }
        // default false
        return false
      },
      (error) => {
        console.log(error)
        return false
      }
    )
  return sagePrintUUID
}

/**
 * Before call it, get 'printUUID' from getSagePrintUUID return or set it to localStorage
 * @param {*} printUUID
 * @param {*} cbk [Option] callback function (cnt)
 * @returns
 */
const getSageReportUrl = async (printUUID, cbk) => {
  printUUID = printUUID ? printUUID : localStorage.getItem('printUUID')
  let cnt = 0

  function sleep(millisecond) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, millisecond)
    })
  }

  let status = 202
  do {
    await sleep(100)
    cnt++
    if (typeof cbk === 'function') {
      cbk(cnt)
    }

    status = await axios.get(`/print/srvedi01.dedaero.lan:1890/$getState('${printUUID}')`).then(
      (response) => response.status,
      (error) => {
        console.log(error)
        return 500
      }
    )
  } while (status === 202) // 202 creating, 201 created

  if (status === 201) {
    const sageReportUrl = await axios.get(`/print/srvedi01.dedaero.lan:1890/$getReport('${printUUID}')`).then(
      (response) => response.headers.location,
      (error) => {
        console.log(error)
        return '/#/Exception/500'
      }
    )
    return sageReportUrl
  } else {
    return '/#/Exception/500'
  }
}

/**
 * Going to print page, if need choose report, please provide it.
 * @param {*} url
 * @param {*} transPage
 * @param {*} xid
 * @param {*} val
 * @param {*} rpt
 * @returns
 */
const doActPrint = async (url, transPage, xid, val, rpt) => {
  // enter print page
  let rtn = await doAct(url, transPage, setData(ACT.ENTER_PRINT_PAGE, tgt('B', xid, 0), val))
  if (!rtn) return false

  // if provide rpt, select report
  if (rpt) {
    rtn = await doAct(url, transPage, selData(ACT.SELECT_LIST, tgt('C', 'bA', 0), rpt))
    if (!rtn) return false
  }

  // print report
  rtn = await getSagePrintUUID(url)
  if (!rtn) return false

  return true
}

/**
 * Go to other record, let system doesn't lock current record.
 *
 * ***Important, call it after every operate***
 *
 * @param {*} url
 * @param {*} transPage
 * @param {*} xid
 * @param {*} val
 */
const doActGo = async (url, transPage, xid, val) => {
  return await doAct(url, transPage, setData(ACT.INPUT_ENTER, tgt('B', xid, 0), val))
}

/**
 * Call an batch actions for print an report
 * @param {*} url
 * @param {*} rpt
 * @param {*} val
 * @param {*} val2
 * @returns
 */
const doActsForSagePrint = async (url, rpt, val, val2) => {
  switch (rpt) {
    case 'SA': {
      const transPage = 'GESSOH' + getSalesOrderTransaction(val)

      let rtn = await doActPrint(url, transPage, 'AA5', val)
      // call it, let system do not lock record
      await doActGo(url, transPage, 'AA5', transPageDefaultVal[transPage])

      return rtn
    }
    case 'Delivery': {
      const transPage = 'GESSDH'

      let rtn = await doActPrint(url, 'GESSDH', 'AA6', val, '7~1:BONLIV!1')
      // call it, let system do not lock record
      await doActGo(url, transPage, 'AA6', transPageDefaultVal[transPage])

      return rtn
    }
    case 'Invoice': {
      const transPage = 'GESSIH' + getInvoiceTransaction(val)

      let rtn = await doActPrint(url, transPage, 'AA6', val)
      // call it, let system do not lock record
      await doActGo(url, transPage, 'AA6', transPageDefaultVal[transPage])

      return rtn
    }

    case 'PurchaseOrder': {
      const transPage = 'GESPOH' + '3~1'
      // select nor purchase order
      // select report code true= tax include
      const select = val2 ? '7~1:BONTTC2!1' : '7~1:BONCDE2!1'

      let rtn = await doActPrint(url, transPage, 'AA5', val, select)
      // call it, let system do not lock record
      await doActGo(url, transPage, 'AA5', transPageDefaultVal[transPage])

      return rtn
    }
    default:
      return false
  }
}

/**
 * Modify Sage value
 * @param {*} transPage
 * @param {*} mainTgt
 * @param {*} mainVal
 * @param {*} modLine
 * @param {*} modTgt
 * @param {*} modifyVal
 * @returns
 */
const updateSageField = async (transPage, mainTgt, mainVal, modLine, modTgt, modifyVal) => {
  const url = await getSageSessionUrl(transPage)
  let rtn = false

  // input target, here must await,
  // ***DO NOT DELETE***
  // be confirmed, without it, the first call will be failed.
  rtn = await doActGo(url, transPage, mainTgt, mainVal)
  if (!rtn) return false

  // edit mode
  if (modLine == 0) {
    rtn = await doAct(url, transPage, sSData(ACT.REVISE_MAIN, tgt('B', mainTgt, 0), mainVal, tgt('B', modTgt, modLine)))
  } else {
    rtn = await doAct(url, transPage, sSData(ACT.REVISE_SUB, tgt('B', mainTgt, 0), mainVal, tgt('B', modTgt, modLine)))
  }

  if (!rtn) {
    // here could not await, make response time less to user
    doActGo(url, transPage, mainTgt, transPageDefaultVal[transPage])
    return false
  }

  // Prod ENV need choose revise or not, here always choose no revise
  if (srvEnv === 'EXPLOIT') {
    rtn = await doAct(url, transPage, noRevise)
    if (!rtn) {
      // here could not await, make response time less to user
      doActGo(url, transPage, mainTgt, transPageDefaultVal[transPage])
      return false
    }
  }

  // modify and save
  rtn = await doAct(url, transPage, setData(ACT.SAVE, tgt('B', modTgt, modLine), modifyVal))
  if (!rtn) {
    // here could not await, make response time less to user
    doActGo(url, transPage, mainTgt, transPageDefaultVal[transPage])
    return false
  }

  // go to the default record, let system do not lock record
  // here could not await, make response time less to user
  doActGo(url, transPage, mainTgt, transPageDefaultVal[transPage])

  return true
}

/**
 * Set SAD ready status
 * @param {*} orderno
 * @param {*} line
 * @param {*} ready
 * @returns
 */
const updateSageSADReady = async (orderno, line, ready) => {
  const transPage = 'GESSOH' + getSalesOrderTransaction(orderno)
  return await updateSageField(transPage, 'AA5', orderno, line, 'EA51', parseInt(ready))
}

/**
 * Set delivery ready status
 * @param {*} orderno
 * @param {*} line
 * @param {*} ready
 * @returns
 */
const updateSageDeliveryReady = async (orderno, line, ready) => {
  const transPage = 'GESSOH' + getSalesOrderTransaction(orderno)
  return await updateSageField(transPage, 'AA5', orderno, line, 'EA52', parseInt(ready))
}

/**
 * Set QC check pass status
 * @param {*} orderno
 * @param {*} line
 * @param {*} ready
 * @returns
 */
const updateSageProductReady = async (orderno, line, ready) => {
  const transPage = 'GESSOH' + getSalesOrderTransaction(orderno)
  return await updateSageField(transPage, 'AA5', orderno, line, 'EA54', parseInt(ready))
}

/**
 * Update planed delivey date for order line
 * @param {*} orderno
 * @param {*} line
 * @param {*} planDate
 * @returns
 */
const updateSageDeliveryPlanDate = async (orderno, line, planDate) => {
  const transPage = 'GESSOH' + getSalesOrderTransaction(orderno)
  const fmtStr = date.formatDate(planDate, 'YYYYMMDD')
  return await updateSageField(transPage, 'AA5', orderno, line, 'EA29', fmtStr)
}

/**
 * Update Ack date by purchase order line
 * @param {*} orderno
 * @param {*} line
 * @param {*} ackDate
 * @returns
 */
const updateSagePurchaseAckDate = async (orderno, line, ackDate) => {
  const transPage = 'GESPOH' + '3~1'
  const fmtStr = date.formatDate(ackDate, 'YYYYMMDD')
  return await updateSageField(transPage, 'AA5', orderno, line, 'CA66', fmtStr)
}

export {
  getSageSessionUrl,
  getSalesOrderTransaction,
  getInvoiceTransaction,
  doActsForSagePrint,
  getSageReportUrl,
  updateSageSADReady,
  updateSageProductReady,
  updateSageDeliveryReady,
  updateSageDeliveryPlanDate,
  updateSagePurchaseAckDate
}
