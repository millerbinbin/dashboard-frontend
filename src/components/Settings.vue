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
</style>

<style lang="stylus" scoped>
.card
  background-color: #6E88AC
  text-align: left
  font-size: .75em
  font-weight: 50

.card:hover
  opacity: 0.6
  
</style>
<template>
  <v-container grid-list-sm text-xs-center style="padding-top: 0px">
    <v-layout row wrap style="background-color: #2E3C51; height: 60px; padding-top: 16px">
      <v-flex xs1 style="text-align: right;">
        <i class="material-icons md-24 grey100" @click="goback">navigate_before</i>
      </v-flex>
      <v-flex xs2 style="text-align: left;font-size: 1.25em" @click="goback">
        返回
      </v-flex>
      <v-flex xs7 style="font-size: 1.25em">
        首页模块
      </v-flex>
      <v-flex xs2 style="padding-top: 5px">
        <i class="material-icons md-24 grey100">help</i>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs8 offset-xs2 style="font-size: .625em">您可以设计自己专属的DashBoard在下方添加并拖动整理您关心的数据</v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 style="text-align: left">数据框</v-flex>
      <v-flex xs12>
        <v-card draggable="true" style="margin-top: 2px" v-model="e1" v-for="(item, index) in boxList" v-dragging="{ item: item, list: boxList, group: 'box' }" :key="item">
          <i class="material-icons md-16 red100" @click="removeBoxItem(index)">remove_circle</i>{{item}}
      	</v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 style="text-align: left">数据趋势图</v-flex>
      <v-flex xs12>
        <v-card draggable="true" style="margin-top: 2px" v-for="(item, index) in chartList" v-dragging="{ item: item, list: chartList, group: 'chart' }" :key="item">
          <i class="material-icons md-16 red100" @click="removeChartItem(index)">remove_circle</i>{{item}}
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 style="text-align: left"></v-flex>
      <v-flex xs12>
        <v-card style="margin-top: 2px" v-for="(item, index) in freeList" :key="item">
          <i class="material-icons md-16 green100" @click="addItem(index)">add_circle</i>{{item}}
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 style="font-size: 1em; padding-top: 10px; padding-bottom: 30px">
      	<i class="material-icons md-16 yellow100" >info</i>数据定义
      </v-flex>
      <v-flex xs2 offset-xs10 style="font-size: .625em" @click="goLogin">退出登录</v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import VueDND from 'awe-dnd'
import axios from 'axios'
Vue.use(VueDND)

export default {
  data: () => ({
    e1: null,
    boxList: [],
    chartList: [],
    freeList: []
  }),
  methods: {
    goback: function () {
      this.$router.go(-1)
    },
    removeBoxItem: function (index) {
      let v = this.boxList[index]
      this.boxList.splice(index, 1)
      this.freeList.push(v)
    },
    removeChartItem: function (index) {
      let v = this.chartList[index]
      this.chartList.splice(index, 1)
      this.freeList.push(v)
    },
    addItem: function (index) {
      let v = this.freeList[index]
      this.freeList.splice(index, 1)
      this.boxList.push(v)
    },
    goLogin: function () {
      let serverUrl = 'http://localhost:8080/dashboard-web/api'
      let funcUrl = serverUrl + '/func'
      let funcList = []
      for (var i = this.boxList.length - 1; i >= 0; i--) {
        funcList.push({funcName: this.boxList[i], funcType: 0, seq: i})
      }
      for (i = this.chartList.length - 1; i >= 0; i--) {
        funcList.push({funcName: this.chartList[i], funcType: 1, seq: i})
      }
      for (i = this.freeList.length - 1; i >= 0; i--) {
        funcList.push({funcName: this.freeList[i], funcType: 2, seq: i})
      }
      axios.put(funcUrl, funcList)
        .then(function (res) {
        })
        .catch(function (err) {
          console.log(err)
        })
      this.$router.push({name: 'login'})
    }
  },
  mounted () {
    this.$dragging.$on('dragged', ({ value }) => {
    })
    this.boxList = this.$store.state.boxList
    this.chartList = this.$store.state.chartList
    this.freeList = this.$store.state.freeList
  },
  updated () {
    this.$store.commit('updateList', {type: 0, list: this.boxList})
    this.$store.commit('updateList', {type: 1, list: this.chartList})
    this.$store.commit('updateList', {type: 2, list: this.freeList})
  }
}
</script>
