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

a
  color inherit
  text-decoration none

h1
  margin-bottom 1em
  font-family "Helvetica Neue", Dosis, "Source Sans Pro", "Helvetica Neue", Arial, sans-serif

h1,
h2
  color #2c3e50
  font-weight 300

h2
  margin-top 3em
  font-size 1.2em

.desc
  margin-bottom 4em
  color #7f8c8d

h2 small
  opacity .7

p small
  font-size .8em
  color #7f8c8d

p
  line-height 1.5

pre
  display inline-block
  padding .8em
  background-color #f9f9f9
  box-shadow 0 1px 2px rgba(0,0,0,.125)
  line-height 1.1
  color #2973b7

pre,
code
  font-family "Roboto Mono", Monaco, courier, monospace

pre code
  font-size .8em

.attr
  color #e96900

.val
  color #42b983

footer
  margin 5em 0 3em
  font-size .5em
  vertical-align middle

  a
    display inline-block
    margin 0 5px
    padding 3px 0 6px
    color #7f8c8d
    font-size 2em
    text-decoration none

  a:hover
    padding-bottom 3px
    border-bottom 3px solid #42b983

button
  border 1px solid #4fc08d
  /*border-radius 2em*/
  background-color #fff
  color #42b983
  cursor pointer
  font inherit
  transition opacity .3s

  &:focus
    outline none
    box-shadow 0 0 1px #4fc08d

  &:active
    background rgba(79, 192, 141, .2)

  &[disabled]
    opacity .5
    cursor not-allowed

button,
label
  font-size .75em

figure
  display inline-block
  margin 2em auto
  border 1px solid rgba(0, 0, 0, .1)
  border-radius 1em
  box-shadow 0 0 45px rgba(0, 0, 0, .2)
  padding 1.5em 2em
  background-color: #2E3C51

  .echarts
    width 40vw

.el-card
  background-color: #2E3C51
  color: #fbfdff
  margin 5px 5px
  border 0
  border-radius 0em
  box-shadow 0 0 45px rgba(0, 0, 0, .5)
  height: 75px
  .echarts
    width 40vw

.dummy-bar
  background-color: #6E88AC
  height: 5px
  width: 80%

.el-card__body
  padding: 5px

#logo
  display inline-block
  width 128px
  height 128px
  pointer-events none

@media (min-width 980px)
  figure.half
    padding 1em 1.5em

    .echarts
      width 28vw
      min-width 240px
      height 180px

    &:not(:last-child)
      margin-right 15px
   
@media (max-width 980px)
  p
    display flex
    justify-content center

    select
      text-indent calc(50% - 1em)

    select,
    label
      border 1px solid #4fc08d
      border-radius 2em
      background-color #fff
      color #42b983
      cursor pointer
      transition opacity .3s

    button,
    input,
    select,
    label
      flex 1 0
      margin 0 .5em
      padding 0
      line-height 2.4em
      max-width 40vw
      border-radius 2px
      font-size .8em

    select
      -webkit-appearance none

    input[type="checkbox"]
      display none

      &:checked + label
        background #42b983
        color #fff

  figure
    width 100vw
    margin 5px 5px
    padding 0 1em
    border none
    border-radius 0
    box-shadow none

    .echarts
      width 100%
      min-width 0
      height 75vw
</style>

