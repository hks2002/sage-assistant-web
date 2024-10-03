/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-11-29 19:34:47                               *
 * @FilePath              : sage-assistant-web/src/router/routes.js           *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

const routes = [
  {
    path: '/',
    name: 'DefaultLayout',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      {
        path: 'Exception/:ErrorCode',
        name: 'Exception',
        component: () => import('pages/ExceptionPage.vue'),
        props: (route) => {
          if (
            route.params.ErrorCode !== '403' &&
            route.params.ErrorCode !== '404' &&
            route.params.ErrorCode !== '500'
          ) {
            return { ErrorCode: '500' }
          } else {
            return { ErrorCode: route.params.ErrorCode }
          }
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('layouts/DefaultLayout.vue'),
    redirect: '/Exception/404'
  }
]

export default routes
