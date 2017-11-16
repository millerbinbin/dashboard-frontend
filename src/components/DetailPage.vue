<template>
  <v-container grid-list-xs text-xs-left v-if="data.value">
    <v-toolbar fixed>
      <v-layout row wrap text-xs-center>
        <v-flex xs1 topbar-left>
          <v-btn icon v-on:click="goBack">返回</v-btn>
        </v-flex>
        <v-flex xs6 offset-xs2 topbar-center>
          {{data.value.f1}}
        </v-flex>
      </v-layout>
    </v-toolbar>

    <v-layout row wrap style="padding-top: 40px; margin-left: 3px !important; margin-right: 3px !important;">
      <v-flex xs12>
        <v-layout row wrap text-xs-left>
          <v-flex xs2 filter>
            <v-select v-bind:items="dateCycleList" v-model="a1" item-text="dateCycle" single-line bottom ></v-select>
          </v-flex>
          <v-flex xs8 detail-info>
            <span>{{period}}</span>
          </v-flex>
          <v-flex xs2 text-xs-right detail-info>
            <span style="font-weight: bold;">{{this.$store.state.warehouse.warehouseName}}</span>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-card class="chart">
      <v-card class="chart-detail-header">
        <v-layout row wrap>
            <v-flex xs4>
            <v-layout row wrap>
              <v-flex xs8 chart-detail-func-name>{{data.value.f1}}</v-flex>
              <v-flex xs2 text-xs-right>
                <v-tooltip right>
                  <i class="material-icons md-16 yellow100" slot="activator">info</i>
                  <span>{{tip}}</span>
                </v-tooltip>
              </v-flex>
              <v-flex xs12 chart-detail-func-value>{{data.value.v1}}</v-flex>
              <v-flex xs9><div class="under-bar"></div></v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs5>
            <v-layout row wrap style="padding-bottom: 6px; padding-top: 3px">
              <v-flex xs5 chart-detail-idx-name>
                <span>{{data.value.f4}}</span>    
              </v-flex>
              <v-flex xs4 chart-detail-idx-value>
                {{data.value.v4}}   
              </v-flex>
              <v-flex xs3 text-xs-left>
                <div v-if="data.value.v2 > 0" class="trending-up"></div>
                <div v-else-if="data.value.v2 == 0" class="trending-flat"></div>
                <div v-else-if="data.value.v2 < 0" class="trending-down"></div></span>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs5 chart-detail-idx-name>
                {{data.value.f5}}  
              </v-flex>
              <v-flex xs4 chart-detail-idx-value>
                {{data.value.v5}}
              </v-flex>
              <v-flex xs3 text-xs-left>
                <div v-if="data.value.v3 > 0" class="trending-up"></div>
                <div v-else-if="data.value.v3 == 0" class="trending-flat"></div>
                <div v-else-if="data.value.v3 < 0" class="trending-down"></div></span>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs3>
            <v-layout row wrap style="padding-bottom: 6px; padding-top: 3px">
              <v-flex xs5 chart-detail-idx-name>
                {{data.value.f2}}    
              </v-flex>
              <v-flex xs5 chart-detail-idx-value>
                {{data.value.v2}}%
              </v-flex>
              <v-flex xs2 text-xs-left>
                <div v-if="data.value.v2 > 0" class="trending-up"></div>
                <div v-else-if="data.value.v2 == 0" class="trending-flat"></div>
                <div v-else-if="data.value.v2 < 0" class="trending-down"></div></span>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs5 chart-detail-idx-name>
                {{data.value.f3}}    
              </v-flex>
              <v-flex xs5 chart-detail-idx-value>
                {{data.value.v3}}%
              </v-flex>
              <v-flex xs2 text-xs-left>
                <div v-if="data.value.v3 > 0" class="trending-up"></div>
                <div v-else-if="data.value.v3 == 0" class="trending-flat"></div>
                <div v-else-if="data.value.v3 < 0" class="trending-down"></div></span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
      <v-card class="chart-detail-body">
        <div :id="chartId" style="width:100%;height:180px"></div>
      </v-card>
      <v-card class="chart-detail-foot">
        <v-layout row wrap>
          <v-flex xs8 offset-xs2>
            <v-layout row wrap>
              <v-flex xs1 offset-xs2 cyan-bar></v-flex>
              <v-flex xs3 chart-legend>{{sysDate}}</v-flex>
              <v-flex xs1 offset-xs1 grey-bar></v-flex>
              <v-flex xs3 chart-legend>{{sysDateBefore}}</v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-card>
    <v-card class="chart-detail-table" v-if="headers">
      <v-data-table v-bind:headers="headers" :items="items" hide-actions item-key="name">
        <template slot="items" slot-scope="props">
          <tr v-if="props.item.value || expand==='remove'">
            <td class="text-xs-left" style="width: 36px">
              <i v-if="props.item.value" class="material-icons md-8 yellow100" v-on:click="if (expand==='remove') expand='add'; else expand='remove'">
                {{ expand }}
              </i>
              {{ props.item.c1 }}
            </td>
            <td class="text-xs-right">{{ props.item.c2 }}</td>
            <td class="text-xs-right">{{ props.item.c3 }}</td>
            <td class="text-xs-right">{{ props.item.c4 }}</td>
            <td class="text-xs-right">{{ props.item.c5 }}</td>
            <td class="text-xs-right">{{ props.item.c6 }}</td>
            <td v-if="headers.length >=7" class="text-xs-right">{{ props.item.c7 }}</td>
            <td v-if="headers.length >=8" class="text-xs-right">{{ props.item.c8 }}</td>
            <td v-if="headers.length >=9" class="text-xs-right">{{ props.item.c9 }}</td>
            <td v-if="headers.length >=10" class="text-xs-right">{{ props.item.c10 }}</td>
            <td v-if="headers.length >=11" class="text-xs-right">{{ props.item.c11 }}</td>
            <td v-if="headers.length >=12" class="text-xs-right">{{ props.item.c12 }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
var echarts = require('echarts')
// let serverUrl = 'http://localhost:8080/dashboard-web/api'
let serverUrl = '/api'
let valueUrl = serverUrl + '/value'
let chartUrl = serverUrl + '/chart'
let chartOptionUrl = serverUrl + '/chartOption'
let defUrl = serverUrl + '/def'
let gridUrl = serverUrl + '/grid'

export default {
  data: function () {
    return {
      a1: null,
      chartId: '',
      sysDateBefore: '',
      sysDate: '',
      period: '',
      expand: 'remove',
      dateCycleList: [
        { dateCycle: '日', id: 1 },
        { dateCycle: '周', id: 2 },
        { dateCycle: '月', id: 3 }
      ],
      data: {},
      def: {},
      tip: '',
      headers: [],
      items: [],
      metricId: null
    }
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
      if (val.dateCycle === '日') {
        this.renderNumber(this.$route.params.id, 'day', this.$store.state.warehouse, this.$store.state.sysDate)
        this.renderChart(this.$route.params.id, 'day', this.$store.state.warehouse, this.$store.state.sysDate)
        this.renderTable(this.$route.params.id, 'day', this.$store.state.sysDate)
        this.period = this.$store.state.sysDate
        this.tip = this.def.day
      } else if (val.dateCycle === '周') {
        this.renderNumber(this.$route.params.id, 'week', this.$store.state.warehouse, this.$store.state.sysDate)
        this.renderChart(this.$route.params.id, 'week', this.$store.state.warehouse, this.$store.state.sysDate)
        this.renderTable(this.$route.params.id, 'week', this.$store.state.sysDate)
        this.period = this.$store.state.sysWeek
        this.tip = this.def.week
      } else if (val.dateCycle === '月') {
        this.renderNumber(this.$route.params.id, 'month', this.$store.state.warehouse, this.$store.state.sysDate)
        this.renderChart(this.$route.params.id, 'month', this.$store.state.warehouse, this.$store.state.sysDate)
        this.renderTable(this.$route.params.id, 'month', this.$store.state.sysDate)
        this.period = this.$store.state.sysMonth
        this.tip = this.def.month
      }
    },
    getDef (metricId) {
      axios.get(defUrl + '/' + metricId)
        .then(function (response) {
          this.def = response.data
          this.tip = this.def.day
        }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    },
    renderTable (metricId, dateCycle, sysdate) {
      if (dateCycle !== undefined) {
        let query = {metric: metricId, cycle: dateCycle, sysdate: sysdate}
        let url = combineUrl(gridUrl, query)
        axios.get(url)
          .then(function (response) {
            var headers = response.data.headers
            this.headers = []
            for (let i = 0; i < headers.length; i++) {
              const element = headers[i].split(',')
              this.headers.push({text: element[1], sortable: false, value: element[0]})
            }
            var items = response.data.items
            this.items = []
            for (let i = 0; i < items.length; i++) {
              var tmp = items[i]
              if (i === 0) tmp.value = 1
              else tmp.value = 0
              this.items.push(tmp)
            }
          }.bind(this))
          .catch(function (error) {
            console.log(error)
          })
      }
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
        var data = response.data
        let query2 = {metric: metricId, cycle: dateCycle}
        let url2 = combineUrl(chartOptionUrl, query2)
        axios.get(url2)
          .then(function (response2) {
            var option = (function (res, optionstr) {
              return eval('(' + optionstr + ')')
            })(data, response2.data)
            drawChart(metricId, option)
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
    var metricId = this.$route.params.id
    this.getDef(metricId)
    this.chartId = metricId
    this.a1 = this.dateCycleList[0]
  }
}

function drawChart (id, option) {
  setTimeout(function () {
    var element = document.getElementById(id)
    var myChart
    if (element.attributes.length === 2) {
      myChart = echarts.init(element)
    } else {
      myChart = echarts.getInstanceByDom(element)
    }
    myChart.setOption(option)
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

function combineUrl (url, query) {
  let paramStr = ''
  for (let i in query) {
    if (query[i]) paramStr += '&' + i + '=' + encodeURIComponent(query[i])
  }
  paramStr = '/?' + paramStr.substr(1)
  return url + paramStr
}
</script>