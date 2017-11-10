<template>
  <v-container grid-list-sm text-xs-left pt-0>
    <v-card class="top-bar">
      <v-layout row wrap text-xs-center>
        <v-flex xs2 style="font-size: 1.25em">
          <v-btn icon v-on:click="goBack">返回</v-btn>
        </v-flex>
        <v-flex xs8>
          <span style="font-size: 1.375em;">首页模块</span>
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
                  <v-list-tile avatar>
                    <v-list-tile-action>
                      <v-checkbox v-model="comp_value_option[metric.funcName]" :disabled="comp_value_option[metric.funcName]==-1" 
                      :true-value="1" :false-value="0" @change="toggleValueOption(metric)"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content v-on:click="toggleValueOption(metric, true)">
                      <v-list-tile-title>{{metric.funcName}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider v-if="idx + 1 < metrics.length"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-tabs-content>

          <v-tabs-content key="setting-charts" id="setting-charts">
            <v-card flat>
              <v-list one-line>
                <v-divider></v-divider>
                <template v-for="(metric, idx) in metrics">
                  <v-list-tile avatar>
                    <v-list-tile-action>
                      <v-checkbox v-model="comp_chart_option[metric.funcName]" :disabled="comp_chart_option[metric.funcName]==-1" 
                      :true-value="1" :false-value="0" @change="toggleChartOption(metric)"></v-checkbox>
                    </v-list-tile-action>
                    <v-list-tile-content v-on:click="toggleChartOption(metric, true)">
                      <v-list-tile-title>{{metric.funcName}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider v-if="idx + 1 < metrics.length"></v-divider>
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
                  <div v-for="(metric, idx) in valueOptions">
                    <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{metric.funcName}}</v-list-tile-title>
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
                  <div v-for="(metric, idx) in chartOptions">
                    <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{metric.funcName}}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                  </div>
                </draggable>
              </v-list>
            </v-card>
            <v-layout row wrap text-xs-center>
              <v-flex xs4 offset-xs4 v-on:click="goDesc">
                <i class="material-icons md-16 yellow100" >info</i><span>数据定义</span>
              </v-flex>
              <v-flex xs2 offset-xs10 style="font-size: .625em" v-on:click="goLogin">退出登录</v-flex>
            </v-layout>
          </v-tabs-content>

        </v-tabs-items>
      </v-tabs>
    </main>
  </v-container>
</template>

<script>
import Sortable from 'sortablejs'
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
    goDesc: function () {
      this.$router.push({path: 'desc'})
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
    },
    updateChartOption: function () {
      this.$store.commit('setHomepageChart', this.chartOptions)
    },
    toggleValueOption: function (item, onClick) {
      var name = item.funcName
      if (onClick) {
        this.comp_value_option[name] = 1 - this.comp_value_option[name]
      }
      this.comp_chart_option[name] = 0 - this.comp_value_option[name]
      this.comp_value_option = JSON.parse(JSON.stringify(this.comp_value_option))
      var tmp = item
      tmp.funcType = 1 + this.comp_chart_option[name]
      this.$store.commit('addMetrics', tmp)
      var array = []
      for (var key in this.comp_value_option) {
        if (this.comp_value_option[key] === 1) {
          array.push(this.$store.state.allMetrics[key])
        }
      }
      this.valueOptions = array
      this.$store.commit('setHomepageValue', this.valueOptions)
    },
    toggleChartOption: function (item, onClick) {
      var name = item.funcName
      if (onClick) {
        this.comp_chart_option[name] = 1 - this.comp_chart_option[name]
      }
      this.comp_value_option[name] = 0 - this.comp_chart_option[name]
      this.comp_chart_option = JSON.parse(JSON.stringify(this.comp_chart_option))
      var tmp = item
      tmp.funcType = 1 + this.comp_chart_option[name]
      this.$store.commit('addMetrics', tmp)
      var array = []
      for (var key in this.comp_chart_option) {
        if (this.comp_chart_option[key] === 1) {
          array.push(this.$store.state.allMetrics[key])
        }
      }
      this.chartOptions = array
      this.$store.commit('setHomepageChart', this.chartOptions)
    }
  },
  created: function () {
    for (var key in this.$store.state.allMetrics) {
      if (this.$store.state.allMetrics[key].funcType === 0) {
        this.comp_value_option[key] = 1
      } else if (this.$store.state.allMetrics[key].funcType === 2) {
        this.comp_value_option[key] = -1
      } else if (this.$store.state.allMetrics[key].funcType === 1) {
        this.comp_value_option[key] = 0
      }
      this.comp_chart_option[key] = 0 - this.comp_value_option[key]
      this.metrics.push(this.$store.state.allMetrics[key])
    }
    this.comp_value_option = JSON.parse(JSON.stringify(this.comp_value_option))
    this.comp_chart_option = JSON.parse(JSON.stringify(this.comp_chart_option))
    this.valueOptions = []
    for (key in this.comp_value_option) {
      if (this.comp_value_option[key] === 1) {
        this.valueOptions.push(this.$store.state.allMetrics[key])
      }
    }

    this.chartOptions = []
    for (key in this.comp_chart_option) {
      if (this.comp_chart_option[key] === 1) {
        this.chartOptions.push(this.$store.state.allMetrics[key])
      }
    }
    this.$store.commit('setHomepageValue', this.valueOptions)
    this.$store.commit('setHomepageChart', this.chartOptions)
  },
  mounted: function () {
  }
}
</script>
