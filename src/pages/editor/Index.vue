<template>
  <div class="editor-index">
    <the-tools></the-tools>
    <!--region 中间区域分为三个区间-->
    <div class="index-center" ref="centerBox">
      <the-template-list></the-template-list>
      <div class="editor-box">
        <the-editor-container></the-editor-container>
      </div>
      <the-page-list></the-page-list>
      <the-comp-props-config></the-comp-props-config>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
import ThePageList from './components/ThePageList'
import TheTemplateList from './components/TheTemplateList'
import TheTools from './components/TheTools'
import TheEditorContainer from './components/TheEditorContainer'
import TheCompPropsConfig from './components/TheCompPropsConfig'

export default {
  components: {
    ThePageList,
    TheTemplateList,
    TheTools,
    TheEditorContainer,
    TheCompPropsConfig
  },
  data () {
    return {
      toolJson: {},
      panelWidthAndHeight: {
        width: 200,
        height: 400
      }
    }
  },
  created () {
    // 初始化
    this.$store.dispatch('initPageEditor')
  },
  mounted () {
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss">
@import "../../styles/variables";
@import "../../styles/mixin";

.editor-index {
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .index-center {
    box-sizing: border-box;
    flex: 0 0 calc(#{"100% - "+ $tool-header-height +""});
    display: flex;
    flex-direction: row;
    position: relative;
    .editor-box {
      @include scrollBar;
      box-sizing: border-box;
      width: 100%;
      overflow-y: auto;
      padding: 40px 0;
      background-color: #eee;
    }
  }
}
</style>
