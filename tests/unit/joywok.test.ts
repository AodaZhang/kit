/**
 * @description 乐工jssdk相关函数-单元测试
 * @author zhangxinyu 2021.02.03
 */
import { joywok } from '@/index'

// 测试登录token
const token = 'testToken'

beforeEach(() => {
  joywok.init('https://test132.maxuscloud.cn/sso', 'thinking', true, token)
})

describe('init', () => {
  it('1.mock调用', async () => {
    const token = 'testa'
    expect(
      joywok.init('https://test132.maxuscloud.cn/sso', 'thinking', true, token)
    ).toBe(true)
    const res = await joywok.getLoginUserToken()
    expect(res).toBe(token)
  })
})

describe('getLoginUserToken', () => {
  it('1.mock调用', async () => {
    const res = await joywok.getLoginUserToken()
    expect(res).toBe(token)
  })
})

describe('getLoginUserInfo', () => {
  it('1.mock调用', async () => {
    const mock = {
      id: '3355',
      name: '王芮',
      avatar: {
        avatar_l:
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=404772977,2536547250&fm=26&gp=0.jpg',
        avatar_s:
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=404772977,2536547250&fm=26&gp=0.jpg'
      }
    }
    const res = await joywok.getLoginUserInfo()
    expect(res).toEqual(mock)
  })
})

describe('getUserInfo', () => {
  it('1.mock调用', async () => {
    const mock = [
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
    const res = await joywok.getUserInfo(['3490'])
    expect(res).toEqual(mock)
  })
})

describe('setWebViewNavTitle', () => {
  it('1.mock调用', async () => {
    const mock = '测试标题'
    const res = await joywok.setWebViewNavTitle(mock)
    expect(document.title).toBe(mock)
    expect(res).toBe('Joywok导航栏标题设置成功')
  })
})

describe('setWebViewNavTitleColor', () => {
  it('1.mock调用', async () => {
    const mock = 'AAAAAA'
    const res = await joywok.setWebViewNavTitleColor(mock)
    expect(res).toBe('Joywok导航栏标题色设置成功')
  })
})

describe('setWebViewNavBgColor', () => {
  it('1.mock调用', async () => {
    const mock = 'AAAAAA'
    const res = await joywok.setWebViewNavBgColor(mock)
    expect(res).toBe('Joywok导航栏背景色设置成功')
  })
})

describe('pushWebViewUrl', () => {
  it('1.快照调用', () => {
    expect(joywok.pushWebViewUrl).toMatchSnapshot()
  })
})

describe('presentWebViewUrl', () => {
  it('1.快照调用', () => {
    expect(joywok.presentWebViewUrl).toMatchSnapshot()
  })
})
