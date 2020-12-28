import iView from 'iview'
// 获取cookie、
export function getCookie(name) {
  if (document.cookie.length > 0) {
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
export function setCookie(cname, value, expiredays) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cname + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}
// 删除cookie
export function delCookie(name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}
// 设置localstorage
export function putlocal(key, value) {
  if (!key || !value) return
  window.localStorage[key] = JSON.stringify(value)
}
// 获取localstorage
export function getlocal(key) {
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

  setTimeout(function () {
    $iframe.remove()
  }, 20000)
}

function requestTimeout(xhr) {
  const timer = setTimeout(() => {
    timer && clearTimeout(timer)
    xhr.abort()
  }, 5000)
  return timer
}
// 导出
export function exporttable(httpUrl, token, formData, callback) {
  let i = formData.entries()
  let param 
  if(httpUrl.indexOf("?") != -1){
    param = "&Authentication=" + token
  } else {
    param = "?Authentication=" + token
  }
  do {    
    var v = i.next()
    if (!v.done) {      
      param += "&" + v.value[0] + "=" + v.value[1]       
    }      
  } while (!v.done)
  //   console.log(param);
  window.open(httpUrl + param)
  // var xhr = new XMLHttpRequest()
  // if (xhr.withCredentials === undefined){ 
  // return false
  // };
  // xhr.open("post", httpUrl)
  // // xhr.timeout=5000
  // xhr.setRequestHeader("Authentication", token)
  // xhr.responseType = "blob"
  // let timer = requestTimeout(xhr)
  // xhr.onreadystatechange = function () {
  // timer && clearTimeout(timer)
  // if (xhr.readyState !== 4) {
  // timer = requestTimeout(xhr)
  // return
  // }
  // if (this.status === 200) {
  // var blob = this.response
  // var contentType = this.getResponseHeader('content-type')
  // var fileName = contentType.split(";")[1].split("=")[1]
  // fileName = decodeURI(fileName)
  // let aTag = document.createElement('a')
  // // 下载的文件名
  // aTag.download = fileName
  // aTag.href = URL.createObjectURL(blob)
  // aTag.click()
  // URL.revokeObjectURL(blob)
  callback && callback(true)
  // } else {
  // callback && callback(false)
  // } 
  // }
  // xhr.send(formData);
}

// 获取当前时间
export function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
    " " + date.getHours() + seperator2 + date.getMinutes() +
    seperator2 + date.getSeconds();

  return currentdate;
}

// 时间格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

// 获取当前时间 YY-MM-DD
export function getNowDate(n) {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate() - n;
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  var currentdatemonth = year + seperator1 + month;
  return [currentdate, currentdatemonth];
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

// 复制方法
export function copytext (name) {
  if (document.body.createTextRange) {
    let range = document.body.createTextRange()
    range.moveToElementText(name)
    range.select()
  } else if (window.getSelection) {
    let selection = window.getSelection()
    let range = document.createRange()
    range.selectNodeContents(name)
    selection.removeAllRanges()
    selection.addRange(range)
  }
  document.execCommand('Copy')
  iView.Message.success('复制成功')
}

// 公共参数的获取 佣金资金
import http from './http'

export function publicCan (canshu) {
  http.post(BASE_URL + "/vshop/productOrder/queryPageSettleFilter", {}).then(data=>{
    // console.log(data)
    return canshu(data)
  }).catch( err=>{console.log('公共参数错误===》',+err)})  
}
export default {
  getCookie,
  setCookie,
  delCookie,
  putlocal,
  getlocal,
  exporttable,
  getNowFormatDate,
  formatDate,
  getNowDate,
  copytext,
  publicCan
}
