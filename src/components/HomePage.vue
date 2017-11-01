<style lang="stylus">
*,
*::before,
*::after 
  box-sizing border-box 

body
  margin 0
  font-family "Source Sans Pro", "Helvetica Neue", Arial, sans-serif
  text-align center
  background-color #222E3E

.under-bar
  background-color: #6E88AC
  height: 5px
  width: 80%

.grey-bar
  background-color: #6E88AC
  height: 10px
  width: 80%

.cyan-bar
  background-color: #00D7FB
  height: 10px
  width: 80%

.material-icons.grey100 {
  color: #6E88AC;
}

.material-icons.red100 {
  color: #FF3300;
}

.material-icons.green100 {
  color: #00FF66;
}

.material-icons.yellow100 {
  color: #F8C849;
}

.material-icons.md-16 {
  font-size: 16px;
}

.material-icons.md-24 {
  font-size: 24px;
}

.material-icons.md-32 {
  font-size: 32px;
}

.material-icons.md-48 {
  font-size: 48px;
}

.input-group__input
  color: #fbfdff

.input-group label
  font-size: .75em

.list__tile__title 
  color: #fbfdff
  background-color: #2E3C51

.menu__content
  color: #fbfdff
  background-color: #2E3C51

@media (min-width 360px)
  .card
    .echarts
      width: 360px
      height: 240px

@media (min-width 480px)
  .card
    .echarts
      width: 440px
      height: 240px

@media (min-width 960px)
  .card
    .echarts
      width: 900px
      height: 240px

</style>

<template>
  <v-container grid-list-sm text-xs-center pt-0>
    <v-layout row wrap style="height: 60px; ">
      <v-flex xs8>
        <v-select
          v-bind:items="$store.state.warehouseList"
          v-model="e1"
          item-text="name"
          item-value="id"
          single-line
          bottom
          style="width: 50%"
          @input="redraw"
        ></v-select>
      </v-flex>
      <v-flex xs2 offset-xs2 style="padding-top: 21px">
        <i class="material-icons md-24 grey100" @click=goSettings>settings</i>
      </v-flex>
    </v-layout>
    <v-layout row wrap text-xs-left>
      <v-flex xs6 style="font-size: .625em; padding-left: 5px; padding-top: 2px">{{ $store.state.sysUser }}</v-flex>
      <v-flex xs6 text-xs-right style="font-size: .625em; padding-right: 5px; padding-top: 2px">数据日期：{{ $store.state.sysDate }}</v-flex>
      <v-flex xs6 v-for="item in boxInfo">
        <v-card style="padding: 5px; background-color: #2E3C51; height: 88px">
          <v-layout row wrap text-xs-left @click="goDetails(item.funcName)">
            <v-flex xs8 style="font-size: .75em; padding-top: 10px; padding-bottom: 0px">{{ item.funcName }}</v-flex>
            <v-flex xs4 style="font-size: .5em">
              {{ item.idxName1 }}<br>
              <b style="font-size: 1.25em">{{ item.idxValue1 }}%</b>
              <i v-if="item.idxValue1 > 0" class="material-icons md-16 green100">trending_up</i>
              <i v-else-if="item.idxValue1 == 0" class="material-icons md-16 yellow100">trending_flat</i>
              <i v-else-if="item.idxValue1 < 0" class="material-icons md-16 red100">trending_down</i>
            </v-flex>
            <v-flex xs8 style="font-size: 1.25em; padding-top: 5px; padding-bottom: 0px"><b>{{ item.funcFormatValue }}</b></v-flex>
            <v-flex xs4 style="font-size: .5em">
              {{ item.idxName2 }}<br>
              <b style="font-size: 1.25em">{{ item.idxValue2 }}%</b>
              <i v-if="item.idxValue2 > 0" class="material-icons md-16 green100">trending_up</i>
              <i v-else-if="item.idxValue2 == 0" class="material-icons md-16 yellow100">trending_flat</i>
              <i v-else-if="item.idxValue2 < 0" class="material-icons md-16 red100">trending_down</i>
            </v-flex>
            <v-flex xs8 style="padding: 0px"><div class="under-bar"></div></v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex v-if="boxInfo.length % 2" xs6>
        <v-card style="padding: 5px; background-color: #2E3C51; height: 88px; text-align: center">
          <i class="material-icons md-48 grey100" @click="goSettings" style="margin-top: 20px;">add_circle</i>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap text-xs-left v-for="(item,i) in chartInfo">
      <v-flex xs12 style="padding:2px 2px 0 2px">
        <v-card style="background-color: #364962; height: 88px; padding: 5px; box-shadow: none">
          <v-layout row wrap>
            <v-flex xs4 style="font-size: .75em" @click="goDetails(item.funcName)">{{ item.funcName }}</v-flex>
            <v-flex xs3 style="font-size: .5em">
              {{ item.idxName1 }}<br>
              <b style="font-size: 1.25em">{{ item.idxValue1 }}%</b>
              <i v-if="item.idxValue1 > 0" class="material-icons md-16 green100">trending_up</i>
              <i v-else-if="item.idxValue1 == 0" class="material-icons md-16 yellow100">trending_flat</i>
              <i v-else-if="item.idxValue1 < 0" class="material-icons md-16 red100">trending_down</i>
            </v-flex>
            <v-flex xs1 style="padding-top: 8px"><div class="grey-bar"/></v-flex>
            <v-flex xs3 style="font-size: .5em; padding-top: 5px">{{ midDate }}</v-flex>
            <v-flex xs1><i class="material-icons md-24 grey100" @click="goDetails(item.funcName)">more_horiz</i></v-flex>
            <v-flex xs4 style="font-size: 1.25em" @click="goDetails(item.funcName)"><b>{{ item.funcFormatValue }}</b></v-flex>
            <v-flex xs3 style="font-size: .5em">
              {{ item.idxName2 }}<br>
              <b style="font-size: 1.25em">{{ item.idxValue2 }}%</b>
              <i v-if="item.idxValue2 > 0" class="material-icons md-16 green100">trending_up</i>
              <i v-else-if="item.idxValue2 == 0" class="material-icons md-16 yellow100">trending_flat</i>
              <i v-else-if="item.idxValue2 < 0" class="material-icons md-16 red100">trending_down</i>
            </v-flex>
            <v-flex xs1 style="padding-top: 8px"><div class="cyan-bar"/></v-flex>
            <v-flex xs4 style="font-size: .5em; padding-top: 5px">{{ statDate }}</v-flex>
            <v-flex xs4 style="padding: 0 0"><div class="under-bar"></div></v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 style="padding:0px 2px 0 2px">
        <v-card style="background-color: #2E3C51; height: 240px; padding: 5px; box-shadow: none">
          <chart :options="item.line"></chart>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 style="padding-top: 4px">
        <v-card style="height: 40px; background-color: #2E3C51">
          <i class="material-icons md-32 grey100" @click="goSettings" style="margin-top: 4px;">add_circle</i>
        </v-card>
      </v-flex>
      <v-flex xs3 v-for="(item, i) in $store.state.freeList" :key="i">
        <v-card style="padding: 3px; background-color: #2E3C51; font-size: .7em"> {{ item }}</v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
