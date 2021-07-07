import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isFunction from 'lodash/isFunction'
import get from 'lodash/get'


/**
 * Fields mechanism logic
 * @param {string|object} item
 * @param {string|object} field
 * @param {string} key
 * @return {string|boolean|undefined}
 */
const getValue = (item, field, key) => {
  if (isString(item)) return item
  if (isString(field)) return item[field]
  
  let value = get(field, 'value')
  if (isFunction(value)) value = value(item)
  
  if (key === 'value') {
    return value
  }
  
  const fieldValue = get(field, key)
  
  if (key === 'sort') { // func or boolean, if false - sort disabled, else enabled
    return isFunction(fieldValue) ? fieldValue(item) : fieldValue
  }
  if (key === 'filter') { // only func
    return isFunction(fieldValue) ? fieldValue(item) : value
  }
}

/**
 * @param {array} data
 * @param {array|string} search
 * @param {array} fields
 * @return {array} new data
 */
const searched = (data, search, fields) => {
  /**
   * @param {string} text
   * @param {array} search - [ 'sample', 'search', ]
   * @return {boolean}
   */
  const _find = (text, search) => {
    for (const i in search) {
      if ({}.hasOwnProperty.call(search, i) && search[i].length > 1) {
        if (String(text).toLowerCase().indexOf(search[i]) !== -1) {
          return true
        }
      }
    }
    return false
  }
  
  const searches = isArray(search) ? search : [ search, ]
  
  if (searches.length) {
    return data.reduce((result, item) => {
      let isFind = false
      
      for (const i in fields) {
        if ({}.hasOwnProperty.call(fields, i)) {
          const value = getValue(item, fields[i], 'value')
          isFind = _find(value, searches)
          if (isFind) break
        }
      }
      if (isFind) result.push(item)
      
      return result
    }, [])
  } else {
    return data
  }
}


/**
 * @param {array} data
 * @param {array} sort
 * @param {array} fields
 * @param {function} defaultSortFunction
 * @return {array} new data
 */
const sorted = (data, sort, fields, defaultSortFunction) => {
  const newData = data.slice(0)
  
  return newData.sort((a, b) => {
    let result = 0
    
    for (const key in sort) {
      if ({}.hasOwnProperty.call(sort, key)) {
        const valueA = getValue(a, fields[key], 'sort')
        const valueB = getValue(b, fields[key], 'sort')
        
        let compare = fields[key].sortFunction
        compare = isFunction(compare) ? compare : defaultSortFunction
        
        result = compare(valueA, valueB)
        if (!sort[key]) result *= -1
        
        if (result) break
      }
    }
    
    return result
  })
}


/**
 * @param {array} data
 * @param {number} page
 * @param {number} size
 * @return {array}
 */
const paginated = (data, page, size) => {
  return data.slice(size * (page - 1), size * page)
}


export {
  searched,
  sorted,
  paginated,
}
