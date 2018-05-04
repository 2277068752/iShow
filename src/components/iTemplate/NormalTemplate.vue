<template>
  <div class="normal-template-wrapper">
    <!--region 文本框-->
    <div v-if="toolJson.key === 1" class="item item-comp">
      请输入文本
    </div>
    <!--endregion-->
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    toolJson: {} // 当前tool的Json数据
  },
  data () {
    return {
      toolObj: {}
    }
  },
  created () {
    if (this.toolJson) {
      this.toolObj = this.toolJson
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
    initTextTool () {
      // let _style = this.toolObj.style
      /* let _tempStyleObj = {
         fontFamily: _style['font-family'],
         fontSize: `${_style['font-size']}px`,
         color: _style['color'],
         height: _style['height'],
         width: _style['width'],
         fontWeight: _style['']
       } */
    }
  }
}
</script>

<style lang="scss">
.normal-template-wrapper {
  background-color: #fff;
}
</style>
