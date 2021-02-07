/**
 * @description 工具相关函数
 * @author zhangxinyu 2021.02.03
 */
import canvas from '../canvas'
import device from '../device'

/**
 * 防抖
 * @param fn 目标函数
 * @param delay 延迟时间
 * @returns 防抖函数
 */
function debounce(fn: Function, delay = 200): Function {
  let timer: NodeJS.Timeout = null
  return function (...rest: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(fn, rest)
    }, delay)
  }
}

/**
 * 节流
 * @param fn 目标函数
 * @param delay 间隔时间
 * @returns 节流函数
 */
function throttle(fn: Function, delay = 200): Function {
  let lastTime = new Date().getTime()
  return function (...rest: unknown[]) {
    const nowTime = new Date().getTime()
    if (nowTime - lastTime >= delay) {
      fn.apply(fn, rest)
      lastTime = nowTime
    }
  }
}

/**
 * 根据不同终端加载不同chunk包
 * @param chunk chunk包集合
 * @returns 对应终端chunk包
 */
function chunkComponent<T>(chunk: { mobile: T; pc: T }): T {
  return device.getDeviceIsMobile() ? chunk.mobile : chunk.pc
}

/**
 * 判断传入参数是否为普通对象
 * @param obj 校验对象
 * @returns 校验结果
 */
function isPlainObject(obj: unknown): boolean {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 深拷贝
 * @param target 目标值
 * @returns 拷贝值
 */
function deepClone<T>(target: T): T {
  if (typeof target !== 'object' || target == null) {
    return target
  }
  const clone: any = Array.isArray(target) ? [] : {}
  for (const [key, value] of Object.entries(target)) {
    if (Reflect.hasOwnProperty.call(target, key)) {
      clone[key] = deepClone(value)
    }
  }
  return clone
}

/**
 * 创建屏幕水印
 * @param texts 水印文字数组
 * @param opacity 水印透明度
 * @returns 执行结果
 */
export function createWaterMark(texts: string[], opacity?: string): boolean {
  // 删除旧节点
  const id = 'waterMark'
  const oldDiv = document.getElementById(id)
  oldDiv && oldDiv.parentNode && oldDiv.parentNode.removeChild(oldDiv)

  if (!Array.isArray(texts)) {
    return false
  }

  const url = canvas.createTextImage(texts)
  if (!url) {
    return false
  }

  // 创建新节点
  const div = document.createElement('div')
  div.id = id
  div.style.position = 'fixed'
  div.style.zIndex = '9999'
  div.style.top = '-50%'
  div.style.left = '-50%'
  div.style.right = '-50%'
  div.style.bottom = '-50%'
  div.style.opacity = typeof opacity !== 'string' ? '0.25' : opacity
  div.style.transformOrigin = 'center'
  div.style.transform = 'rotate(-35deg)'
  div.style.pointerEvents = 'none'
  div.style.backgroundImage = `url(${url})`
  document.body.appendChild(div)
  return true
}

/**
 * 转换字符串中的utf16内容为实体字符
 * @param content 原始内容
 * @returns 转换结果
 */
export function transformUtf16(content: string): string {
  if (typeof content !== 'string' || !content) {
    return ''
  }
  // 检测utf16字符正则
  const pattern = /[\ud800-\udbff][\udc00-\udfff]/g
  // utf16编码的字符转换成实体字符
  const result = content.replace(pattern, char => {
    let H, L, code
    if (char.length === 2) {
      H = char.charCodeAt(0) // 取出高位
      L = char.charCodeAt(1) // 取出低位
      code = (H - 0xd800) * 0x400 + 0x10000 + L - 0xdc00 // 转换算法
      return '&#' + code + ';'
    } else {
      return char
    }
  })
  return result
}
/**
 * 平滑滚动至顶部
 */
export function scrollToTop(): void {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}
export default {
  debounce,
  throttle,
  chunkComponent,
  isPlainObject,
  deepClone,
  createWaterMark,
  transformUtf16,
  scrollToTop
}
