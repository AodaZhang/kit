/**
 * @description 乐工jssdk相关函数
 * @author aodazhang 2021.02.03
 */
import request from '../request'
import {
  KitJoywokLoginUserInfo,
  KitJoywokUserInfo,
  KitAxiosInstance
} from '@/types'

/** Joywok SDK定义 */
declare const jw: {
  /** joywok sdk加载完毕 */
  ready: () => void
  /** joywok sdk配置 */
  config: (config: {
    /** 是否开启调试模式 */
    debug: boolean
    /** 免登录后获取的token */
    app_access_token: string
    /** 必填，公众号的唯一标识 */
    appid: string
    /** 企业 ID */
    corpid: string
    /** 必填，生成签名的随机串 */
    nonceStr: string
    /** 必填，签名 */
    signature: string
    /** 必填，生成签名的10位时间戳 */
    timestamp: string
  }) => void
  /** joywok sdk获取免登码 */
  getAuthCode: (
    params: { [key: string]: string },
    callback: KitJoywokCallback<{ code: string }>
  ) => void
  /** joywok sdk获取登陆用户信息 */
  getInfo: (
    callback: KitJoywokCallback<{ info: KitJoywokLoginUserInfo }>
  ) => void
  /** joywok sdk获取指定用户信息 */
  getUsers: (
    params: { [key: string]: string },
    callback: KitJoywokCallback<{ data: KitJoywokUserInfo[] }>
  ) => void
  /** joywok sdk设置webview导航栏标题 */
  setTitle: (params: { [key: string]: string }) => void
  /** joywok sdk设置webview导航栏标题色 */
  setTitleColor: (
    params: { [key: string]: string },
    callback: KitJoywokCallback<string>
  ) => void
  /** joywok sdk设置webview导航栏背景色 */
  setBarBg: (params: { [key: string]: string }) => void
  /** joywok sdk设置push webview */
  pushWebView: (url: string) => void
  /** joywok sdk设置present webview */
  newWebView: (url: string) => void
}

/** Joywok API回调 */
interface KitJoywokCallback<T> {
  /** 成功 */
  success: (res: T) => void
  /** 失败 */
  fail: () => void
}

/** Joywok SDK配置 */
interface KitJoywokConfig {
  /** 配置结果code */
  code: number
  /** 必填，公众号的唯一标识 */
  appId: string
  /** 企业 ID */
  corpId: string
  /** 必填，生成签名的随机串 */
  nonceStr: string
  /** 必填，签名 */
  sign: string
  /** 必填，生成签名的10位时间戳 */
  timeStamp: string
}

/** API接口响应码 */
enum RESPONSE_CODE {
  NORMAL = 200
}

/** 乐工axios实例 */
let axiosInstance: KitAxiosInstance = null
/** 乐工认证url */
const urlTemp = 'https://oam.saicmaxus.com'
/** 乐工认证code */
let appCodeTemp = ''
/** 是否完成乐工jssdk初始化 */
let isInit = false
/** 是否启动mock */
let isMock = false
/** mock登录token */
let mockToken = ''

/**
 * 初始化Jowok
 * @param baseURL 乐工接口baseURL
 * @param appCode 乐工应用code
 * @param isTest 是否在浏览器中mock乐工js sdk
 * @param testToken mock登录token
 * @returns 执行结果
 */
function init(
  baseURL: string,
  appCode: string,
  isTest = false,
  testToken = ''
): boolean {
  if (
    typeof baseURL !== 'string' ||
    !baseURL ||
    typeof appCode !== 'string' ||
    !appCode ||
    typeof isTest !== 'boolean' ||
    typeof testToken !== 'string'
  ) {
    return false
  }
  axiosInstance = request.createAxiosInstance(baseURL)
  appCodeTemp = appCode
  isMock = isTest
  mockToken = testToken || ''
  return true
}

/**
 * 初始化乐工js sdk
 * @returns 执行结果
 */
