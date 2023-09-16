/*********************************************************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                                                            *
 * @CreatedDate           : 2023-06-14 16:00:27                                                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                                                            *
 * @LastEditDate          : 2023-06-14 16:01:53                                                                      *
 * @FilePath              : src/assets/storage.js                                                                    *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                                                          *
 ********************************************************************************************************************/

import { keys, merge } from 'lodash'
import { Cookies, LocalStorage, SessionStorage } from 'quasar'

export const storageKey = {
  loginData: 'loginData',
  token: 'authorization'
}

// Cookies
export function setCookies(key, val) {
  Cookies.set(key, val, { expires: 24 * 3600 })
}

export function getCookies(key) {
  return Cookies.get(key)
}
// Cookies

// SessionStorage
export function setSessionStorage(key, val) {
  SessionStorage.set(key, val)
}

export function getSessionStorage(key) {
  return SessionStorage.getItem(key)
}
// SessionStorage

// SessionStorage loginData
export function setLoginData(val) {
  SessionStorage.set(storageKey.loginData, val)
}

export function getLoginData() {
  return SessionStorage.getItem(storageKey.loginData)
}
// SessionStorage loginData

// SessionStorage token
export function setToken(val) {
  SessionStorage.set(storageKey.token, val)
}

export function getToken() {
  return SessionStorage.getItem(storageKey.token)
}

export function removeToken() {
  SessionStorage.remove(storageKey.token)
}
// SessionStorage token

export function getAll() {
  return merge(LocalStorage.getAll(), Cookies.getAll())
}

export function getAllKeys() {
  return merge(LocalStorage.getAllKeys(), keys(Cookies.getAll()))
}

export default {
  storageKey,
  setCookies,
  getCookies,
  getLoginData,
  setLoginData,
  getToken,
  setToken,
  removeToken,
  setSessionStorage,
  getSessionStorage,
  getAll,
  getAllKeys
}
