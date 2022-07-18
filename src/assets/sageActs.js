/***
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-06-25 19:52:49
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-06-25 19:52:49
 * @FilePath       : \web2\src\assets\sageActs.js
 * @CopyRight      : Dedienne Aerospace China ZhuHai
 */
import { axios } from '@/assets/axios'
import { notifyError, notifySuccess } from '@/assets/common'
import { SessionStorage } from 'quasar'
import { v4 as uuidv4 } from 'uuid'

// Some action codes
const ACT = {
  // select
  SELECT_LIST: 1052,
  // search
  SEARCH: 782,
  // print
  ENTER_PRINT_PAGE: 2820,
  GET_PRINT_URL: 2125,
  // edit
  REVISE_MAIN: 1044,
  REVISE_SUB: 774,
  INPUT_ENTER: 1028,
  INPUT_TAB: 1025,
  CANCEL_MODIFY: 2816,
  REFRESH_PAGE: 2823,
  EXIT_PAGE: 2845,
  SAVE: 1116
}

/**
 * Construct action target.
 * @param {*} win 'B','C' ...
 * @param {*} xid 'AA1','AA2' ...
 * @param {*} nl 1,2,3 ...
 * @returns
 */
const tgt = (win, xid, nl) => {
  return { win: win, xid: xid, nl: nl }
}

/**
 * when change specific field
 * @param {*} setTgt
 * @param {*} val
 * @returns
 */
const fld = (setTgt, val) => {
  const fld = {
    ist: tgt(setTgt.win, setTgt.xid, setTgt.nl),
    fmtKind: 'EDIT',
    ctx: {},
    notModified: false,
    v: val
  }
  return fld
}

const noRevise = {
  act: ACT.INPUT_TAB,
  fld: { ist: null, fmtKind: 'SHOW', notModified: false, v: 3 },
  param: {},
  tech: {}
}

/**
 * when do select or go to some field
 * @param {*} act
 * @param {*} selectTgt
 * @param {*} sel
 * @returns
 */
const param = (act, selectTgt, sel) => {
  // 1052 std select, std: ["2~2"] without input
  // 782 search filter, sudo: [["v1","v2"],null]
  let param = {}
  if (act === ACT.SELECT_LIST) {
    param = {
      target: tgt(selectTgt.win, selectTgt.xid, selectTgt.nl),
      std: [sel]
    }
  } else if (act === ACT.FILTE_SEARCH) {
    param = {
      target: tgt(selectTgt.win, selectTgt.xid, selectTgt.nl),
      sudo: [[sel], null]
    }
  } else {
    param = {
      target: tgt(selectTgt.win, selectTgt.xid, selectTgt.nl)
    }
  }

  return param
}

/**
 * Only act, no data
 *
 * @param {*} act
 * @returns
 */
const actData = (act) => {
  // must have tech:{}
  let data = {
    act: act,
    tech: {}
  }
  return data
}

/**
 * Only set data
 * @param {*} act
 * @param {*} setTgt
 * @param {*} val
 * @returns
 */
const setData = (act, setTgt, val) => {
  // must have tech:{}
  let data = {
    act: act,
    tech: {}
  }
  data.fld = fld(setTgt, val)

  return data
}

/**
 * Only select data
 * @param {*} act
 * @param {*} selectTgt
 * @param {*} sel
 * @returns
 */
const selData = (act, selectTgt, sel) => {
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
 * @param {*} act
 * @param {*} setTgt {win:'B', xid:'col code', nl: line} *
 * @param {*} val
 * @param {*} selectTgt {win:'B', xid:'col code', nl: line}
 * @param {*} sel "2~2"
 * @returns
 */
const sSData = (act, setTgt, val, selectTgt, sel) => {
  let data = {
    act: act,
    tech: {}
  }
  data.fld = fld(setTgt, val)
  data.param = param(act, selectTgt, sel)

  return data
}

/**
 * Sage action template
 * @param {*} url
 * @param {*} transPage
 * @param {*} data
 * @returns
 */
const doAct = async (url, transPage, data) => {
  // check if url is false
  if (!url) return false

  return axios
    .put(`${url}/requestSvc?act=${data.act}&trackngId=${uuidv4()}`, data)
    .then(
      async (response) => {
        // If server return pop message, type 1,3
        // type 3 is error
        if (
          response.status === 200 &&
          response.data.sap &&
          response.data.sap.target &&
          response.data.sap.target.type === 'box' &&
          (response.data.sap.target.box.type === 1 || response.data.sap.target.box.type === 3)
        ) {
          notifyError(response.data.sap.target.box.tit + '<br/>' + response.data.sap.target.box.li)
          return false
        }
        // If server return pop message, type 1,3
        // type 2 is let you make an choice
        if (
          response.status === 200 &&
          response.data.sap &&
          response.data.sap.target &&
          response.data.sap.target.type === 'box' &&
          response.data.sap.target.box.type === 2
        ) {
          return true
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
          return false
        }

        // no authrity will case this
        if (
          response.status === 200 &&
          response.data.sap &&
          response.data.sap.target &&
          response.data.sap.target.type === 'portal'
        ) {
          SessionStorage.remove(transPage)
          return false
        }

        // if have success nofify
        if (
          response.status === 200 &&
          response.data.sap.wins &&
          response.data.sap.wins.B.statBar &&
          response.data.sap.wins.B.statBar.notify
        ) {
          notifySuccess(response.data.sap.wins.B.statBar.notify[0].$message)
        }

        // result must have sap and sap.target
        if (response.status === 200 && response.data.sap && response.data.sap.target) {
          return true
        } else {
          return false
        }
      },
      (error) => {
        // for example 404 page, session not found
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
}

export { ACT, noRevise, tgt, actData, sSData, setData, selData, doAct }
