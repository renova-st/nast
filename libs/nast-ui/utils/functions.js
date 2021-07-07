import isObject from 'lodash/isObject'
import isFunction from 'lodash/isFunction'
import get from 'lodash/get'

const getValue = (item, valueKey) => {
  return isObject(item) ? get(item, valueKey) : item
}

const getTitle = (item, titleKey) => {
  if (isObject(item)) {
    return isFunction(titleKey) ? titleKey(item) : get(item, titleKey)
  }
  return item
}

export {
  getValue,
  getTitle,
}
