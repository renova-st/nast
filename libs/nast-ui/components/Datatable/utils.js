import isObject from 'lodash/isObject'


/**
 * Поиск по данным
 *
 * @param {array} data
 * @param {array} parsedData - Сначала проверяет наличие данных в parsedData, потом в data, может быть пустой
 * @param {array} search
 * @param {array} columns
 * @param {string} keyName
 * @return {array} new data
 */
const searched = (data, parsedData, search, columns, keyName) => {
  /**
   * @param {string} text - 'Sample string'
   * @param {array} search - [ 'sample', 'number', ]
   * @param {boolean} ignoreCase - true
   *
   * @return {boolean} - true
   */
  const _find = (text, search, ignoreCase = true) => {
    let isFind = false
    const casedText = ignoreCase ? text.toLowerCase() : text
    for (const i in search) {
      if ({}.hasOwnProperty.call(search, i)) {
        isFind = casedText.indexOf(search[i]) !== -1

        if (isFind) {
          break
        }
      }
    }
    return isFind
  }

  // searched function
  if (search.length) {
    return data.reduce((result, item) => {
      const parsedItem = parsedData[item[keyName]]
      let isFind = false

      for (const i in columns) {
        if ({}.hasOwnProperty.call(columns, i)) {
          const column = columns[i]
          const text = parsedItem && parsedItem[column.name] ? parsedItem[column.name] : String(item[column.name])
          isFind = _find(text, search)
          if (isFind) break
        }
      }

      if (isFind) {
        result.push(item)
      }
      return result
    }, [])
  } else {
    return data
  }
}


/**
 * Сортировка данных
 *
 * @param {array} data
 * @param {array} parsedData - Сначала проверяет наличие данных в parsedData, потом в data
 * @param {array} sort
 * @param {array} columns
 * @param {string} keyName
 * @return {array} new data
 */
const sorted = (data, parsedData, sort, columns, keyName) => {
  const newData = data.slice(0)

  return newData.sort((a, b) => {
    const defaultSortFunction = (a, b) => {
      if (a === undefined && b !== undefined) return -1
      if (b === undefined) return 1

      if (a === b) return 0
      if (a.toString() === b.toString()) return 0

      return (a > b) ? 1 : -1
    }

    let result = 0

    for (const key in sort) {
      if ({}.hasOwnProperty.call(sort, key)) {
        const defaultChangeValue = (item) => {
          const parsedItem = parsedData[item[keyName]]
          return parsedItem && parsedItem[key] ? parsedItem[key] : item[key]
        }
        const changeValue = typeof columns[key].sort === 'function' ? columns[key].sort : defaultChangeValue
        const compare = typeof columns[key].sortFunction === 'function' ? columns[key].sortFunction : defaultSortFunction

        result = compare(changeValue(a), changeValue(b))
        if (!sort[key]) result *= -1

        if (result) break
      }
    }

    return result
  })
}


/**
 * Пагинация данных
 *
 * @param {array} data
 * @param {number} page
 * @param {number} size
 * @return {array}
 */
const paginated = (data, page, size) => {
  return data.slice(size * (page - 1), size * page)
}


/**
 * Входные column могут быть:
 * 1. [ { name: 'id', title: 'ID', }, { name: 'name', title: 'Name', }, ]
 * 2. [ 'id', 'name', ]
 * 3. undefined
 *
 * Функция трансформирует данные в формат:
 * [ { name: 'id', sort: true, search: true, classes: [], }, ]
 *
 * @param {object} item - sample item
 * @param {array} columns
 * @return {array} new columns
 */
const normalizeColumns = (item, columns) => {
  columns = columns.slice(0) // clone

  if (item) {
    const itemProps = Object.keys(item)

    if (columns.length === 0) {
      columns = itemProps
    }
  }

  return columns.map((column) => {
    const object = isObject(column) ? column : { name: column, }

    const newObject = {
      sort: true,
      search: true,
      classes: [],
      ...object,
    }
    newObject.classes = [
      { 'no-sort': !newObject.sort, },
      ...newObject.classes,
    ]

    return newObject
  })
}


/**
 * Парсит slot в строку
 *
 * @param {object} slot
 * @param {object} props
 * @return {string}
 */
const slotToString = (slot, props) => {
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

  if (slot) {
    return parseNodes(slot(props))
  }

  return undefined
}


/**
 * Возвращает массив объектов для this.data.
 * Объект содержит распарсеные значения для колонок у которых есть слоты или кастомные функции парсинга.
 * Значения колонок, у которых нет слотов или функций, надо брать из this.data. Это сделано для того, чтобы не хранить
 * большое количество дубликатов.
 * Для каждой колонки создается запись вида: { parse: '', } || { sort: '', search: '', }
 *
 * @param {array} data
 * @param {array} columns
 * @param {array} scopedSlots
 * @param {string} keyName
 * @return {object} { id1: { date: { parse: '', }, name: { }, }, id2: {Item2}, }
 */
const parsedData = (data, columns, scopedSlots, keyName) => {
  return data.reduce((result, item) => {
    result[item[keyName]] = columns.reduce((newItem, column) => {
      const slot = scopedSlots[column.name]
      if (slot) {
        newItem[column.name] = slotToString(scopedSlots[column.name], column.name, { item, }) || item[column.name]
      }
      return newItem
    }, {})
    return result
  }, {})
}


export {
  searched,
  sorted,
  paginated,
  normalizeColumns,
  parsedData,
}
