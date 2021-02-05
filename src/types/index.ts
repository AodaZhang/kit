/**
 * @description kit类型定义
 * @author zhangxinyu 2021.02.04
 */
import { AxiosInstance } from 'axios'

/** 设备类型 */
export type KitDeviceType = 'windows' | 'macos' | 'linux' | 'android' | 'ios'

/** Joywok登陆用户信息 */
export interface KitJoywokLoginUserInfo {
  /** 工号 */
  id?: string
  /** 姓名 */
  name?: string
  /** 头像 */
  avatar?: {
    /** 头像大图 */
    avatar_l: string
    /** 头像小图 */
    avatar_s: string
  }
}

/** Joywok指定用户信息 */
export interface KitJoywokUserInfo {
  /** 工号 */
  employee_id: string
  /** 姓名 */
  name: string
  /** 头像 */
  avatar: {
    /** 头像大图 */
    avatar_l: string
    /** 头像小图 */
    avatar_s: string
  }
}

/** Axios实例接口 */
export interface KitAxiosInstance extends AxiosInstance {
  cancel?: () => void
}

/** HTTP响应成功接口 */
export interface KitResponseSuccess<T = any> {
  /** 响应码 */
  code: number
  /** 响应是否成功 */
  success: boolean
  /** 响应数据加密方式 */
  format: 'raw' | 'aes'
  /** 响应信息 */
  msg: string
  /** 响应时间戳 */
  timeStamp: number
  /** 响应结果 */
  result: T
}

/** HTTP响应失败接口 */
export interface KitResponseFailure {
  message: string
}

/** web存储类型 */
export type KitStorageType = 'sessionStorage' | 'localStorage'
