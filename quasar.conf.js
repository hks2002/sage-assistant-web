/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-04-09 23:09:37                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-11-20 20:59:51                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

// Configuration for your app
// https://v2.quasar.dev/quasar-cli/quasar-conf-js

/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-env node */
const { configure } = require('quasar/wrappers')

const fs = require('fs')
const path = require('path')
const { ContextReplacementPlugin } = require('webpack')

module.exports = configure(function (ctx) {
  return {
    // https://v2.quasar.dev/quasar-cli/supporting-ts
    supportTS: false,

    // https://v2.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli/boot-files
    boot: ['quasar', 'ebus', 'i18n', 'mock'],

    // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      // 'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      // available values: 'hash', 'history'
      // ❗️❗️❗️ if set to 'history', and have 404 page, please set nginx try_files ❗️❗️❗️
      // search 'vue history nginx' for more information
      vueRouterMode: 'hash',

      // transpile: false,

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: false, // https://v2.quasar.dev/options/rtl-support
      preloadChunks: true,
      showProgress: true,
      gzip: true,
      analyze: true,

      // https://quasar.dev/quasar-cli-webpack/handling-webpack#webpack-v5-compatibility-issues
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      // https://webpack.js.org/plugins/split-chunks-plugin/
      chainWebpack(chain) {
        chain.optimization.splitChunks({
          chunks: 'async',
          minSize: 20000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        })

        // https://webpack.docschina.org/plugins/conext-replacement-plugin
        chain.plugin('ContextReplacement').use(ContextReplacementPlugin, [/quasar[/\\]lang$/, /en-US|zh-CN/])
      },

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,
      // beforeBuild() {
      //   let pkg = fs.readFileSync('package.json')
      //   const timeStamp = moment().format('MMDDHHmmss')
      //   pkg = JSON.parse(pkg)

      //   pkg.version = pkg.version.replace(/^(\d+\.\d+)(\S*)/, '$1')
      //   pkg.version = pkg.version + '.' + timeStamp

      //   fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2))
      // },

      afterBuild() {
        let pkg = fs.readFileSync('package.json')
        pkg = JSON.parse(pkg)
        console.log('\u001b[35m Update package to ' + pkg.version + '\u001b[0m')
      },
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: true
        }
      },
      // Options below are automatically set depending on the env, set them if you want to override
      // preloadChunks: false,
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack(cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias

          // Add your own alias like this
          '@': path.resolve(__dirname, './src')
        }
        console.debug(' webpack-aliases:', cfg.resolve.alias)
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      port: 443, // the devServer <port> must be same, otherwise you will receive some <forbidden> result.
      open: true, // opens browser window automatically

      // please using Nginx to provide proxy first, then let devServer proxy to Nginx
      proxy: {
        '/Data': {
          target: 'http://127.0.0.1'
        }
      }
    },

    // https://v2.quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      config: {},

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ['Cookies', 'Dialog', 'Loading', 'Notify', 'LoadingBar', 'LocalStorage', 'SessionStorage', 'Meta']
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
      // manualStoreHydration: true,
      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
      // Tell browser when a file from the server should expire from cache (in ms)

      chainWebpackWebserver(/* chain */) {},

      middlewares: [
        ctx.prod ? 'compression' : '',
        'render' // keep this as last one
      ]
    },

    // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode
      chainWebpackCustomSW(chain) {
        chain
          .plugin('eslint-webpack-plugin')
          // eslint-disable-next-line no-undef
          .use(ESLintPlugin, [{ extensions: ['js'] }])
      },

      manifest: {
        name: require('./package.json').productName,
        short_name: require('./package.json').name,
        description: require('./package.json').description,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'web'
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackMain(/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackMain also available besides this chainWebpackMain
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain
      chainWebpackPreload(/* chain */) {
        // do something with the Electron main process Webpack cfg
        // extendWebpackPreload also available besides this chainWebpackPreload
      }
    }
  }
})
