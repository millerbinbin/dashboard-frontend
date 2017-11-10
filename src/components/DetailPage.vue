<template>
  <v-container grid-list-sm text-xs-left pt-0>
    <v-card class="top-bar">
      <v-layout row wrap text-xs-center>
        <v-flex xs2 style="font-size: 1.25em">
          <v-btn icon v-on:click="goBack">返回</v-btn>
        </v-flex>
        <v-flex xs6 offset-xs1>
          <span style="font-size: 1.375em;">{{data.day.f1}}</span>
        </v-flex>
      </v-layout>
    </v-card>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row wrap text-xs-left>
          <v-flex xs3 filter>
            <v-select v-bind:items="dateCycleList" v-model="a1" item-text="dateCycle" single-line bottom ></v-select>
          </v-flex>
          <v-flex xs7 style="padding-top: 15px; padding-left: 5px; font-size: .625em">
            <span>{{ a1.period }}</span>
          </v-flex>
          <v-flex xs2 text-xs-right style="padding-top: 15px; font-size: .625em">
            <span style="font-weight: bold;">全部仓库</span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 chart-detail-header v-if="data">
        <v-card>
          <v-layout row wrap>
             <v-flex xs4>
              <v-layout row wrap>
                <v-flex xs6 chart-detail-func-name-tag>{{data.day.f1}}</v-flex>
                <v-flex xs2 text-xs-right>
                  <v-tooltip right>
                    <i class="material-icons md-16 yellow100" slot="activator">info</i>
                    <span>{{ data.day.v3}}</span>
                  </v-tooltip>
                </v-flex>
                <v-flex xs12 chart-detail-func-value-tag>{{data.day.v1}}</v-flex>
                <v-flex xs8><div class="under-bar"></div></v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs4 chart-detail-idx-name>
              <span >{{data.day.f2}}<span class="chart-detail-idx-value">{{data.day.v2}}</span>
              <div v-if="data.day.v2 > 0" class="trending-up"></div>
              <div v-else-if="data.day.v2 == 0" class="trending-flat"></div>
              <div v-else-if="data.day.v2 < 0" class="trending-down"></div></span>
              <br><br><span>{{data.day.f2}}<span class="chart-detail-idx-value">{{data.day.v2}}</span>
              <div v-if="data.day.v2 > 0" class="trending-up"></div>
              <div v-else-if="data.day.v2 == 0" class="trending-flat"></div>
              <div v-else-if="data.day.v2 < 0" class="trending-down"></div></span>
            </v-flex>
            <v-flex xs4 chart-detail-idx-name>
              <span >{{data.day.f3}}<span class="chart-detail-idx-value">{{data.day.v3}}%</span>
              <div v-if="data.day.v3 > 0" class="trending-up"></div>
              <div v-else-if="data.day.v3 == 0" class="trending-flat"></div>
              <div v-else-if="data.day.v3 < 0" class="trending-down"></div></span>
              <br><br><span >{{data.day.f3}}<span class="chart-detail-idx-value">{{data.day.v3}}%</span>
              <div v-if="data.day.v3 > 0" class="trending-up"></div>
              <div v-else-if="data.day.v3 == 0" class="trending-flat"></div>
              <div v-else-if="data.day.v3 < 0" class="trending-down"></div></span>
            </v-flex>
          </v-layout>
        </v-card>
        <v-layout row wrap>
          <v-flex xs12 chart-detail>
            <v-card>
              <div v-show="showingDay" :id="dayChartId" style="width:100vw;height:240px"></div>
              <div v-show="showingWeek" :id="weekChartId" style="width:100vw;height:240px"></div>
              <div v-show="showingMonth" :id="monthChartId" style="width:100vw;height:240px"></div>
            </v-card>
            <v-card style="height: 30px!important">
              <v-layout row wrap>
                  <v-flex xs1 offset-xs3 grey-bar></v-flex>
                  <v-flex xs2 chart-idx-name>aaa</v-flex>
                  <v-flex xs1 cyan-bar></v-flex>
                  <v-flex xs2 chart-idx-name>bbb</v-flex>
              </v-layout>
            </v-card> 
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-data-table v-bind:headers="headers" :items="items" hide-actions item-key="name">
        <template slot="items" scope="props">
          <tr v-if="props.item.value==true || expand=='remove'">
            <td>
              <i v-if="props.item.value==true" class="material-icons md-8 yellow100" v-on:click="if (expand=='remove') expand='add'; else expand='remove'">
                {{ expand }}
              </i>
              {{ props.item.name }}
            </td>
            <td class="text-xs-right">{{ props.item.calories }}</td>
            <td class="text-xs-right">{{ props.item.fat }}</td>
            <td class="text-xs-right">{{ props.item.carbs }}</td>
            <td class="text-xs-right">{{ props.item.protein }}</td>
            <td class="text-xs-right">{{ props.item.sodium }}</td>
            <td class="text-xs-right">{{ props.item.calcium }}</td>
            <td class="text-xs-right">{{ props.item.iron }}</td>
          </tr>
        </template>
      </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
