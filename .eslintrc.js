module.exports = {
  env: {
    node: true,
    // 'vue/setup-compiler-macros': true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/html-self-closing': 'off',
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'semi': 'off'
  },
  ignorePatterns: [
    '/src/demo/*', 'main.ts'
  ]
}
