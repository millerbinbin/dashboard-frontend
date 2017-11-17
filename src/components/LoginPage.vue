<template>
  <v-container grid-list-xs text-xs-center>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <v-avatar class="grey lighten-4 logo">
          <img src="https://vuetifyjs.com/static/apple-touch-icon-180x180.png" alt="avatar">
        </v-avatar>
      </v-flex>
      <v-flex xs6 offset-xs3>
        <v-form v-model="valid" ref="form">
          <v-text-field label="账号" v-model="username" :rules="nameRules" required ref="username"></v-text-field>
          <v-text-field label="密码" v-model="password" :rules="pwdRules" type="password" required ref="pwd"></v-text-field>
          <v-alert v-show="!verified" color="error" icon="warning" style="font-size: .625em" value="true">
            {{ errorMsg }}
          </v-alert>
          <v-layout row wrap>
            <v-flex xs6>
              <v-checkbox label="记住密码" v-model="remPwd"></v-checkbox>
            </v-flex>
            <v-flex xs6>
              <v-checkbox label="自动登录" v-model="autoLogin"></v-checkbox>
            </v-flex>
          </v-layout>
          <v-btn color="primary" v-on:click="submit">登录</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

axios.interceptors.request.use(
  function (config) {
    if (config.url === '/auth/token') return config
    if (localStorage.hasOwnProperty('JWT')) {
      config.headers.Authorization = 'Bearer ' + localStorage.JWT
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  })

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    // unauthorized with invalid token
    if (error.response.status === 401) {
      location.href = '/login'
    }
    return Promise.reject(error)
  })

// let serverUrl = 'http://localhost:8080/dashboard-web/api'
let serverUrl = '/api'
let valueUrl = serverUrl + '/value'
let chartUrl = serverUrl + '/chart'
let chartOptionUrl = serverUrl + '/chartOption'
let warehouseUrl = serverUrl + '/dim/warehouse'
let dateCycleUrl = serverUrl + '/dim/dateCycle'
let loginUrl = '/auth/token'
let metricUrl = serverUrl + '/metric'
let modelUrl = serverUrl + '/models'
let echarts = require('echarts')

function combineUrl (url, query) {
  let paramStr = ''
  for (let i in query) {
    if (query[i]) paramStr += '&' + i + '=' + encodeURIComponent(query[i])
  }
  paramStr = '/?' + paramStr.substr(1)
  return url + paramStr
}

function drawChart (id, option) {
  setTimeout(function () {
    if (document.getElementById(id)) {
      let myChart = echarts.init(document.getElementById(id))
      myChart.setOption(option)
    }
  }, 50)
}

function addDate (date, gap) {
  let dd = new Date(date)
  if (!date) {
    dd = new Date()
  }
  let n = gap || 0
  dd.setDate(dd.getDate() + n)
  let y = dd.getFullYear()
  let m = dd.getMonth() + 1
  let d = dd.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  let day = y + '/' + m + '/' + d
  return day
}

function getWeekOfYear (date) {
  let dd = new Date(date)
  let year = dd.getFullYear()
  let d1 = dd
  let d2 = new Date(year, 0, 1)

  let d = Math.round((d1 - d2) / (24 * 60 * 60 * 1000))
  return year + 'W' + (Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7))
}

function getWeekDuration (date, type, gap) {
  let now = new Date(date)
  if (!date) {
    now = new Date()
  }
  let nowTime = now.getTime()
  let day = now.getDay()
  let longTime = 24 * 60 * 60 * 1000
  let n = longTime * 7 * (gap || 0)
  let dd = now
  if (type === 's') {
    dd = nowTime - (day - 1) * longTime + n
  }
  if (type === 'e') {
    dd = nowTime + (7 - day) * longTime + n
  }
  dd = new Date(dd)
  let y = dd.getFullYear()
  let m = dd.getMonth() + 1
  let d = dd.getDate()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  day = y + '/' + m + '/' + d
  return day
}

