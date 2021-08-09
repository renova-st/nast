
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

    config.module
      .rule('raw')
      .test(/\.env$/)
      .use('raw')
      .loader('raw-loader')
  },
}
