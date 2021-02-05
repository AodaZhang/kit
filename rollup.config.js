/**
 * @description 函数库rollup配置文件
 * @author aodazhang 2021.02.02
 */
// 一.rollup插件
import nodeResolve from 'rollup-plugin-node-resolve' // rollup编译目标文件与其依赖的第三方库进行合并
import commonjs from 'rollup-plugin-commonjs' // rollup支持使用commonjs规范
import json from 'rollup-plugin-json' // rollup支持读取json对象
import typescript2 from 'rollup-plugin-typescript2' // rollup编译ts

// 二.rollup定义
const { input, name, globals, external } = require('./common')
const pkg = require('./package.json')

// 三.rollup配置
const config = {
  // 1.打包的入口ts
  input,
  // 2.输出的目标js：它是一个对象数组，我们可以指定输出的格式，比如 umd 格式、es 模式等
  output: [
    // umd格式：通用模块定义，支持es5、amd、cjs、<script>
    { file: pkg.main, format: 'umd', sourcemap: false, name, globals },
    // es格式：支持esmodule
    { file: pkg.module, format: 'es', sourcemap: false }
  ],

  // 3.声明外部依赖：不会被打包进去
  external,
  // 4.监听变化的文件：重新编译，只有在编译的时候开启--watch才生效
  watch: {
    include: 'src/**'
  },
  // 5.编译过程中使用的插件
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript2({
      useTsconfigDeclarationDir: true // 使用tsconfig.json中declarationDir指定的类型文件
    })
  ]
}

export default config
