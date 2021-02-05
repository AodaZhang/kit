/**
 * @description webpack配置文件
 * @author aodazhang 2021.02.02
 */
// 一.webpack插件
const { HotModuleReplacementPlugin } = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// 二.webpack定义
const { entryPath, distPath, entryName, aliasName } = require('./common')

// 三.webpack配置
const config = {
  performance: false,
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    [entryName]: `${entryPath}/${entryName}.ts`
  },
  resolve: {
    // 路径别名：js -> '@/'、css -> '~@/'
    alias: aliasName,
    // 默认扩展名
    extensions: ['.ts', '.js']
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: distPath
  },
  devServer: {
    contentBase: distPath,
    port: 3000,
    open: false, // 禁止自动打开浏览器
    hot: true, // webpack-dev-server开启热模块重载功能hmr
    hotOnly: true // hmr不生效浏览器也不刷新
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        distPath // build前清空目录
      ]
    }),
    new htmlWebpackPlugin({
      template: `${entryPath}/index.html`, // html原始模板位置
      favicon: `${entryPath}/favicon.ico`, // html原始favicon位置
      filename: 'index.html', // html生成模板名
      chunks: [`${entryName}`], // 匹配entry的key
      title: '测试页面', // html标题
      meta: {
        viewport:
          'width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no' // html自适应移动端
      }
    }),
    new HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    usedExports: true, // 开启tree shaking
    splitChunks: {
      chunks: 'all', // 对同步+异步引入的js开启code splitting
      cacheGroups: {
        // vendors组规则：node_modules中文件使用
        vendor: {
          test: /node_modules/,
          name: 'node_modules',
          priority: 1, // 拆分权重：优先级1
          minSize: 0 * 1024, // 拆分最小体积：进行拆分js文件的最小体积，>0kb拆分
          minChunks: 1 // 拆分最小复用：进行拆分js文件的最少import次数，>1次拆分
        },
        // common组规则
        common: {
          name: 'common',
          priority: 0, // 优先级0
          minSize: 0 * 1024, // >0kb拆分
          minChunks: 2 // >1次拆分
        }
      }
    }
  }
}

module.exports = config
