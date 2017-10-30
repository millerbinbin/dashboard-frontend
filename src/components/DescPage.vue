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

.input-group__input
  color: #fbfdff

.input-group label
  font-size: .75em

.list__tile__title 
  color: #fbfdff
  background-color: #2E3C51

.menu__content
  color: #fbfdff
  background-color: #2E3C51

.custom
  background-color: #2E3C51
</style>

<template>
  <v-card>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs2>
            <v-subheader>Custom items</v-subheader>
          </v-flex>
          <v-flex xs2>
            <v-select
              v-bind:items="items"
              single-line
              item-text="state"
              item-value="abbr"
              return-object
              persistent-hint
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

export default {
  data: () => ({
    items: [
      { state: 'Florida', abbr: 'FL' },
      { state: 'Georgia', abbr: 'GA' },
      { state: 'Nebraska', abbr: 'NE' },
      { state: 'California', abbr: 'CA' },
      { state: 'New York', abbr: 'NY' }
    ],
    e1: null,
    boxInfo: [],
    chartInfo: []
  }),
  methods: {
    goSettings: function () {
      this.$router.push({ name: 'settings' })
    }
  },
  mounted: function () {}
}
</script>
