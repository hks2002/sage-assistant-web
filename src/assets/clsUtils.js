/***
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-07-14 15:05:31
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-07-14 15:05:31
 * @FilePath       : \web2\src\components\todo\Utils.js
 * @CopyRight      : Dedienne Aerospace China ZhuHai
 */
const mergeBg = (cls, newBg) => {
  return cls.replace(/bg\S*/, newBg)
}

const mergeCls = (cls, newCls) => {
  return cls + ' ' + newCls
}

const targetCondCls = (defaultCls, condCls, condTarget, condValue) => {
  return condTarget === condValue ? condCls : defaultCls
}

const level3CondCls = (l0Cls, l1Cls, l2Cls, l0Cond, l1Cond, l2Cond) => {
  return l0Cond ? l0Cls : l1Cond ? l1Cls : l2Cond ? l2Cls : ''
}

const condCls = (defaultCls, condCls, cond) => {
  return cond ? condCls : defaultCls
}
export { mergeBg, mergeCls, targetCondCls, condCls, level3CondCls }
