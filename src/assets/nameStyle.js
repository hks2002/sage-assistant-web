/*****************************************************************************
 * @Author                : Robert Huang<56649783@qq.com>                    *
 * @CreatedDate           : 2024-09-14 15:03:56                              *
 * @LastEditors           : Robert Huang<56649783@qq.com>                    *
 * @LastEditDate          : 2024-11-29 19:08:01                              *
 * @FilePath              : sage-assistant-web/src/assets/nameStyle.js       *
 * @CopyRight             : Dedienne Aerospace China ZhuHai                  *
 ****************************************************************************/

/**
 * Pascal Case with space (Const Case).
 * @param {String} s
 * @returns
 */
const titleCase = (s) => {
  return s.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^[a-z]/g, (match) => match.toUpperCase())
}

/**
 * Converts the given string to constant case (CONST_CASE).
 *
 * This function first calls the `titleCase` function to convert the string to title case (where each word starts with a capital letter),
 * then converts the entire string to uppercase and replaces all spaces with underscores, resulting in a constant naming style.
 *
 * @param {string} s - The original string to be converted.
 * @returns {string} - The converted string in constant case.
 */
const constCase = (s) => {
  return titleCase(s).toUpperCase().replace(/\s/g, '_')
}

export { constCase, titleCase }
