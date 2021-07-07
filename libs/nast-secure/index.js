import xss from 'xss'
import NastLib from 'nast/Lib'

/**
 *
 */
export default class NastSecure extends NastLib {
  /**
   * @type {Object}
   * @protected
   */
  static _defaultConfig = {
    whiteList: { p: [], br: [], },
  }
  
  /**
   * Get xss cleaned content
   *
   * @param {string} value
   * @param {object} whiteList
   * @return {string}
   */
  clean(value, whiteList = undefined) {
    if (!whiteList) {
      whiteList = this._config('whiteList')
    }
  
    return xss(value, { whiteList, })
  }
  
  /**
   * Returns plugin object for Vue.use
   *
   * @return {Object}
   */
  static vue() {
    return {
      install(Vue, config) {
        Vue.mixin({
          methods: {
            $clean(value, whiteList = undefined) {
              return $app.secure.clean(value, whiteList)
            },
          },
        })
      },
    }
  }
}
