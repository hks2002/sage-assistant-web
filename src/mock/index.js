/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2022-03-25 11:01:00                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2024-11-29 19:30:40                               *
 * @FilePath              : sage-assistant-web/src/mock/index.js              *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

// When in development mode, Run Mock
// This file is designed to for boot/mock.js, boot once
// Auto import all files under services folder
if (process.env.DEV) {
  console.debug('\u001b[35m' + '[Mock] ', 'Mounting...')

  // auto require all files in /src/mock/services
  const mockFiles = require.context('/src/mock/services', false, /.js$/)
  mockFiles.keys().forEach((key) => {
    const file = key.slice(2)
    console.debug('\u001b[35m' + '[Mock] ', 'Mounting', file)
    //require(`/src/mock/services/${file}`)
  })
  console.debug('\u001b[35m' + '[Mock] ', 'Mounted')
}
