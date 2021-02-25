/**
 * @description 设备相关函数-单元测试
 * @author aodazhang 2021.02.03
 */
import { device } from '@/index'

describe('getDeviceType', () => {
  it('1.正常调用', () => {
    expect(device.getDeviceType()).toBe('windows')
  })
})

describe('getDeviceIsMobile', () => {
  it('1.正常调用', () => {
    expect(device.getDeviceIsMobile()).toBe(false)
  })
})

describe('getDeviceDpr', () => {
  it('1.正常调用', () => {
    expect(device.getDeviceDpr()).toBe(1)
  })
})

describe('getDeviceWidth', () => {
  it('1.正常调用', () => {
    expect(device.getDeviceWidth()).toBe(1024)
  })
})

describe('getDeviceType', () => {
  it('1.正常调用', () => {
    expect(device.getDeviceHeight()).toBe(768)
  })
})

describe('calcDeviceRem', () => {
  it('1.正常调用', () => {
    device.calcDeviceRem(null, 1024)
    expect(getComputedStyle(document.documentElement).fontSize).toBe('100px')
  })
})
