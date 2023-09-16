/*********************************************************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                                                            *
 * @CreatedDate           : 2023-08-12 16:14:56                                                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                                                            *
 * @LastEditDate          : 2023-08-27 22:19:54                                                                      *
 * @FilePath              : sage-assistant-web/src/boot/quasar.js                                                    *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                                                          *
 ********************************************************************************************************************/

// import 'default-passive-events'
// set default for quasar
import { Loading, Notify, QSpinnerBars } from 'quasar'
Loading.setDefaults({ spinner: QSpinnerBars, spinnerSize: 40 })

Notify.setDefaults({ position: 'top', textColor: 'white', html: true })
Notify.registerType('success', {
  icon: 'fas fa-check-square',
  color: 'success'
})
Notify.registerType('fail', {
  icon: 'fas fa-exclamation-circle',
  color: 'yellow'
})
Notify.registerType('error', {
  icon: 'fas fa-exclamation-triangle',
  color: 'red'
})
Notify.registerType('warn', {
  icon: 'fas fa-exclamation-circle',
  color: 'error'
})
Notify.registerType('info', {
  icon: 'fas fa-exclamation-square',
  color: 'info'
})
Notify.registerType('ongoing', {
  icon: 'fas fa-spinner',
  color: 'grey-8'
})
