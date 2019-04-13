import axios from 'axios'
// axios.defaults.withCredentials = true
export default function ajax (url = '', params = {}, type = 'GET') {
  let promise
  return new Promise((resolve, reject) => {
    if (type === 'GET') {
      let paramsStr = ''
      // 拼接请求字符串
      Object.keys(params).forEach(key => {
        paramsStr += key + '=' + params[key] + '&'
      })
      // 处理最后一个的&
      if (paramsStr !== '') {
        paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
      }
      // 完整路径
      url += '?' + paramsStr
      // 发送请求
      promise = axios.get(url)
    } else if (type === 'POST') {
      promise = axios.post(url, params)
    }
    // 返回请求的数据
    promise.then((reqponse) => {
      resolve(reqponse.data)
    }).catch(error => {
      reject(error)
    })
  })
}
