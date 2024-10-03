/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-11-29 19:09:27                               *
 * @FilePath              : sage-assistant-web/src/boot/i18n.js               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { usePageStore } from '@/stores/PageStore'
import { storeToRefs } from 'pinia'
import { Quasar } from 'quasar'
import { boot } from 'quasar/wrappers'
import { watch } from 'vue'
import { createI18n } from 'vue-i18n'

/**
 * using it in scripts of Vue file:
 *
   import { useI18n } from 'vue-i18n'
   const { t } = useI18n()
 */

/**
 * using it outside of a Vue file:
 *
   import { i18n } from '@/boot/i18n'
   const { t } = i18n.global
 */

/**
   *  ❗️❗️❗️ Dynamic update i18n json data
   *  
   watch(useI18n().locale, () => {
     loadColumns()
   })
   */

const i18n = createI18n({
  legacy: false,
  missingWarn: true,
  fallbackWarn: false,
  fallbackLocale: 'en-US',
  messages: {
    'en-US': {
      Home: 'Home'
    }
  }
})

// export i18n
export { i18n }

const loadLanguage = (langIso) => {
  console.debug('\u001b[35m' + '[i18n] ', langIso)
  // Set Quasar lang pack
  Promise.resolve(require(`quasar/lang/${langIso}.js`)).then((lang) => {
    Quasar.lang.set(lang.default)
  })

  // Set app i18n lang
  Promise.resolve(require(`@/i18n/${langIso}.json`)).then((messages) => {
    // set locale and locale message
    i18n.global.locale.value = langIso
    i18n.global.setLocaleMessage(langIso, messages)
  })
}

const $pageStore = usePageStore()
const { language } = storeToRefs($pageStore)
watch(language, (langIso) => {
  loadLanguage(langIso)
})

/* wrap by boot helper to get better IDE auto-completion */
export default boot(({ app } /* { app, router, ... } */) => {
  const langIso = $pageStore.language || 'en-US'

  loadLanguage(langIso)
  // Set i18n instance on app
  app.use(i18n)
})
