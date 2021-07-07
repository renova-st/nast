import NastLib from 'nast/Lib'

/**
 *
 */
export default class NastHelpers extends NastLib {
  /**
   * @type {Object}
   * @protected
   */
  static _defaultConfig = {}
  
  /**
   * Returns plugin object for Vue.use
   *
   * @return {Object}
   */
  static vue() {
    return {
      install(Vue, config) {
        Vue.mixin({
          data: () => ({
            var_vars: {},
          }),
          methods: {
            $var(name, value = undefined) {
              if (value === undefined) {
                return this.var_vars[name]
              } else {
                this.$set(this.var_vars, name, value)
              }
            },
          },
        })
      },
    }
  }
}
