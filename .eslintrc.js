module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true
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
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:vue/vue3-recommended',
    'eslint-config-airbnb-base',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'no-shadow': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    semi: 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'no-use-before-define': 'off',
    'no-param-reassign': 'off'
  },
  ignorePatterns: [
    '/src/demo/*', 'main.ts', '/src/App.vue'
  ]
}
