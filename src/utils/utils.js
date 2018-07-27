// 获取cookie、
export function getCookie (name) {
  if (document.cookie.length > 0){
    let c_start = document.cookie.indexOf(name + '=')
    if (c_start != -1) { 
      c_start = c_start + name.length + 1 
      let c_end = document.cookie.indexOf(';', c_start)
      if (c_end == -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ''
}
// 设置cookie,增加到vue实例方便全局调用
export function setCookie (cname, value, expiredays) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cname + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
// 删除cookie
export function delCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}
// 设置localstorage
export function putlocal (key, value) {
  if (!key || !value) return
  window.localStorage[key] = JSON.stringify(value)
}
// 获取localstorage
export function getlocal (key) {
  if (!key) return null
  const tem = window.localStorage[key]
  if (!tem) return null
  return JSON.parse(tem)
}
/**
 * use_iframe_download function - 通过 iframe 下载文件
 *
 * @param  {String} download_path 需下载文件的链接
 * @return {Void}
 */
export const use_iframe_download = download_path => {
  const $iframe = document.createElement('iframe')

  $iframe.style.height = '0px'
  $iframe.style.width = '0px'
  document.body.appendChild($iframe)
  $iframe.setAttribute('src', download_path)

  setTimeout(function () { $iframe.remove() }, 20000)
}

function requestTimeout (xhr) {
  const timer = setTimeout(() => {
    timer && clearTimeout(timer)
    xhr.abort()
  }, 5000)
  return timer
}
// 导出
export function exporttable (httpUrl,token, formData, callback) {
  var xhr = new XMLHttpRequest()
  if (xhr.withCredentials === undefined){ 
    return false
  };
  xhr.open("post", httpUrl)
  // xhr.timeout=5000
  xhr.setRequestHeader("Authentication", token)
  xhr.responseType = "blob"
  let timer = requestTimeout(xhr)
  xhr.onreadystatechange = function () {
    timer && clearTimeout(timer)
    if (xhr.readyState !== 4) {
      timer = requestTimeout(xhr)
      return
    }
    if (this.status === 200) {
      var blob = this.response
      var contentType = this.getResponseHeader('content-type')
      var fileName = contentType.split(";")[1].split("=")[1]
      fileName = decodeURI(fileName)
      let aTag = document.createElement('a')
      // 下载的文件名
      aTag.download = fileName
      aTag.href = URL.createObjectURL(blob)
      aTag.click()
      URL.revokeObjectURL(blob)
      callback && callback(true)
    } else {
      callback && callback(false)
    }  
  }
  xhr.send(formData);
}

export default {
  getCookie,
  setCookie,
  delCookie,
  putlocal,
  getlocal,
  exporttable
}
