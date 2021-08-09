const path = require('path')

module.exports = (env) => {
  const name = env.name
  const entry = name === 'lib' ? './nast/src/Lib.js' : './'+name+'/src/index.js'
  const out = name === 'lib' ? 'Lib.js' : 'index.js'
  const dir = name === 'lib' ? 'nast' : name

  return {
    mode: 'production',
    devtool: 'source-map',
    entry,
    output: {
      path: path.resolve(__dirname, dir),
      filename: out,
      library: {
        type: 'umd',
      },
    },
    externals: [
      /^lodash\/.+$/,
      /^nast\/.+$/,
      'vue',
      'vuex',
      'vue-router',
      'axios',
      'nast',
      'nast-store',
      'nast-router',
    ],
  }
}
