<template>
  <v-container grid-list-sm text-xs-left pt-0>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card class="top-bar" fixed>
          <v-layout row wrap text-xs-center>
            <v-flex xs4 offset-xs4 filter>
              <v-select v-bind:items="warehouseList" v-model="a1" item-text="warehouseName" item-value="id" single-line bottom></v-select>
            </v-flex>
            <v-flex xs2 offset-xs2>
              <v-btn icon v-on:click="goSettings">
                <i class="material-icons md-24 grey100">settings</i>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6 user-tag>{{ this.sysUser }}</v-flex>
      <v-flex xs6 date-tag>数据日期：{{ this.sysDate }}</v-flex>
    </v-layout>
    <v-container grid-list-sm text-xs-left pt-0>
      <number-view></number-view>
      <chart-view></chart-view>
    </v-container>
    <v-layout row wrap text-xs-center>
      <v-flex xs12 circle-bar>
        <v-card>
          <i class="material-icons md-32 grey100" v-on:click="goSettings">add_circle</i>
        </v-card>
      </v-flex>
      <v-flex xs3 v-for="(item, idx) in this.$store.state.freeList" :key="idx">
        <v-card> {{ item.funcName }} </v-card>
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
          console.log(item)
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
        console.log(that.numberComps)
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
        return c('div', {'class': {layout: true, row: true, wrap: true}}, list)
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
    }
  },
  data: function () {
    return {
      a1: null,
      sysUser: 'jd_user',
      sysDate: '2017/11/01',
      warehouseList: [
        {warehouseName: '全部仓库', id: 1},
        {warehouseName: '上海1仓', id: 2},
        {warehouseName: '上海2仓', id: 3},
        {warehouseName: '上海3仓', id: 4}
      ]
    }
  },
  mounted: function () {
    this.sysDate = this.$store.state.sysDate
    this.a1 = this.warehouseList[0]
    let allnumbercomp = [12, 12, 27]
  }
}
</script>