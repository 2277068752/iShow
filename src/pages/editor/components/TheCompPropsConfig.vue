<!--region 组件属性设置面板-->
<template>
  <div class="the-comp-props-config-page" :style="{ height: panelHeight }">
    <h2>组件设置</h2>
  </div>
</template>
<!--endregion-->
<script>

export default {
  components: {},
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  },
  computed: {
    panelHeight () {
      // 取父级组件中的父级标签属性
      let _parentHeight = 0
      try {
        _parentHeight = this.$parent.$refs.centerBox.offsetHeight
        return `${_parentHeight - 100}px`
      } catch (e) {
        return 0
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.the-comp-props-config-page {
  background-color: #fafafa;
  position: absolute;
  width: 200px;
  padding: 20px;
  overflow: hidden;
  box-shadow: 0 0 16px rgba(0, 0, 0, .16);
}
</style>
