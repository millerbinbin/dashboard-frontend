<template>
  <v-container grid-list-sm text-xs-left pt-0>
    <v-card class="top-bar">
      <v-layout row wrap text-xs-center>
        <v-flex xs2 style="font-size: 1.25em">
          <v-btn icon >返回</v-btn>
        </v-flex>
        <v-flex xs8>
          <span style="font-size: 1.375em;">首页模块</span>
        </v-flex>
        <v-flex xs2>
          <v-btn icon v-on:click="alert('help')">
            <i class="material-icons md-24 grey100">help</i>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card>
    <main>
      <v-tabs dark fixed centered>
        <v-tabs-bar>
          <v-tabs-slider></v-tabs-slider>
          <v-tabs-item href="#setting-values" >
            数据框
          </v-tabs-item>
          <v-tabs-item href="#setting-charts" >
            趋势图
          </v-tabs-item>
          <v-tabs-item href="#setting-layout" >
            布局管理
          </v-tabs-item>
        </v-tabs-bar>

        <v-tabs-items>

          <v-tabs-content key="setting-values" id="setting-values">
            <v-card flat>
              <v-list two-line subheader>
                <v-subheader>数据框</v-subheader>
                <v-divider></v-divider>
                <template v-for="(metric, idx) in metrics">
                  <v-list-tile avatar>
                    <v-list-tile-action>
                      <v-checkbox v-model="comp_value_option[metric.name]"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content v-on:click="toggleValueOption(metric.name)">
                      <v-list-tile-title>{{metric.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{metric.name}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider v-if="idx + 1 < metrics.length"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-tabs-content>

          <v-tabs-content key="setting-charts" id="setting-charts">
            <v-card flat>
              <v-list two-line subheader>
                <v-subheader>趋势图</v-subheader>
                <v-divider></v-divider>
                <template v-for="(metric, idx) in metrics">
                  <v-list-tile avatar>
                    <v-list-tile-action>
                      <v-checkbox v-model="comp_chart_option[metric.name]"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content v-on:click="toggleChartOption(metric.name)">
                      <v-list-tile-title>{{metric.name}}</v-list-tile-title>
                      <v-list-tile-sub-title>{{metric.name}}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider v-if="idx + 1 < metrics.length"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-tabs-content>

          <v-tabs-content key="setting-layout" id="setting-layout">
            <v-card flat>
              <v-list two-line subheader>
                <v-subheader>数据框</v-subheader>
                <v-divider></v-divider>
                <div id="value-list">
                  <template v-for="(metric, idx) in valueOptions ">
                    <div class="value-list-item" :id="metric.name">
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>{{metric.name}}</v-list-tile-title>
                          <v-list-tile-sub-title>{{metric.name}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                      <!-- <v-divider v-if="idx + 1 < valueOptions.length"></v-divider> -->
                   </div>
                  </template>
                </div>
              </v-list>
            </v-card>
            <v-card flat>
                <v-list two-line subheader>
                <v-subheader>数据框</v-subheader>
                <v-divider></v-divider>
                <div id="chart-list">
                  <template v-for="(metric, idx) in chartOptions ">
                    <div class="chart-list-item" :id="metric.name">
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>{{metric.name}}</v-list-tile-title>
                          <v-list-tile-sub-title>{{metric.name}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider></v-divider>
                   </div>
                  </template>
                </div>
              </v-list>
            </v-card>       
          </v-tabs-content>

        </v-tabs-items>
      </v-tabs>
    </main>
  </v-container>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  data: function () {
    return {
      metrics: [
        {name: 'sample1', id: 1},
        {name: 'sample2', id: 2},
        {name: 'sample3', id: 3},
        {name: 'sample4', id: 4}
      ],
      comp_value_option: {},
      comp_chart_option: {},
      valueOptions: [],
      chartOptions: []
    }
  },
  methods: {
    updateValueOption: function (item) {
      // console.log(this.comp_value_option)
    },
    toggleValueOption: function (item) {
      this.comp_value_option[item] = !this.comp_value_option[item]
      this.comp_value_option = JSON.parse(JSON.stringify(this.comp_value_option))
      var array = []
      for (var key in this.comp_value_option) {
        if (this.comp_value_option[key]) {
          array.push(this.$store.state.allMetrics[key])
        }
      }
      this.valueOptions = array
      this.$store.commit('setHomepageValue', this.valueOptions)
    },
    toggleChartOption: function (item) {
      this.comp_chart_option[item] = !this.comp_chart_option[item]
      this.comp_chart_option = JSON.parse(JSON.stringify(this.comp_chart_option))
      var array = []
      for (var key in this.comp_chart_option) {
        if (this.comp_chart_option[key]) {
          array.push(this.$store.state.allMetrics[key])
        }
      }
      this.chartOptions = array
      this.$store.commit('setHomepageChart', this.chartOptions)
    }
  },
  created: function () {
    for (var key in this.$store.state.allMetrics) {
      this.comp_chart_option[key] = true
    }
    for (key in this.$store.state.allMetrics) {
      this.comp_value_option[key] = true
    }
    this.comp_value_option = JSON.parse(JSON.stringify(this.comp_value_option))
    this.comp_chart_option = JSON.parse(JSON.stringify(this.comp_chart_option))
    this.valueOptions = []
    for (key in this.comp_value_option) {
      this.valueOptions.push(this.$store.state.allMetrics[key])
    }

    this.chartOptions = []
    for (key in this.comp_chart_option) {
      this.chartOptions.push(this.$store.state.allMetrics[key])
    }
    this.$store.commit('setHomepageValue', this.valueOptions)
    this.$store.commit('setHomepageChart', this.chartOptions)
  },
  mounted: function () {
    var e1 = document.getElementById('value-list')
    var that = this
    var sortable1 = Sortable.create(e1, {
      animation: 300,
      onSort: function (evt) {
        var valueListItem = document.querySelectorAll('.value-list-item')
        var array = []
        for (var item in valueListItem) {
          var id = valueListItem[item].id
          if (id !== undefined) {
            array.push(that.$store.state.allMetrics[id])
          }
        }
        that.valueOptions = array
        that.$store.commit('setHomepageValue', that.valueOptions)
      }
    })
    var e2 = document.getElementById('chart-list')
    var sortable2 = Sortable.create(e2, {
      animation: 50,
      onSort: function (evt) {
        var chartListItem = document.querySelectorAll('.chart-list-item')
        var array = []
        for (var item in chartListItem) {
          var id = chartListItem[item].id
          if (id !== undefined) {
            array.push(that.$store.state.allMetrics[id])
          }
        }
        that.chartOptions = array
        that.$store.commit('setHomepageChart', that.chartOptions)
      }
    })
  },
  watch: {
    comp_value_option: function (val) {
      console.log('val')
    },
    valueOptions: function (val) {
      console.log('ttt')
    }
  }
}
</script>
