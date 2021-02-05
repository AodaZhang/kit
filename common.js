/**
 * @description webpack、rollup定义文件
 * @author aodazhang 2021.02.02
 */
const path = require('path')

// 1.webpack配置定义
const entryPath = path.resolve(__dirname, './public') // webpack打包入口路径
const distPath = path.resolve(__dirname, './public-dist') // webpack打包输出路径
const entryName = 'index' // webpack入口ts文件名
const aliasName = {
  '@': path.resolve(__dirname, './src')
} // 文件引用路径别名：js -> '@/'、css -> '~@/'

// 2.rollup配置定义
const input = 'src/index.ts' // rollup打包入口ts文件
const name = 'kit' // rollup打包umd格式挂载变量名
const external = ['axios', 'crypto-js'] // rollup打包外部非编译依赖
const globals = { axios: 'axios', 'crypto-js': 'cryptoJs' } // rollup打包umd格式内部第三方库变量

module.exports = {
  entryPath,
  distPath,
  entryName,
  aliasName,
  input,
  name,
  external,
  globals
}
