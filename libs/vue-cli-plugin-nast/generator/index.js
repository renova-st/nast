
module.exports = (api, options, rootOptions) => {
  const pkg = {
    dependencies: {
      'lodash': '^4.*',
      'nast': '^1.*',
      'nast-api': '^1.*',
      'nast-auth': '^1.*',
      'nast-date': '^1.*',
      'nast-form': '^1.*',
      'nast-helpers': '^1.*',
      'nast-router': '^1.*',
      'nast-secure': '^1.*',
      'nast-store': '^1.*',
      'nast-ui': '^1.*',
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
