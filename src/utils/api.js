import axios from 'axios'
import {Message} from 'element-ui'
import store from '../store'
// import {getToken} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: '/api', // api的base_url
  timeout: 15000 // 请求超时时间2
})
// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  console.error(error) // for debug
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(res)
    if (res.code === 1000) {
      return res
    }
    if (res.code === 200) {
      return res.info
    } else if (res.code === 500) {
      Message({
        showClose: true,
        message: res.msg,
        type: 'error',
        duration: 500,
        onClose: () => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        }
      })
      // return Promise.reject('未登录')
    } else {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(res)
    }
  },
  error => {
    console.error('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
