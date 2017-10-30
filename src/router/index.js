import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HomePage from '@/components/HomePage'
import Settings from '@/components/Settings'
import DescPage from '@/components/DescPage'
import DetailPage from '@/components/DetailPage'

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
      component: HomePage
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/desc',
      name: 'desc',
      component: DescPage
    },
    {
      path: '/detail',
      name: 'detail',
      component: DetailPage
    }
  ]
})
