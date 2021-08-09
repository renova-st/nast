
module.exports = (api, options, rootOptions) => {
  const pkg = {
    dependencies: {
      'lodash': '^4.*',
      'nast': '^1.*',
    },
    eslintConfig: {
      root: true,
      env: {
        node: true,
      },
      extends: [
        'renova',
      ],
      parserOptions: {
        parser: 'babel-eslint',
      },
      rules: {},
    },
  }

  api.extendPackage(pkg, { merge: false, })

  api.render('./template')
}
