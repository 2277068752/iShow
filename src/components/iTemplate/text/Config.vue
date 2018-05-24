<!--region 组件设置-->
<template>
  <div class="text-comp-config-page">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="样式" name="1">
        <el-collapse class="props-style-coll-list" v-model="activeColl" @change="handleColl">
          <template v-for="(coll, key) in collList">
            <el-collapse-item :title="coll.value" :name="coll.key" :key="key">
              <ul v-if="coll.key === '1'" class="coll-item">
                <li class="props-item">
                  <label>内容</label>
                  <el-input v-model="currComp.props.text" placeholder="请输入内容" size="small"></el-input>
                </li>
                <li class="props-item in-line">
                  <label>字体</label>
                  <el-select v-model="currComp.css.ft.t" size="small">
                    <el-option v-for="size in fontFamilyArr"
                               :key="size.id"
                               :label="size.value"
                               :value="size.id"></el-option>
                  </el-select>
                </li>
                <li class="props-item in-line">
                  <label>颜色</label>
                  <el-color-picker v-model="currComp.css.ft.c" size="small"></el-color-picker>
                  <ul class="color-panel">
                    <template v-for="(color, key) in colorArr">
                      <li :key="key" :style="{backgroundColor: color}" @click="chooseFontColor(color)"></li>
                    </template>
                  </ul>
                </li>
                <li class="props-item in-line">
                  <label>字号</label>
                  <el-select v-model="currComp.css.ft.s" size="small">
                    <el-option v-for="size in fontSizeArr"
                               :key="size.id"
                               :label="size.value"
                               :value="size.id"></el-option>
                  </el-select>
                </li>
                <li class="props-item in-line">
                  <label>对齐方式</label>
                  <ul class="text-align-panel">
                    <li v-for="align in textAlignArr" :key="align.id">
                      <span class="axon-icon" v-html="align.icon"></span>
                    </li>
                  </ul>
                </li>
              </ul>
            </el-collapse-item>
          </template>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="动画" name="2">动画</el-tab-pane>
    </el-tabs>
  </div>
</template>
<!--endregion-->
<script>
import {
  FONT_FAMILYS,
  FONT_SIZES,
  TEXT_ALIGN
} from '../../../filters/modules/styleMatch.js'

export default {
  name: 'TextConfig',
  components: {},
  data () {
    return {
      activeTab: '1',
      activeColl: '1', // 当前样式设置分类
      collList: [
        {
          key: '1',
          value: '基础'
        },
        {
          key: '2',
          value: '边框'
        },
        {
          key: '3',
          value: '阴影'
        },
        {
          key: '4',
          value: '尺寸和位置'
        }
      ],
      colorArr: ['#FFFFFF', '#FF5448', '#F2A653', '#FFCA28', '#18CFA1', '#59C7F9', '#4D8FF3', '#7171EF', '#4F5975', '#000000'] // 颜色快捷面板
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    // 取当前组件
    currComp () {
      return this.$store.getters.curComp
    },
    // 字体转数组
    fontFamilyArr () {
      let _arr = []
      for (let i in FONT_FAMILYS) {
        _arr.push({ id: parseInt(i), value: FONT_FAMILYS[i] })
      }
      return _arr
    },
    // 字号转数组
    fontSizeArr () {
      let _arr = []
      for (let i in FONT_SIZES) {
        _arr.push({ id: parseInt(i), value: FONT_SIZES[i] })
      }
      return _arr
    },
    // 对齐方式转数组
    textAlignArr () {
      let _arr = []
      for (let i in TEXT_ALIGN) {
        let _icon = TEXT_ALIGN[i] === 'left' ? '&#xe629;' : TEXT_ALIGN[i] === 'center' ? '&#xe661;' : '&#xe60f;'
        _arr.push({
          id: parseInt(i),
          value: TEXT_ALIGN[i],
          icon: _icon
        })
      }
      return _arr
    }
  },
  methods: {
    handleColl (item) {},
    // 通过快捷面板 === 选择字体颜色
    chooseFontColor (color) {
      this.$store.dispatch('editComp', {
        type: 'css',
        value: {
          ft: {
            c: color
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.text-comp-config-page {
  background-color: transparent;
  .el-tabs__nav {
    width: 100%;
    .el-tabs__item {
      width: 50%;
      text-align: center;
    }
  }
  .props-style-coll-list {
    background-color: transparent;
    .el-collapse-item {
      .el-collapse-item__header {
        background-color: transparent;
        padding: 0 12px;
        height: 40px;
        line-height: 40px;
        .el-collapse-item__arrow {
          line-height: 40px;
        }
        &.is-active {
          background-color: #409EFF;
          color: #ffffff;
        }
      }
      .el-collapse-item__content {
        padding: 12px;
        .coll-item {
          .props-item {
            padding-bottom: 12px;
            label {
              float: left;
              width: 76px;
              font-size: 14px;
              font-weight: 400;
              color: #666;
            }
            &.in-line {
              height: 48px;
              display: flex;
              label {
                line-height: 32px;
                flex: 0 0 65px;
              }
            }
            .color-panel {
              padding-left: 40px;
              flex: 0 0 calc(#{"100% - 100px"});
              li {
                display: block;
                margin-left: 2px;
                width: 16px;
                height: 16px;
                border: 1px solid #ccd5db;
                border-radius: 3px;
                float: left;
                margin-bottom: 2px;
                cursor: pointer;
              }
            }
            .text-align-panel {
              display: flex;
            }
          }
        }
      }
    }
  }
}
</style>
