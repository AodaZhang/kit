/**
 * @description eslint配置文件
 * @author aodazhang 2020.12.06
 */

module.exports = {
  // 1.表示当前目录层级为ESLint最终配置，ESLint不会再往上层寻找配置
  root: true,
  // 2.配置当前项目环境
  env: {
    browser: true, // 使用canvas相关interface不会报错
    node: true // 使用require不会报错
  },
  // 3.配置解析器
  parser: '@typescript-eslint/parser', // 使用@typescript-eslint/parser解析TypeScript代码
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  // 4.配置插件
  plugins: [
    '@typescript-eslint' // @typescript-eslint/eslint-plugin是ESLint用来配置具体的检查规则的插件
  ],
  // 5.配置扩展：配置检测规则
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  // 6.自定义规则
  rules: {
    'no-console': 'warn', // [警告]使用console
    'no-debugger': 'warn', // [警告]使用debugger
    'space-before-function-paren': 'off', // [关闭]在function的左括号之前使用空格
    '@typescript-eslint/no-unused-vars': 'error', // [错误]存在未使用变量
    '@typescript-eslint/no-explicit-any': 'warn', // [警告]使用any类型
    '@typescript-eslint/ban-types': 'warn', // [警告]使用禁令类型
    '@typescript-eslint/no-namespace': 'warn' // [警告]使用ts module、namespace语法，esmodule优先级高于该语法
  }
}
