// const Dotenv = require('dotenv-webpack')

module.exports = {
  publicPath: '/',
  outputDir: 'public',
  assetsDir: 'assets',
  lintOnSave: false,
  runtimeCompiler: true, // если надо компилить строку в vue компоненты
  chainWebpack: (config) => {
    config.entry('app')
      .clear()
    config.entry('app')
      .add('./app/main.js')
    config.resolve
      .modules.add('app')
    config.resolve
      .modules.add('modules')
    
    // config.plugin('dotenv').use(Dotenv)
  },
}
