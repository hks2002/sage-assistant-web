/***
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-03-25 11:01:23
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-05-28 23:09:27
 * @FilePath       : \web2\src\boot\i18n.js
 * @CopyRight      : Dedienne Aerospace China ZhuHai
 */
import { Cookies, Quasar } from 'quasar'
import { boot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'

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

const i18n = createI18n({
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  legacy: false,
  fallbackLocale: 'en-US'
})

export { i18n }

export default boot(({ app } /* { app, router, ... } */) => {
  const langIso = Cookies.get('locale') || 'en-US'
  console.debug('\u001b[35m' + '[Boot] ', 'i18n', langIso)

  // Set Quasar lang pack
  Promise.resolve(require(`quasar/lang/${langIso}.js`))
    .then((lang) => {
      Quasar.lang.set(lang.default)
    })
    .catch((err) => {
      // Requested Quasar Language Pack does not exist,
      // let's not break the app, so catching error
      console.debug(err)
    })

  const i18nFiles = require.context('@/i18n', true, /.json$/)
  i18nFiles.keys().forEach(async (key) => {
    const lang = key.split('/')[1]
    const context = key.split('/')[2].split('.')[0]

    console.debug('\u001b[35m' + '[Boot] ', 'i18n', lang, context)

    Promise.resolve(require(`@/i18n/${lang}/${context}.json`))
      .then((i18nText) => {
        const messages = {}
        messages[context] = i18nText
        i18n.global.mergeLocaleMessage(lang, messages)
      })
      .catch((err) => {
        // Requested i18n file does not exist,
        // let's not break the app, so catching error
        console.debug(err)
      })
  })
  // Set i18n lang pack
  i18n.global.locale = langIso

  // Set i18n instance on app
  app.use(i18n)
})
