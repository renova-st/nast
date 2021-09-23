const utils = require('./utils')
const fs = require('fs')

/**
 *
 *
 * @param {object} api https://cli.vuejs.org/dev-guide/plugin-api.html#chainwebpack
 * @param {object} config vue.config.js
 */
module.exports = (api, config) => {
  const env = utils.parseEnvFile(fs.readFileSync(api.resolve('.env'), 'utf8'))

  api.chainWebpack((webpackConfig) => {
    webpackConfig.plugin('define').tap((definitions) => {
      definitions[0] = Object.assign(definitions[0], {
        ENV: `${JSON.stringify(env)}`,
      })
      return definitions
    })

    const fn = webpackConfig.module.rule('js').exclude.values()[0]
    webpackConfig.module.rule('js').exclude
      .clear()
    webpackConfig.module.rule('js').exclude
      .add((...args) => {
        if (args[0].indexOf('node_modules\\nast') !== -1) return false
        return fn(...args)
      })
  })
}