function getMonthOfYear (date) {
  let d = new Date(date)
  let y = d.getFullYear()
  let m = d.getMonth() + 1
  m = m < 10 ? '0' + m : m
  return y + 'M' + m
}

function getMonthDuration (date, type, gap) {
  let d = new Date(date)
  if (!date) {
    d = new Date()
  }
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  if (Math.abs(gap) > 12) {
    gap = gap % 12
  }
  gap = gap || 0
  if (gap !== 0) {
    if (month + gap > 12) {
      year++
      month = (month + gap) % 12
    } else if (month + gap < 1) {
      year--
      month = 12 + month + gap
    } else {
      month = month + gap
    }
  }
  month = month < 10 ? '0' + month : month
  let firstday = year + '/' + month + '/' + '01'
  let lastday = ''
  if (month === '01' || month === '03' || month === '05' || month === '07' || month === '08' || month === '10' || month === '12') {
    lastday = year + '-' + month + '-' + 31
  } else if (month === '02') {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
      lastday = year + '/' + month + '/' + 29
    } else {
      lastday = year + '/' + month + '/' + 28
    }
  } else {
    lastday = year + '/' + month + '/' + 30
  }
  let day = ''
  if (type === 's') {
    day = firstday
  } else {
    day = lastday
  }
  return day
}

function initVue (components) {
  for (let i = 0; i < components.length; i++) {
    (function (comp) {
      Vue.component(comp.id + '-number', {
        template: comp.numberTemplate,
        data: function () {
          return {
            data: {},
            id: comp.id
          }
        },
        methods: {
          goDetails: function (metricId) {
            this.$router.push({ path: 'detail/' + metricId })
          },
          renderNumber (metricId, dateCycle, warehouse, sysdate) {
            if (dateCycle !== undefined) {
              let query = {metric: metricId, cycle: dateCycle, warehouse: warehouse.id, sysdate: sysdate}
              let url = combineUrl(valueUrl, query)
              axios.get(url)
                .then(function (response) {
                  this.data = response.data
                }.bind(this))
                .catch(function (error) {
                  console.log(error)
                })
            }
          }
        },
        mounted: function () {
          this.renderNumber(comp.id, 'day', this.$store.state.warehouse, this.$store.state.sysDate)
        }
      })
      Vue.use(comp.name + '-number')

      Vue.component(comp.id + '-chart', {
        template: comp.chartTemplate,
        data: function () {
          return {
            data: {},
            id: comp.id,
            chartId: comp.id + '-day',
            sysDate: '',
            sysDateBefore: ''
          }
        },
        methods: {
          goDetails: function (metricId) {
            this.$router.push({ path: 'detail/' + metricId })
          },
          renderNumber (metricId, dateCycle, warehouse, sysdate) {
            if (dateCycle !== undefined) {
              let query = {metric: metricId, cycle: dateCycle, warehouse: warehouse.id, sysdate: sysdate}
              let url = combineUrl(valueUrl, query)
              axios.get(url)
                .then(function (response) {
                  this.data = response.data
                }.bind(this))
                .catch(function (error) {
                  console.log(error)
                })
            }
          },
          renderChart (metricId, dateCycle, warehouse, sysdate) {
            let query = {metric: metricId, cycle: dateCycle, warehouse: warehouse.id, sysdate: sysdate}
            let url = combineUrl(chartUrl, query)
            axios.get(url)
            .then(function (response) {
              let data = response.data
              let query2 = {metric: metricId, cycle: dateCycle}
              let url2 = combineUrl(chartOptionUrl, query2)
              axios.get(url2)
                .then(function (response2) {
                  let option = (function (res, optionstr) {
                    return eval('(' + optionstr + ')')
                  })(data, response2.data)
                  drawChart(metricId + '-' + dateCycle, option)
                }).catch(function (error) {
                  console.log(error)
                })
            })
            .catch(function (error) {
              console.log(error)
            })
          }
        },
        mounted: function () {
          this.sysDate = this.$store.state.sysDate
          this.sysDateBefore = addDate(this.sysDate, -7)
          this.renderNumber(comp.id, 'day', this.$store.state.warehouse, this.$store.state.sysDate)
          this.renderChart(comp.id, 'day', this.$store.state.warehouse, this.$store.state.sysDate)
        }
      })
      Vue.use(comp.id + '-chart')
    })(components[i])
  }
  Vue.component('dummy-bar', {
    name: 'dummy-bar',
    template: '<v-flex xs6><v-card class="number-box circle-bar"><v-icon class="md-48 grey100" @click="goSettings">add_circle</v-icon></v-card></v-flex>',
    data: function () {
      return {
        data: {}
      }
    },
    mounted: function () {
    },
    methods: {
      goSettings: function () {
        this.$router.push({ path: 'settings' })
      }
    }
  })
  Vue.use('dummy-bar')
}

