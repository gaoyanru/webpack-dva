/*
 * @Date: 2019-11-18 14:02:56
 * @LastEditors: fangbao
 * @LastEditTime: 2020-04-29 17:09:13
 * @FilePath: /xt-wms/Users/fangbao/Documents/xituan/xt-cli/src/scripts/start.js
 */
// 'use strict'
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const port = 3001
const entry = ''
var webpackConfig = require('./config/webpack/dev.config')({
  port,
  entry
})

const options = {
  inline: true,
  hot: true,
  overlay: true,
  stats: {
    colors: true,
    errors: true
  },
  // proxy: {
  //   '/api': {
  //     target: 'https://host.cn',
  //     changeOrigin: true,
  //     secure: false
  //   },
  // },
  // 启用gzip压缩一切服务:
  compress: true,
  host: '0.0.0.0',
  port,
  historyApiFallback: {
    index: '/index.html'
  }
}
WebpackDevServer.addDevServerEntrypoints(webpackConfig, options)
const compiler = webpack(webpackConfig)
const server = new WebpackDevServer(compiler, options)
server.listen(options.port, options.host, () => {
  console.log('Starting server on http://' + options.host + ':' + options.port)
})
