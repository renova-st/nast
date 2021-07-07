import isObject from 'lodash/isObject'


/**
 * Входные column могут быть:
 * 1. [ { name: 'id', title: 'ID', }, { name: 'name', title: 'Name', }, ]
 * 2. [ 'id', 'name', ]
 * 3. undefined
 *
 * Функция трансформирует данные в формат:
 * [ { name: 'id', classes: [], }, ]
 *
 * @param {array} data
 * @param {array} columns
 * @return {array} new columns
 */
const normalizeColumns = (data, columns) => {
  const item = data[0]
  columns = columns.slice(0) // clone
  
  if (item) {
    const itemProps = Object.keys(item)
    
    if (columns.length === 0) {
      columns = itemProps
    }
  }
  
  return columns.map((column) => {
    const object = isObject(column) ? column : { name: column, }
  
    return {
      classes: [],
      ...object,
    }
  })
}

/**
 * Объект содержит распарсеные значения для полей у которых есть слоты. TODO убрать в Datatable
 *
 * @param {array} data
 * @param {array} columns
 * @param {array} scopedSlots
 * @param {string} itemName
 * @return {object} { id1: { field1: '', field2: '', }, }
 */
const parsedData = (data, columns, scopedSlots, itemName) => {
  const parseNodes = (nodes) => {
    return nodes.reduce((result, node) => {
      if (node.text) {
        result.push(node.text)
      } else if (node.children) {
        result.push(parseNodes(node.children))
      } else if (node.componentOptions && node.componentOptions.children) {
        result.push(parseNodes(node.componentOptions.children))
      }
      return result
    }, []).join(' ')
  }
  
  return data.reduce((result, item) => {
    result[item[itemName]] = columns.reduce((itemResult, column) => {
      const slot = scopedSlots[column.name]
      if (slot) {
        const string = parseNodes(slot({ item, }))
        if (string) itemResult[column.name] = string
      }
      return itemResult
    }, {})
    return result
  }, {})
}


export {
  normalizeColumns,
}
