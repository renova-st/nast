import each from 'lodash/each'
import merge from 'lodash/merge'
import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import trim from 'lodash/trim'

/**
 *
 */
export class RequestBuilder {
  /**
   * @type {String|Array}
   * @protected
   */
  _url
  
  /**
   * @type {string}  get|post|put|patch|delete
   * @protected
   */
  _method
  
  /**
   * @type {*}
   * @protected
   */
  _data
  
  /**
   * @param {string} url
   * @param {string} method
   * @param {Object} data
   * @param {ApiConfigInterface} config
   * @protected
   */
  _request = (url, method, data, config) => {}
  
  
  /**
   * @type {number}
   * @protected
   */
  _version = 1
  
  /**
   * @type {ApiConfigInterface}
   * @protected
   */
  _config = {}
  
  /**
   * Используется для установки предопределенных колбеков.
   * Именованные функции используются для того, чтобы можно было занулить предыдущие объявления колбеков.
   * Важно! Сортируются по алфавиту.
   * @type {{before: {}, finally: {}, then: {}, catch: {}}}
   * @example
   * {
   *   before: {
   *     prev: (response) => {},
   *     second: (response) => {},
   *     after: (response) => {},
   *   },
   * }
   * @protected
   */
  _callbacks = {
    before: {},
    then: {},
    catch: {},
    finally: {},
  }
  
  /**
   * @type {*}
   * @protected
   */
  _mock = undefined
  
  /**
   * Задержка возвращения mock-данных в миллисекундах.
   * @type {number}
   * @protected
   */
  _mockTimeout = 500
  
  /**
   * Все query параметры.
   * @type {QueryParamsInterface}
   * @protected
   */
  _query = {
    page: 0,
    size: 0,
    sort: [],
    search: '',
    filter: {},
    with: {},
    fields: [],
    tree: false,
    all: false,
    query: {},
  }
  
  /**
   * @type {string}
   * @protected
   */
  _hash = ''
  
  /**
   * @param {String|Array} url
   * @param {string} method
   * @param {Function} request
   * @param {ApiConfigInterface} config
   */
  constructor(url, method, request, config = {}) {
    this._url = url
    this._method = method
    this._request = request
    
    this.config(config)
  }
  