Vue.use(Vuetify)
Vue.component('chart', ECharts)

function addDate (dd, dadd) {
  let a = new Date(dd)
  a = a.valueOf()
  a = a + dadd * 24 * 60 * 60 * 1000
  a = new Date(a)
  return a.getFullYear() + '/' + (a.getMonth() + 1) + '/' + a.getDate()
}

function dateFormatted (params) {
  return '<span style="font-size:12px; color: #00D7FB">' + params[0].name + ' : ' + params[0].value + '</span><br>' +
                '<span style="font-size:12px; color: #6E88AC">' + addDate(params[0].name, -7) + ' : ' + params[1].value + '</span>'
}

var line = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      animation: false
    }
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#6E88AC'
      }
    },
    data: []
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#6E88AC'
      }
    }
  },
  series: [{
    type: 'line',
    itemStyle: {
      normal: {
        color: '#00D7FB',
        width: 1
      }
    },
    data: []
  },
  {
    type: 'line',
    itemStyle: {
      normal: {
        color: '#6E88AC',
        width: 1
      }
    },
    data: []
  }]
}
let serverUrl = 'http://10.8.42.143:8080/dashboard-web/api'
export default {
  data: () => ({
    e1: null,
    statDate: null,
    startDate: null,
    warehouse: null,
    boxInfo: [],
    chartInfo: []
  }),
  methods: {
    goSettings: function () {
      this.$router.push({ name: 'settings' })
    },
    goDetails: function (funcName) {
      this.$router.push({ name: 'detail', params: {warehouse: this.warehouse, funcName: funcName} })
    },
    redraw: function () {
      this.warehouse = this.$store.state.warehouseList[this.e1 - 1].name
      this.loadInfo(serverUrl + '/stat/res/box', this.$store.state.boxList, 'box')
      this.loadInfo(serverUrl + '/stat/res/chart', this.$store.state.chartList, 'chart')
    },
    loadInfo: function (requestUrl, infoList, type) {
      axios.post(requestUrl,
        {
          funcNameList: infoList,
          warehouse: this.warehouse,
          dateCycle: this.dateCycle,
          statDate: this.statDate,
          dateStart: this.startDate,
          dateEnd: this.statDate}
        )
      .then(function (res) {
        if (type === 'box') {
          this.boxInfo = []
          this.boxInfo = res.data
        } else if (type === 'chart') {
          this.chartInfo = []
          for (var i = 0; i <= res.data.length - 1; i++) {
            let pline = JSON.parse(JSON.stringify(line))
            pline.xAxis.data = res.data[i].p.slice(-7)
            pline.series[0].data = res.data[i].v1.slice(-7)
            pline.series[1].data = res.data[i].v1.slice(0, 7)
            pline.tooltip.formatter = dateFormatted
            res.data[i].line = pline
            this.chartInfo.push(res.data[i])
          }
        }
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      })
    }
  },
  created: function () {
    this.e1 = this.$store.state.warehouseList[1]
  },
  mounted: function () {
    this.statDate = this.$store.state.sysDate
    this.startDate = addDate(this.statDate, -14)
    this.midDate = addDate(this.statDate, -7)
    this.warehouse = this.e1.name
    this.loadInfo(serverUrl + '/stat/res/box', this.$store.state.boxList, 'box')
    this.loadInfo(serverUrl + '/stat/res/chart', this.$store.state.chartList, 'chart')
  }
}
</script>
