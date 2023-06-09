/***
 * @Author         : Robert Huang<56649783@qq.com>
 * @Date           : 2022-03-25 11:01:23
 * @LastEditors    : Robert Huang<56649783@qq.com>
 * @LastEditTime   : 2022-05-28 23:16:55
 * @FilePath       : \web2\src\mock\services\files.js
 * @CopyRight      : Dedienne Aerospace China ZhuHai
 */
import { getQueryParameters } from '@/assets/mockExt'
import Mock from 'mockjs'

Mock.mock(RegExp('^(/Data/AttachmentPath)' + '.*'), (options) => {
  console.debug('\u001b[35m' + '[Mocking] ', 'AttachmentPath')

  const Pn = getQueryParameters(options, 'Pn')

  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-5': [
      {
        'ROWID|+1': 1,
        PN: Pn,
        Cat: /(Drawing|Manual|UNK)/,
        DocType:
          /(PDF|JPG|JPEG|TIF|BMP|DOC|DOCX|XLS|XLSX|PPT|PPTX|ZIP|RAR|7Z|OTHER)/,
        Path: /\/File\/MockFile\/[A-Z]*\.(PDF|JPG|JPEG|TIF|BMP|DOC|DOCX|XLS|XLSX|PPT|PPTX|ZIP|RAR|7Z|OTHER)/
      }
    ]
  })

  return list.data
})

Mock.mock(RegExp('^(/File/MockFile)' + '.*'), (options) => {
  console.debug('\u001b[35m' + '[Mocking] ', 'MockFile')

  const ext = options.split('.')[1]
  if (ext === 'JPG' || ext === 'JPEG' || ext === 'TIF' || ext === 'BMP') {
    return Mock.mock('@dataImage("200x100","' + options.url + '")')
  } else {
    console.log(options)
    return ''
  }
})

Mock.mock(RegExp('^(/Data/FileDelete)' + '.*'), () => {
  console.debug('\u001b[35m' + '[Mocking] ', 'FileDelete')

  return 'Delete with Success!'
})
