/**
 * @param {string} string - 'search'
 * @param {array} search - [ 'se', 'rc', ]
 * @param {boolean} ignoreCase
 *
 * @return {object} -
 * [
 *  { string: 'se', search: true, },
 *  { string: 'a', search: false, },
 *  { string: 'rc', search: true, },
 *  { string: 'h', search: false, }
 * ]
 */
const splitStringBySearch = (string, search = [], ignoreCase = true) => {
  const stringArray = string.split('')

  const result = search.reduce((result, s) => {
    const stringToFind = ignoreCase ? string.toLowerCase() : string
    const searchString = ignoreCase ? s.toLowerCase() : s
    result[s] = _getMatches(stringToFind, searchString)
    return result
  }, {})

  const searchResult = []
  stringArray.forEach((letter, i) => {
    let isFind = false
    for (const key in result) {
      if ({}.hasOwnProperty.call(result, key)) {
        isFind = result[key][i] === 1
        if (isFind) break
      }
    }

    const last = searchResult[searchResult.length - 1]

    if (last && last.search === isFind) {
      last.string += letter
    } else {
      searchResult.push({ string: letter, search: isFind, })
    }
  })

  return searchResult
}

/**
 * @param {string} string - 'search'
 * @param {string} search - 'sea'
 * @return {array} - [ 1, 1, 1, 'r', 'c', 'h', ]
 */
const _getMatches = (string, search) => {
  const stringArray = string.split('')

  if (search.length < 1) {
    return stringArray
  }

  let i = string.indexOf(search)
  while (i !== -1) {
    let j = i
    while (j < i + search.length) {
      stringArray[j] = 1
      j++
    }
    i = string.indexOf(search, i + j)
  }

  return stringArray
}

export {
  splitStringBySearch,
}
