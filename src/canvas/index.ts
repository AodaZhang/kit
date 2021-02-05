/**
 * @description canvas相关函数
 * @author zhangxinyu 2021.02.04
 */

/**
 * 绘制文字canvas并转换为图片
 * @param texts 文字数组
 * @param fontSize 字号
 * @param fontColor 字色
 * @param rowSpacing 字间距
 * @returns canvas图片base64
 */
function createTextImage(
  texts: string[],
  fontSize?: number,
  fontColor?: string,
  rowSpacing?: number
): string {
  if (!Array.isArray(texts) || !texts.length) {
    return ''
  }
  const fSize = fontSize || 14 // 字号
  const fColor = fontColor || 'gray' // 字色
  const rSpacing = rowSpacing || fSize * 0.5 // 字间距
  // 1.字符长度数组
  const textLengths = texts.map(item => {
    const text = typeof item === 'string' ? item : ''
    // 中文字符过滤为双单字符
    /*eslint no-control-regex: "off"*/
    const newItem = text.replace(/[^\x00-\xff]/g, '**').length
    return newItem
  })
  // 2.获取字符长度数组中的最大值
  const textLengthMax = Math.max.apply(Math, [...textLengths])
  // 3.列宽和行高
  const lineWidth = fSize * textLengthMax + rSpacing
  const lineHeight = fSize + rSpacing
  // 4.创建canvas和绘制上下文
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(lineWidth, 150) // canvas最小宽度150
  canvas.height = Math.max(rSpacing + lineHeight * texts.length, 120) // canvas最小高度120
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.save()
  context.fillStyle = fColor
  context.font = `${fSize}px Arial`
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.beginPath()
  texts.forEach((text, index) => {
    context.fillText(text, canvas.width / 2, rSpacing + lineHeight * index)
  })
  context.closePath()
  context.restore()
  return canvas.toDataURL('image/png')
}

export default {
  createTextImage
}
