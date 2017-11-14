<template>
  <v-container grid-list-sm text-xs-left pt-0>
    <v-toolbar fixed>
      <v-layout row wrap text-xs-center>
        <v-flex xs5 offset-xs4 filter style="font-size: 10px" text-xs-right>
          <v-select v-bind:items="warehouseList" v-model="warehouse" item-text="warehouseName" single-line bottom style="width: 90%"></v-select>
        </v-flex>
        <v-flex xs2 offset-xs1>
          <v-btn icon v-on:click="goSettings">
            <i class="material-icons md-24 grey100">settings</i>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-toolbar>
    <v-layout row wrap style="padding-top: 50px">
      <v-flex xs6 user-tag>{{ this.sysUser }}</v-flex>
      <v-flex xs6 date-tag>数据日期：{{ this.sysDate }}</v-flex>
    </v-layout>
    <number-view v-if="showComp"></number-view>
    <chart-view v-if="showComp"></chart-view>
    <v-layout row wrap text-xs-center v-if="this.$store.state.homepageFree.length > 0">
      <v-flex xs12 circle-bar>
        <v-card>
          <i class="material-icons md-32 grey100" v-on:click="goSettings">add_circle</i>
        </v-card>
      </v-flex>
      <v-flex xs3 v-for="(item, idx) in this.$store.state.homepageFree" :key="idx" @click="goDetails(item.id)">
        <v-card> {{ item.metricName }} </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {
    'number-view': {
      data: function () {
        return {
          numberComps: []
        }
      },
      render: function (c) {
        let list = []
        this.numberComps.map(function (item) {
          list.push(c(item, {}))
        })
        if (list.length % 2 === 0) {
          return c('div', {'class': {layout: true, row: true, wrap: true}}, list)
        } else {
          list.push(c('dummy-bar', {}))
          return c('div', {'class': {layout: true, row: true, wrap: true}}, list)
        }
      },
      mounted: function () {
        var that = this
        this.$store.state.homepageValues.forEach(function (item) {
          that.numberComps.push(item.id + '-number')
        })
      }
    },
    'chart-view': {
      data: function () {
        return {
          chartComps: []
        }
      },
      render: function (c) {
        let list = []
        this.chartComps.map(function (item) {
          list.push(c(item, {}))
        })
        return c('div', {'class': {layout: true, row: true, wrap: true, chart: true}}, list)
      },
      mounted: function () {
        var that = this
        this.$store.state.homepageCharts.forEach(function (item) {
          that.chartComps.push(item.id + '-chart')
        })
      }
    }
  },
  methods: {
    goSettings: function () {
      this.$router.push({ path: 'settings' })
    },
    goDetails: function (metricId) {
      this.$router.push({ path: 'detail/' + metricId })
    }
  },
  watch: {
    warehouse: function (val) {
      this.$store.commit('setWarehouse', val)
      this.showComp = false
      this.$nextTick(function () {
        this.showComp = true
      })
    }
  },
  data: function () {
    return {
      warehouse: null,
      sysUser: 'jd_user',
      sysDate: '2017/11/01',
      warehouseList: [],
      showComp: true
    }
  },
  mounted: function () {
    this.sysDate = this.$store.state.sysDate
    this.sysUser = this.$store.state.sysUser
    this.warehouseList = this.$store.state.warehouseList
    this.warehouse = this.$store.state.warehouse
  }
}
</script>