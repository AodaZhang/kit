/**
 * @description 工具相关函数-单元测试
 * @author aodazhang 2021.02.03
 */
import { tool } from '@/index'

describe('debounce', () => {
  it('1.正常调用', async () => {
    const delay = 200
    const fn = jest.fn()
    const debounceFn = tool.debounce(fn, delay)
    debounceFn()
    debounceFn()
    debounceFn()
    await new Promise(res => setTimeout(() => res(''), delay))
    expect(fn.mock.calls.length).toBe(1)
  })
})

describe('throttle', () => {
  it('1.正常调用', async () => {
    const delay = 300
    const fn = jest.fn()
    const throttleFn = tool.throttle(fn, delay)
    throttleFn()
    throttleFn()
    await new Promise(res => setTimeout(() => res(''), delay))
    throttleFn()
    throttleFn()
    await new Promise(res => setTimeout(() => res(''), delay))
    throttleFn()
    throttleFn()
    expect(fn.mock.calls.length).toBe(2)
  })
})

describe('chunkComponent', () => {
  it('1.正常调用', () => {
    const mock = { mobile: '1', pc: '2' }
    expect(tool.chunkComponent(mock)).toBe('2')
  })
})

describe('isPlainObject', () => {
  it('1.正常调用', () => {
    expect(tool.isPlainObject({})).toBe(true)
    expect(tool.isPlainObject([])).toBe(false)
    expect(tool.isPlainObject(1)).toBe(false)
    expect(tool.isPlainObject('1')).toBe(false)
    expect(tool.isPlainObject(true)).toBe(false)
    expect(tool.isPlainObject(null)).toBe(false)
    expect(tool.isPlainObject(undefined)).toBe(false)
    expect(tool.isPlainObject(new Image())).toBe(false)
    expect(tool.isPlainObject(new Date())).toBe(false)
  })
})

describe('deepClone', () => {
  it('1.正常调用', () => {
    const mock = {
      a: '1',
      b: 2,
      c: ['x', 'y', 'z'],
      d: { name: 'zxy', age: 18 },
      e: [
        {
          title: '标题1',
          content: '内容1'
        },
        {
          title: '标题2',
          content: '内容2'
        }
      ]
    }
    expect(tool.deepClone('1')).toBe('1')
    expect(tool.deepClone(2)).toBe(2)
    expect(tool.deepClone(false)).toBe(false)
    expect(tool.deepClone(null)).toBeNull()
    expect(tool.deepClone(undefined)).toBeUndefined()
    expect(mock).toBe(mock)
    expect(tool.deepClone(mock)).not.toBe(mock)
    expect(tool.deepClone(mock)).toEqual(mock)
  })
})

describe('createWaterMark', () => {
  it('1.快照调用', () => {
    expect(tool.createWaterMark).toMatchSnapshot()
  })

  it('2.入参非法', () => {
    expect(tool.createWaterMark(null)).toBe(false)
    expect(tool.createWaterMark(undefined)).toBe(false)
  })
})

describe('transformUtf16', () => {
  it('1.正常调用', () => {
    expect(tool.transformUtf16('test')).toBe('test')
  })

  it('2.入参非法', () => {
    expect(tool.transformUtf16(null)).toBe('')
    expect(tool.transformUtf16(undefined)).toBe('')
    expect(tool.transformUtf16('')).toBe('')
  })
})
