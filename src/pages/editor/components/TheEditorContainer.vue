<template>
  <div class="the-editor-container">
    <div class="container-wrapper">
      <!--region 页面列表-->
      <div class="page-list">
        <template v-for="(page, key) in pages">
          <div class="page-wrapper" :key="key">
            <!--region 背景-->
            <div class="wrapper-background"
                 :style="{
                   backgroundColor: page.css.bgc,
                   backgroundImage: 'url(' + page.css.bgi + ')'
                 }"></div>
            <!--endregion-->
            <!--region 组件-->
            <div class="component-wrapper">
              <template v-for="comp in page.comps">
                <vue-drr
                  :ref="'comp_' + comp.id"
                  :id="'comp_' + comp.id"
                  :key="comp.id"
                  :w="parseInt(comp.css.w)"
                  :h="parseInt(comp.css.h)"
                  :x="parseInt(comp.css.l)"
                  :y="parseInt(comp.css.t)"
                  :minw="20"
                  :minh="30"
                  :grid="grid"
                  :parent="true"
                  :angle="parseInt(comp.css.rotate)"
                  @activated="toggleComp(comp.id)"
                  @resizestop="handleResizing"
                  @dragstop="handleDragging"
                  @rotatestop="handleRotating">
                  <comp-list
                    @click="handleClick(comp)"
                    @dblclick="handleDbClick"
                    :id="comp.id"
                    class="comp"
                    :style="comp.css | formatStyle('ft', 'lh')"
                    :type="comp.name"></comp-list>
                </vue-drr>
              </template>
            </div>
            <!--endregion-->
          </div>
        </template>
      </div>
      <!--endregion-->
    </div>
  </div>
</template>

<script>
import vueDrr from 'vue-drr'
import { throttle } from '../../../assets/utils/util.js'
import BaseComps from '../../../components/iTemplate/index.js'

const BASE_COMP_NAME = 'Base'
const BASE_COMP_CONFIG = 'Config'
export default {
  components: {
    vueDrr,
    compList: {
      props: {
        id: {
          type: [String, Number],
          required: true
        }, // 组件ID
        type: {
          type: String,
          required: true
        } // 组件类型名称
      },
      render (h) {
        let _compFlagName = `${BASE_COMP_NAME}${this.type}`
        let _module = BaseComps[_compFlagName]
        return h(_module, {
          props: {
            id: this.id
          },
          nativeOn: {
            click: throttle(this.handleClick, 1000),
            dblclick: this.handleDbClick
          }
        })
      },
      methods: {
        // 单击：左击
        handleClick (comp) {
          this.$emit('click', comp)
        },
        // 双击
        handleDbClick () {
          this.$emit('dblclick', this.type)
        }
      }
    }
  },
  data () {
    return {
      grid: [1, 1] // 组件拖动的网格
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    // 取当前页面
    pages () {
      try {
        return this.$store.getters.pages
      } catch (e) {
        this.$notify.error({
          title: '错误',
          message: '初始化页面失败,请刷新后重试！'
        })
      }
    },
    // 取当前正在编辑的组件
    curCompId () {
      return this.$store.state.components.curCompId
    },
    // 取当前组件
    curComp () {
      return this.$store.getters.currComp
    }
  },
  methods: {
    // 切换组件
    toggleComp (id) {
      this.$store.dispatch('toggleComp', id)
    },
    // 左击：点击组件
    handleClick (comp) {
      // 打开组件属性设置面板
      this.$store.dispatch('openPropsPanel', {
        id: comp.id,
        name: comp.name + BASE_COMP_CONFIG
      })
    },
    /**
     * 双击组件
     * @param type 组件类型
     */
    handleDbClick (type) {
      console.log('双击666')
    },
    // 组件拉伸时触发
    handleResizing (x, y, w, h) {
      this.updateCompStyle({ l: x, t: y, w, h })
    },
    // 组件拖动时触发
    handleDragging (x, y) {
      this.updateCompStyle({ l: x, t: y })
    },
    // 组件旋转时触发
    handleRotating (angle) {
      this.updateCompStyle({ rotate: angle })
    },
    // 同步用户修改
    updateCompStyle (value) {
      this.$store.dispatch('editComp', {
        type: 'css',
        value: value
      })
    }
  }
}
</script>

<style lang="scss">
.the-editor-container {
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-sizing: border-box;
  width: 375px;
  min-height: 667px;
  flex: 0 0 1;
  height: 100%;
  background-color: #fff;
  position: relative;
  .container-wrapper {
    width: 100%;
    height: 100%;
    .page-list {
      width: 100%;
      height: 100%;
      .page-wrapper {
        width: 100%;
        height: 100%;
        .wrapper-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-size: cover;
          background-origin: content-box;
          background-position: 50% 50%;
        }
        .component-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }
      }
    }
  }
}
</style>
