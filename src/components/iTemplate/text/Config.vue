<!--region 组件设置-->
<template>
  <div class="text-comp-config-page">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="样式" name="1">
        <el-collapse class="props-style-coll-list" v-model="activeColl" accordion @change="handleColl">
          <template v-for="(coll, key) in collList">
            <el-collapse-item :title="coll.value" :name="coll.key" :key="key">
              <!--region 基础属性设置-->
              <ul v-if="coll.key === '1'" class="coll-item">
                <li class="props-item">
                  <label>内容</label>
                  <el-input v-model="currComp.props.text"
                            placeholder="请输入内容"
                            size="small"
                            @change="updateProps"></el-input>
                </li>
                <li class="props-item in-line">
                  <label>字体</label>
                  <el-select v-model="currComp.css.ft.t" size="small" @change="updateFont">
                    <el-option v-for="size in fontFamilyArr"
                               :key="size.id"
                               :label="size.value"
                               :value="size.id"></el-option>
                  </el-select>
                </li>
                <li class="props-item in-line">
                  <label>颜色</label>
                  <el-color-picker v-model="currComp.css.ft.c" show-alpha color-format="rgb"
                                   size="small"></el-color-picker>
                  <ul class="color-panel">
                    <template v-for="(color, key) in colorArr">
                      <li :key="key" :style="{backgroundColor: color}"
                          @click="chooseColorByPanel({ft: {c: color}})"></li>
                    </template>
                  </ul>
                </li>
                <li class="props-item in-line">
                  <label>背景色</label>
                  <el-color-picker v-model="currComp.css.bgc" show-alpha color-format="rgb"
                                   size="small" @change="updateBg"></el-color-picker>
                  <ul class="color-panel">
                    <template v-for="(color, key) in colorArr">
                      <li :key="key" :style="{backgroundColor: color}" @click="chooseColorByPanel({ bgc: color})"></li>
                    </template>
                  </ul>
                </li>
                <li class="props-item in-line">
                  <label>行高</label>
                  <el-slider class="line-height-slider"
                             v-model="currComp.css.ft.lh"
                             :step=".1"
                             :min="0"
                             :max="10"
                             :show-input-controls="false"
                             show-input
                             @change="updateFont"></el-slider>
                </li>
                <li class="props-item in-line">
                  <label>字距</label>
                  <el-slider class="line-height-slider"
                             v-model="currComp.css.ft.ls"
                             :step="1"
                             :min="0"
                             :max="20"
                             :show-input-controls="false"
                             show-input></el-slider>
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
                  <el-select class="text-align-select" v-model="currComp.css.ta" size="small">
                    <el-option v-for="align in textAlignArr"
                               :key="align.id"
                               :label="align.desc"
                               :value="align.id">
                      <span class="axon-icon" style="font-size: 16px;" v-html="align.icon"></span>
                      <span>{{ align.desc }}</span>
                    </el-option>
                  </el-select>
                </li>
                <li class="props-item in-line">
                  <label>字体加粗</label>
                  <el-slider class="weight-slider"
                             v-model="currComp.css.ft.fw"
                             :step="1"
                             :min="1"
                             :max="6"
                             show-stops></el-slider>
                </li>
                <li class="props-item font-icon-props">
                  <span :class="currComp.css.ft.fs ? 'axon-icon is-active' : 'axon-icon'"
                        v-html="'&#xe659;'" @click="currComp.css.ft.fs = !currComp.css.ft.fs"></span>
                  <span :class="currComp.css.ft.td ? 'axon-icon is-active' : 'axon-icon'"
                        v-html="'&#xe65c;'" @click="currComp.css.ft.td = !currComp.css.ft.td"></span>
                </li>
              </ul>
              <!--endregion-->
              <!--region 边框属性-->
              <ul v-if="coll.key === '2'" class="coll-item">
                <li class="props-item in-line">
                  <label>边框样式</label>
                  <el-select v-model="currComp.css.bd.t" size="small">
                    <el-option v-for="size in borderTypeArr"
                               :key="size.id"
                               :label="size.desc"
                               :value="size.id"></el-option>
                  </el-select>
                </li>
                <li class="props-item in-line">
                  <label>边框颜色</label>
                  <el-color-picker v-model="currComp.css.bd.c" show-alpha color-format="rgb"
                                   size="small"></el-color-picker>
                  <ul class="color-panel">
                    <template v-for="(color, key) in colorArr">
                      <li :key="key" :style="{backgroundColor: color}"
                          @click="chooseColorByPanel( {bd: {c: color}})"></li>
                    </template>
                  </ul>
                </li>
                <li class="props-item in-line">
                  <label>边框尺寸</label>
                  <el-slider class="line-height-slider"
                             v-model="currComp.css.bd.w"
                             :step="1"
                             :min="0"
                             :max="20"
                             :show-input-controls="false"
                             show-input></el-slider>
                </li>
                <li class="props-item in-line">
                  <label>边框弧度</label>
                  <el-slider class="line-height-slider"
                             v-model="currComp.css.br"
                             :step="1"
                             :min="0"
                             :max="100"
                             :show-input-controls="false"
                             show-input></el-slider>
                </li>
              </ul>
              <!--endregion-->
              <!--region 阴影属性-->
              <ul v-if="coll.key === '3'" class="coll-item">
                <li class="props-item in-line">
                  <label>阴影颜色</label>
                  <el-color-picker v-model="currComp.css.bs.c" show-alpha color-format="rgb"
                                   size="small"></el-color-picker>
                  <ul class="color-panel">
                    <template v-for="(color, key) in colorArr">
                      <li :key="key" :style="{backgroundColor: color}"
                          @click="chooseColorByPanel({bs: {c: color}})"></li>
                    </template>
                  </ul>
                </li>
                <li class="props-item in-line">
                  <label>阴影大小</label>
                  <el-slider class="line-height-slider"
                             v-model="currComp.css.bs.s"
                             :step="1"
                             :min="0"
                             :max="20"
                             :show-input-controls="false"
                             show-input></el-slider>
                </li>
                <li class="props-item in-line">
                  <label>水平偏移</label>
                  <el-slider class="line-height-slider"
                             v-model="currComp.css.bs.h"
                             :step="1"
                             :min="-10"
                             :max="10"
                             :show-input-controls="false"
                             show-input></el-slider>
                </li>
                <li class="props-item in-line">
                  <label>垂直偏移</label>
                  <el-slider class="line-height-slider"
                             v-model="currComp.css.bs.v"
                             :step="1"
                             :min="-10"
                             :max="10"
                             :show-input-controls="false"
                             show-input></el-slider>
                </li>
                <li class="props-item in-line">
                  <label>阴影模糊</label>
                  <el-slider class="line-height-slider"
                             v-model="currComp.css.bs.b"
                             :step="1"
                             :min="-0"
                             :max="20"
                             :show-input-controls="false"
                             show-input></el-slider>
                </li>
              </ul>
              <!--endregion-->
              <!--region 尺寸和位置-->
              <ul v-if="coll.key === '4'" class="coll-item">
                <li class="props-item in-line more-height">
                  <label>尺寸(px)</label>
                  <div class="size-group">
                    <div class="width item">
                      <el-input size="medium" type="number" v-model="currComp.css.h" @change="updateSizeAndLocation('h')"></el-input>
                      <p>高度</p>
                    </div>
                    <div class="height item">
                      <el-input size="medium" type="number" v-model="currComp.css.w" @change="updateSizeAndLocation('w')"></el-input>
                      <p>宽度</p>
                    </div>
                  </div>
                </li>
                <li class="props-item in-line more-height">
                  <label>位置(px)</label>
                  <div class="size-group">
                    <div class="width item">
                      <el-input size="medium" type="number" v-model="currComp.css.l" @change="updateSizeAndLocation('l')"></el-input>
                      <p>X</p>
                    </div>
                    <div class="height item">
                      <el-input size="medium" type="number" v-model="currComp.css.t" @change="updateSizeAndLocation('t')"></el-input>
                      <p>Y</p>
                    </div>
                  </div>
                </li>
                <li class="props-item in-line">
                  <label>旋转</label>
                  <el-slider class="line-height-slider"
                             v-model="currComp.css.rotate"
                             :step="1"
                             :min="0"
                             :max="360"
                             :show-input-controls="false"
                             show-input></el-slider>
                </li>
              </ul>
              <!--endregion-->
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
  TEXT_ALIGN,
  BORDER_STYLES
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
        let _desc = TEXT_ALIGN[i] === 'left' ? '局左' : TEXT_ALIGN[i] === 'center' ? '居中' : '居右'
        _arr.push({
          id: parseInt(i),
          value: TEXT_ALIGN[i],
          icon: _icon,
          desc: _desc
        })
      }
      return _arr
    },
    // 边框类型
    borderTypeArr () {
      let _arr = []
      for (let i in BORDER_STYLES) {
        let _t = ''
        switch (BORDER_STYLES[i]) {
          case 'none' :
            _t = '无'
            break
          case 'solid':
            _t = '实线'
            break
          case 'dashed':
            _t = '虚线'
            break
          case 'dotted':
            _t = '点状线'
            break
          case 'double':
            _t = '双线'
            break
        }
        _arr.push({ id: parseInt(i), value: BORDER_STYLES[i], desc: _t })
      }
      return _arr
    }
  },
  methods: {
    handleColl (item) {},
    // 通过快捷面板 === 选择字体颜色
    chooseColorByPanel (val) {
      this.syncCss(val)
    },
    // 文本框内容更新
    updateProps () {
      this.syncPage('props', 'text')
    },
    // 样式更新 === 字体
    updateFont () {
      this.syncPage('css', 'ft')
    },
    // 样式更新 === 背景
    updateBg () {
      this.syncPage('css', 'bgc')
    },
    // 更新尺寸和位置
    updateSizeAndLocation (key) {
      this.syncPage('css', key)
    },
    syncPage (type, key) {
      this.$store.dispatch('editCompOfCurPage', {
        type: type,
        key: key
      })
    },
    // 同步到持久化
    syncCss (val) {
      this.$store.dispatch('editComp', {
        type: 'css',
        value: val
      })
    }
  }
}
</script>

<style lang="scss">
@import "./Config";
</style>
