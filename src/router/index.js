import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/LoginPage'
import Home from '@/components/HomePage'
import Detail from '@/components/DetailPage'
import Settings from '@/components/SettingPage'
import Def from '@/components/DefPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'homepage',
      component: Home
    },
    {
      path: '/detail/:id',
      name: 'detailpage',
      component: Detail
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/def',
      name: 'def',
      component: Def
    }
  ]
})
