/***
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-05-30 22:22:41
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-11-18 09:28:07
 * @FilePath       : \web2\src\assets\sageSvcs.js
 * @CopyRight      : Dedienne Aerospace China ZhuHa
 */
import { doReLogin } from '@/assets/auth'
import { axios } from '@/assets/axios'
import { notifyError } from '@/assets/common'
import { sleep } from '@/assets/run'
import { ACT, aData, doAct, noRevise, slaData, ssaData, staData, tgt } from '@/assets/sageActs'
import { date, SessionStorage } from 'quasar'
import { v4 as uuidv4 } from 'uuid'
const srvEnv = process.env.DEV ? 'EXPLOIT' : 'EXPLOIT'

const transPageDefaultVal = {
  'GESSOH2~1': 'TCC100008',
  'GESSOH2~2': 'TLC110001',
  'GESPOH3~1': 'TCF100001',
  GESSDH: 'TBL100001',
  'GESSIH2~2': 'TFC100001',
  'GESSIH2~3': 'TPC100006'
}

/**
 * Every action needs get session first.
 *
 * @param {*} transPage  fun: AIMP, GESSOH, GESPOH trans:'2~1, 2~1' ......
 * @param {*} preSessionRequestUrl for tracking 202 and send request once more
 * @returns session url
 */
const getSageSessionUrl = (transPage, preSessionRequestUrl) => {
  // reuse last session url
  let urlWithTimeStamp = SessionStorage.getItem(transPage)

  if (urlWithTimeStamp) {
    const url = urlWithTimeStamp.split('?')[0]
    const timeStr = urlWithTimeStamp.split('?')[1]

    if (!timeStr) {
      SessionStorage.remove(transPage)
    } else {
      const lastTime = new Date(timeStr)
      const nowTime = new Date()
      const diff = date.getDateDiff(nowTime, lastTime, 'minutes')
      // if diff > 5 minutes get new session url
      if (diff < 5) {
        return Promise.resolve(url)
      } else {
        deleteSageSessionUrl(url)
      }
    }
  }

  const fnc = transPage.substring(0, 6)
  const trans = transPage.substring(6)

  const sessionRequestUrl =
    preSessionRequestUrl || `/trans/x3/erp/${srvEnv}/$sessions?f=${fnc}/2//M&trackngId=${uuidv4()}`

  return axios
    .post(sessionRequestUrl, { settings: {} })
    .then(
      async (response) => {
        // Sage set function session url at headers.location
        // Having  headers.location means success
        if (response.status === 200 && response.headers.location) {
          const url = response.headers.location
          const timeStamp = new Date()
          const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')

          // if provide transaction
          if (trans) {
            return doAct(url, transPage, slaData(tgt('B', 'bA', 0), trans, ACT.SELECT_LIST_1052)).then(
              () => {
                console.debug('transaction:', url)
                SessionStorage.set(transPage, url + '?' + formattedString)
                return Promise.resolve(url)
              },
              () => {
                return Promise.reject()
              }
            )
          } else {
            console.debug('transaction:', url)
            SessionStorage.set(transPage, url + '?' + formattedString)
            return Promise.resolve(url)
          }
        }

        // If server return pop message, always return false
        if (response.status === 200 && response.data.sap && response.data.sap.target.type === 'box') {
          notifyError(response.data.sap.target.box.li)
          return Promise.reject()
        }
        // If response times greater than 4000
        if (
          response.status === 202 &&
          response.data &&
          response.data.phase === 'Tracking' &&
          response.data.elapsedSeconds > 4000
        ) {
          console.warn('Server performance low')
          return getSageSessionUrl(transPage, sessionRequestUrl)
        }

        // If return data is not application/json, means false, mostly is login page
        if (response.status === 200 && response.headers['content-type'] !== 'application/json') {
          const rtn = await doReLogin()
          if (rtn) return getSageSessionUrl(transPage)
        }
      },
      (error) => {
        console.log(error)
        return Promise.reject()
      }
    )
    .catch((error) => {
      if (error) console.log(error)
      return Promise.reject()
    })
}

const deleteSageSessionUrl = (session, transPage) => {
  return axios.delete(session + '?reuse=true').then((response) => {
    SessionStorage.remove(transPage)
    console.debug('delete session:', response)
  })
}
/**
 * Return select transaction val by provided orderNO
 *
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
  return reg1.test(invoiceNO) ? '2~2' : reg2.test(invoiceNO) ? '2~3' : '2~2'
}

/**
 * Return select transaction val by provided purchaseOrder
 * @param {*} purchaseOrder
 * @returns
 */
