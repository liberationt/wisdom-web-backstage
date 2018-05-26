import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import http from './utils/http'
import Api from './utils/api'
import store from './vuex/store'
// import aaa from './components/rightcontent'
// import $ from 'jquery'
Vue.config.productionTip = false

// 设置接口全局变量
global.BASE_URL = ''
if (process.env.NODE_ENV !== 'testing') {
  global.BASE_URL = 'http://192.168.1.83:3330'
} else {
  global.BASE_URL = ''
}
// 同步vuex和本地菜单数据
if (!store.state.menu || Object.keys(store.state.menu).length === 0) {
  // 从sessionStorage中读取状态
  store.state.menu = JSON.parse(sessionStorage.getItem('userInfo'))
}
// if (sessionStorage.getItem('userInfo')) {
//   store.state.menu = JSON.parse(sessionStorage.getItem('userInfo'))
//   console.log(store.state.menu)
// }
if (sessionStorage.getItem('lefthidden')) {
  store.state.hidden = sessionStorage.getItem('lefthidden')
}
// store.state.hidden = sessionStorage.getItem('lefthidden')
// Vue.use(aaa)
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
