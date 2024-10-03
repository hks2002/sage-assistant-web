/******************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                     *
 * @CreatedDate           : 2023-11-17 23:43:19                               *
 * @LastEditors           : Robert Huang<56649783@qq.com>                     *
 * @LastEditDate          : 2025-01-02 23:53:15                               *
 * @FilePath              : sage-assistant-web/src/assets/dataUtils.js        *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                   *
 *****************************************************************************/

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { upperFirst } from 'lodash-es'
import { utils, writeFileSync } from 'xlsx'

const jsonToTable = (title, jsonData, headers) => {
  if (jsonData.length === 0) return ''
  if (!headers) headers = Object.keys(jsonData[0])

  let table =
    '<div class="q-markup-table q-table__container q-table__card q-table--horizontal-separator q-table--dense q-table--no-wrap q-pa-none"><table class="q-table">'
  table += '<thead style="position: sticky; top: 0px; z-index: 1;">'
  table += '<tr><th colspan="' + headers.length + '" style="padding: 0px;">'
  table +=
    '<div class="q-toolbar row no-wrap items-center bg-teal text-white shadow-2"><div class="q-toolbar__title ellipsis">' +
    title +
    '</div></div>'
  table += '</th></tr>'
  table += '<tr class="bg-primary text-white text-left">'
  for (let i = 0, l = headers.length; i < l; i++) {
    table += '<th>' + upperFirst(headers[i]) + '</th>'
  }
  table += '</tr></thead><tbody>'
  for (let i2 = 0, l2 = jsonData.length; i2 < l2; i2++) {
    table += '<tr>'
    for (let i3 = 0, l3 = headers.length; i3 < l3; i3++) {
      table += '<td style="white-space: nowrap">' + jsonData[i2][headers[i3]] + '</td>'
    }
    table += '</tr>'
  }
  table += '</tbody></table><div>'
  return table
}

const jsonToExcel = (fileName, sheetName, jsonData, sortedHeaders) => {
  if (jsonData.length === 0) return

  let sortedJsonData = []
  for (let i = 0, l2 = jsonData.length; i < l2; i++) {
    let headers = sortedHeaders ? sortedHeaders : Object.keys(jsonData[i])
    let obj = {}
    for (let j = 0, l3 = headers.length; j < l3; j++) {
      obj[upperFirst(headers[j])] = jsonData[i][headers[j]]
    }
    sortedJsonData.push(obj)
  }

  let workBook = utils.book_new()
  let workSheet = utils.json_to_sheet(sortedJsonData)

  // replace \ / ? * [ ] : with _
  utils.book_append_sheet(workBook, workSheet, sheetName)
  writeFileSync(workBook, fileName.replace(/[\\/?*]:/g, '_') + '.xlsx')
  return
}

const tableToExcel = (tableId, fileName, sheetName) => {
  let workBook = utils.table_to_book(document.getElementById(tableId), { sheet: sheetName })
  writeFileSync(workBook, fileName.replace(/[\\/?*]:/g, '_') + '.xlsx')
}

const expandTableToExcel = (tableId, fileName, sheetName) => {
  let dom = document.getElementById(tableId).cloneNode(true)
  let trs = dom.querySelectorAll('tr')
  let expandHeaderSet = false
  let oriHeaderLength = 0

  for (let i = 0, l = trs.length; i < l; i++) {
    if (trs[i].childNodes.length === 3) {
      // only the expanded row, three columns
      let td3 = trs[i].childNodes[2]
      let subTrs = td3.querySelectorAll('tr')

      if (!expandHeaderSet) {
        oriHeaderLength = trs[0].childNodes.length
        // add headers to the first row once
        let ths = subTrs[0].querySelectorAll('th')
        for (let i2 = 0, l2 = ths.length; i2 < l2; i2++) {
          trs[0].appendChild(ths[i2])
        }
        expandHeaderSet = true
      }

      for (let i2 = 1, l2 = subTrs.length; i2 < l2; i2++) {
        let newTr = document.createElement('tr')
        for (let i3 = 0, l3 = oriHeaderLength; i3 < l3; i3++) {
          // add empty td to the  row
          let newTd = document.createElement('td')
          newTr.appendChild(newTd)
        }

        let tds = subTrs[i2].querySelectorAll('td')
        for (let i3 = 0, l3 = tds.length; i3 < l3; i3++) {
          newTr.appendChild(tds[i3])
        }

        trs[i].parentElement.insertBefore(newTr, trs[i])
      }

      td3.parentElement.remove() // remove the expanded row
    }
  }
  let workBook = utils.table_to_book(dom, { sheet: sheetName })
  writeFileSync(workBook, fileName.replace(/[\\/?*]:/g, '_') + '.xlsx')
}

const jsonToMultiLine = (jsonObj, sortedFields) => {
  if (jsonObj.length === 0) return ''
  if (!sortedFields) sortedFields = Object.keys(jsonObj)

  let s = '<table>'
  for (let key in jsonObj) {
    s += '<tr><td>' + upperFirst(key) + ':</td><td>' + jsonObj[key] + '</tr>'
  }
  s += '</table>'
  return s
}

