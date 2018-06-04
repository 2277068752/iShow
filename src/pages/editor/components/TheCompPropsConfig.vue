<!--region 组件属性设置面板-->
<template>
  <div ref="propsPanelConfig" class="the-comp-props-config-page" v-if="propsPanel && propsPanel.show"
       :style="{ height: panelHeight }">
    <div :class="isMouseDown ? 'header pointer-events': 'header'">
      <div class="title" ref="header" @mousedown="handleDragMouseDown">组件设置</div>
      <div class="close">
        <span class="axon-icon" v-html="'&#xe635;'" @click="closePropsPanel()"></span>
      </div>
    </div>
    <div class="props-panel-config">
      <props-panel :name="propsPanel.name"></props-panel>
    </div>
  </div>
</template>
<!--endregion-->
<script>
import CompPropsConfig from '../../../components/iTemplate/config.js'
import { throttle } from '../../../assets/utils/util.js'

export default {
  components: {
    propsPanel: {
      props: {
        name: {
          type: String,
          required: true
        }
      },
      render (h) {
        let _module = CompPropsConfig[this.name]
        return h(_module, {
          props: {
            name: {
              type: String
            }
          }
        })
      }
    }
  },
  data () {
    return {
      isMouseDown: false, // 鼠标是否按住可拖放区域
      dragObj: {
        initX: 0,
        indexY: 0,
        width: 260,
        height: 48
      } // 拖动对象位置
    }
  },
  created () {
  },
  mounted () {
    document.addEventListener('mousemove', (e) => { this.throttleMove(e) })
    document.addEventListener('mouseup', (e) => { this.handleDragMouseUp(e) })
  },
  computed: {
    // 根据父级组件高度设定属性面板高度
    panelHeight () {
      // 取父级组件中的父级标签属性
      let _parentHeight = 0
      try {
        _parentHeight = this.$parent.$refs.centerBox.offsetHeight
        return `${_parentHeight - 100}px`
      } catch (e) {
        return 0
      }
    },
    // 取面板信息
    propsPanel () {
      return this.$store.getters.propPanel
    }
  },
  watch: {},
  methods: {
    // 关闭属性面板
    closePropsPanel () {
      console.log(' close:')
      this.$store.dispatch('closePropsPanel')
    },
    // 拖动：当鼠标点下的时候，给要拖动的元素附上初始值
    handleDragMouseDown (e) {
      this.isMouseDown = true
      this.dragObj.initX = e.offsetX
      this.dragObj.initY = e.offsetY
      this.dragObj.width = this.$refs.propsPanelConfig.offsetWidth
      this.dragObj.height = this.$refs.propsPanelConfig.offsetHeight - this.$refs.header.offsetHeight
    },
    // 鼠标移动 --- 节流
    throttleMove (e) {
      return throttle(this.handleDragMouseMove(e), 500)
    },
    // 拖动过程中，需要实时监听位置变化
    handleDragMouseMove (e) {
      if (this.isMouseDown) {
        // 移动外层需要移动的div
        let _cx = e.clientX - this.dragObj.initX
        let _cy = e.clientY - this.dragObj.indexY
        // 限制panel不能超出浏览器边界
        _cx = _cx >= 0 ? _cx : 0
        _cy = _cy >= 0 ? _cy : 0
        if (window.innerWidth - e.clientX + this.dragObj.initX < this.dragObj.width + 16 || window.innerWidth - this.dragObj.width < _cx) {
          _cx = window.innerWidth - this.dragObj.width
        }
        if (e.clientY > window.innerHeight - this.dragObj.height - this.$refs.header.offsetHeight + this.dragObj.initY) {
          _cy = window.innerHeight - this.$refs.header.offsetHeight - this.dragObj.height
        }
        this.$refs.propsPanelConfig.style.left = _cx + 'px'
        this.$refs.propsPanelConfig.style.top = _cy + 'px'
      }
    },
    // 鼠标移除，取消监听
    handleDragMouseUp (e) {
      if (e.clientY > window.innerWidth || e.clientY < 0 || e.clientX < 0 || e.clientX > window.innerHeight) {
        this.isMouseDown = false
      }
      this.isMouseDown = false
    }
  }
}
</script>

<style lang="scss">
.the-comp-props-config-page {
  background-color: #fafafa;
  position: fixed;
  left: 0;
  top: 0;
  width: 260px;
  overflow: hidden;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
  z-index: 1000;
  height: 100%;
  user-select: none;
  .header {
    background-color: #fff;
    height: 48px;
    line-height: 48px;
    width: 100%;
    padding: 0 16px;
    user-select: none;
    display: flex;
    &.pointer-events {
      pointer-events: none;
    }
    .title {
      flex: 0 0 50%;
      font-size: 13px;
      cursor: move;
    }
    .close {
      flex: 0 0 50%;
      text-align: right;
      z-index: 9999;
      span {
        cursor: pointer;
        font-size: 14px;
        color: #a3afb7;
      }
    }
  }
  .props-panel-config {
    height: calc(#{"100% - 54px"});
    .text-comp-config-page {
      height: 100%;
      .el-tabs {
        height: 100%;
        overflow: hidden;
        .el-tabs__content {
          height: calc(#{"100% - 50px"});
          overflow-y: auto;
          .el-tab-pane {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
