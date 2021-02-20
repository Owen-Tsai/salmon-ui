/**
 * Configurations for build package entirely
 */

const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')

module.exports =  merge(baseConfig, {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/lib/',
    filename: 'salmon-ui.min.js',
    library: 'salmon-ui',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  // externalize vue package so
  // the build files won't contain source code of vue
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  }
})
