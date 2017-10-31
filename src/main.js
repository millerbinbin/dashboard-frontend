// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
Vue.use(Vuex)

Vue.config.productionTip = false
/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    sysUser: 'aa',
    sysDate: 'date',
    boxList: [],
    chartList: [],
    freeList: [],
    warehouseList: [],
    dateCycleList: []
  },
  mutations: {
    getUser (state, username) {
      state.sysUser = username
    },
    getDate (state, currentDate) {
      state.sysDate = currentDate
    },
    updateList (state, item) {
      if (item.type === 0) state.boxList = item.list
      else if (item.type === 1) state.chartList = item.list
      else if (item.type === 2) state.freeList = item.list
    },
    getWarehouse (state, list) {
      state.warehouseList = list
    },
    getDateCycle (state, list) {
      state.dateCycleList = list
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
  store
})