async function initJoywokSDK(): Promise<string> {
  if (isInit) {
    return '乐工jssdk初始化成功'
  }

  try {
    if (!axiosInstance || !appCodeTemp) {
      throw new Error()
    }

    // 1.加载乐工jssdk脚本
    await new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://www.joywok.com/dist/scripts/jssdk.js'
      script.onload = () => resolve('')
      script.onerror = () => reject()
      document.body.appendChild(script)
    })

    // 2.获取乐工后台配置信息
    const config = await axiosInstance.get('/login/loginSign', {
      params: { url: urlTemp, appCode: appCodeTemp }
    })
    const { code, appId, corpId, nonceStr, sign, timeStamp } = (config ||
      {}) as KitJoywokConfig
    if (code !== RESPONSE_CODE.NORMAL) {
      throw new Error()
    }

    // 3.初始化乐工jssdk
    await new Promise((resolve, reject) => {
      if (!jw) {
        reject()
      }
      // 乐工jssdk初始化完成callback
      jw.ready = () => {
        isInit = true
        resolve('')
      }
      // 乐工jssdk初始化
      jw.config({
        debug: true, // 开启调试模式
        app_access_token: '',
        appid: appId || '',
        corpid: corpId || '',
        nonceStr: nonceStr || '',
        signature: sign || '',
        timestamp: timeStamp || ''
      })
    })
    return '乐工jssdk初始化成功'
  } catch (e) {
    return Promise.reject('乐工jssdk初始化失败')
  }
}

/**
 * [登陆]获取登陆用户token
 * @returns 执行结果
 */
async function getLoginUserToken(): Promise<string> {
  if (isMock === true) {
    return mockToken
  }

  try {
    await initJoywokSDK()
    // 1.获取Joywok免登code
    const code = await new Promise<string>((resolve, reject) => {
      jw.getAuthCode(
        { url: urlTemp },
        {
          success: res => (!res || !res.code ? reject() : resolve(res.code)),
          fail: () => reject()
        }
      )
    })
    // 2.sso免登code换token
    const res = await axiosInstance.get('/login/loginByCode', {
      params: { code, appCode: appCodeTemp }
    })
    const { token } = (res || {}) as { token: string }
    if (!token) {
      throw new Error()
    }
    return `${token}`
  } catch (e) {
    return Promise.reject('JoywokToken获取失败')
  }
}

/**
 * [登录]获取登陆用户信息
 * @returns 执行结果
 */
async function getLoginUserInfo(): Promise<KitJoywokLoginUserInfo> {
  if (isMock === true) {
    return {
      id: '3355',
      name: '王芮',
      avatar: {
        avatar_l:
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=404772977,2536547250&fm=26&gp=0.jpg',
        avatar_s:
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=404772977,2536547250&fm=26&gp=0.jpg'
      }
    }
  }

  try {
    await initJoywokSDK()
    const info = await new Promise<KitJoywokLoginUserInfo>(
      (resolve, reject) => {
        jw.getInfo({
          success: res => (!res || !res.info ? reject() : resolve(res.info)),
          fail: () => reject()
        })
      }
    )
    return info
  } catch (e) {
    return Promise.reject('Joywok登陆用户信息获取失败')
  }
}

/**
 * [功能]获取指定用户信息
 * @param userNos 用户工号数组
 * @returns 执行结果
 */
