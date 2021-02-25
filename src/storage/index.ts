/**
 * @description 存储相关函数
 * @author aodazhang 2021.02.03
 */
import { KitStorageType } from '../types'

/** web存储命名空间 */
let storageKey: string = null
/** web存储类型 */
let storageType: KitStorageType = 'localStorage'

/**
 * 获取web存储完整key
 * @param key 数据key
 * @returns web存储完整key
 */
function getFullKey(key: string): string {
  return storageKey ? `${storageKey}_${key}` : `${key}`
}

/**
 * 初始化storage
 * @param key web存储命名空间
 * @param type web存储类型
 * @returns 执行结果
 */
function init(key: string, type: KitStorageType = 'localStorage'): boolean {
  if (
    typeof key !== 'string' ||
    !key ||
    (type !== 'localStorage' && type !== 'sessionStorage')
  ) {
    return false
  }
  storageKey = key
  storageType = type
  return true
}

/**
 * 增、改storage指定key
 * @param key 存储key
 * @param value 存储value
 * @param type web存储类型
 * @returns 执行结果
 */
function setItem(key: string, value: unknown): boolean {
  const storage = window[storageType]
  try {
    if (!storage || !key) {
      throw new Error()
    }
    storage.setItem(getFullKey(key), JSON.stringify(value || null))
    return true
  } catch (e) {
    return false
  }
}

/**
 * 查storage指定key
 * @param key 存储key
 * @param type web存储类型
 * @returns 查询结果
 */
function getItem(key: string): unknown {
  const storage = window[storageType]
  try {
    if (!storage || !key) {
      throw new Error()
    }
    return JSON.parse(storage.getItem(getFullKey(key)) || 'null')
  } catch (e) {
    return null
  }
}

/**
 * 删storage指定key
 * @param key 存储key
 * @param storageKey web存储命名空间
 * @param type web存储类型
 * @returns 执行结果
 */
function removeItem(key: string): boolean {
  const storage = window[storageType]
  try {
    if (!storage || !key) {
      throw new Error()
    }
    storage.removeItem(getFullKey(key))
    return true
  } catch (e) {
    return false
  }
}

/**
 * 4.删storage所有key
 * @param ignoreKeys 忽略移除的存储key
 * @returns 执行结果
 */
function removeAllItem(ignoreKeys: string[] = []): boolean {
  const storage = window[storageType]
  try {
    if (!storage) {
      throw new Error()
    }
    Array.isArray(ignoreKeys)
      ? (ignoreKeys = ignoreKeys.map(key => getFullKey(key)))
      : (ignoreKeys = [])
    Object.keys(storage).forEach(key => {
      if (
        !storageKey ||
        (key.startsWith(storageKey) && !ignoreKeys.includes(key))
      ) {
        storage.removeItem(key)
      }
    })
    return true
  } catch (e) {
    return false
  }
}

export default {
  init,
  setItem,
  getItem,
  removeItem,
  removeAllItem
}
