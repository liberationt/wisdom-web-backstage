import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import http from './utils/http'
import Api from './utils/api'
import store from './vuex/store'
import utils from './utils/utils'
import './utils/filters'
// import aaa from './components/rightcontent'
// import $ from 'jquery'
// UE
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'
Vue.config.productionTip = false

// 设置接口全局变量
global.BASE_URL = process.env.API_HOST

// 同步vuex和本地菜单数据
if (!store.state.menu || Object.keys(store.state.menu).length == 0) {
  // 从sessionStorage中读取状态
  store.state.menu = JSON.parse(utils.getlocal('userInfo'))
}
if (store.state.leftlist.length == 0) {
  store.state.leftlist = JSON.parse(utils.getlocal('leftlist'))
}
if (utils.getlocal('lefthidden') == '0') {
  store.state.hidden = true
} else {
  store.state.hidden = false
}

Vue.use(VueRouter)
Vue.use(iView)
Vue.use(http)
Vue.use(Api)
Vue.use(store)
// Vue.use(filter)

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some( m => m.meta.auth)) {
    // 对路由进行验证
    if (utils.getCookie('user')) { // 已经登陆
      iView.LoadingBar.start()
      next()
    } else {
      // 未登录,跳转到登陆页面。
      next({ path: '/', query:{ referrer: '/' }})
    }
  } else {
    iView.LoadingBar.start()
    next()
  }
})

router.afterEach(route => {
  iView.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
  // render: h => h(Login)
}).$mount('#app')
