/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-12-30 13:39:23                               *
 * @FilePath              : sage-assistant-web/src/router/index.js            *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { usePageStore } from '@/stores/PageStore'
import { SessionStorage } from 'quasar'
import { route } from 'quasar/wrappers'
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import routes from './routes'

// add layout route
let mainLayoutRoute = {
  path: '/',
  name: 'MainLayout',
  component: () => import('layouts/MainLayout.vue'),
  children: []
}
let defaultLayoutRoute = {
  path: '/',
  name: 'DefaultLayout',
  component: () => import('layouts/DefaultLayout.vue'),
  children: []
}

// auto add page routes
const pages = require.context('@/pages', false, /.vue$/)
pages.keys().forEach((key) => {
  // remove "./" and "Page.vue"
  const page = key.slice(2, -8)
  if (page === 'Exception') {
    return
  }

  if (page === 'Login' || page === 'WaitInput') {
    defaultLayoutRoute.children.push({
      path: page,
      name: page,
      component: () => import(`pages/${page}Page.vue`)
    })
  } else {
    mainLayoutRoute.children.push({
      path: page,
      name: page,
      component: () => import(`pages/${page}Page.vue`)
    })
  }

  console.debug('\u001b[35m' + '[Route] ', 'adding', page)
})

// add layout routes to routes
routes.push(mainLayoutRoute)
routes.push(defaultLayoutRoute)
console.debug('\u001b[35m' + '[Route] ', routes)
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

  const pagesStore = usePageStore()

  Router.beforeEach(async (to, from, next) => {
    let token = SessionStorage.getItem('authorization')

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
        const queryStr = Object.keys(query).length > 0 ? JSON.stringify(query) : ''
        const paramsStr = Object.keys(params).length > 0 ? JSON.stringify(params) : ''

        const id = name + queryStr + paramsStr
        console.debug('\u001b[35m' + '[Router]', id)

        if (!pagesStore.hasPage(id)) {
          pagesStore.addPage({
            id: id,
            name: name,
            query: query,
            params: params
          })
        } else {
          pagesStore.setActivePage(id)
        }
      }

      // default, alway pass it
      next()
    }
  })

  return Router
})
