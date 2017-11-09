// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    sysUser: 'aa',
    sysDate: '2011/11/11',
    sysWeek: '2011 W33',
    sysMonth: '2011 M10',
    warehouseList: [],
    dateCycleList: [],
    allMetrics: {
      'sample1': {'name': 'sample1'},
      'sample2': {'name': 'sample2'},
      'sample3': {'name': 'sample3'},
      'sample4': {'name': 'sample4'}
    },
    homepageValues: [],
    homepageCharts: []
  },
  mutations: {
    getUser (state, username) {
      state.sysUser = username
    },
    getDate (state, currentDate) {
      state.sysDate = currentDate
    },
    updateList (state, item) {
      if (item.type === 1) state.boxList = item.list
      else if (item.type === 2) state.chartList = item.list
      else if (item.type === 3) state.freeList = item.list
    },
    getWarehouse (state, list) {
      state.warehouseList = list
    },
    getDateCycle (state, list) {
      state.dateCycleList = list
    },
    addMetrics (state, p) {
      state.allMetrics[p.name] = p
    },
    setHomepageValue (state, p) {
      state.homepageValues = p
    },
    setHomepageChart (state, p) {
      state.homepageCharts = p
    }
  },
  getters: {
  },
  actions: {
  }
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
  mounted: function () {
    this.$router.push({ name: 'settings' })
  }
})
