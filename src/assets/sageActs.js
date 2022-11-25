/***
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-06-25 19:52:49
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-11-18 00:07:15
 * @FilePath       : \web2\src\assets\sageActs.js
 * @CopyRight      : Dedienne Aerospace China ZhuHai
 */
import { axios } from '@/assets/axios'
import { notifyError, notifyInfo, notifySuccess } from '@/assets/common'
import { SessionStorage } from 'quasar'
import { v4 as uuidv4 } from 'uuid'

// Some action codes
const ACT = {
  // select
  SELECT_LIST_1052: 1052,
  // search
  SEARCH_782: 782,
  // print
  ENTER_PRINT_PAGE_2820: 2820,
  PRINT_2125: 2125,
  // edit
  REVISE_MAIN_1044: 1044,
  JUMP_TO_774: 774,
  INPUT_ENTER_1028: 1028,
  INPUT_TAB_1025: 1025,
  CANCEL_MODIFY_2816: 2816,
  REFRESH_PAGE_2823: 2823,
  EXIT_PAGE_2845: 2845,
  SAVE_1116: 1116
}

/**
 * Construct action target.
 * @param {string} win 'B','C' ...
 * @param {string} xid 'AA1','AA2' ...
 * @param {number} nl 1,2,3 ...
 * @returns
 */
const tgt = (win, xid, nl) => {
  return { win: win, xid: xid, nl: nl }
}

/**
 * when change specific field
 * @param {object} setTgt
 * @param {string} val
 * @returns
 */
const fld = (setTgt, val) => {
  const fld = {
    ist: setTgt,
    fmtKind: 'EDIT',
    ctx: {},
    notModified: false,
    v: val
  }
  return fld
}

/**
 * when do select or go to some field
 * @param {number} act
 * @param {object} selectTgt
 * @param {object} sel
 * @returns
 */
const param = (act, selectTgt, sel) => {
  // ACT.SELECT_LIST 1052, std: ["2~2"] without input
  // ACT.SEARCH 782, sudo: [["v1","v2"],null]
  let param = {}
  if (act === ACT.SELECT_LIST_1052) {
    param = {
      target: selectTgt,
      std: [sel]
    }
  } else if (act === ACT.SEARCH_782) {
    param = {
      target: selectTgt,
      sudo: [[sel], null]
    }
  } else {
    param = {
      target: selectTgt
    }
  }

  return param
}

/**
 * Only for act, such as click some button
 * If want to change/select before this action, consider use setData/selData
 *
 * @param {number} act
 * @returns
 */
const aData = (act) => {
  // must have tech:{}
  let data = {
    act: act,
    tech: {}
  }
  return data
}

/**
 * Set target data, then do action
 * @param {object} setTgt
 * @param {string} val
 * @param {number} act
 * @returns
 */
const staData = (setTgt, val, act) => {
  // must have tech:{}
  let data = {
    act: act,
    tech: {}
  }
  data.fld = fld(setTgt, val)

  return data
}

/**
 * select target then do action, if want to change value, use setData
 * @param {object} selectTgt
 * @param {string} sel
 * @param {number} act
 * @returns
 */
const slaData = (selectTgt, sel, act) => {
  // must have tech:{}
  let data = {
    act: act,
    tech: {}
  }
  data.param = param(act, selectTgt, sel)

  return data
}

/**
 * val for set value, sel for select options
 * combine set and next select field
 * @param {object} setTgt {win:'B', xid:'col code', nl: line} *
 * @param {string} val
 * @param {object} selectTgt {win:'B', xid:'col code', nl: line}
 * @param {string} sel "2~2"
 * @param {number} act
 * @returns
 */
const ssaData = (setTgt, val, selectTgt, sel, act) => {
  let data = {
    act: act,
    tech: {}
  }
  data.fld = fld(setTgt, val)
  data.param = param(act, selectTgt, sel)

  return data
}

const noRevise = {
  act: ACT.INPUT_TAB_1025,
  fld: { ist: null, fmtKind: 'SHOW', notModified: false, v: 3 },
  param: {},
  tech: {}
}

const warningClickOKData = {
  act: ACT.INPUT_TAB_1025,
  fld: { ist: null, fmtKind: 'SHOW', notModified: false, v: 5 },
  param: {},
  tech: {}
}

/**
 * Sage action template
 * @param {string} url
 * @param {string} transPage
 * @param {object} data
 * @param {string} preTrackngId
 * @returns
 */
const doAct = (url, transPage, data, preTrackngId) => {
  // check if url is false
  if (!url) return Promise.reject()

  const trackngId = preTrackngId || uuidv4()
  return axios
    .put(`${url}/requestSvc?act=${data.act}&trackngId=${trackngId}`, data)
    .then(
      async (response) => {
        // If server return pop message, type 1 is warning
        if (
          response.status === 200 &&
          response.data.sap &&
          response.data.sap.target &&
          response.data.sap.target.type === 'box' &&
          response.data.sap.target.box.type === 1
        ) {
          //notifyInfo(response.data.sap.target.box.tit + '<br/>' + response.data.sap.target.box.li)
          return Promise.resolve()
        }

        // If server return pop message, type 2 is let you make an choice
        if (
          response.status === 200 &&
          response.data.sap &&
          response.data.sap.target &&
          response.data.sap.target.type === 'box' &&
          response.data.sap.target.box.type === 2
        ) {
          return Promise.resolve()
        }

        // If server return pop message, type 3 is error
        if (
          response.status === 200 &&
          response.data.sap &&
          response.data.sap.target &&
          response.data.sap.target.type === 'box' &&
          response.data.sap.target.box.type === 3
        ) {
          notifyError(response.data.sap.target.box.tit + '<br/>' + response.data.sap.target.box.li)
          return Promise.reject()
        }

        // If response times greater than 4000
        if (
          response.status === 202 &&
          response.data &&
          response.data.phase === 'Tracking' &&
          response.data.elapsedSeconds > 4000
        ) {
          notifyInfo('Server performance low')
          //return await doAct(url, transPage, data, trackngId)
          return Promise.reject()
        }

        // having session close message
        if (
          response.status === 202 &&
          response.data.phase &&
          response.data.phase === 'Tracking' &&
          response.data.reply.session.close.$diagnoses[0].message
        ) {
          SessionStorage.remove(transPage)
          notifyError(response.data.reply.session.close.$diagnoses[0].message)
          return Promise.reject()
        }

        // no authority will case this
        if (
          response.status === 200 &&
          response.data.sap &&
          response.data.sap.target &&
          response.data.sap.target.type === 'portal'
        ) {
          SessionStorage.remove(transPage)
          return Promise.reject()
        }

        // if have success notify
        if (
          response.status === 200 &&
          response.data.sap.wins &&
          response.data.sap.wins.B.statBar &&
          response.data.sap.wins.B.statBar.notify
        ) {
          notifySuccess(response.data.sap.wins.B.statBar.notify[0].$message)
        }

        // return the response
        if (response.status === 200 && response.data.sap) {
          return Promise.resolve(response)
        }
      },
      (error) => {
        // for example 404 page, session not found
        console.log(error)
        SessionStorage.remove(transPage)
        return Promise.reject()
      }
    )
    .catch((error) => {
      if (error) {
        console.log(error)
        SessionStorage.remove(transPage)
      }
      return Promise.reject()
    })
}

export { ACT, noRevise, warningClickOKData, tgt, aData, doAct, ssaData, staData, slaData }
