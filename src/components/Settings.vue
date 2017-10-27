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
        <v-card draggable="true" style="margin-top: 2px" v-for="(item, index) in boxList" v-dragging="{ item: item, list: boxList, group: 'box' }" :key="item.text">
          <i class="material-icons md-16 red100" @click="removeBoxItem(index)">remove_circle</i>{{item.text}}
      	</v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 style="text-align: left">数据趋势图</v-flex>
      <v-flex xs12>
        <v-card draggable="true" style="margin-top: 2px" v-for="(item, index) in chartList" v-dragging="{ item: item, list: chartList, group: 'chart' }" :key="item.text">
          <i class="material-icons md-16 red100" @click="removeChartItem(index)">remove_circle</i>{{item.text}}
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 style="text-align: left"></v-flex>
      <v-flex xs12>
        <v-card style="margin-top: 2px" v-for="(item, index) in freeList" :key="item.text">
          <i class="material-icons md-16 green100" @click="addItem(index)">add_circle</i>{{item.text}}
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
Vue.use(VueDND)
export default {
  data: () => ({
    msg: 'Welcome to Your Vue.js App',
    boxList: [{
      text: '接收订单量'
    }, {
      text: 'Sku准确率'
    }, {
      text: '调拨入库单数'
    }, {
      text: '发出订单量'
    }, {
      text: '在库Sku'
    }],
    chartList: [{
      text: '人效-DO'
    }, {
      text: '成本效率'
    }],
    freeList: [{
      text: '测试1'
    }, {
      text: '测试2'
    }, {
      text: '测试3'
    }, {
      text: '测试4'
    }]
  }),
  methods: {
    goback: function () {
      this.$router.go(-1)
    },
    removeBoxItem: function (index) {
      let v = this.boxList[index].text
      this.boxList.splice(index, 1)
      this.freeList.push({text: v})
    },
    removeChartItem: function (index) {
      let v = this.chartList[index].text
      this.chartList.splice(index, 1)
      this.freeList.push({text: v})
    },
    addItem: function (index) {
      let v = this.freeList[index].text
      this.freeList.splice(index, 1)
      this.boxList.push({text: v})
    },
    goLogin: function () {
      this.$router.push({name: 'login'})
    }
  },
  mounted () {
    this.$dragging.$on('dragged', ({ value }) => {
      console.log(value.item)
      console.log(value.list)
      console.log(value.otherData)
    })
  }
}
</script>
