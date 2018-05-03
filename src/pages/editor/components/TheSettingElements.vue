<template>
  <!--region 右边当前元素设置模板-->
  <div class="the-setting-elements">
    <div></div>
  </div>
  <!--endregion-->
</template>

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
  computed: {},
  methods: {}
}
</script>

<style lang="scss">
@import "../../../styles/variables";

.the-setting-elements {
  background-color: #fff;
  border-left: 1px solid $border-color-1;
  box-sizing: border-box;
  flex: 0 0 $setting-width;
}
</style>
