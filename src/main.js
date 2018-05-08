
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import http from './utils/http'
import Api from './utils/api'
import store from './vuex/store'
// import $ from 'jquery'

Vue.config.productionTip = false

// Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(iView)
Vue.use(http)
Vue.use(Api)
Vue.use(store)
// Vue.use($)

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
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