const getPurchaseTransaction = () => {
  return '3~1'
}

/**
 * Get report url by printUUID
 * @param {*} printUUID
 * @param {*} cbk [Option] callback function (cnt)
 * @returns
 */
const getSageReportUrl = async (printUUID, cbk) => {
  if (!printUUID) {
    return '/#/Exception/500'
  }

  let cnt = 0

  let status = 202
  do {
    await sleep(300)
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
 * @param {string} url
 * @param {string} trans
 * @param {string} xid
 * @param {*} val
 * @param {string} rpt
 * @returns
 */
const doActPrint = async (url, trans, xid, val, rpt) => {
  // change recorder then enter print page
  return doAct(url, trans, staData(tgt('B', xid, 0), val, ACT.INPUT_TAB_1025)).then(
    () => {
      return doAct(url, trans, aData(ACT.ENTER_PRINT_PAGE_2820)).then(
        () => {
          if (rpt) {
            // if let you choose rpt
            return doAct(url, trans, slaData(tgt('C', 'bA', 0), rpt, ACT.SELECT_LIST_1052)).then(
              () => {
                // send click print button
                return doAct(url, trans, aData(ACT.PRINT_2125)).then(
                  (response) => {
                    return response.data.sap.jobs.report.submitted[0].uuid
                  },
                  () => {
                    return false // if go to print failed
                  }
                )
              },
              () => {
                return false // if choose failed
              }
            )
          }
          // send click print button
          return doAct(url, trans, aData(ACT.PRINT_2125)).then(
            (response) => {
              return response.data.sap.jobs.report.submitted[0].uuid
            },
            () => {
              return false // if go to print failed
            }
          )
        },
        () => {
          return false // if go to print page failed
        }
      )
    },
    () => {
      return false // if go to recorder failed
    }
  )
}

/**
 * Call an batch actions for print an report
 * @param {*} url sage session url
 * @param {*} rpt
 * @param {*} val
 * @param {*} val2
 * @returns printUUID
 */
const doActsForSagePrint = (url, trans, rpt, val, val2) => {
  switch (rpt) {
    case 'SA': {
      return doActPrint(url, trans, 'AA5', val)
    }
    case 'Delivery': {
      return doActPrint(url, trans, 'AA6', val, '7~1:BONLIV!1')
    }
    case 'Invoice': {
      return doActPrint(url, trans, 'AA5', val)
    }

    case 'PurchaseOrder': {
      //const transPage = 'GESPOH' + '3~1'
      // select nor purchase order
      // select report code true= tax include
      const select = val2 ? '7~1:BONTTC2!1' : '7~1:BONCDE2!1'
      return doActPrint(url, trans, 'AA5', val, select)
    }
    default:
      return Promise.reject()
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

  // ***DO NOT DELETE***
  // Without it, the first call will be failed.
  // input target, here must await,
  rtn = await doAct.INPUT_ENTER(url, transPage, mainTgt, mainVal)
  if (!rtn) return false

  // edit mode
  if (modLine == 0) {
    rtn = await doAct(
      url,
      transPage,
      ssaData(ACT.REVISE_MAIN_1044, tgt('B', mainTgt, 0), mainVal, tgt('B', modTgt, modLine))
    )
  } else {
    rtn = await doAct(url, transPage, ssaData(ACT.REVISE_SUB, tgt('B', mainTgt, 0), mainVal, tgt('B', modTgt, modLine)))
  }

  // If someone else opened target, edit mode will return false.
  if (!rtn) {
    // here could not await, make response time less to user
    doAct.INPUT_ENTER(url, transPage, mainTgt, transPageDefaultVal[transPage])
    return false
  }

  // Prod ENV need choose revise or not, here always choose no revise
  if (srvEnv === 'EXPLOIT') {
    rtn = await doAct(url, transPage, noRevise)
    if (!rtn) {
      // here could not await, make response time less to user
      doAct.INPUT_ENTER(url, transPage, mainTgt, transPageDefaultVal[transPage])
      return false
    }
  }

  // modify and save
  rtn = await doAct(url, transPage, staData(tgt('B', modTgt, modLine), modifyVal, ACT.SAVE_1116))
  if (!rtn) {
    // here could not await, make response time less to user
    doAct.INPUT_ENTER(url, transPage, mainTgt, transPageDefaultVal[transPage])
    return false
  }

  // go to the default record, let system do not lock record
  // here could not await, make response time less to user
  doAct.INPUT_ENTER(url, transPage, mainTgt, transPageDefaultVal[transPage])

  return true
}

/**
 * Set SAD ready status
 * @param {*} orderNO
 * @param {*} line
 * @param {*} ready
 * @returns
 */
const updateSageSADReady = async (orderNO, line, ready) => {
  const transPage = 'GESSOH' + getSalesOrderTransaction(orderNO)
  return await updateSageField(transPage, 'AA5', orderNO, line, 'EA51', parseInt(ready))
}

/**
 * Set delivery ready status
 * @param {*} orderNO
 * @param {*} line
 * @param {*} ready
 * @returns
 */
const updateSageDeliveryReady = async (orderNO, line, ready) => {
  const transPage = 'GESSOH' + getSalesOrderTransaction(orderNO)
  return await updateSageField(transPage, 'AA5', orderNO, line, 'EA52', parseInt(ready))
}

/**
 * Set QC check pass status
 * @param {*} orderNO
 * @param {*} line
 * @param {*} ready
 * @returns
 */
const updateSageProductReady = async (orderNO, line, ready) => {
  const transPage = 'GESSOH' + getSalesOrderTransaction(orderNO)
  return await updateSageField(transPage, 'AA5', orderNO, line, 'EA54', parseInt(ready))
}

/**
 * Set project status
 * @param {*} orderNO
 * @param {*} line
 * @param {*} status
 * @returns
 */
const updateSageProjectStatus = async (orderNO, line, status) => {
  const transPage = 'GESSOH' + getSalesOrderTransaction(orderNO)
  return await updateSageField(transPage, 'AA5', orderNO, line, 'EA72', parseInt(status))
}
/**
 * Update project block reason
 * @param {*} orderNO
 * @param {*} line
 * @param {*} reason
 * @returns
 */
const updateSageProjectBlockReason = async (orderNO, line, reason) => {
  const transPage = 'GESSOH' + getSalesOrderTransaction(orderNO)
  return await updateSageField(transPage, 'AA5', orderNO, line, 'EA73', parseInt(reason))
}
/**
 * Update project comment
 * @param {*} orderNO
 * @param {*} line
 * @param {*} comment
 * @returns
 */
const updateSageProjectComment = async (orderNO, line, comment) => {
  const transPage = 'GESSOH' + getSalesOrderTransaction(orderNO)
  return await updateSageField(transPage, 'AA5', orderNO, line, 'EA77', comment)
}
/**
 * Update project action
 * @param {*} orderNO
 * @param {*} line
 * @param {*} action
 * @returns
 */
const updateSageProjectAction = async (orderNO, line, action) => {
  const transPage = 'GESSOH' + getSalesOrderTransaction(orderNO)
  return await updateSageField(transPage, 'AA5', orderNO, line, 'EA78', action)
}

/**
 * Update planed delivery date for order line
 * @param {*} orderNO
 * @param {*} line
 * @param {*} planDate
 * @returns
 */
const updateSageDeliveryPlanDate = async (orderNO, line, planDate) => {
  const transPage = 'GESSOH' + getSalesOrderTransaction(orderNO)
  const fmtStr = date.formatDate(planDate, 'YYYYMMDD')
  return await updateSageField(transPage, 'AA5', orderNO, line, 'EA29', fmtStr)
}

/**
 * Update Ack date by purchase order line
 * @param {*} orderNO
 * @param {*} line
 * @param {*} ackDate
 * @returns
 */
const updateSagePurchaseAckDate = async (orderNO, line, ackDate) => {
  const transPage = 'GESPOH' + '3~1'
  const fmtStr = date.formatDate(ackDate, 'YYYYMMDD')
  return await updateSageField(transPage, 'AA5', orderNO, line, 'CA66', fmtStr)
}
/**
 * Update purchase line comment
 * @param {*} orderNO
 * @param {*} line
 * @param {*} comment
 * @returns
 */
const updateSagePurchaseComment = async (orderNO, line, comment) => {
  const transPage = 'GESPOH' + '3~1'
  return await updateSageField(transPage, 'AA5', orderNO, line, 'CA68', comment)
}

export {
  getSageSessionUrl,
  deleteSageSessionUrl,
  getSalesOrderTransaction,
  getInvoiceTransaction,
  getPurchaseTransaction,
  doActsForSagePrint,
  getSageReportUrl,
  updateSageSADReady,
  updateSageProductReady,
  updateSageDeliveryReady,
  updateSageDeliveryPlanDate,
  updateSageProjectStatus,
  updateSageProjectBlockReason,
  updateSageProjectComment,
  updateSageProjectAction,
  updateSagePurchaseAckDate,
  updateSagePurchaseComment
}
