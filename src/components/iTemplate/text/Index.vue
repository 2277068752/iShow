<!--region 文本框组件-->
<template>
  <div class="c-text">
    <a :style="linkStyle | formatStyle" href="#" v-html="compObj.props.text"></a>
  </div>
</template>
<!--endregion-->
<script>
export default {
  name: 'BaseText',
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    // 取对应ID的组件
    compObj () {
      return this.$store.getters.getCompConfigByCompId(this.id)
    },
    // 字体css
    linkStyle () {
      let css = this.compObj.css
      // 内联标签仅仅需要对字体设置css样式
      return {
        ft: css.ft
      }
    }
  }
}
</script>
