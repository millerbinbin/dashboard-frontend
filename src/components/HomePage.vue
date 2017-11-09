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
              <v-btn icon v-on:click="router.push({ path: 'settings' })">
                <i class="material-icons md-24 grey100">settings</i>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6 user-tag>admin</v-flex>
      <v-flex xs6 date-tag>数据日期：2017/07/14</v-flex>
    </v-layout>
    <v-container grid-list-sm text-xs-left pt-0>
      <number-view></number-view>
      <chart-view></chart-view>
    </v-container>
    <v-layout row wrap text-xs-center>
      <v-flex xs12 circle-bar>
        <v-card>
          <i class="material-icons md-32 grey100">add_circle</i>
        </v-card>
      </v-flex>
      <v-flex xs3 v-for="i in 3" :key="i">
        <v-card> ddd </v-card>
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
        this.numberComps.push('sample1-number')
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
        this.chartComps.push('sample1-chart')
      }
    }
  },
  data: function () {
    return {
      a1: null,
      boxsize: [],
      warehouseList: [
        {warehouseName: '全部仓库', id: 1},
        {warehouseName: '上海1仓', id: 2},
        {warehouseName: '上海2仓', id: 3},
        {warehouseName: '上海3仓', id: 4}
      ]
    }
  },
  mounted: function () {
    this.a1 = this.warehouseList[0]
    let allnumbercomp = [12, 12, 27]
    this.boxsize = allnumbercomp.length
  }
}
</script>