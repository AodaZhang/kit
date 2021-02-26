/**
 * 金额小写转换成大写金额方法
 * @param value 为string类型
 */
function formatChineseNumeral(value: string): string {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(value)) {
    return
  }
  let unit = '仟佰拾亿仟佰拾万仟佰拾元角分'
  let str = ''
  value += '00'
  const p = value.indexOf('.')
  if (p >= 0) {
    value = value.substring(0, p) + value.substr(p + 1, 2)
  }
  unit = unit.substr(unit.length - value.length)
  for (let i = 0; i < value.length; i++) {
    str +=
      '零壹贰叁肆伍陆柒捌玖'.charAt(Number(value.charAt(i))) + unit.charAt(i)
  }
  return str
    .replace(/零(仟|佰|拾|角)/g, '零')
    .replace(/(零)+/g, '零')
    .replace(/零(万|亿|元)/g, '$1')
    .replace(/(亿)万/g, '$1$2')
    .replace(/^元零?|零分/g, '')
    .replace(/元$/g, '元整')
}

export default {
  formatChineseNumeral
}
