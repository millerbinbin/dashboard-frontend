<template>
  <v-container grid-list-sm text-xs-center>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3>
        <v-avatar class="grey lighten-4 logo">
          <img src="https://vuetifyjs.com/static/apple-touch-icon-180x180.png" alt="avatar">
        </v-avatar>
      </v-flex>
      <v-flex xs6 offset-xs3>
        <v-form v-model="valid" ref="form">
          <v-text-field label="账号" v-model="username" :rules="nameRules" required></v-text-field>
          <v-text-field label="密码" v-model="password" :rules="pwdRules" type="password" required></v-text-field>
          <v-alert v-show="!verified" color="error" icon="warning" style="font-size: .75em" value="true">
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
let serverUrl = 'http://localhost:8080/dashboard-web/api'
var echarts = require('echarts')

function renderChart (id, option) {
  setTimeout(function () {
    if (document.getElementById(id)) {
      var myChart = echarts.init(document.getElementById(id))
      myChart.setOption(option)
    }
  }, 50)
}

function addDate (dd, dadd) {
  let a = new Date(dd)
  a = a.valueOf()
  a = a + dadd * 24 * 60 * 60 * 1000
  a = new Date(a)
  let Year = a.getFullYear()
  let Month = a.getMonth() + 1
  let Day = a.getDate()
  let CurrentDate = Year + '/'
  if (Month >= 10) {
    CurrentDate += Month + '/'
  } else {
    CurrentDate += '0' + Month + '/'
  }
  if (Day >= 10) {
    CurrentDate += Day
  } else {
    CurrentDate += '0' + Day
  }
  return CurrentDate
}

function initVue (components) {
  for (var i = 0; i < components.length; i++) {
    (function (comp) {
      Vue.component(comp.id + '-number', {
        template: comp.numberTemplate,
        data: function () {
          return {
            data: {}
          }
        },
        created: function () {
          axios.get(serverUrl + '/value/' + comp.id)
            .then(function (response) {
              this.data = response.data
            }.bind(this))
            .catch(function (error) {
              console.log(error)
            })
        }
      })
      Vue.use(comp.name + '-number')

      Vue.component(comp.id + '-chart', {
        template: comp.chartTemplate,
        data: function () {
          return {
            data: {}
          }
        },
        methods: {
          goDetails: function (funcId) {
            this.$router.push({ path: 'detail' + '/' + funcId })
          }
        },
        mounted: function () {
          var that = this
          axios.get(serverUrl + '/value/' + comp.id)
            .then(function (response) {
              that.data = (response.data)
            })
            .catch(function (error) {
              console.log(error)
            })

          axios.get(serverUrl + '/chart/' + comp.id)
            .then(function (response) {
              var data = response.data
              var key = 'day'
              axios.get(serverUrl + '/chartOption/' + comp.id + '/' + key)
                .then(function (reponse2) {
                  var option = (function (res, optionstr) {
                    return eval('(' + optionstr + ')')
                  })(data[key], reponse2.data)
                  renderChart(comp.id + '-' + key, option)
                }).catch(function (error) {
                  console.log(error)
                })
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      })
      Vue.use(comp.id + '-chart')
    })(components[i])
  }
  Vue.component('dummy-bar', {
    name: 'dummy-bar',
    template: '<v-flex xs6 text-xs-center circle-bar><v-card><v-icon class="md-48 grey100" @click="goSettings">add_circle</v-icon></v-card></v-flex>',
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
      let warehouseUrl = serverUrl + '/dim/warehouse'
      this.$http.get(warehouseUrl)
        .then(function (res) {
          this.$store.commit('getWarehouse', res.data)
          this.getDateCycle()
        }.bind(this))
        .catch(function (err) {
          console.log(err)
        })
    },
    getDateCycle () {
      let dateCycleUrl = serverUrl + '/dim/datecycle'
      this.$http.get(dateCycleUrl)
        .then(function (res) {
          this.$store.commit('getDateCycle', res.data)
          this.getModels()
        }.bind(this))
        .catch(function (err) {
          console.log(err)
        })
    },
    getWeekOfYear (date) {
      let d1 = date
      let d2 = new Date(date.getFullYear(), 0, 1)
      let d = Math.round((d1 - d2) / (24 * 60 * 60 * 1000))
      return Math.ceil((d + ((d2.getDay() + 1) - 1)) / 7)
    },
    getFuncs () {
      let funcUrl = serverUrl + '/func'
      let numberList = []
      let chartList = []
      var that = this
      axios.get(funcUrl)
        .then(function (res) {
          res.data.forEach(function (item) {
            that.$store.commit('addMetrics', item)
            if (item.funcType === 0) {
              numberList.push(item)
            } else if (item.funcType === 2) {
              chartList.push(item)
            }
          })
          that.$store.commit('setHomepageValue', numberList)
          that.$store.commit('setHomepageChart', chartList)
          that.$router.push({ name: 'homepage' })
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    getModels () {
      let modelUrl = serverUrl + '/models'
      var that = this
      axios.get(modelUrl)
        .then(function (res) {
          initVue(res.data)
          that.getFuncs()
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    submit () {
      // this.username = this.username.toLowerCase()
      // if (this.$refs.form.validate()) {
      //   this.$http.post(serverUrl + '/user/login', {
      //     username: this.username,
      //     password: this.password
      //   }).then(function (res) {
      //     // let that = this
      //     if (res.data.errors === undefined || res.data.errors.length === 0) {
      //       this.$store.commit('getUser', this.username)
      //       this.$http.all([this.getConf(), this.getDateCycle()])
      //         .then(this.$http.spread(function (acct, perms) {
      //           // Both requests are now complete
      //         }))
      //     } else {
      //       this.verified = false
      //       this.errorMsg = res.data.errors[0].msg
      //       this.$refs.form.reset()
      //     }
      //   }.bind(this))
      //     .catch(function (err) {
      //       console.log(err)
      //     })
      // }
      this.getModels()
    }
  },
  mounted: function () {
    // let a = new Date()
    // console.log(getWeekOfYear(a))
    this.$store.commit('getDate', '2017/10/31')
  }
}
</script>