const tableToPdf = async (tableSelector, fileName, pdfOptions) => {
  function pxToMm(px) {
    const devicePixelRatio = window.devicePixelRatio || 1
    const standardDPI = 96
    const dpi = standardDPI * devicePixelRatio
    return (px * 25.4) / dpi
  }
  // set page size, contents width and height
  const pdf = pdfOptions ? new jsPDF(pdfOptions) : new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = pdf.getPageWidth()
  const pageHeight = pdf.getPageHeight()
  // set margins
  const pageMarginAll = pdfOptions?.pageMarginAll || 10
  const pageMarginTop = pdfOptions?.pageMarginTop || pageMarginAll
  const pageMarginBottom = pdfOptions?.pageMarginBottom || pageMarginAll
  const pageMarginLeft = pdfOptions?.pageMarginLeft || pageMarginAll
  const pageMarginRight = pdfOptions?.pageMarginRight || pageMarginAll
  const contentsWidth = pageWidth - pageMarginLeft - pageMarginRight
  const contentsHeight = pageHeight - pageMarginTop - pageMarginBottom
  const contentsEnd = pageHeight - pageMarginBottom
  // set default scale ratio for canvas
  let ratio = 1
  let domScale = 1.3
  let pdfPosition = pageMarginTop
  let isNewPage = false

  const dom = document.getElementById(tableSelector)
  const tableTop = dom.getElementsByClassName('q-table__top')[0]
  const tableHeader = dom.getElementsByClassName('q-table__middle')[0].getElementsByTagName('thead')[0]
  const tableBody = dom.getElementsByClassName('q-table__middle')[0].getElementsByTagName('tbody')[0]
  const tableBottom = dom.getElementsByClassName('q-table__bottom')[0]

  const getImgOfCanvas = (canvas, htmlStartPoint, height) => {
    let tmpCanvas = document.createElement('canvas')
    tmpCanvas.width = canvas.width
    tmpCanvas.height = canvas.height
    let tmpCtx = tmpCanvas.getContext('2d')

    tmpCtx.drawImage(
      canvas,
      0,
      htmlStartPoint * domScale,
      canvas.width,
      height * domScale,
      0,
      0,
      canvas.width,
      canvas.height
    )
    return tmpCanvas.toDataURL()
  }

  const addSubImage = async (canvas, htmlStartPoint, height) => {
    let canvasData = getImgOfCanvas(canvas, htmlStartPoint, height)
    if (pdfPosition + pxToMm(height) > contentsEnd) {
      pdf.addPage()
      pdfPosition = pageMarginTop
      isNewPage = true
    }
    pdf.addImage(canvasData, 'PNG', pageMarginLeft, pdfPosition, contentsWidth, pxToMm(height))

    pdfPosition += pxToMm(height)
  }

  await html2canvas(dom, { scale: domScale, logging: false }).then(async (canvas) => {
    let canvasWidth = pxToMm(canvas.width)
    let canvasHeight = pxToMm(canvas.height)
    if (canvasWidth > contentsWidth) {
      ratio = (contentsWidth / canvasWidth).toFixed(2)
    }

    //    const canvasData = canvas.toDataURL()
    //   pdf.addImage(
    //     canvasData,
    //     'PNG',
    //     pageMarginLeft,
    //     position,
    //     Math.round(canvasWidth * ratio),
    //     Math.round(canvasHeight * ratio)
    //   )

    const tableTopHeight = tableTop.offsetHeight
    const tableHeaderHeight = tableHeader.offsetHeight
    const tableBodyHeight = tableBody.offsetHeight
    const tableBottomHeight = tableBottom.offsetHeight

    const tableTopStart = 0
    const tableHeaderStart = tableTopHeight
    const tableBodyStart = tableTopHeight + tableHeaderHeight
    const tableBottomStart = tableTopHeight + tableHeaderHeight + tableBodyHeight

    const tableTopEnd = tableTopStart + tableTopHeight
    const tableHeaderEnd = tableHeaderStart + tableHeaderHeight
    const tableBodyEnd = tableBodyStart + tableBodyHeight
    const tableBottomEnd = tableBottomStart + tableBottomHeight

    // if (tableBottomEnd < contentsHeight) {
    //   await addSubImage(
    //     canvas,
    //     tableTopStart,
    //     tableTopHeight + tableHeaderHeight + tableBodyHeight + tableBottomHeight + 10
    //   )
    // } else {
    await addSubImage(canvas, tableTopStart, tableTopHeight)
    await addSubImage(canvas, tableHeaderStart, tableHeaderHeight)

    let tableBodyTRStart = tableBodyStart
    tableBody.childNodes.forEach(async (tr) => {
      if (isNewPage) {
        await addSubImage(canvas, tableHeaderStart, tableHeaderHeight)
      }
      await addSubImage(canvas, tableBodyTRStart, tr.offsetHeight)
      tableBodyTRStart += tr.offsetHeight
    })

    await addSubImage(canvas, tableBottomStart, tableBottomHeight + 10)
    //}

    pdf.save(`${fileName}.pdf`)
  })
}

export { expandTableToExcel, jsonToExcel, jsonToMultiLine, jsonToTable, tableToExcel, tableToPdf }
