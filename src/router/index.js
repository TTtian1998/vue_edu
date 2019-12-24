import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage'
import Course from '@/views/Course'
import Login from '@/views/Login'
import Regist from '@/views/Regist'
import Manage from '@/views/Manage'
import NotFound from '@/views/NotFound'
import ProcessHomeWork from '@/views/ProcessHomeWork'

Vue.use(Router)
export const constantRouterMap = [
  {path: '/login', component: Login, hidden: true},
  {path: '/404', component: NotFound, hidden: true},
  {path: '/regist', component: Regist, hidden: true},
  {
    path: '/',
    redirect: '/homePage'
  },
  {
    path: '/homePage',
    name: 'login',
    component: HomePage
  }
]
export default new Router({
// mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/course',
    component: Course,
    name: '课程管理',
    children: [
      {
        path: 'more',
        name: '更多操作',
        menu: 'more'
      },
      {
        path: 'nav',
        name: '导航',
        menu: 'nav'
      },
      {
        path: 'banner',
        name: '栏目',
        menu: 'banner'
      }
    ]
  },
  {
    path: '/manage',
    name: '具体课程管理',
    component: Manage,
    props: { newsletterPopup: false },
    children: [
      {
        path: 'homework',
        name: '作业'
      }
    ]
  },
  {
    path: '/processHomeWork',
    name: '作业处理',
    component: ProcessHomeWork,
    props: { newsletterPopup: false },
    children: [
      {
        path: 'giveMark',
        name: '打分'
      },
      {
        path: 'readHomework',
        name: '批阅'
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
