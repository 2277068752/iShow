<template>
  <div id="app" style="height:100%;">
    <!--default slot-->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {},
  data () {
    return {}
  },
  mounted () {
    // 禁用整个页面的右击事件
    document.oncontextmenu = () => {
      return false
    }
  },
  computed: {
    ...mapState({})
  },
  methods: {}
}
</script>

<style lang="less" rel="stylesheet/less">
#nprogress .spinner {
  display: none;
}

@import "styles/icon.css";
</style>
