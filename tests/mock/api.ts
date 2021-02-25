/**
 * @description api接口mock
 * @author aodazhang 2021.02.04
 */
import { request } from '@/index'
import { KitResponseSuccess } from '@/types'

const instance = request.createAxiosInstance('/api')

export const fetchData1 = (): Promise<
  KitResponseSuccess<{
    name: string
    age: number
  }>
> => instance.get('/success')

export const fetchData2 = (): Promise<unknown> => instance.get('/error')
