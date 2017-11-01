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

@media (min-width 320px)
  .card
    .echarts
      width: 320px
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
  <v-container grid-list-xs text-xs-center style="padding-top: 0px">
    <v-layout row wrap >
      <v-flex xs1 style="text-align: right;">
        <i class="material-icons grey100" @click="goback">navigate_before</i>
      </v-flex>
      <v-flex xs2 style="text-align: left;font-size: 1em" @click="goback">
        返回
      </v-flex>
      <v-flex xs6>
        <b style="font-size: 1.5em">{{ this.$route.params.funcName }}</b>
      </v-flex>
    </v-layout>
    <v-layout row wrap style="background-color: #2E3C51; height: 60px; ">
<!--       <v-flex xs4>
        <v-select @input="redraw" v-bind:items="$store.state.warehouseList" v-model="e1" item-text="name" item-value="id" single-line bottom style="width: 90%"></v-select>
      </v-flex> -->
      <v-flex xs4>
        <v-select @input="redraw" v-bind:items="$store.state.dateCycleList" v-model="e1" item-text="name" item-value="id" single-line bottom style="width: 90%"></v-select>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6 style="font-size: .625em; text-align: left; padding-left: 5px; padding-top: 2px">{{ $store.state.sysUser }}</v-flex>
      <v-flex xs6 style="font-size: .625em; text-align: right; padding-right: 5px; padding-top: 2px">数据日期：{{ $store.state.sysDate }}</v-flex>
    </v-layout>
    <v-carousel hide-controls style="height: 360px" v-model="idx">
      <v-carousel-item
        v-for="(item,i) in chartInfo"
        v-bind:key="i"
        v-bind:src="aaa"
        transition="fade"
        reverseTransition="fade"
      >
        <v-layout row wrap>
          <v-flex xs12 style="padding:2px 2px 0 2px; width: 100%; height: 88px">
            <v-card style="background-color: #364962; height: 88px; padding: 5px; box-shadow: none">
              <v-layout row wrap>
                <v-flex xs4 style="font-size: .75em; text-align: left">{{ item.funcName }}</v-flex>
                <v-flex xs3 style="font-size: .5em; text-align: left;">
                  {{ item.idxName3 }}<br>
                  <b style="font-size: 1.25em">{{ item.idxValue3 }}%</b>
                  <i v-if="item.idxValue3 > 0" class="material-icons md-16 green100">trending_up</i>
                  <i v-else-if="item.idxValue3 == 0" class="material-icons md-16 yellow100">trending_flat</i>
                  <i v-else-if="item.idxValue3 < 0" class="material-icons md-16 red100">trending_down</i>
                </v-flex>
                <!-- <v-flex xs1 style="padding-top: 8px"><div class="grey-bar"/></v-flex>
                <v-flex xs3 style="font-size: .5em; text-align: left; padding-top: 5px">{{ startDate }}</v-flex> -->
                <v-flex xs3 style="font-size: .5em; text-align: left;">
                  {{ item.idxName1 }}<br>
                  <b style="font-size: 1.25em">{{ item.idxValue1 }}%</b>
                  <i v-if="item.idxValue1 > 0" class="material-icons md-16 green100">trending_up</i>
                  <i v-else-if="item.idxValue1 == 0" class="material-icons md-16 yellow100">trending_flat</i>
                  <i v-else-if="item.idxValue1 < 0" class="material-icons md-16 red100">trending_down</i>
                </v-flex>
                <v-flex xs4 style="font-size: 1.25em; text-align: left"><b>{{ item.funcFormatValue }}</b></v-flex>
                <v-flex xs3 style="font-size: .5em; text-align: left;">
                  {{ item.idxName4 }}<br>
                  <b style="font-size: 1.25em">{{ item.idxValue4 }}%</b>
                  <i v-if="item.idxValue4 > 0" class="material-icons md-16 green100">trending_up</i>
                  <i v-else-if="item.idxValue4 == 0" class="material-icons md-16 yellow100">trending_flat</i>
                  <i v-else-if="item.idxValue4 < 0" class="material-icons md-16 red100">trending_down</i>
                </v-flex>
                <v-flex xs3 style="font-size: .5em; text-align: left;">
                  {{ item.idxName2 }}<br>
                  <b style="font-size: 1.25em">{{ item.idxValue2 }}%</b>
                  <i v-if="item.idxValue2 > 0" class="material-icons md-16 green100">trending_up</i>
                  <i v-else-if="item.idxValue2 == 0" class="material-icons md-16 yellow100">trending_flat</i>
                  <i v-else-if="item.idxValue2 < 0" class="material-icons md-16 red100">trending_down</i>
                </v-flex>
                <!-- <v-flex xs1 style="padding-top: 8px"><div class="cyan-bar"/></v-flex>
                <v-flex xs4 style="font-size: .5em; text-align: left; padding-top: 5px">{{ statDate }}</v-flex> -->
                <v-flex xs4 style="padding: 0 0"><div class="under-bar"></div></v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex xs12 style="padding:0px 2px 0 2px; width: 100%; height: 240px">
            <v-card style="background-color: #2E3C51; height: 240px; padding: 5px; box-shadow: none">
              <chart :options="item.line"></chart>
            </v-card>
          </v-flex>
            <v-flex xs12 style="padding:0px 2px 0 2px; width: 100%; height: 20px">
            <span style="padding-right: 20px; font-size: .75em" v-for="(item, i) in index">
              <i v-if="i!=idx" class="material-icons md-16 grey100">lens</i> 
              <i v-else-if="i==idx" class="material-icons md-16 green100">lens</i>
              {{ item }}
            </span>
          </v-flex>
        </v-layout>
      </v-carousel-item>
    </v-carousel>

