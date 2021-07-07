import NastLib from 'nast/Lib'
import isString from 'lodash/isString'

/**
 *
 */
export default class NastAuth extends NastLib {
  /**
   * @type {Object}
   * @protected
   */
  static _defaultConfig = {
    loginRoute: 'login',
    authRoute: 'index',
    apiAuth: (token) => {},
  }
  
  /**
   * @type {Vuex}
   * @protected
   */
  _store
  
  /**
   * @type {VueRouter}
   * @protected
   */
  _router
  
  /**
   * @param {Vuex} store
   * @param {VueRouter} router
   * @param {Object} config
   */
  constructor(store, router, config = {}) {
    super(config)
    
    this._store = store
    this._router = router
  }
  
  /**
   * Вызываем на старте приложения
   */
  init() {
    const lsAuth = JSON.parse(localStorage.getItem('auth'))
    const token = lsAuth?.token
    const user = lsAuth?.user
    if (token && user) {
      this._store.commit('auth/login', { user, token, })
    }

    if (this.loggedIn()) {
      this.apiLogin()
    }
  }
  
  /**
   * @param {Object} user
   * @param {string} token
   */
  login(user, token) {
    this._store.commit('auth/login', { user, token, })
    this.apiLogin()
  }
  
  /**
   * @return {boolean}
   */
  loggedIn() {
    return Boolean(this._store.getters['auth/token'])
  }
  
  /**
   *
   */
  logout() {
    this._store.commit('auth/logout')
    this.needAuth()
  }
  
  /**
   * Получаем текущего юзера, если передан параметр - обновляем юзера
   * @param {Object} user
   * @return {Object}
   */
  user(user = undefined) {
    if (user) {
      this._store.commit('auth/setUser', user)
    }
    return this._store.getters['auth/user']
  }
  
  /**
   * @param {boolean} needAuth
   */
  needAuth(needAuth = true) {
    let route = this._config(needAuth ? 'loginRoute' : 'authRoute')
    if (isString(route)) {
      route = { name: route, }
    }

    if ((needAuth && !this.loggedIn()) || (!needAuth && this.loggedIn())) {
      this._router.push(route)
    }
  }
  
  /**
   * Обновление/установка аутентификации в апи
   */
  apiLogin() {
    this._config('apiAuth')(this._store.getters['auth/token'])
  }
  
  /**
   * Returns store object for vuex
   * @param {Object} config
   * @return {Object}
   */
  static store(config = {}) {
    return {
      namespaced: true,
      state: {
        user: {},
        token: '',
        _save: [ 'user', 'token', ],
      },
      getters: {
        user: (state) => {
          return state.user
        },
        token: (state) => {
          return state.token
        },
      },
      mutations: {
        login(state, { user, token, }) {
          state.user = user
          state.token = token
          localStorage.setItem('auth', JSON.stringify({ user, token, }))
        },
        logout(state) {
          state.user = null
          state.token = ''
          localStorage.removeItem('auth')
        },
        setUser(state, user) {
          state.user = user
          localStorage.setItem('auth', JSON.stringify({ user, token: state.token, }))
        },
      },
    }
  }
}