export default {
  data: () => ({
    valid: false,
    verified: true,
    e1: null,
    e2: false,
    errorMsg: null,
    username: null,
    nameRules: [
      (v) => !!v || '账号不能为空'
    ],
    password: null,
    mobile: null,
    pwdRules: [
      (v) => !!v || '密码不能为空'
    ],
    remPwd: false,
    autoLogin: true,
    getall: false
  }),
  methods: {
    getWarehouse () {
      axios.get(warehouseUrl)
        .then(function (res) {
          this.$store.commit('setWarehouse', res.data[0])
          this.$store.commit('setWarehouseList', res.data)
          this.getModels()
        }.bind(this))
        .catch(function (err) {
          console.log(err)
        })
    },
    getDateCycle () {
      axios.get(dateCycleUrl)
        .then(function (res) {
          this.$store.commit('setDateCycle', res.data)
        }.bind(this))
        .catch(function (err) {
          console.log(err)
        })
    },
    getMetrics () {
      let numberList = []
      let chartList = []
      let freeList = []
      let that = this
      axios.get(metricUrl)
        .then(function (res) {
          res.data.forEach(function (item) {
            that.$store.commit('addMetrics', item)
            if (item.metricType === 0) {
              numberList.push(item)
            } else if (item.metricType === 2) {
              chartList.push(item)
            } else if (item.metricType === 1) {
              freeList.push(item)
            }
          })
          that.$store.commit('setHomepageValue', numberList)
          that.$store.commit('setHomepageChart', chartList)
          that.$store.commit('setHomepageFree', freeList)
          that.$router.push({ name: 'homepage' })
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    getModels () {
      axios.get(modelUrl)
        .then(function (res) {
          initVue(res.data)
          this.getMetrics()
        }.bind(this))
        .catch(function (err) {
          console.log(err)
        })
    },
    submit () {
      this.username = this.username.toLowerCase()
      if (this.$refs.form.validate()) {
        axios.post(loginUrl, {
          username: this.username,
          password: this.password
        }).then(function (res) {
          if (res.data.token !== undefined) {
            this.$store.commit('setUser', this.username)
            localStorage.setItem('JWT', res.data.token)
            axios.all([this.getWarehouse(), this.getDateCycle()])
              .then(axios.spread(function (acct, perms) {
                // Both requests are now complete
              }))
          } else {
            this.verified = false
            this.errorMsg = res.data.msg
            this.$refs.username.reset()
            this.$refs.pwd.reset()
          }
        }.bind(this))
          .catch(function (err) {
            console.log(err)
          })
      }
    }
  },
  mounted: function () {
    let sysDate = '2017/10/31'
    this.$store.commit('setDate', sysDate)
    let sysWeek = getWeekOfYear(sysDate) + '(' + getWeekDuration(sysDate, 's') + '-' + getWeekDuration(sysDate, 'e') + ')'
    this.$store.commit('setWeek', sysWeek)
    let sysMonth = getMonthOfYear(sysDate) + '(' + getMonthDuration(sysDate, 's') + '-' + getMonthDuration(sysDate, 'e') + ')'
    this.$store.commit('setMonth', sysMonth)
  }
}
</script>
