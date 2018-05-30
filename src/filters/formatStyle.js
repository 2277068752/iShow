import {
  BG_REPECT,
  FONT_FAMILYS,
  FONT_SIZES,
  BORDER_STYLES,
  PATTERN_MATCH,
  TEXT_ALIGN,
  FONT_WEIGHT
} from './modules/styleMatch.js'

const getCssObj = (key, value) => {
  const handler = {
    // 背景
    bg: () => {
      return {
        'background-color': value.c,
        'background-image': value.i,
        'background-repeat': BG_REPECT[value.t]
      }
    },
    // 边框类型
    bd: () => {
      return {
        'border-width': value.w + 'px',
        'border-style': BORDER_STYLES[value.t],
        'border-color': value.c
      }
    },
    // 阴影
    bs: () => {
      return {
        'box-shadow': `${value.h}px ${value.v}px ${value.b}px ${value.s}px ${value.c}`
      }
    },
    // 字体
    ft: () => {
      return {
        'font-size': FONT_SIZES[value.s],
        'font-family': FONT_FAMILYS[value.t],
        'font-weight': FONT_WEIGHT[value.fw],
        'font-style': value.fs ? 'italic' : 'normal',
        'text-decoration': value.td ? 'underline' : 'none',
        'line-height': value.lh,
        'letter-spacing': value.ls + 'px',
        'color': value.c
      }
    },
    // 对齐方式
    ta: () => {
      return {
        'text-align': TEXT_ALIGN[value] || 'left'
      }
    }
  }
  const handleValue = handler[key] && handler[key]()
  return handleValue || {}
}
export default (css, ...filterProps) => {
  if (!css || typeof css !== 'object') {
    return ''
  }
  let newCss = {}
  for (let key in css) {
    const propName = PATTERN_MATCH[key]
    const propVal = css[key]
    // 跳过指定的属性
    if (filterProps.includes(key)) {
      continue
    }
    // 属性值为 null 、 undefined跳过
    if (!propVal) {
      continue
    }
    // 对应 PATTERN_MATCH
    if (propName) {
      if (typeof propName === 'object') {
        newCss[propName.value] = `${propVal}${propName.unit}`
      } else {
        newCss[propName] = propVal
      }
    } else {
      Object.assign(newCss, getCssObj(key, propVal))
    }
  }
  return newCss
}
