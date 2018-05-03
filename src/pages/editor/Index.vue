<template>
  <div class="editor-index">
    <the-tools></the-tools>
    <!--region 中间区域分为三个区间-->
    <div class="index-center">
      <the-template-list></the-template-list>
      <div class="editor-box">
        <div class="editor-wrapper">
          <template v-for="item in toolList">
            <normal-template :toolJson="item" :key="item.key"></normal-template>
          </template>
        </div>
      </div>
      <the-setting-elements></the-setting-elements>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
import TheSettingElements from './components/TheSettingElements'
import TheTemplateList from './components/TheTemplateList'
import TheTools from './components/TheTools'
import NormalTemplate from '../../components/iTemplate/NormalTemplate'
import Bus from '../../base/bus'
import { mapState } from 'vuex'

export default {
  components: { TheSettingElements, TheTemplateList, TheTools, NormalTemplate },
  data () {
    return {
      toolJson: {}
    }
  },
  created () {
  },
  mounted () {
    // this.initTool()
  },
  computed: {
    ...mapState({
      toolList: ({ global }) => global.toolCurrent
    })
  },
  methods: {
    // 初始化 tool
    /* initTool () {
      Bus.$on('addTool', function (val) {
        this.toolJson = val
      })
    } */
  }
}
</script>

<style lang="scss">
@import "../../styles/variables";

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
    .editor-box {
      width: 100%;
      background-color: #eee;
      display: flex;
      align-items: center;
      .editor-wrapper {
        margin: 0 auto;
        border-top: 30px solid #ddd;
        border-bottom: 30px solid #ddd;
        border-right: 4px solid #ddd;
        border-left: 4px solid #ddd;
        border-radius: 24px;
        width: 375px;
        height: 667px;
        background-color: #fff;
      }
    }
  }
}
</style>
