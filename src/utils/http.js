import axios from 'axios'
import utils from '../utils/utils'
// import qs from 'qs';
axios.defaults.timeout = 5000
axios.defaults.baseURL = ''
const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache'
}
// 设置默认头
Object.assign(axios.defaults.headers.common, defaultHeaders)

const methods = ['get', 'post', 'put', 'delete']

const http = {}
methods.forEach(method => {
  http[method] = axios[method].bind(axios)
})
export default http
export const addRequestInterceptor =
  axios.interceptors.request.use.bind(axios.interceptors.request)
// request前自动添加api配置
addRequestInterceptor(
  (config) => {
    if (utils.getlocal('token')) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authentication = utils.getlocal('token')
    }
    // config.url = `/api${config.url}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const addResponseInterceptor =
axios.interceptors.response.use.bind(axios.interceptors.response)
addResponseInterceptor(
  (response) => {
    // 在这里统一前置处理请求响应
    if (Number(response.status) !== 200) {
      // 全局notify有问题，还是自己处理吧
      return Promise.reject(response.data)
    }
    return Promise.resolve(response.data)
  },
  (error) => {
    return Promise.reject(error || '出错了')
  }
)
