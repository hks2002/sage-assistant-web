/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2023-11-17 23:43:19                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2023-11-18 14:16:40                               *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import { upperFirst } from 'lodash'
import { utils, writeFileSync } from 'xlsx'

const jsonToTable = function (sortedHeaders, jsonData, title) {
  let table =
    '<div class="q-markup-table q-table__container q-table__card q-table--horizontal-separator q-table--dense q-table--no-wrap q-pa-none"><table class="q-table">'
  table += '<thead style="position: sticky; top: 0px; z-index: 1;">'
  table += '<tr><th colspan="' + sortedHeaders.length + '" style="padding: 0px;">'
  table +=
    '<div class="q-toolbar row no-wrap items-center bg-teal text-white shadow-2"><div class="q-toolbar__title ellipsis">' +
    title +
    '</div></div>'
  table += '</th></tr>'
  table += '<tr class="bg-primary text-white text-left">'
  for (let i = 0, l = sortedHeaders.length; i < l; i++) {
    table += '<th>' + upperFirst(sortedHeaders[i]) + '</th>'
  }
  table += '</tr></thead><tbody>'
  for (let i2 = 0, l2 = jsonData.length; i2 < l2; i2++) {
    table += '<tr>'
    for (let i3 = 0, l3 = sortedHeaders.length; i3 < l3; i3++) {
      table += '<td style="white-space: nowrap">' + jsonData[i2][sortedHeaders[i3]] + '</td>'
    }
    table += '</tr>'
  }
  table += '</tbody></table><div>'
  return table
}

const jsonToExcel = function (sortedHeaders, jsonData, filename) {
  let sortedJsonData = []
  for (let i2 = 0, l2 = jsonData.length; i2 < l2; i2++) {
    let obj = {}
    for (let i3 = 0, l3 = sortedHeaders.length; i3 < l3; i3++) {
      obj[upperFirst(sortedHeaders[i3])] = jsonData[i2][sortedHeaders[i3]]
    }
    sortedJsonData.push(obj)
  }

  let bookNew = utils.book_new()
  let workSheet = utils.json_to_sheet(sortedJsonData)

  // replace \ / ? * [ ] : with _
  utils.book_append_sheet(bookNew, workSheet, filename.replace(/[\\/?*[\]:]/g, '_'))
  writeFileSync(bookNew, filename + '.xlsx')
  return
}

const jsonToMultiLine = function (fields, jsonObj) {
  let s = '<table>'
  for (let i = 0, l = fields.length; i < l; i++) {
    s += '<tr><td>' + upperFirst(fields[i]) + ':</td><td>' + jsonObj[fields[i]] + '</tr>'
  }
  s += '</table>'
  return s
}

export { jsonToExcel, jsonToMultiLine, jsonToTable }
