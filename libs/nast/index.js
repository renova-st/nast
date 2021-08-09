import Vue from 'vue'
import get from 'lodash/get'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import isFunction from 'lodash/isFunction'
import NastRouter from 'nast-router'
import NastStore from 'nast-store'
import NastLib from './Lib'

/**
 *
 */
export default class NastCore extends NastLib {
  /**
   * @type {Object}
   * @protected
   */
  static _defaultConfig = {}
  
  /**
   * @param {Object} settings
   * @param {Object} libs
   * @return {this}
   */
  static createApp(settings, libs = {}) {
    if (!libs.store) libs.store = { NastStore, }
    if (!libs.router) libs.router = { NastRouter, }
    console.log(settings.env)
    return ''
    global.$env = (key, def) => get(settings.env || {}, key, def)
    global.$config = (key, def) => get(settings.config ? settings.config() : {}, key, def)
    global.$n = settings.fn ? settings.fn() : {}
    /** @var {RestApi} */
    global.$api = settings.api?.RestApi ? new (settings.api.RestApi)() : {}

    const allStores = {
      ...(settings.stores || {}),
      ...this._getLibsStores(libs),
    }
    const store = new libs.store.NastStore(Vue, allStores, $config('store'))
    const router = new libs.router.NastRouter(Vue, settings.routes, store.store(), $config('router'))
    
    // Globals
    global.$app = {
      store,
      router,
      api: libs.api ? new (libs.api.NastApi)(libs.api.RequestBuilder, $config('api')) : {},
      auth: libs.auth ? new (libs.auth.NastAuth)(store.store(), router.router(), $config('auth')) : {},
      date: libs.date ? new (libs.date.NastDate)($config('date')) : {},
      form: libs.form ? new (libs.form.NastForm)($config('form')) : {},
      secure: libs.secure ? new (libs.secure.NastSecure)($config('secure')) : {},
    }
    // end Globals
  
    Vue.mixin({
      computed: {
        $env() {
          return $env
        },
        $config() {
          return $config
        },
        $n() {
          return $n
        },
        $api() {
          return $api
        },
        $app() {
          return $app
        },
      },
    })
    map(this._getLibsPlugins(libs), (plugin, name) => {
      if (plugin) {
        Vue.use(plugin, $config(name))
      }
    })

    return new Vue({
      router: router.router(),
      store: store.store(),
      render: (h) => h(this._appVue()),
    }).$mount('#app')
  }
  
  
  /**
   * Вызывает функцию store() в каждой библиотеке и возвращает объектом
   * @param {Object} libs
   * @return {Object}
   * @protected
   */
  static _getLibsStores(libs) {
    return reduce(libs, (result, lib, name) => {
      const func = lib['Nast' + name.charAt(0).toLocaleUpperCase() + name.slice(1)].store
      if (isFunction(func)) {
        result[name] = func($config(name))
      }
      return result
    }, {})
  }
  
  /**
   * Достает функцию vue из каждой библиотеки
   * @param {Object} libs
   * @return {Object}
   * @protected
   */
  static _getLibsPlugins(libs) {
    return reduce(libs, (result, lib, name) => {
      const func = lib['Nast' + name.charAt(0).toLocaleUpperCase() + name.slice(1)].vue
      if (isFunction(func)) {
        result[name] = func()
      }
      return result
    }, {})
  }
  
  /**
   * @return {Object}
   * @protected
   */
  static _appVue() {
    return {
      name: 'App',
      html() {
        const meta = {
          meta: [
            { charset: 'utf-8', },
            { name: 'mobile-web-app-capable', content: 'yes', },
            { name: 'apple-mobile-web-app-capable', content: 'yes', },
            { name: 'apple-mobile-web-app-status-bar-style', content: 'default', },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, minimal-ui', },
          ],
          link: [
            // { rel: 'apple-touch-icon', sizes: '120x120', href: `${$config('app.baseUrl')}assets/static/120.png`, },
            // { rel: 'shortcut icon', sizes: '48x48', href: `${$config('app.baseUrl')}assets/static/48.png`, },
          ],
          htmlAttrs: {
            lang: 'ru',
          },
        }
        
        // if ($config('app.manifest.use')) {
        //   meta.link.push({ rel: 'manifest', href: `${$config('app.baseUrl')}assets/static/manifest.json`, })
        // }
        
        return meta
      },
      // props: [ 'libs', ],
      mounted() {
        // this.libs.data.loazdData(this.$router, this.$route)
      },
      render(h) {
        return h('div', { attrs: { id: 'app', }, }, [
          h('router-view'),
        ])
      },
    }
  }
}

export {
  NastLib,
}