  /**
   * @param {Function} callback
   * @return {Promise}
   */
  then(callback) {
    each(this._callbacks.before, (callback) => callback())
    
    let promise
    if (this._mock) {
      promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(this._mock())
        }, this._mockTimeout)
      })
    } else {
      promise = this._request(this.url(), this._method, this._data, this._config)
    }
    
    each(this._callbacks.then, (cb) => {
      promise = promise.then(cb)
    })
    
    promise = promise.then(callback)
    
    each(this._callbacks.catch, (cb) => {
      promise = promise.catch(cb)
    })
    each(this._callbacks.finally, (cb) => {
      promise = promise.finally(cb)
    })
    
    return promise
  }
  
  /**
   * @param {ApiConfigInterface} config
   * @return {RequestBuilder}
   */
  config(config) {
    merge(this._config, config)
    return this
  }
  
  /**
   * @param {Function} callback
   * @param {string} name
   * @param {string} type  then|catch|finally|before
   * @return {RequestBuilder}
   */
  callback(callback, name = 'default', type = 'then') {
    if (type === 'before') {
      this._callbacks.before[name] = callback
    } else if (type === 'then') {
      this._callbacks.then[name] = callback
    } else if (type === 'catch') {
      this._callbacks.catch[name] = callback
    } else if (type === 'finally') {
      this._callbacks.finally[name] = callback
    }
    return this
  }
  
  /**
   * @param {*} mock
   * @param {number} timeout
   * @return {RequestBuilder}
   */
  mock(mock, timeout = 0) {
    this._mock = mock
    if (timeout) {
      this._mockTimeout = timeout
    }
    return this
  }
  
  /**
   * @param {number} version
   * @return {RequestBuilder}
   */
  v(version) {
    this._version = version
    return this
  }
  
  /**
   * @param {Object} data
   * @return {RequestBuilder}
   */
  data(data) {
    this._data = data
    return this
  }
  
  /**
   * @param {string} value
   * @return {RequestBuilder}
   */
  hash(value) {
    this._hash = value
    return this
  }
  
  /**
   * Позволяет передать все параметры одним объектом.
   * @example
   * get.params({
   *   sort: [
   *     'id,desc',
   *     'title,asc',
   *   ],
   *   search: 'lorem OR ipsum',
   *   filter: {
   *     id: 'between:null,10',
   *   },
   *   with: {
   *     users: {
   *       filter: { id: 'in:1,2,3', },
   *       with: {
   *         posts: {
   *           sort: [ 'id,desc', ],
   *         },
   *       },
   *     },
   *   },
   *   query: {
   *     other: 'value',
   *   },
   * })
   *
   * @param {QueryParamsInterface} params
   * @return {RequestBuilder}
   */
  params(params) {
    each(params, (value, key) => {
      if (this._query[key] !== undefined) {
        this[key](value)
      }
    })
    
    return this
  }
  
  /**
   * Позволяет передать любые другие параметры.
   * @example
   * .query({
   *   lorem: 'ipsum',
   * })
   *
   * @param {Object} query
   * @return {RequestBuilder}
   */
  query(query) {
    this._query.query = query
    return this
  }
  
  /**
   * Номер страницы, начинается с 1.
   * @example
   * .page(2)
   *
   * @param {number} page
   * @return {RequestBuilder}
   */
  page(page) {
    this._query.page = page
    return this
  }
  
  /**
   * Размер страницы.
   * @example
   * .size(20)
   *
   * @param {number} size
   * @return {RequestBuilder}
   */
  size(size) {
    this._query.size = size
    return this
  }
  
  /**
   * Сортировка. Можно указывать несколько вариантов сортировки одновременно.
   * Шаблон значения: [fieldName],[asc|desc]
   * @example
   * .sort('id,asc').sort('title,desc')
   * @example
   * .sort([ 'id,asc', 'title,desc', ])
   * .sort('id,asc', true) // remove title,desc
   *
   * @param {String[]|String} sort
   * @param {boolean} erase
   * @return {RequestBuilder}
   */
  sort(sort, erase = false) {
    if (erase) {
      this._query.sort = []
    }
    if (isString(sort)) {
      this._query.sort.push(sort)
    } else {
      this._query.sort = merge(this._query.sort, sort)
    }
    
    return this
  }
  
  /**
   * Полнотекстовый поиск.
   * @example
   * .search('lorem AND ipsum')
   *
   * @param {string} search
   * @return {RequestBuilder}
   */
  search(search) {
    this._query.search = search
    return this
  }
  
  /**
   * Позволяет фильтровать выдачу.
   * @example
   * .filter({ status: 'in:active,waited', id: 'in:1,2,3', })
   * .filter({ status: 'in:active,waited', }, true) // /remove filter by id
   *
   * @param {Object} filters
   * @param {boolean} erase
   * @return {RequestBuilder}
   */
  filter(filters, erase = false) {
    if (erase) {
      this._query.filter = []
    }
    this._query.filter = merge(this._query.filter, filters)
    
    return this
  }
  
  /**
   * @callback WithCallback
   * @param {RequestBuilder} q
   * @return {RequestBuilder}
   */
  /**
   * @example
   * api.get('users')
   *   .sort('id,desc')
   *   .filter({ role: 'moderator, })
   *   .with('posts', (q) => q
   *     .sort('id,desc')
   *     .filter({ status: 'archive', })
   *     .with('comments', (q) => q
   *       .sort('id,desc')))
   *   .then()
   * @example
   * .with({ posts: { with: { comments: null, }, }, })
   * .with({ posts: null, }, true) // remove comments
   * .with('posts', null, true) // or this
   *
   * @param {String|Object} relation
   * @param {WithCallback|Boolean} q
   * @param {boolean} erase
   * @return {RequestBuilder}
   */
  with(relation, q = null, erase = false) {
    if (!isString(relation)) {
      erase = q
    }
    if (erase) {
      this._query.with = {}
    }
    
    if (isString(relation)) {
      let value = null
      if (isFunction(q)) {
        value = q(new this.constructor('', 'get', () => {}))?._query || null
      }
      this._query.with[relation] = value
    } else {
      this._query.with = merge(this._query.with, relation)
    }
    
    return this
  }
  
  /**
   * Позволяет указать какие поля долнжы остаться чтобы уменьшить размер ответа.
   * @example
   * .fields([ 'id', 'title', ])
   *
   * @param {Array} fields
   * @param {boolean} erase
   * @return {RequestBuilder}
   */
  fields(fields, erase = false) {
    if (erase) {
      this._query.fields = []
    }
    this._query.fields = merge(this._query.fields, fields)
    
    return this
  }
  
  /**
   * @param {boolean} tree
   * @return {RequestBuilder}
   */
  tree(tree = true) {
    this._query.tree = tree
    return this
  }
  
  /**
   * @param {boolean} all
   * @return {RequestBuilder}
   */
  all(all = true) {
    this._query.all = all
    return this
  }
  
  /**
   * Получить результрирующий url.
   * @return {string}
   */
  url() {
    let url = ''
    
    if (isString(this._url)) {
      url = '/' + trim(this._url, '/')
    } else { // [ 'users*/articles*', 1, 2] -> 'users/1/articles/2'
      const parts = this._url[0].split('*')
      const params = this._url.slice(1)
      each(params, (item, index) => {
        if (item !== undefined) {
          parts[index] += `/${item}`
        }
      })
      url = '/' + trim(parts.join(''), '/')
    }
  
    let query = {
      ...this._query.query,
      ...this._query,
    }
    delete(query.query)
    query = this.constructor._serialize(query)
    
    const version = this._version ? `/v${this._version}` : ''
    const hash = this._hash ? `#${this._hash}` : ''
    
    return version + url + query + hash
  }
  
  /**
   * @param {Object} params
   * @return {string}
   * @protected
   */
  static _serialize(params) {
    const fn = (result, value, name, parent) => {
      const newParent = parent ? parent + '[' + name + ']' : name
      
      if (isArray(value)) {
        each(value, (v) => {
          result.push(newParent + '[]=' + v)
        })
      } else if (typeof value === 'object') {
        each(value, (v, n) => {
          result = fn(result, v, n, newParent)
        })
      } else {
        if (value) {
          result.push(newParent + '=' + value)
        }
      }
      
      return result
    }
    
    let result = fn([], params, '', '').join('&')
    if (result) result = '?' + result
    
    return result
  }
}
