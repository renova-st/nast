module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'google',
    'plugin:vue/recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "comma-dangle": ["error", {
      "arrays": "always",
      "objects": "always",
      "imports": "always",
      "exports": "always",
      "functions": "never"
    }],
    'array-bracket-spacing': [
      'error',
      'always'
    ],
    'semi': [
      'error',
      'never'
    ],
    'indent': [
      'error',
      2
    ],
    'indent-legacy': [
      'error',
      2
    ],
    'arrow-parens': [
      'error',
      'always'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'max-len': [
      'error',
      {
        'code': 150
      }
    ],
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'sort-imports': 'off',
    'global-require': 'off',
    'no-trailing-spaces': 'off',
    'spaced-comment': 'off',
    'no-plusplus': 'off',
    'no-undef': 'off',
    'no-invalid-this': 'off',
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    'quote-props': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'vue/require-prop-types': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
