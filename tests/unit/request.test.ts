/**
 * @description 网络请求相关函数-单元测试
 * @author zhangxinyu 2021.02.03
 */
jest.mock('../mock/api')
import { KitResponseFailure, KitResponseSuccess } from '@/types'
import { fetchData1, fetchData2 } from '../mock/api'

describe('createAxiosInstance', () => {
  it('1.正常调用', async () => {
    const res: KitResponseSuccess<{
      name: string
      age: number
    }> = await fetchData1()
    expect(res.result).toEqual({
      name: 'zxy',
      age: 18
    })
  })

  it('2.异常调用', async () => {
    try {
      await fetchData2()
    } catch (e) {
      expect(e as KitResponseFailure).toEqual({
        message: '响应失败'
      })
    }
  })
})
