// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import {hasPermission} from './utils/hasPermission'
import 'element-ui/lib/theme-chalk/index.css'
import {default as api} from './utils/api'
import '@/permission' // 权限

Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
Vue.use(router)
Vue.use(ElementUI)
Vue.prototype.api = api
// 全局的常量
Vue.prototype.hasPerm = hasPermission
Vue.prototype.showloginBtn = true

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
