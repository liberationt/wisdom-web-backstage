/**
 * 为vue实例添加http方法
 * Vue.use(http)
 */
import http from './http'
import iView from 'iview'

export function request (url, val, databack, loading) {
  this.http.post(process.env.API_HOST + url, val).then(data => {
    if (data.code == 'success') {
      return databack(data.data)
    } else {
      iView.Message.error(data.message ? data.message : '网络开小差啦~')
      return loading()
    }
  }).catch(err => {
    console.log(err) // 报错原因
    iView.Message.error('网络开小差啦~')
    return loading()
  })
}

export default {
  /**
   * install钩子
   * @param {Vue} Vue Vue
   */
  install (Vue) {
    Vue.prototype.http = http,
    Vue.prototype.request = request
  }
}
