/**
 * @description 网络请求相关函数
 * @author zhangxinyu 2021.02.03
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import cryptoJs from 'crypto-js'
import storage from '../storage'
import {
  KitAxiosInstance,
  KitResponseSuccess,
  KitResponseFailure
} from '@/types'

/** Content-Type编码格式 */
type KitRequestEnctype =
  | 'application/json;charset=UTF-8'
  | 'application/x-www-form-urlencoded;charset:UTF-8'
  | 'multipart/form-data'

/** HTTP状态响应码 */
enum RESPONSE_STATUS {
  错误请求 = 400,
  请重新登录 = 401,
  服务器拒绝访问 = 403,
  服务器未找到该资源 = 404,
  非法的http请求方法 = 405,
  请求超时 = 408,
  服务器错误 = 500,
  网络未实现 = 501,
  网络错误 = 502,
  服务不可用 = 503,
  网络超时 = 504,
  http版本不支持该请求 = 505
}

/**
 * axios实例创建函数
 * @param baseURL 请求根路径
 * @param aesKey AES解密key
 * @param toast 错误提示
 * @param enctype request Content-Type
 * @param timeout request 超时时间
 * @param useCancel 是否开启axios取消请求功能
 */
function createAxiosInstance(
  baseURL: string,
  aesKey?: string,
  toast?: Function,
  enctype?: KitRequestEnctype,
  timeout?: number,
  useCancel?: boolean
): KitAxiosInstance {
  // 1.axios实例
  const axiosInstance: KitAxiosInstance = axios.create({
    baseURL: baseURL || '',
    timeout: timeout || 10000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': enctype || 'application/json;charset=UTF-8'
    }
  })

  // 2.axios请求取消函数集合
  const cancelMap = new Map()

  // 3.取消之前全部网络请求
  axiosInstance.cancel = () => {
    for (const [key, value] of cancelMap) {
      value && value()
      cancelMap.delete(key)
    }
  }

  // 4.请求拦截器
  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // [取消请求]增加取消请求token
      if (useCancel === true) {
        const source = axios.CancelToken.source()
        cancelMap.set(source.token, source.cancel)
        config.cancelToken = source.token
      }
      // [登陆]增加登录态
      const token = storage.getItem('token')
      token && (config.headers['token'] = token)
      return config
    },
    e => {
      return Promise.reject(e)
    }
  )

  // 5.响应拦截器
  axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => {
      const { config, data } = res
      const { cancelToken } = config || {}
      const { format, timeStamp, result } = (data || {}) as KitResponseSuccess
      // [取消请求]已响应请求不取消
      if (useCancel === true) {
        cancelToken && cancelMap.delete(cancelToken)
      }
      // [解码]对加密数据执行AES解码
      if (format === 'aes' && typeof aesKey === 'string' && aesKey) {
        data.result = aesDecrypt(result, timeStamp, aesKey)
      }
      return data
    },
    (e: AxiosResponse<KitResponseFailure>) => {
      // [错误提示]存在错误原则则提示
      if (toast instanceof Function) {
        const { status, data } = e || {}
        const { message } = data || {}
        const reason = message || RESPONSE_STATUS[status]
        reason && toast(reason)
      }
      return Promise.reject(e)
    }
  )
  return axiosInstance
}

/**
 * AES解密
 * @param result AES加密字符串
 * @param timeStamp 时间戳
 * @param aesKey AES解密key
 * @returns 解密对象
 */
function aesDecrypt(
  result: string,
  timeStamp: number,
  aesKey: string
): unknown {
  if (
    typeof result !== 'string' ||
    !result ||
    typeof timeStamp !== 'number' ||
    isNaN(timeStamp) ||
    typeof aesKey !== 'string' ||
    !aesKey
  ) {
    return {}
  }
  try {
    // 解密Key
    const key = `${aesKey}@${timeStamp}`
    // AES解密对象
    const AES_KEY = cryptoJs.enc.Hex.parse(cryptoJs.MD5(key).toString())
    // AES解密数据
    const decodeData = cryptoJs.AES.decrypt(result, AES_KEY, {
      mode: cryptoJs.mode.ECB,
      padding: cryptoJs.pad.Pkcs7
    })
    // 序列化对象
    const serializeData = cryptoJs.enc.Utf8.stringify(decodeData).toString()
    // 反序列化对象
    return JSON.parse(serializeData || '{}')
  } catch (e) {
    return {}
  }
}

export default { createAxiosInstance }
