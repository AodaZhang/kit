/**
 * @description jest配置文件
 * @author aodazhang 2020.01.26
 * @extends https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  // 1.jest测试范围：tests/unit目录下包含.spec脚本文件、__tests__目录下脚本文件
  testMatch: [
    // src目录下__tests__目录下所有脚本文件
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    // tests目录下所有 *.spec.ts *.test.ts
    '<rootDir>/tests/**/*.{spec,test}.{js,jsx,ts,tsx}'
  ],

  // 2.jest引入文件默认扩展名
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

  // 3.jest路径别名
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1' // @/映射为/src
  },

  // 4.jest每次运行前清除mock缓存
  clearMocks: true,

  // 5.jest运行的环境：在node上模拟dom的特性
  testEnvironment: 'jest-environment-jsdom',

  // 6.jest引入的不同扩展名模块使用前的转换
  transform: {
    // 引入静态资源文件：调用jest-transform-stub将静态资源转换为字符串，单元测试只测逻辑不测样式，没必要解析静态资源
    '.+\\.(css|less|sass|scss|styl|svg|png|jpg|ttf|woff|woff2)$': require.resolve(
      'jest-transform-stub'
    ),
    // 引入脚本文件：通过babel-jest转换es6+语法到es5
    '^.+\\.(ts|tsx|js|jsx)$': require.resolve('babel-jest')
  },

  // 7.jest忽略转换的目录
  transformIgnorePatterns: [
    // node_modules中的文件不需要通过babel-jest转换
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    // css modules的文件不需要通过cssTransform.js转换
    '^.+\\.module\\.(css|less|sass|scss|styl)$'
  ],

  // 8.jest代码覆盖率生成目录
  coverageDirectory: 'coverage',

  // 9.jest代码测试覆盖率统计来源
  collectCoverageFrom: [
    // 分析src下所有脚本文件
    'src/**/*.{ts,tsx,js,jsx}',
    // 不分析ts的类型声明文件
    '!src/**/*.d.ts'
  ],

  // 10.开启mock自动替换：src/demo.js -> src/__mocks__/demo.js
  // automock: true,

  // 11.jest watch模式插件
  watchPlugins: [
    // 'jest-watch-typeahead/filename',
    // 'jest-watch-typeahead/testname'
  ]
}
