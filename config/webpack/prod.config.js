const fs = require('fs')
var path = require('path')
var webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');
var paths = require('../paths')
const customWebpackConfig = fs.existsSync(paths.webpack) ? require(paths.webpack) : null

module.exports = (config) => {
  var baseConfig = require('./base.config')(config, false)
  var __cwd = process.cwd()
  baseConfig.module.rules.push(
    {
      test: /\.tsx?$/,
      include: path.resolve(__cwd, 'src'),
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__cwd, './.babelrc')
          }
        },
        {
          loader: 'ts-loader',
          options: {
            context: __cwd,
            configFile: path.resolve(__cwd, './tsconfig.json')
          }
        }
      ]
    }
  )
  baseConfig.optimization = {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: true,
            drop_debugger: true,
            drop_console: true
          }
        }
      })
    ]
  }
  if (customWebpackConfig) {
    const finalConfig = customWebpackConfig(baseConfig, 'prod')
    if (finalConfig) {
      baseConfig = finalConfig
    }
  }
  return baseConfig
}