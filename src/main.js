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
// import aaa from './components/rightcontent'
// import $ from 'jquery'
// UE
import '../static/UE/ueditor.config.js'
import '../static/UE/ueditor.all.min.js'
import '../static/UE/lang/zh-cn/zh-cn.js'
import '../static/UE/ueditor.parse.min.js'
Vue.config.productionTip = false

// 设置接口全局变量
global.BASE_URL = ''
if (process.env.NODE_ENV !== 'testing') {
  global.BASE_URL = 'http://dev.busadapter.zanfin.com'
} else {
  global.BASE_URL = ''
}
// 同步vuex和本地菜单数据
if (!store.state.menu || Object.keys(store.state.menu).length === 0) {
  // 从sessionStorage中读取状态
  store.state.menu = JSON.parse(utils.getlocal('userInfo'))
}
// if (sessionStorage.getItem('userInfo')) {
//   store.state.menu = JSON.parse(sessionStorage.getItem('userInfo'))
//   console.log(store.state.menu)
// }
if (utils.getlocal('lefthidden')) {
  store.state.hidden = utils.getlocal('lefthidden')
}
Vue.use(VueRouter)
Vue.use(iView)
Vue.use(http)
Vue.use(Api)
Vue.use(store)

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 对路由进行验证
  iView.LoadingBar.start()
  next()
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