async function getUserInfo(userNos: string[]): Promise<KitJoywokUserInfo[]> {
  if (isMock === true) {
    return [
      {
        employee_id: '3355',
        name: '王芮',
        avatar: {
          avatar_l:
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=404772977,2536547250&fm=26&gp=0.jpg',
          avatar_s:
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=404772977,2536547250&fm=26&gp=0.jpg'
        }
      },
      {
        employee_id: '3490',
        name: '杨学志',
        avatar: {
          avatar_l:
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2775553483,3936902174&fm=26&gp=0.jpg',
          avatar_s:
            'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2775553483,3936902174&fm=26&gp=0.jpg'
        }
      }
    ]
  }

  try {
    if (!Array.isArray(userNos)) {
      throw new Error()
    }
    await initJoywokSDK()
    const nos = Array.from(new Set(userNos)) // 工号去重
    const infos = await new Promise<KitJoywokUserInfo[]>((resolve, reject) => {
      jw.getUsers(
        {
          users: nos.join(','),
          type: 'num'
        },
        {
          success: res => (!res || !res.data ? reject() : resolve(res.data)),
          fail: () => reject()
        }
      )
    })
    return Array.isArray(infos) ? infos : []
  } catch (e) {
    return Promise.reject('Joywok指定用户信息获取失败')
  }
}

/**
 * [功能]设置WebView导航栏标题
 * @param title 标题
 * @returns 执行结果
 */
async function setWebViewNavTitle(title: string): Promise<string> {
  if (isMock === true) {
    document.title = title || ''
    return 'Joywok导航栏标题设置成功'
  }

  try {
    if (typeof title !== 'string' || !title) {
      throw new Error()
    }
    await initJoywokSDK()
    jw.setTitle({ title })
    return 'Joywok导航栏标题设置成功'
  } catch (e) {
    return Promise.reject('Joywok导航栏标题设置失败')
  }
}

/**
 * [功能]设置WebView导航栏标题色
 * @param color 颜色
 * @returns 执行结果
 */
async function setWebViewNavTitleColor(color: string): Promise<string> {
  if (isMock === true) {
    return 'Joywok导航栏标题色设置成功'
  }

  try {
    if (typeof color !== 'string' || !color) {
      throw new Error()
    }
    await initJoywokSDK()
    await new Promise((resolve, reject) => {
      jw.setTitleColor(
        { color },
        { success: () => resolve(''), fail: () => reject() }
      )
    })
    return 'Joywok导航栏标题色设置成功'
  } catch (e) {
    return Promise.reject('Joywok导航栏标题色设置失败')
  }
}

/**
 * [功能]设置WebView导航栏背景色
 * @param background 颜色
 * @returns 执行结果
 */
async function setWebViewNavBgColor(background: string): Promise<string> {
  if (isMock === true) {
    return 'Joywok导航栏背景色设置成功'
  }

  try {
    if (typeof background !== 'string' || !background) {
      throw new Error()
    }
    await initJoywokSDK()
    jw.setBarBg({ background })
    return 'Joywok导航栏背景色设置成功'
  } catch (e) {
    return Promise.reject('Joywok导航栏背景色设置失败')
  }
}

/**
 * [功能]导航push新WebView
 * @param url 跳转url
 * @returns 执行结果
 */
async function pushWebViewUrl(url: string): Promise<string> {
  if (isMock === true) {
    window.open(url || '', '_blank')
    return 'JoywokWebView开启成功'
  }

  try {
    if (typeof url !== 'string' || !url) {
      throw new Error()
    }
    await initJoywokSDK()
    jw.pushWebView(url)
    return 'JoywokWebView开启成功'
  } catch (e) {
    return Promise.reject('JoywokWebView开启失败')
  }
}

/**
 * [功能]导航present新WebView
 * @param url 跳转url
 * @returns 执行结果
 */
async function presentWebViewUrl(url: string): Promise<string> {
  if (isMock === true) {
    window.open(url || '', '_blank')
    return 'JoywokWebView开启成功'
  }

  try {
    if (typeof url !== 'string' || !url) {
      throw new Error()
    }
    await initJoywokSDK()
    jw.newWebView(url)
    return 'JoywokWebView开启成功'
  } catch (e) {
    return Promise.reject('JoywokWebView开启失败')
  }
}

export default {
  init,
  getLoginUserToken,
  getLoginUserInfo,
  getUserInfo,
  setWebViewNavTitle,
  setWebViewNavTitleColor,
  setWebViewNavBgColor,
  pushWebViewUrl,
  presentWebViewUrl
}
