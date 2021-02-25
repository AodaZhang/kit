/**
 * @description 设备相关函数-单元测试
 * @author aodazhang 2021.02.03
 */
import { date } from '@/index'

describe('dateToString', () => {
  it('1.正常调用', () => {
    const nowDate = new Date('2021/02/03 07:50:33')
    expect(date.dateToString(nowDate)).toBe('2021-02-03')
    expect(date.dateToString(nowDate, 'yyyy.MM.dd')).toBe('2021.02.03')
  })

  it('2.入参非法', () => {
    expect(date.dateToString(null, null)).toBe('')
    expect(date.dateToString(undefined, undefined)).toBe('')
    expect(date.dateToString(new Date(), 'cccc')).toBe('cccc')
    expect(date.dateToString(null)).toBe('')
  })
})

describe('numberToString', () => {
  it('1.正常调用', () => {
    expect(date.numberToString(1612108800000)).toBe('2021.02.01')
  })

  it('2.入参非法', () => {
    expect(date.numberToString(null)).toBe('')
    expect(date.numberToString(undefined)).toBe('')
    expect(date.numberToString(-10086)).toBe('')
  })
})
