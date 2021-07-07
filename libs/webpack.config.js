const path = require('path')

module.exports = (env) => {
  const name = env.name
  const entry = name === 'lib' ? './nast/src/Lib.js' : './'+name+'/src/index.js'
  const out = name === 'lib' ? 'Lib.js' : 'index.js'
  const dir = name === 'lib' ? 'nast' : name

  return {
    entry,
    output: {
      path: path.resolve(__dirname, dir),
      filename: out,
      library: {
        name,
        type: 'umd',
      },
    },
    externals: [
      /^lodash\/.+$/,
      /^nast\/.+$/,
      'vue',
      'axios',
      'nast',
      'nast-store',
      'nast-router',
    ],
  }
}
