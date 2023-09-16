/*********************************************************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                                                            *
 * @CreatedDate           : 2022-03-25 11:01:00                                                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                                                            *
 * @LastEditDate          : 2023-08-19 17:38:53                                                                      *
 * @FilePath              : sage-assistant-web/src/router/index.js                                                   *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                                                          *
 ********************************************************************************************************************/

import { getToken } from '@/assets/storage'
import { usePagesStore } from '@/stores/pageManager'
import { route } from 'quasar/wrappers'
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import routes from './routes'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history' /* ❗️ Leave this as is ❗️  */
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  const pagesStore = usePagesStore()

  Router.beforeEach(async (to, from, next) => {
    let token = getToken()

    // always allow goto Login/WaitInput/Exception page
    if (to.path === '/Login' || to.path === '/WaitInput' || to.path.startsWith('/Exception')) {
      next()
    }
    // no token, goto login page
    else if (!token) {
      next({ path: '/Login' })
    } else {
      // skip some pages for pagesManage, only routes urls in SPA, not include other page's in server
      // forward, backward doesn't have name, get name from matched array
      const idx = to.matched.findIndex((r) => r.name === to.name)
      if (idx >= 0) {
        const name = to.matched[idx].name || to.matched[0].name
        const query = to.query
        const params = to.params
        const queryStr = JSON.stringify(query).slice(1, -1)
        const paramsStr = JSON.stringify(params).slice(1, -1)
        const nameWithParams = name + queryStr + paramsStr

        if (!pagesStore.hasPage(nameWithParams)) {
          pagesStore.addPage({
            id: nameWithParams,
            name: name,
            query: query,
            params: params
          })
        }
      }

      // default, alway pass it
      next()
    }
  })

  return Router
})
