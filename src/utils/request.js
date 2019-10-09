import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// service.defaults.transformRequest = [data => {
//   return JSON.stringify(data)
// }]

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      // to re-login
      MessageBox.confirm('认证失败，请重新登录', '确认注销', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else {
      const data = error.response.data
      Message({
        showClose: true,
        message: data.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

/**
 * 修复 axios.create() 实例无法使用 all() spread()
 * https://juejin.im/post/5ad192d2518825558c47dcbc
 */
// eslint-disable-next-line no-proto
service.__proto__ = axios

export default service
