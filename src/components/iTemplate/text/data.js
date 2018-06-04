/**
 * 文本框组件 配置参数
 */
export default () => {
  return {
    id: 1,
    title: '文字',
    name: 'Text',
    type: 1, // 基本信息
    animation: {
      type: 1,
      duration: 1,
      delay: 0.4
    }, // 动画
    props: {
      text: '这是一些文字'
    }, // 文本
    css: {
      t: 100, // 顶部距离
      l: 100, // 左侧距离
      w: 150, // 宽度
      h: 30, // 高度
      bd: {
        w: 1,
        t: 2,
        c: '#eee'
      }, // 边框属性
      ta: 2, // 文本对齐属性
      br: 5, // 边框圆角
      ft: {
        s: 1, // size
        t: 1, // family
        fw: 1, // weight
        c: '#333',
        td: false, // 是否有下划线
        fs: false, // 字体是否倾斜
        lh: 2.5, // 行高
        ls: 2 // 行间距
      }, // 字体属性
      rotate: 0, // 旋转角度
      bgc: '#fff', // 背景色
      bs: {
        h: 0,
        v: 0,
        b: 0,
        s: 0,
        c: '#ccc'
      }
    } // css样式
  }
}
