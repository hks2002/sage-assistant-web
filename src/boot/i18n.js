/*********************************************************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                                                            *
 * @CreatedDate           : 2022-03-25 11:01:00                                                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                                                            *
 * @LastEditDate          : 2023-08-14 13:59:27                                                                      *
 * @FilePath              : sage-assistant-web/src/boot/i18n.js                                                      *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                                                          *
 ********************************************************************************************************************/

/**
 * Use i18n outside of a Vue file:
 *
 * import { i18n } from '/src/assets/i18n'
 * const { t } = i18n.global
 * t ('Sample Text')
 *
 *
 * Use i18n inside of a Vue file in template:
 *
 * {{ $t ('Sample Text') }}
 *
 *
 * Use i18n inside of a vue file in script:
 *
 * import { useI18n } from 'vue-i18n'
 * const { t } = useI18n()
 * t ('Sample Text')
 */
import { ebus } from '@/boot/ebus'
import { Cookies, Quasar } from 'quasar'
import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  missingWarn: true,
  fallbackWarn: false,
  legacy: false,
  fallbackLocale: 'en-US',
  messages: {
    'en-US': {
      Home: 'Home'
    }
  }
})

const loadLanguage = (langIso) => {
  // Set Quasar lang pack
  Promise.resolve(require(`quasar/lang/${langIso}.js`))
    .then((lang) => {
      Quasar.lang.set(lang)
      Cookies.set('locale', lang.isoName, {
        path: '/',
        expires: '7d'
      })
    })
    .catch((err) => {
      // let's not break the app, so catching error
      console.debug(err)
    })

  // Set app i18n lang
  Promise.resolve(require(`@/i18n/${langIso}.json`))
    .then((messages) => {
      // set locale and locale message
      i18n.global.locale.value = langIso
      i18n.global.setLocaleMessage(langIso, messages)
    })
    .catch((err) => {
      // let's not break the app, so catching error
      console.debug(err)
    })
}

ebus.on('changeLanguage', (langIso) => {
  console.debug('\u001b[35m' + '[Event] ', 'changeLanguage', langIso)
  loadLanguage(langIso)
})

export default boot(({ app } /* { app, router, ... } */) => {
  const langIso = Cookies.get('locale') || 'en-US'
  console.debug('\u001b[35m' + '[Boot] ', 'i18n', langIso)

  loadLanguage(langIso)
  // Set i18n instance on app
  app.use(i18n)
})

// export i18n, so js file could use i18n t() outside of a Vue file
export { i18n }
