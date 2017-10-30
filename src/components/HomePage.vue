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

.el-card__body
  padding: 5px

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

.custom
  background-color: #2E3C51
</style>

<template>
  <v-container grid-list-sm text-xs-center pt-0>
    <v-layout row wrap custom style="height: 60px; ">
      <v-flex xs8>
        <v-card>
          <v-select
            v-bind:items="items"
            v-model="e1"
            item-text="text"
            item-value="text"
            single-line
            bottom
            style="width: 50%"
          ></v-select>
        </v-card>
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
          <v-layout row wrap text-xs-left>
            <v-flex xs8 style="font-size: .75em; padding-top: 10px; padding-bottom: 0px">{{ item.funcName }}</v-flex>
            <v-flex xs4 style="font-size: .5em">
              {{ item.f1Name }}<br>
              <b style="font-size: 1.25em">{{ item.f1Value }}</b>
              <i v-if="item.f1Value > 0" class="material-icons md-16 green100">trending_up</i>
              <i v-else-if="item.f1Value == 0" class="material-icons md-16 yellow100">trending_flat</i>
              <i v-else-if="item.f1Value < 0" class="material-icons md-16 red100">trending_down</i>
            </v-flex>
            <v-flex xs8 style="font-size: 1.25em; padding-top: 5px; padding-bottom: 0px"><b>{{ item.funcValue }}</b></v-flex>
            <v-flex xs4 style="font-size: .5em">
              {{ item.f2Name }}<br>
              <b style="font-size: 1.25em">{{ item.f2Value }}</b>
              <i v-if="item.f2Value > 0" class="material-icons md-16 green100">trending_up</i>
              <i v-else-if="item.f2Value == 0" class="material-icons md-16 yellow100">trending_flat</i>
              <i v-else-if="item.f2Value < 0" class="material-icons md-16 red100">trending_down</i>
            </v-flex>
            <v-flex xs8 style="padding: 0px"><div class="under-bar"></div></v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex v-if="boxInfo.length % 2" xs6>
        <v-card style="padding: 5px; background-color: #2E3C51; height: 88px">
          <i class="material-icons md-48 grey100" @click=goSettings style="margin-top: 20px;">add_circle</i>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap text-xs-left v-for="(item,i) in chartInfo">
      <v-flex xs12 style="padding:2px 2px 0 2px">
        <v-card style="background-color: #364962; height: 88px; padding: 5px; box-shadow: none">
          <v-layout row wrap>
            <v-flex xs4 style="font-size: .75em" @click="goDetails">{{ item.funcName }}</v-flex>
            <v-flex xs3 style="font-size: .5em">
              {{ item.f1Name }}<br>
              <b style="font-size: 1.25em">{{ item.f1Value }}</b>
              <i v-if="item.f1Value > 0" class="material-icons md-16 green100">trending_up</i>
              <i v-else-if="item.f1Value == 0" class="material-icons md-16 yellow100">trending_flat</i>
              <i v-else-if="item.f1Value < 0" class="material-icons md-16 red100">trending_down</i>
            </v-flex>
            <v-flex xs1 style="padding-top: 8px"><div class="grey-bar"/></v-flex>
            <v-flex xs3 style="font-size: .5em; padding-top: 5px">{{ item.c1Name }}</v-flex>
            <v-flex xs1><i class="material-icons md-24 grey100" @click="goDetails(i)">more_horiz</i></v-flex>
            <v-flex xs4 style="font-size: 1.25em" @click="goDetails"><b>{{ item.funcValue }}</b></v-flex>
            <v-flex xs3 style="font-size: .5em">
              {{ item.f2Name }}<br>
              <b style="font-size: 1.25em">{{ item.f2Value }}</b>
              <i v-if="item.f2Value > 0" class="material-icons md-16 green100">trending_up</i>
              <i v-else-if="item.f2Value == 0" class="material-icons md-16 yellow100">trending_flat</i>
              <i v-else-if="item.f2Value < 0" class="material-icons md-16 red100">trending_down</i>
            </v-flex>
            <v-flex xs1 style="padding-top: 8px"><div class="cyan-bar"/></v-flex>
            <v-flex xs4 style="font-size: .5em; padding-top: 5px">{{ item.c2Name }}</v-flex>
            <v-flex xs4 style="padding: 0 0"><div class="under-bar"></div></v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 style="padding:0px 2px 0 2px">
        <v-card style="background-color: #2E3C51; height: 240px; padding: 5px; box-shadow: none">
          <chart :options="item.line" style="height: 240px; width: 100vw"></chart>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 style="padding-top: 4px">
        <v-card style="height: 40px; background-color: #2E3C51">
          <i class="material-icons md-32 grey100" @click=goSettings style="margin-top: 4px;">add_circle</i>
        </v-card>
      </v-flex>
      <v-flex xs3 v-for="i in 8" :key="i">
        <v-card style="padding: 3px; background-color: #2E3C51; font-size: .7em">客户调研活动</v-card>
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

export default {
  data: () => ({
    items: [
      { text: '全部仓库' },
      { text: '上海1仓' },
      { text: '上海2仓' },
      { text: '上海3仓' },
      { text: '上海4仓' }
    ],
    e1: null,
    boxInfo: [],
    chartInfo: []
  }),
  methods: {
    goSettings: function () {
      this.$router.push({ name: 'settings' })
    },
    goDetails: function (i) {
      this.$router.push({ name: 'detail', params: {chartInfo: this.chartInfo[i]} })
    }
  },
  mounted: function () {
    this.e1 = this.items[0]
    let serverUrl = 'http://localhost:8080/dashboard-web/api/stat'
    let boxesUrl = serverUrl + '/boxinfo'
    let chartsUrl = serverUrl + '/chartinfo'
    axios.get(boxesUrl)
      .then(function (res) {
        this.boxInfo = res.data
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      })
    axios.get(chartsUrl)
      .then(function (res) {
        this.chartInfo = res.data
        console.log(res.data)
        for (var i = 0; i <= res.data.length - 1; i++) {
          this.chartInfo[i].line = JSON.parse(JSON.stringify(line))
          this.chartInfo[i].line.xAxis.data = res.data[i].periods
          this.chartInfo[i].line.series[0].data = res.data[i].c1Value
          this.chartInfo[i].line.series[1].data = res.data[i].c2Value
          this.chartInfo[i].line.tooltip.formatter = dateFormatted
        }
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>
