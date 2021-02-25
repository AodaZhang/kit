/**
 * @description canvas相关函数-单元测试
 * @author aodazhang 2021.02.04
 */
import { canvas } from '@/index'

describe('createTextImage', () => {
  it('1.快照调用', () => {
    expect(canvas.createTextImage).toMatchSnapshot()
  })

  it('2.入参非法', () => {
    expect(canvas.createTextImage(null)).toBe('')
    expect(canvas.createTextImage(undefined)).toBe('')
  })
})