<template>
  <main>
    <el-menu theme="dark" mode="horizontal" style="text-align: center">
      <el-submenu index="1">
        <template slot="title">全部仓库</template>
        <el-menu-item index="1-1">仓库1</el-menu-item>
        <el-menu-item index="1-2">仓库2</el-menu-item>
        <el-menu-item index="1-3">仓库3</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-row>
      <el-col :span="12" style="font-size: 10px; text-align: left; padding-left: 5px; padding-top: 2px">Admin</el-col>
      <el-col :span="12" style="font-size: 10px; text-align: right; padding-right: 5px; padding-top: 2px">数据日期：2017/11/11</el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-card class="box-card">
          <el-row>
            <el-col :span="16" style="font-size: 12px; text-align: left;">接收订单量</el-col>
            <el-col :span="8" style="font-size: 8px; text-align: left;">日环比<br><b style="font-size: 12px">20.1%</b></el-col>
            <el-col :span="16" style="font-size: 20px; text-align: left;"><b>519,246</b></el-col>
            <el-col :span="8" style="font-size: 8px; text-align: left;">周同比<br><b style="font-size: 12px">-20.1%</b></el-col>
            <el-col :span="16""><div class="dummy-bar"></div></el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <el-row>
            <el-col :span="16" style="font-size: 12px; text-align: left;">SKU准确率</el-col>
            <el-col :span="8" style="font-size: 8px; text-align: left;">日环比<br><b style="font-size: 12px">20.1%</b></el-col>
            <el-col :span="16" style="font-size: 20px; text-align: left;"><b>58.21%</b></el-col>
            <el-col :span="8" style="font-size: 8px; text-align: left;">周同比<br><b style="font-size: 12px">20.1%</b></el-col>
            <el-col :span="16""><div class="dummy-bar"></div></el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <el-row>
            <el-col :span="16" style="font-size: 12px; text-align: left;">接收订单量</el-col>
            <el-col :span="8" style="font-size: 8px; text-align: left;">日环比<br><b style="font-size: 12px">20.1%</b></el-col>
            <el-col :span="16" style="font-size: 20px; text-align: left;"><b>519,246</b></el-col>
            <el-col :span="8" style="font-size: 8px; text-align: left;">周同比<br><b style="font-size: 12px">-20.1%</b></el-col>
            <el-col :span="16""><div class="dummy-bar"></div></el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
        </el-card>
      </el-col>
    </el-row>
    <figure><chart :options="line" auto-resize></chart></figure>
    <el-row><el-card class="box-card" style="height: 40px"></el-card></el-row>
    <el-row :gutter="2">
      <el-col :span="6"><el-card class="box-card" style="height: 20px;font-size: 9px">采购商家在哪</el-card></el-col>
      <el-col :span="6"><el-card class="box-card" style="height: 20px;font-size: 9px">采购商家在哪</el-card></el-col>
      <el-col :span="6"><el-card class="box-card" style="height: 20px;font-size: 9px">采购商家在哪</el-card></el-col>
      <el-col :span="6"><el-card class="box-card" style="height: 20px;font-size: 9px">采购商家在哪</el-card></el-col>
      <el-col :span="6"><el-card class="box-card" style="height: 20px;font-size: 9px">采购商家在哪</el-card></el-col>
      <el-col :span="6"><el-card class="box-card" style="height: 20px;font-size: 9px">采购商家在哪</el-card></el-col>
      <el-col :span="6"><el-card class="box-card" style="height: 20px;font-size: 9px">采购商家在哪</el-card></el-col>
      <el-col :span="6"><el-card class="box-card" style="height: 20px;font-size: 9px">采购商家在哪</el-card></el-col>
    </el-row>
  </main>
</template>




<script>
import Vue from 'vue'
import ECharts from 'vue-echarts/components/ECharts.vue'
import axios from 'axios'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

export default {
  name: 'EChartsTest',
  components: {
    chart: ECharts
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      categories: [],
      bar: {
        title: {
          text: '异步数据加载示例',
          show: false
        },
        tooltip: {},
        legend: {
          orient: 'vertical',
          data: ['销量']
        },
        xAxis: {
          data: []
        },
        yAxis: {
          axisLabel: {show: false}
        },
        series: [{
          name: '销量',
          type: 'bar',
          data: []
        }]
      },
      line: {
        title: {
          text: '动态数据 + 时间坐标轴',
          show: false
        },
        legend: {
          orient: 'vertical',
          right: '20',
          data: ['模拟数据1', '模拟数据2'],
          textStyle: {
            color: '#6E88AC'
          }
        },
        // backgroundColor: '#2E3C51',
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            return params[0].name + ' : ' + params[0].value + '<br>' + params[1].name + ' : ' + params[1].value
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
          name: '模拟数据1',
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
          name: '模拟数据2',
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
  },
  methods: {
    testClick: function () {
    }
  },
  mounted: function () {
    let serverUrl = 'http://localhost:8080/hydra-man-web/api/stat'
    let categoryUrl = serverUrl + '/categories'
    let dataUrl = serverUrl + '/2017-11-24'
    let lineDataUrl = serverUrl + '/c'
    let periodUrl = serverUrl + '/periods'
    axios.get(categoryUrl)
      .then(function (res) {
        this.bar.xAxis.data = res.data
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      })
    axios.get(dataUrl)
      .then(function (res) {
        this.bar.series[0].data = res.data
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      })
    axios.get(periodUrl)
      .then(function (res) {
        this.line.xAxis.data = res.data
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      })
    axios.get(lineDataUrl)
      .then(function (res) {
        this.line.series[0].data = res.data[0]
        this.line.series[1].data = res.data[1]
        this.line.series[2].data = res.data[2]
        this.line.series[3].data = res.data[3]
      }.bind(this))
      .catch(function (err) {
        console.log(err)
      })
  }
}
</script>
