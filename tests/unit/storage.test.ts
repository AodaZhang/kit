/**
 * @description 存储相关函数-单元测试
 * @author zhangxinyu 2021.02.03
 */
import { storage } from '@/index'

// 测试storageKey
const storageKey = 'test'
// 测试localStorage查询函数
const getValue = (key: string, sKey: string = storageKey) => {
  return JSON.parse(localStorage.getItem(`${sKey}_${key}`) || 'null')
}

beforeEach(() => {
  storage.init(storageKey)
  storage.removeAllItem()
})

describe('init', () => {
  it('1.正常调用', () => {
    const storageKey = 'abc'
    const key = 'def'
    const value = '1'
    expect(storage.init(storageKey)).toBe(true)
    expect(storage.setItem(key, value)).toBe(true)
    expect(storage.getItem(key)).toBe(getValue(key, storageKey))
  })

  it('2.入参非法', () => {
    expect(storage.init('')).toBe(false)
  })
})

describe('setItem', () => {
  it('1.正常调用', () => {
    const key = 'test1'
    const value = '1'
    expect(storage.setItem(key, value)).toBe(true)
    expect(getValue(key)).toBe(value)
  })

  it('2.入参非法', () => {
    expect(storage.setItem('', '1')).toBe(false)
  })
})

describe('getItem', () => {
  it('1.正常调用', () => {
    const key = 'test1'
    const value = { a: 1, b: '2' }
    expect(storage.setItem(key, value)).toBe(true)
    expect(storage.getItem(key)).toEqual(value)
    expect(getValue(key)).toEqual(value)
    expect(storage.getItem('test2')).toBe(null)
  })

  it('2.入参非法', () => {
    expect(storage.getItem('')).toBe(null)
  })
})

describe('removeItem', () => {
  it('1.正常调用', () => {
    const key = 'test1'
    const value = { a: 1, b: '2' }
    expect(storage.setItem(key, value)).toBe(true)
    expect(storage.getItem(key)).toEqual(value)
    expect(getValue(key)).toEqual(value)
    expect(storage.removeItem(key)).toBe(true)
    expect(storage.getItem(key)).toBe(null)
  })

  it('2.入参非法', () => {
    expect(storage.removeItem('')).toBe(false)
  })
})

describe('removeAllItem', () => {
  it('1.正常调用', () => {
    const object = {
      test1: { a: 1, b: '1' },
      test2: { a: 2, b: '2' },
      test3: { a: 3, b: '3' }
    }
    for (const [key, value] of Object.entries(object)) {
      expect(storage.setItem(key, value)).toBe(true)
    }
    expect(storage.removeAllItem(['test1'])).toBe(true)
    expect(storage.getItem('test1')).toEqual(object.test1)
    expect(storage.getItem('test2')).toBe(null)
    expect(storage.removeAllItem([])).toBe(true)
    for (const key of Object.keys(object)) {
      expect(storage.getItem(key)).toBe(null)
    }
  })
})
