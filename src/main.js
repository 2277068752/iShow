import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import App from './App'
import router from './router'
// import routes from './router/routes'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss' // global css
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import UtilsPlugin from './assets/utils'
import HttpPlugin from './http/index'
import VueParticles from 'vue-particles' // 粒子酷炫效果
import formatStyle from './filters/formatStyle.js'
// import { Tag } from '../src/model/index'
import './mock' // mock
Vue.config.productionTip = false
Vue.use(ElementUI)
// plugins
Vue.use(UtilsPlugin)
Vue.use(HttpPlugin)
Vue.use(VueParticles)
Vue.filter('formatStyle', formatStyle)
// const dispatch = store.dispatch
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (to.path === '/' || to.path === '/login' || to.path === '/404' || to.path === '/401') {
    setTimeout(next, 0)
  } else {
    setTimeout(next, 20)
  }
})
router.afterEach((to) => {
  NProgress.done() // finish progress bar
})
sync(store, router)
/* eslint-disable no-new */
// global
window.$globalHub = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
