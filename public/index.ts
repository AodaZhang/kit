import { date, device, joywok, storage, tool } from '@/index'

storage.init('test')
storage.setItem('aaa', { name: 'zxy', age: 18 })
storage.setItem('bbb', { name: 'sw', age: 18 })
storage.removeAllItem(['aaa'])
console.log(storage.getItem('aaa'), storage.getItem('bbb'))

device.calcDeviceRem()
tool.createWaterMark(['测试文字1', '测试文字2', '测试文字3', '测试文字4'])
console.log(date.numberToString(NaN))

joywok.init('https://test132.maxuscloud.cn/sso', 'thinking', true, 'abc')
joywok.getLoginUserToken().then(res => console.log(res))
