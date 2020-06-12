var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// 返回node进程的当前工作目录
var __cwd = process.cwd()
var {
  getFileLoaderConfig,
  getStyleLoaderConfig,
  getImageLoaderConfig,
  ExtractTextPlugin
} = require('./utils')

// 直接导出一个对象 和一个函数return 好处
module.exports = (config = {}, dev = true) => {
  const entry = config.entry
  const outdir = config.outdir || 'dist'
  var plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__cwd, 'src/index.html'),
      // 要把<script>标签插入到页面哪个标签里(body|true|head|false)
      inject: true,
      favicon: path.resolve(__cwd, 'src/favicon.ico')
    }),
    new webpack.HotModuleReplacementPlugin(),
    ExtractTextPlugin(dev),
    new webpack.ProvidePlugin({
      APP: path.resolve(__cwd, 'src/utils/app')
    })
  ]
  return {
    mode: dev ? 'development' : 'production',
    entry: { // 单页面和多页面 key value 形式
      app: path.resolve(__cwd, 'src/', entry) // path.resolve 从后向前 若字符以/开头，不会拼接到前面的路径；若以../开头拼接到前面的路径，且不含最后一节；若以./开头或者没有符号则拼接前面的路径
    },
    output: {
      path: path.resolve(__cwd, outdir),  /// 要去路径都是绝对路径
      filename: dev ? undefined : 'js/' + '[name]-[hash].bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          enforce: 'pre', // 标识应用这些规则即使规则被覆盖
          test: /\.(js|ts)x?$/,
          include: path.resolve(__cwd, 'src'),
          use: [
            'source-map-loader',
            'eslint-loader'
          ]
        }, 
        {
          test: /\.jsx?$/,
          include: path.resolve(__cwd, 'src'),
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__cwd, './.babelrc')
            }
          }
        },
        ...getStyleLoaderConfig(dev),
        getImageLoaderConfig(dev),
        getFileLoaderConfig(dev)
      ]
    },
    plugins: plugins,
    resolve: { // 解析模块请求的选项
      modules: [
        path.resolve(__cwd, 'node_modules'),
        path.resolve(__cwd, 'src')
      ], 
      extensions: [
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.min.js',
        '.json',
        '.styl',
        '.css'
      ], // 使用的扩展名
      alias: { // 模块别名列表
        '@': path.join(__cwd, 'src')
      }
    },
    devtool: dev ? 'source-map' : '' // 方便调试
  }
}
