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
  postion: fixed

</style>

<template>
  <v-container grid-list-xs text-xs-center style="padding-top: 0px">
    <v-layout row wrap >
      <v-flex xs1 style="text-align: right;">
        <i class="material-icons grey100" @click="goback">navigate_before</i>
      </v-flex>
      <v-flex xs2 style="text-align: left;font-size: 1.25em" @click="goback">
        返回
      </v-flex>
      <v-flex xs6>
        <b style="font-size: 1.75em">成本效率</b>
      </v-flex>
    </v-layout>
    <v-layout row wrap style="background-color: #2E3C51; height: 60px; ">
      <v-flex xs5>
        <v-select
          v-bind:items="items_2"
          v-model="e2"
          item-text="text"
          item-value="text"
          single-line
          bottom
          style="width: 80%"
        ></v-select>
      </v-flex>
      <v-flex xs5>
        <v-select
          v-bind:items="items_1"
          v-model="e1"
          item-text="text"
          item-value="text"
          single-line
          bottom
          style="width: 80%"
        ></v-select>
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
        v-bind:src="item.funcName"
        transition="fade"
        reverseTransition="fade"
      >
      <v-layout row wrap>
        <v-flex xs12 style="padding:2px 2px 0 2px; width: 100%; height: 88px">
          <v-card style="background-color: #364962; height: 88px; padding: 5px; box-shadow: none">
            <v-layout row wrap>
              <v-flex xs4 style="font-size: .75em; text-align: left">{{ item.funcName }}</v-flex>
              <v-flex xs3 style="font-size: .5em; text-align: left;">
                {{ item.f1Name }}<br>
                <b style="font-size: 1.25em">{{ item.f1Value }}</b>
                <i v-if="item.f1Value > 0" class="material-icons md-16 green100">trending_up</i>
                <i v-else-if="item.f1Value == 0" class="material-icons md-16 yellow100">trending_flat</i>
                <i v-else-if="item.f1Value < 0" class="material-icons md-16 red100">trending_down</i>
              </v-flex>
              <v-flex xs1 style="padding-top: 8px"><div class="grey-bar"/></v-flex>
              <v-flex xs3 style="font-size: .5em; text-align: left; padding-top: 5px">2017/10/11</v-flex>
              <v-flex xs4 style="font-size: 1.25em; text-align: left"><b>{{ item.funcValue }}</b></v-flex>
              <v-flex xs3 style="font-size: .5em; text-align: left;">
                {{ item.f2Name }}<br>
                <b style="font-size: 1.25em">{{ item.f2Value }}</b>
                <i v-if="item.f2Value > 0" class="material-icons md-16 green100">trending_up</i>
                <i v-else-if="item.f2Value == 0" class="material-icons md-16 yellow100">trending_flat</i>
                <i v-else-if="item.f2Value < 0" class="material-icons md-16 red100">trending_down</i>
              </v-flex>
              <v-flex xs1 style="padding-top: 8px"><div class="cyan-bar"/></v-flex>
              <v-flex xs4 style="font-size: .5em; text-align: left; padding-top: 5px">{{ item.c2Name}}</v-flex>
              <v-flex xs4 style="padding: 0 0"><div class="under-bar"></div></v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs12 style="padding:0px 2px 0 2px; width: 100%; height: 240px">
          <v-card style="background-color: #2E3C51; height: 240px; padding: 5px; box-shadow: none">
            <chart :options="item.line" style="height: 240px; width: 320px"></chart>
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

export default {
  data: () => ({
    msg: 'Welcome to Your Vue.js App',
    index: ['成本效率', '总工时', 'Units'],
    idx: 0,
    items_1: [
      { text: '全部仓库' },
      { text: '上海1仓' },
      { text: '上海2仓' },
      { text: '上海3仓' },
      { text: '上海4仓' }
    ],
    items_2: [
      { text: '日维度' },
      { text: '周维度' },
      { text: '月维度' }
    ],
    e1: null,
    e2: null,
    username: 'admin',
    statDate: '2017/11/11',
    chartInfo: [
      {
        funcName: '接收订单量',
        value: '519,245',
        f1: '日环比',
        f1Value: 20.1,
        f2: '周环比',
        f2Value: -20.1,
        line: {
          title: {
            text: '动态数据 + 时间坐标轴',
            show: false
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              return '<span style="font-size:12px; color: #00D7FB">' + params[0].name + ' : ' + params[0].value + '</span><br>' +
                '<span style="font-size:12px; color: #6E88AC">' + addDate(params[0].name, -7) + ' : ' + params[1].value + '</span>'
            },
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
            name: '2017/11/11',
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
            name: '2017/10/11',
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
      },
      {
        funcName: '总工时',
        value: '59,218',
        f1: '日环比',
        f1Value: 10.1,
        f2: '周环比',
        f2Value: 11.2,
        line: {
          title: {
            text: '动态数据 + 时间坐标轴',
            show: false
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              return '<span style="font-size:12px; color: #00D7FB">' + params[0].name + ' : ' + params[0].value + '</span><br>' +
                '<span style="font-size:12px; color: #6E88AC">' + addDate(params[0].name, -7) + ' : ' + params[1].value + '</span>'
            },
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
            name: '2017/11/11',
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
            name: '2017/10/11',
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
      }
    ]
  }),
  computed: {
    width: function () {
      console.log(this.width)
    }
  },
  methods: {
    goback: function () {
      this.$router.go(-1)
    }
  },
  mounted: function () {
    this.e1 = this.items_1[0]
    this.e2 = this.items_2[0]
    let serverUrl = 'http://localhost:8080/dashboard-web/api/stat'
    let chartsUrl = serverUrl + '/chartinfo'
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
