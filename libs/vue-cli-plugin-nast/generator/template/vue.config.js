
module.exports = {
  publicPath: '/',
  outputDir: 'public',
  assetsDir: 'assets',
  lintOnSave: false,
  configureWebpack: {
    devtool: 'source-map',
  },
  transpileDependencies: [
    'nast',
    'nast-api',
    'nast-auth',
    'nast-date',
    'nast-form',
    'nast-helpers',
    'nast-router',
    'nast-secure',
    'nast-store',
    'nast-ui',
  ],
  chainWebpack: (config) => {
    config.entry('app')
      .clear()
    config.entry('app')
      .add('./app/main.js')
    config.resolve
      .modules.add('app')
  },
}
