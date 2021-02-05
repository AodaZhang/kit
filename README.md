# @aodazhang/kit

[![npm](https://img.shields.io/npm/v/@aodazhang/kit)](https://www.npmjs.com/package/@aodazhang/kit)
[![taonpm](https://npm.taobao.org/badge/v/@aodazhang/kit.svg)](https://developer.aliyun.com/mirror/npm/package/@aodazhang/kit)
[![downloads](https://npm.taobao.org/badge/d/@aodazhang/kit.svg)](https://developer.aliyun.com/mirror/npm/package/@aodazhang/kit)
[![prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

一个轻量级的 JavaScript 业务函数库，由 TypeScript 编写类型友好，支持 TreeShaking。

### 安装

```shell
npm i @aodazhang/kit -S
# or
yarn add @aodazhang/kit -S
```

### 引入

- ESModule

  ```typescript
  import { date } from '@aodazhang/kit'

  const time = date.dateToString(new Date('2021/02/03 00:00:00'), 'yyyy.MM.dd')
  console.log(time) // -> '2021.02.03'
  ```

- CommonJS

  ```typescript
  const { date } = require('@aodazhang/kit')

  const time = date.dateToString(new Date('2021/02/03 00:00:00'), 'yyyy.MM.dd')
  console.log(time) // -> '2021.02.03'
  ```

### NPM Script

- `npm run dev`：启动测试服务器运行代码
- `npm run build`：运行打包脚本，生成 jest 测试报告并输出 umd、es 格式的目标代码
- `npm run test:watch`：运行 jest 测试脚本并挂起
- `npm run test:coverage`：运行 jest 测试脚本并生成测试覆盖率报告
- `npm run lint:fix`：运行 eslint 检查代码风格并修复代码
- `npm run commit`：运行 commitizen 提交符合 Angluar 规范的 git commit 信息
- `npm run changelog`：更新 npm version 并生成 changelog

### Function

#### 1.canvas 绘图相关函数

- **`createTextImage(texts: string[], fontSize?: number, fontColor?: string, rowSpacing?: number): string`**：绘制文字 canvas 并转换为图片

#### 2.date 日期相关函数

- **`dateToString(date: Date, pattern = 'yyyy-MM-dd'): string`**：格式化日期：Date 对象 转换 pattern 格式字符串
- **`numberToString(time: number): string`**：格式化日期：1612108800000 转换 '2021.02.01'

#### 3.device 设备相关函数

- **`getDeviceType(): KitDeviceType`**：获取当前运行设备类型
- **`getDeviceIsMobile(): boolean`**：判断设备是否为移动端
- **`getDeviceDpr(): number`**：获取设备 dpr
- **`getDeviceWidth(): number`**：获取设备宽度
- **`getDeviceHeight(): number`**：获取设备高度
- **`calcDeviceRem(mobileFitSize?: number, pcFitSize?: number, pcMinWidth?: number): void`**：根据设备宽度计算 rem

#### 4.joywok 乐工 jssdk 相关函数

- **`init(baseURL: string, appCode: string, isTest: boolean = false, testToken: string = ''): boolean`**：初始化 Jowok
- **`getLoginUserToken(): Promise<string>`**：获取登陆用户 token
- **`getLoginUserInfo(): Promise<KitJoywokLoginUserInfo>`**：获取登陆用户信息
- **`getUserInfo(userNos: string[]): Promise<KitJoywokUserInfo[]>`**：获取指定用户信息
- **`setWebViewNavTitle(title: string): Promise<string>`**：设置 WebView 导航栏标题
- **`setWebViewNavTitleColor(color: string): Promise<string>`**：设置 WebView 导航栏标题色
- **`setWebViewNavBgColor(background: string): Promise<string>`**：设置 WebView 导航栏背景色
- **`pushWebViewUrl(url: string): Promise<string>`**：导航 push 新 WebView
- **`presentWebViewUrl(url: string): Promise<string>`**：导航 present 新 WebView

#### 5.request 网络请求相关函数

- **`createAxiosInstance(baseURL: string, aesKey?: string, toast?: Function, enctype?: REQUEST_ENCTYPE, timeout?: number, useCancel?: boolean): KitAxiosInstance`**：axios 实例创建函数

#### 6.storage 存储相关函数

- **`init(key: string, type: KitStorageType = 'localStorage'): boolean`**：初始化 storage
- **`setItem(key: string, value: unknown): boolean`**：增、改 storage 指定 key
- **`getItem(key: string): unknown`**：查 storage 指定 key
- **`removeItem(key: string): boolean`**：删 storage 指定 key
- **`removeAllItem(ignoreKeys: string[] = []): boolean`**：删 storage 所有 key

#### 7.tool 工具相关函数

- **`debounce(fn: Function, delay = 200): Function`**：防抖
- **`throttle(fn: Function, delay = 200): Function`**：节流
- **`chunkComponent<T>(chunk: { mobile: T; pc: T }): T`**：根据不同终端加载不同 chunk 包
- **`isPlainObject(obj: unknown): boolean`**：判断传入参数是否为普通对象
- **`deepClone<T>(target: T): T`**：深拷贝
- **`createWaterMark(texts: string[], opacity?: string): boolean`**：创建屏幕水印
- **`transformUtf16(content: string): string`**：转换字符串中的 utf16 内容为实体字符
