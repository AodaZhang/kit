import { KitResponseSuccess } from '@/types'

export const fetchData1 = (): Promise<
  KitResponseSuccess<{
    name: string
    age: number
  }>
> =>
  new Promise(resolve =>
    resolve({
      code: 200,
      success: true,
      format: 'raw',
      msg: '响应成功',
      timeStamp: 10086,
      result: {
        name: 'zxy',
        age: 18
      }
    })
  )

export const fetchData2 = (isResolve: boolean = false): Promise<unknown> =>
  new Promise((resolve, reject) => {
    isResolve
      ? resolve('')
      : reject({
          message: '响应失败'
        })
  })
