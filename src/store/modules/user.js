// import {getInfo, login, logout} from '@/api/login'
import {removeToken, setToken} from '@/utils/auth'
import {default as api} from '../../utils/api'
import store from '../../store'
import router from '../../router'

const user = {
  state: {
    userName: '',
    userId: '',
    avatar: 'https://www.gravatar.com/avatar/6560ed55e62396e40b34aac1e5041028',
    role: '',
    menus: [],
    permissions: []
  },
  // 把处理数据逻辑方法全部放在mutations里面,使得数据和视图分离。
  mutations: {
    SET_USER: (state, userInfo) => {
      state.userName = userInfo.userName
      state.userId = userInfo.userId
      state.role = userInfo.roleName
      state.menus = userInfo.menuList
      state.permissions = userInfo.permissionList
    },
    RESET_USER: (state) => {
      state.userName = ''
      state.userId = ''
      state.role = ''
      state.menus = []
      state.permissions = []
    }
  },
  actions: {
    // 登录
    Login ({commit, state}, loginForm) {
      return new Promise((resolve, reject) => {
        api({
          url: '/login/auth',
          method: 'post',
          data: loginForm
        })
          .then(data => {
            console.log(data)
            if (data.result === 'success') {
            // cookie中保存前端登录状态
              setToken()
            }
            resolve(data)
          }).catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    // 获取用户信息
    GetInfo ({commit, state}) {
      return new Promise((resolve, reject) => {
        api({
          url: '/login/getInfo',
          method: 'post'
        }).then(data => {
          // 储存用户信息
          commit('SET_USER', data.userPermission)
          // cookie保存登录状态,仅靠vuex保存的话,页面刷新就会丢失登录状态
          setToken()
          // 生成路由
          let userPermission = data.userPermission
          store.dispatch('GenerateRoutes', userPermission).then(() => {
            // 生成该用户的新路由json操作完毕之后,调用vue-router的动态新增路由方法,将新路由添加
            router.addRoutes(store.getters.addRouters)
          })
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut ({commit}) {
      return new Promise((resolve) => {
        api({
          url: '/login/logout',
          method: 'post'
        }).then(data => {
          // commit('RESET_USER')
          // 清除token
          removeToken()
          window.location.href = 'http:localhost:8080/#/'
          // 回调函数
          // resolve(data)
        }).catch(() => {
          commit('RESET_USER')
          removeToken()
        })
      })
    },
    // 前端 登出
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        commit('RESET_USER')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
