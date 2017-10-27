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

.material-icons.grey100 {
  color: #6E88AC;
}

.el-card__body
  padding: 5px

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

.input-group.input-group--selection-controls label
  left: 24px

</style>
<template>
  <v-container grid-list-sm text-xs-center>
    <v-layout row wrap>
      <v-flex xs6 offset-xs3 style="padding-top: 30%">
        <v-avatar size="96px" class="grey lighten-4">
          <img src="https://vuetifyjs.com/static/apple-touch-icon-180x180.png" alt="avatar">
        </v-avatar>
      </v-flex>
      <v-flex xs6 offset-xs3>
        <v-form v-model="valid" ref="form">
          <v-text-field
            label="用户名"
            v-model="username"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            label="密码"
            v-model="password"
            :rules="pwdRules"
            type="password"
            required
          ></v-text-field>
          <v-layout row wrap>
            <v-flex xs6>
            <v-checkbox
              label="记住密码"
              v-model="remPwd"
            ></v-checkbox>
            </v-flex>
            <v-flex xs6>
              <v-checkbox
                label="自动登录"
                v-model="autoLogin"
              ></v-checkbox>
            </v-flex>
          </v-layout>
          <v-btn color="primary" @click="submit">登录</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
Vue.use(Vuetify)

export default {
  data: () => ({
    msg: 'Welcome to Your Vue.js App',
    valid: true,
    e1: null,
    e2: false,
    username: null,
    nameRules: [
      (v) => !!v || '用户名不能为空'
    ],
    password: null,
    pwdRules: [
      (v) => !!v || '密码不能为空'
    ],
    remPwd: false,
    autoLogin: true
  }),
  methods: {
    submit () {
      let serverUrl = 'http://10.8.42.146:8080/hydra-man-web/api/stat'
      if (this.$refs.form.validate()) {
        axios.post(serverUrl + '/login', {
          name: this.username,
          password: this.password
        }).then(function (res) {
          console.log(res.data)
          this.$router.push({ name: 'homepage' })
        })
          .catch(function (err) {
            console.log(err)
          })
      }
    }
  }
}
</script>
