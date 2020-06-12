const fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var paths = require('../paths')

const customWebpackConfig = fs.existsSync(paths.webpack) ? require(paths.webpack) : null

module.exports = (config) => {
  var baseConfig = require('./base.config')(config, true)
  var __cwd = process.cwd()

  baseConfig.module.rules.push(
    {
      test: /\.tsx?$/,
      include: path.resolve(__cwd, 'src'),
      exclude: /node_modules/,
      use: [
        {
          loader: 'awesome-typescript-loader',
          options: {
            useCache: true,
            useBabel: true,
            babelOptions: {
              configFile: path.resolve(__cwd, './.babelrc')
            },
            babelCore: '@babel/core'
          }
        }
      ]
    }
  )
  if (customWebpackConfig) {
    const finalConfig = customWebpackConfig(baseConfig, 'dev')
    if (finalConfig) {
      baseConfig = finalConfig
    }
  }
  return baseConfig
}

