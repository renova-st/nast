const reduce = require('lodash/reduce')
const trim = require('lodash/trim')

/**
 * @param {string} env
 * @return {Object}
 * @protected
 */
module.exports.parseEnvFile = (env) => {
  if (env) {
    return reduce(env.split('\r\n') || [], (result, item) => {
      const parts = item.split('=')
      let value = parts[1]
      value = trim(value)
      value = trim(value, '\'')
      if (value === 'true') value = true
      else if (value === 'false') value = false
      else {
        value = `"${value}"`
      }
      result[parts[0]] = value

      return result
    }, {})
  }

  return {}
}
