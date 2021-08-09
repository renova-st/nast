// import resolve from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
// import json from '@rollup/plugin-json'
import fs from 'fs'
// import { getBabelOutputPlugin, } from '@rollup/plugin-babel'
// import sourcemaps from 'rollup-plugin-sourcemaps'

export default async (args) => {
  const name = args.name
  const files = fs.readdirSync('./' + name + '/src')
  const config = []

  for (let i = 0; i < files.length; i++) {
    const fileName = files[i]

    if (fileName.indexOf('.js') === -1) {
      continue
    }

    // config.push({
    //   input: './' + name + '/src/' + fileName,
    //   output: {
    //     // sourcemap: true,
    //     dir: name,
    //     format: 'es',
    //   },
    //   // plugins: [
    //   //   sourcemaps(),
    //   //   getBabelOutputPlugin({
    //   //     presets: [ '@babel/preset-env', ],
    //   //     plugins: [ [ '@babel/plugin-transform-runtime', { useESModules: true, }, ], ],
    //   //   }),
    //   // ],
    // })
  }

  return config
}
