import VueRouter from 'vue-router'
import Meta from 'vue-meta'
import { sync, } from 'vuex-router-sync'
import reduce from 'lodash/reduce'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import get from 'lodash/get'
import NastLib from 'nast/Lib'

/**
 *
 */
export default class NastRouter extends NastLib {
  /**
   * @type {Array}
   * @protected
   */
  _routes = []

  /**
   * @type {Object}
   * @protected
   */
  _store = {}
  
  /**
   * @type {{'pageName': RouterPageInterface}}
   * @protected
   */
  _pages = {}

  /**
   * @type {VueRouter}
   * @protected
   */
  _router = null

  /**
   * @type {Vue}
   * @protected
   */
  _vue = null
  
  /**
   * @type {Object}
   * @protected
   */
  static _defaultConfig = {
    config: {
      base: '/',
      mode: 'history',
      beforeEnter(to, next) {
        next()
      },
    },
  }
  
  /**
   * @param {Vue} vue
   * @param {Array} routes
   * @param {Object} store
   * @param {Object} config
   */
  constructor(vue, routes, store, config = {}) {
    super(config)
    
    this._vue = vue
    this._routes = routes
    this._store = store

    this._pages = this.constructor._reduceDeep(this._routes, (result, item) => {
      if (item.name) {
        result[item.name] = {
          title: global.__ ? global.__('pages.'.item.name) : (item.title || item.name),
          name: item.name,
          parent: item.parent || null,
          icon: item.icon || null,
        }
      }
      return result
    }, {})

    this.router()
  }

  /**
   * Позволяет изменить данные о роуте конкретно для этой страницы. При смене роута изменения пропадают.
   * @example
   * router.set({ data: { title: 'Example', }, }) // для текущего роута
   * @example
   * router.set('index', { data: { title: 'Example', }, }) // для родителя
   *
   * @param {String|Object} name
   * @param {Object} params
   * @private
   */
  set(name, params = undefined) {
    const thisName = this._store.state.route.name
    let parentName = name
    let thisParams = params
    if (!params) {
      parentName = thisName
      thisParams = name
    }
    if (thisName === parentName) {
      this._store.commit('router/setPage', { name: thisName, data: thisParams, })
    } else {
      this._store.commit('router/setParent', { name: thisName, parentName, data: thisParams, })
    }
  }
  
  /**
   * @return {RouterPageInterface}
   */
  current() {
    const name = this._store.state.route.name
    const data = this._store.getters['router/get'](name)
    return {
      ...this._pages[name],
      ...data,
    }
  }
  
  /**
   * @return {RouterPageInterface[]}
   */
  breadcrumbs() {
    let name = this._store.state.route.name
    const custom = this._store.getters['router/get'](name)
    const result = []
    let item
    while (name) {
      item = this._pages[name]
      if (!item) {
        break
      }
      const customItem = !result.length ? custom : get(custom['parents'], name, {})
      // const settingsItem = get(settings, name, (i) => ({}))({ ...item, data: customItem.data || {}, })
      result.push({
        ...item,
        route: item.name,
        // ...settingsItem,
        ...customItem,
        // title: this._getTitle(item, 'breadcrumbs', customItem['title'] || settingsItem['title'], customItem['data'] || settingsItem['data']),
      })
      name = item.parent
    }

    return result.reverse()
  }

  /**
   * @return {VueRouter}
   */
  router() {
    if (!this._router) {
      this._vue.use(Meta, {
        keyName: 'html',
        attribute: 'dv-meta',
        ssrAttribute: 'dv-meta-server-rendered',
        tagIDKeyName: 'mid',
      })

      this._vue.use(VueRouter)

      this._router = new VueRouter({
        ...this._config('config'),
        fallback: false,
        routes: this._routes,
      })

      sync(this._store, this._router)
    }

    return this._router
  }
  
  /**
   * Returns store object for vuex
   * @param {Object} config
   *
   * @return {Object}
   */
  static store(config = {}) {
    return {
      namespaced: true,
      state: {
        data: {
          // 'index': {
          //   ...page,
          //   parents: {},
          // },
        },
      },
      getters: {
        get: (state) => (name) => get(state['data'], name, {}),
      },
      mutations: {
        setPage: (state, { name, data, }) => {
          state['data'] = {
            ...state['data'],
            [name]: {
              ...get(state['data'], name, {}),
              ...data,
            },
          }
        },
        setParent: (state, { name, parentName, data, }) => {
          const val = get(state['data'], name, {})
          state['data'] = {
            ...state['data'],
            [name]: {
              ...val,
              parents: {
                ...get(val, 'parents', {}),
                [parentName]: data,
              },
            },
          }
        },
      },
    }
  }
  
  /**
   * @param {Array|Object} container
   * @param {Function} callback
   * @param {*} accumulator
   * @param {string} childrenName
   * @param {Function} parentData
   * @return {*}
   */
  static _reduceDeep(container, callback, accumulator, childrenName = 'children', parentData = undefined) {
    return reduce(container, (result, item, key) => {
      let _parentData = parentData
      const data = (d) => {
        if (d === undefined) return _parentData
        _parentData = d
      }
      result = callback(result, item, key, data)
      const children = item[childrenName]
      if (isArray(children) || isObject(children)) {
        result = this._reduceDeep(children, callback, result, childrenName, _parentData)
      }
      return result
    }, accumulator)
  }
}
