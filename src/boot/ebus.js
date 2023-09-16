/*********************************************************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                                                            *
 * @CreatedDate           : 2023-06-17 22:01:32                                                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                                                            *
 * @LastEditDate          : 2023-08-29 13:45:21                                                                      *
 * @FilePath              : sage-assistant-web/src/boot/ebus.js                                                      *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                                                          *
 ********************************************************************************************************************/

import { EventBus } from 'quasar'
import { boot } from 'quasar/wrappers'

console.debug('\u001b[35m' + '[Load] ', 'Ebus')
const ebus = new EventBus()

export default boot(({ app }) => {
  app.provide('ebus', ebus)
  // for Composition API
  // inside setup()
  // import { inject } from 'vue'
  // const ebus = inject('ebus')
})
// export it, so that it could be used outside of a Vue file
export { ebus }
