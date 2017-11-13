<template>
  <v-container grid-list-sm text-xs-left pt-0>
    <v-card class="top-bar">
      <v-layout row wrap text-xs-center>
        <v-flex xs2 topbar-left>
          <v-btn icon v-on:click="goBack">返回</v-btn>
        </v-flex>
        <v-flex xs8 topbar-center>
          首页模块
        </v-flex>
        <v-flex xs2>
          <v-btn icon v-on:click="showHelp">
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
              <v-list one-line>
                <v-divider></v-divider>
                <template v-for="(metric, idx) in metrics">
                  <v-list-tile avatar :key="metric.id">
                    <v-list-tile-action>
                      <v-checkbox v-model="comp_value_option[metric.metricName]" :disabled="comp_value_option[metric.metricName]==-1" 
                      :true-value="1" :false-value="0" @change="toggleValueOption(metric)"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content v-on:click="toggleValueOption(metric, true)">
                      <v-list-tile-title>{{metric.metricName}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider v-if="idx + 1 < metrics.length" :key="metric.id"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-tabs-content>

          <v-tabs-content key="setting-charts" id="setting-charts">
            <v-card flat>
              <v-list one-line>
                <v-divider></v-divider>
                <template v-for="(metric, idx) in metrics">
                  <v-list-tile avatar :key="metric.id">
                    <v-list-tile-action>
                      <v-checkbox v-model="comp_chart_option[metric.metricName]" :disabled="comp_chart_option[metric.metricName]==-1" 
                      :true-value="1" :false-value="0" @change="toggleChartOption(metric)"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content v-on:click="toggleChartOption(metric, true)">
                      <v-list-tile-title>{{metric.metricName}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider v-if="idx + 1 < metrics.length" :key="metric.id"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-tabs-content>

          <v-tabs-content key="setting-layout" id="setting-layout">
            <v-card flat>
              <v-list one-line subheader>
                <v-subheader>数据框</v-subheader>
                <v-divider></v-divider>
                <draggable v-model="valueOptions" :options="{group:'value', animation: 150}" @end="updateValueOption">
                  <div v-for="(metric, idx) in valueOptions" :key="metric.id">
                    <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{metric.metricName}}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                  </div>
                </draggable>
              </v-list>
            </v-card>
            <v-card flat>
              <v-list one-line subheader>
                <v-subheader>趋势图</v-subheader>
                <v-divider></v-divider>
                <draggable v-model="chartOptions" :options="{group:'chart', animation: 150}" @end="updateChartOption">
                  <div v-for="(metric, idx) in chartOptions" :key="metric.id">
                    <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{metric.metricName}}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                  </div>
                </draggable>
              </v-list>
            </v-card>
            
          </v-tabs-content>

        </v-tabs-items>
      </v-tabs>
    </main>
    <v-layout row wrap text-xs-center>
      <v-flex xs4 offset-xs4 v-on:click="goDef">
        <v-layout row wrap>
          <v-flex xs2 offset-xs2><i class="material-icons md-16 yellow100" >info</i></v-flex>
          <v-flex xs7 text-xs-left style="font-size: .875em">数据定义</v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs2 offset-xs10 style="font-size: .625em" v-on:click="goLogin">退出登录</v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data: function () {
    return {
      metrics: [],
      comp_value_option: {},
      comp_chart_option: {},
      valueOptions: [],
      chartOptions: []
    }
  },
  methods: {
    goDef: function () {
      this.$router.push({path: 'def'})
    },
    goBack: function () {
      this.$router.go(-1)
    },
    goLogin: function () {
      this.$router.push({path: 'login'})
    },
    showHelp: function () {
      alert('show some help?')
    },
    updateValueOption: function () {
      this.$store.commit('setHomepageValue', this.valueOptions)
      var seq = 0
      var that = this
      this.valueOptions.forEach(function (item) {
        var tmp = item
        tmp.seq = seq
        that.$store.commit('addMetrics', tmp)
        seq += 1
      })
    },
    updateChartOption: function () {
      this.$store.commit('setHomepageChart', this.chartOptions)
      var seq = 0
      var that = this
      this.chartOptions.forEach(function (item) {
        var tmp = item
        tmp.seq = seq
        that.$store.commit('addMetrics', tmp)
        seq += 1
      })
    },
    toggleValueOption: function (item, onClick) {
      var name = item.metricName
      if (onClick) {
        this.comp_value_option[name] = 1 - this.comp_value_option[name]
      }
      this.comp_chart_option[name] = 0 - this.comp_value_option[name]
      this.comp_value_option = JSON.parse(JSON.stringify(this.comp_value_option))
      var tmp = item
      tmp.metricType = 1 + this.comp_chart_option[name]
      this.$store.commit('addMetrics', tmp)
      var array = []
      var array2 = []
      for (var key in this.comp_value_option) {
        if (this.comp_value_option[key] === 1) {
          array.push(this.$store.state.allMetrics[key])
        } else if (this.comp_value_option[key] === 0) {
          array2.push(this.$store.state.allMetrics[key])
        }
      }
      this.valueOptions = array
      this.$store.commit('setHomepageValue', this.valueOptions)
      this.$store.commit('setHomepageFree', array2)
    },
    toggleChartOption: function (item, onClick) {
      var name = item.metricName
      if (onClick) {
        this.comp_chart_option[name] = 1 - this.comp_chart_option[name]
      }
      this.comp_value_option[name] = 0 - this.comp_chart_option[name]
      this.comp_chart_option = JSON.parse(JSON.stringify(this.comp_chart_option))
      var tmp = item
      tmp.metricType = 1 + this.comp_chart_option[name]
      this.$store.commit('addMetrics', tmp)
      var array = []
      var array2 = []
      for (var key in this.comp_chart_option) {
        if (this.comp_chart_option[key] === 1) {
          array.push(this.$store.state.allMetrics[key])
        } else if (this.comp_value_option[key] === 0) {
          array2.push(this.$store.state.allMetrics[key])
        }
      }
      this.chartOptions = array
      this.$store.commit('setHomepageChart', this.chartOptions)
      this.$store.commit('setHomepageFree', array2)
    }
  },
  created: function () {
    for (var key in this.$store.state.allMetrics) {
      if (this.$store.state.allMetrics[key].metricType === 0) {
        this.comp_value_option[key] = 1
      } else if (this.$store.state.allMetrics[key].metricType === 2) {
        this.comp_value_option[key] = -1
      } else if (this.$store.state.allMetrics[key].metricType === 1) {
        this.comp_value_option[key] = 0
      }
      this.comp_chart_option[key] = 0 - this.comp_value_option[key]
      this.metrics.push(this.$store.state.allMetrics[key])
    }
    this.comp_value_option = JSON.parse(JSON.stringify(this.comp_value_option))
    this.comp_chart_option = JSON.parse(JSON.stringify(this.comp_chart_option))
    this.valueOptions = this.$store.state.homepageValues
    this.chartOptions = this.$store.state.homepageCharts
    // this.valueOptions = []
    // for (key in this.comp_value_option) {
    //   if (this.comp_value_option[key] === 1) {
    //     this.valueOptions.push(this.$store.state.allMetrics[key])
    //   }
    // }

    // this.chartOptions = []
    // for (key in this.comp_chart_option) {
    //   if (this.comp_chart_option[key] === 1) {
    //     this.chartOptions.push(this.$store.state.allMetrics[key])
    //   }
    // }
    // this.$store.commit('setHomepageValue', this.valueOptions)
    // this.$store.commit('setHomepageChart', this.chartOptions)
  },
  mounted: function () {
  }
}
</script>
