/*********************************************************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                                                            *
 * @CreatedDate           : 2022-03-25 11:01:00                                                                      *
 * @LastEditors           : Robert Huang<56649783@qq.com>                                                            *
 * @LastEditDate          : 2023-06-15 16:36:52                                                                      *
 * @FilePath              : src/mock/services/files.js                                                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                                                          *
 ********************************************************************************************************************/

import { getQueryParameters } from '@/assets/mockExt'
import Mock from 'mockjs'

Mock.mock(RegExp('^(/Data/AttachmentPath)' + '.*'), (options) => {
  const Pn = getQueryParameters(options, 'Pn')

  // list = {data:[{},{}]}
  const list = Mock.mock({
    'data|1-5': [
      {
        'ROWID|+1': 1,
        PN: Pn,
        Cat: /(Drawing|Manual|UNK)/,
        DocType: /(PDF|JPG|JPEG|TIF|BMP|DOC|DOCX|XLS|XLSX|PPT|PPTX|ZIP|RAR|7Z|OTHER)/,
        Path: /\/File\/MockFile\/[A-Z]*\.(PDF|JPG|JPEG|TIF|BMP|DOC|DOCX|XLS|XLSX|PPT|PPTX|ZIP|RAR|7Z|OTHER)/
      }
    ]
  })

  return list.data
})

Mock.mock(RegExp('^(/File/MockFile)' + '.*'), (options) => {
  const ext = options.split('.')[1]
  if (ext === 'JPG' || ext === 'JPEG' || ext === 'TIF' || ext === 'BMP') {
    return Mock.mock('@dataImage("200x100","' + options.url + '")')
  } else {
    console.log(options)
    return ''
  }
})

Mock.mock(RegExp('^(/Data/FileDelete)' + '.*'), () => {
  return 'Delete with Success!'
})
