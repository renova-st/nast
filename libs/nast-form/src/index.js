import merge from 'lodash/merge'
import NastLib from 'nast/Lib'
import mixin from './mixin'

/**
 *
 */
export default class NastForm extends NastLib {
  /**
   * @type {Object}
   * @protected
   */
  static _defaultConfig = {
    validations: {
      required(value) {
        return value.length > 0
      },
      email(value) {
        return value.indexOf('@') !== -1
      },
      phone(value) {
        return value.indexOf('+') !== -1
      },
    },
    messages: {
      required: 'Поле обязательно для заполнения',
      email: 'Поле должно быть email адресом',
      phone: 'Поле должно быть корректным телефонным номером',
      between: (name, params, value) => `Поле должно быть от ${params[0]} до ${params[1]}`,
    },
    input: (self, name, form) => ({
      name,
      value: self.$form.get(name, form),
      input: (value) => self.$form.set(name, value, form),
      danger: self.$form.errors(name, form),
      text: !self.$form.editable(form),
    }),
  }

  /**
   * Returns plugin object for Vue.use
   * @return {Object}
   */
  static vue() {
    const defConfig = this._defaultConfig
    return {
      install(Vue, config) {
        Vue.mixin(mixin(merge(defConfig, config)))
      },
    }
  }
}
