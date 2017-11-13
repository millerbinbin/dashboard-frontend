<template>
  <v-container grid-list-sm text-xs-center>
    <v-card class="top-bar">
      <v-layout row wrap text-xs-center>
        <v-flex xs2 topbar-left>
          <v-btn icon v-on:click="goBack">返回</v-btn>
        </v-flex>
        <v-flex xs6 offset-xs1 topbar-center>
          数据定义
        </v-flex>
      </v-layout>
    </v-card>
    <v-card flat v-for="(d, idx) in desc" :key="d.name">
      <v-list one-line subheader>
        <v-subheader><b>{{ d.name }}</b></v-subheader>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>日维度：{{ d.day }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>周维度：{{ d.week }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title>月维度：{{ d.month }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
let serverUrl = 'http://localhost:8080/dashboard-web/api'
let descUrl = serverUrl + '/desc'
export default {
  data: function () {
    return {
      desc: []
    }
  },
  methods: {
    goBack: function () {
      this.$router.go(-1)
    },
    getDesc: function () {
      axios.get(descUrl)
        .then(function (response) {
          this.desc = response.data
        }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted: function () {
    this.getDesc()
  }
}
</script>