<!--   <v-data-table
      v-bind:headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
    <template slot="items" scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.calories }}</td>
      <td class="text-xs-right">{{ props.item.fat }}</td>
      <td class="text-xs-right">{{ props.item.carbs }}</td>
      <td class="text-xs-right">{{ props.item.protein }}</td>
      <td class="text-xs-right">{{ props.item.sodium }}</td>
      <td class="text-xs-right">{{ props.item.calcium }}</td>
      <td class="text-xs-right">{{ props.item.iron }}</td>
    </template>
  </v-data-table> -->

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
    index: [],
    idx: 0,
    e1: null,
    statDate: null,
    startDate: null,
    warehouse: null,
    chartInfo: [{}, {}]
  }),
  methods: {
    goback: function () {
      this.$router.go(-1)
    },
    redraw: function () {
      this.dateCycle = this.$store.state.dateCycleList[this.e1 - 1].name
      this.loadInfo(serverUrl + '/stat/res/chart', this.funcList)
    },
    loadInfo: function (requestUrl, infoList) {
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
        if (res.data.length > 0) {
          this.chartInfo = res.data
          this.index = []
          for (var i = 0; i <= res.data.length - 1; i++) {
            let pline = JSON.parse(JSON.stringify(line))
            pline.xAxis.data = res.data[i].p.slice(-7)
            pline.series[0].data = res.data[i].v1.slice(-7)
            pline.series[1].data = res.data[i].v1.slice(0, 7)
            pline.tooltip.formatter = dateFormatted
            this.chartInfo[i].line = pline
            this.index.push(res.data[i].funcName)
          }
        } else {
          this.chartInfo = [{}, {}]
          this.index = []
        }
        console.log(this.chartInfo)
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      })
    }
  },
  created: function () {
    this.e1 = this.$store.state.dateCycleList[0]
  },
  mounted: function () {
    this.warehouse = this.$route.params.warehouse
    this.statDate = this.$store.state.sysDate
    this.startDate = addDate(this.statDate, -14)
    this.dateCycle = this.e1.name
    this.funcList = ['人效-DO', '在库SKU', '接收订单量']
    this.loadInfo(serverUrl + '/stat/res/chart', this.funcList)
  }
}
</script>