var echarts = require('echarts')
let serverUrl = 'http://localhost:8080/dashboard-web/api'

export default {
  data: function () {
    return {
      a1: null,
      showingDay: true,
      showingWeek: false,
      showingMonth: false,
      dayChartId: null,
      weekChartId: null,
      monthChartId: null,
      expand: 'remove',
      dateCycleList: [
        { dateCycle: '日', id: 1, period: '2017/10/31' },
        { dateCycle: '周', id: 2, period: 'W12(2017/10/24-2017/10/31)' },
        { dateCycle: '月', id: 3, period: 'M10(2017/10/01-2017/10/31)' }
      ],
      data: null,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {text: 'Calories', value: 'calories', sortable: false},
        {text: 'Fat (g)', value: 'fat', sortable: false},
        {text: 'Carbs (g)', value: 'carbs', sortable: false},
        {text: 'Protein (g)', value: 'protein', sortable: false},
        {text: 'Sodium (mg)', value: 'sodium', sortable: false},
        {text: 'Calcium (%)', value: 'calcium', sortable: false},
        {text: 'Iron (%)', value: 'iron', sortable: false}
      ],
      items: [
        {
          value: true,
          name: '全部仓库',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          value: false,
          name: '上海1仓',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          value: false,
          name: '上海2仓',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          value: false,
          name: '上海3仓',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        }
      ],
      funcId: null
    }
  },
  created: function () {
    this.a1 = this.dateCycleList[0]
  },
  watch: {
    a1: function (val) {
      this.changeChart(val)
    }
  },
  methods: {
    goBack: function () {
      this.$router.go(-1)
    },
    changeChart: function (val) {
      this.renderNumber(this.$route.params.id)
      if (val.dateCycle === '日') {
        this.showingDay = true
        this.showingWeek = false
        this.showingMonth = false
      } else if (val.dateCycle === '周') {
        this.showingDay = false
        this.showingWeek = true
        this.showingMonth = false
      } else if (val.dateCycle === '月') {
        this.showingDay = false
        this.showingWeek = false
        this.showingMonth = true
      }
    },
    renderNumber (funcId) {
      axios.get(serverUrl + '/value/' + funcId)
        .then(function (response) {
          this.data = response.data
        }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted: function () {
    var funcId = this.$route.params.id
    this.dayChartId = funcId + '-day'
    this.weekChartId = funcId + '-week'
    this.monthChartId = funcId + '-month'
    this.renderNumber(this.$route.params.id)
    axios.get(serverUrl + '/chart/' + funcId)
      .then(function (response) {
        var data = response.data
        for (var key in data) {
          (function (key) {
            axios.get(serverUrl + '/chartOption/' + funcId + '/' + key)
            .then(function (reponse2) {
              var option = (function (res, optionstr) {
                return eval('(' + optionstr + ')')
              })(data[key], reponse2.data)
              renderChart(funcId + '-' + key, option)
            }).catch(function (error) {
              console.log(error)
            })
          })(key)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

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
</script>