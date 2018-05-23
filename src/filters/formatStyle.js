import {
  BG_REPECT,
  FONT_FAMILYS,
  FONT_SIZES,
  BORDER_STYLES,
  PATTERN_MATCH,
  TEXT_ALIGN
} from './modules/styleMatch.js'

const getCssObj = (key, value) => {
  const handler = {
    bg: () => {
      return {
        'background-color': value.c,
        'background-image': value.i,
        'background-repeat': BG_REPECT[value.t]
      }
    },
    bd: () => {
      return {
        'border-width': value.w + 'px',
        'border-style': BORDER_STYLES[value.t],
        'border-color': value.c
      }
    },
    ft: () => {
      return {
        'font-size': FONT_SIZES[value.s],
        'font-family': FONT_FAMILYS[value.t],
        'color': value.c
      }
    },
    ta: () => {
      console.log(' key:', key)
      console.log(' value:', value)
      return {
        'text-align': TEXT_ALIGN[value.t]
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
