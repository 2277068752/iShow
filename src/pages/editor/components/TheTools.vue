<template>
  <!--region 顶部各种组件列表-->
  <div class="the-header-tools">
    <div class="logo" v-show="false">
      <img src="../../../assets/logo.png"/>
    </div>
    <ul class="tool-wrapper">
      <template v-for="item in toolList">
        <li class="item" :key="item.key" @click="handleAddComponent('Text')">
          <span class="axon-icon" v-html="item.icon">
          </span>
          <span>{{ item.label }}</span>
        </li>
      </template>
    </ul>
    <!--region 操作按钮-->
    <el-row class="action-group">
      <el-button size="small" type="primary">预览</el-button>
      <el-button size="small" type="primary">保存</el-button>
      <el-button size="small" type="primary">发布</el-button>
      <el-button size="small" type="danger">退出</el-button>
    </el-row>
    <!--endregion-->
  </div>
  <!--endregion-->
</template>

<script>
// import Bus from '../../../base/bus'
import Json from '../../../../static/json/tools'

export default {
  components: {},
  data () {
    return {
      data: Json
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    // 过滤 tool 列表
    toolList () {
      return this.data.filter(_x => _x.state === 1)
    }
  },
  methods: {
    /**
     * 组件插入
     */
    handleAddComponent (name) {
      this.$store.dispatch('addNewComp', name)
    }
  }
}
</script>

<style lang="scss">
@import "../../../styles/variables";

.the-header-tools {
  background-color: $main-bg;
  width: 100%;
  flex: 0 0 $tool-header-height;
  border-bottom: 1px solid $border-color-1;
  display: flex;
  flex-direction: row;
  .tool-wrapper {
    width: 100%;
    text-align: center;
    .item {
      width: 56px;
      padding-top: 8px;
      height: 56px;
      display: inline-block;
      cursor: pointer;
      &:hover {
        background-color: #1593ff;
        opacity: 1;
        span {
          color: #fff !important;
        }
      }
      span {
        text-align: center;
        display: block;
        font-size: 12px;
        color: #333;
        &.axon-icon {
          color: #333;
          font-weight: 500;
          font-size: 20px;
          padding-bottom: 4px;
        }
      }
    }
  }
  .logo {
    flex: 0 0 $template-width;
    text-align: center;
    padding-top: 10px;
    border-right: 1px solid $border-color-1;
    img {
      width: 80%;
      height: 40px;
    }
  }
  .action-group {
    flex: 0 0 300px;
    line-height: 55px;
    padding-right: 12px;
    text-align: right;
  }
}
</style>
