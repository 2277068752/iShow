// 背景重复
const BG_REPECT = {
  1: 'repeat',
  2: 'repeat-x',
  3: 'repeat-y',
  4: 'no-repeat'
}
// 字体集
const FONT_FAMILYS = {
  1: '微软雅黑',
  2: '宋体',
  3: '楷体',
  4: '仿宋',
  5: '黑体',
  6: 'Arial'
}
// 字体大小
const FONT_SIZES = {
  1: '12px',
  2: '14px',
  3: '16px',
  4: '18px',
  5: '20px',
  6: '22px',
  7: '24px',
  8: '26px',
  9: '28px',
  10: '30px',
  11: '32px',
  12: '34px',
  13: '36px',
  14: '48px',
  15: '64px'
}
// 边框类型
const BORDER_STYLES = {
  1: 'none',
  2: 'solid',
  3: 'dashed',
  4: 'dotted',
  5: 'double'
}
// 字体权重
const FONT_WEIGHT = {
  1: 300,
  2: 400,
  3: 500,
  4: 600,
  5: 700,
  6: 800
}
// 文本对齐方式
const TEXT_ALIGN = {
  1: 'left',
  2: 'center',
  3: 'right'
}

// 模式匹配
const PATTERN_MATCH = {
  w: {
    value: 'min-width',
    unit: 'px'
  },
  h: {
    value: 'min-height',
    unit: 'px'
  },
  t: {
    value: 'top',
    unit: 'px'
  },
  l: {
    value: 'left',
    unit: 'px'
  },
  lh: {
    value: 'line-height',
    unit: 'px'
  },
  br: {
    value: 'border-radius',
    unit: 'px'
  },
  c: 'color',
  bgc: 'background-color'
}
export {
  BG_REPECT,
  FONT_FAMILYS,
  FONT_SIZES,
  BORDER_STYLES,
  PATTERN_MATCH,
  TEXT_ALIGN,
  FONT_WEIGHT
}
