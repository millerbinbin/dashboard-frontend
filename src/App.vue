<template>
  <div id='app'>
  	<v-app>
  		<router-view></router-view>
	</v-app>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  .application {
    padding-top: 8px;
    background-color: #222E3E!important;
    color: #FFFFFF!important;
    font-size: 16px;
  }

  .container {
    color: #fff!important;
  }

  .input-group--text-field input {
    color: #fff!important;
    font-size: .875em!important;
  }

  .input-group label {
    color: #fff!important;
    font-size: .75em!important;
  }

  .input-group__selections__comma {
    color: #fff!important;
    text-align: center!important;
  }

  .toolbar {
    background-color: #2E3C51!important;
    font-size: 16px;
    color: #fff!important;
    height: 48px!important
  }

  .toolbar .toolbar__content {
    background-color: #2E3C51!important;
    font-size: 16px;
    color: #fff!important;
    height: 48px!important
  }

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

  .material-icons.md-8 {
    font-size: 8px;
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

  .flex .under-bar {
    background-color: #6E88AC;
    height: 5px;
    padding: 0
  }

  .flex .grey-bar {
    background-color: #6E88AC;
    height: 10px;
    margin-top: 4px
  }

  .flex .cyan-bar {
    background-color: #00D7FB;
    height: 10px;
    margin-top: 4px
  }

  .card {
    background-color: #2E3C51!important;
    color: #fff!important;
    box-shadow: 5px 5px 5px #111!important;
  }

  .flex.xs6 .card {
    padding: 4px;
    height: 90px!important;
  }

  .flex .box-func-name-tag, .chart-func-name-tag  {
    font-size: 0.75em;
    padding-top: 10px!important;
  }

  .flex .box-func-value-tag, .chart-func-value-tag {
    font-size: 1.25em;
    padding-top: 5px;
  }

  .chart {
  	padding-top: 10px;
  }

  .flex .box-idx-name, .chart-idx-name {
    font-size: .5em;
  }

  .box-idx-value, .chart-idx-value {
    font-size: .75em;
    font-weight: bold;
  }

  .flex.xs12 .chart-header {
    padding: 2px 2px 0 2px!important
  }

  .flex.xs12.chart-header .card {
    padding: 5px;
    height: 90px!important;
    background-color: #364962!important;
    box-shadow: none
  }

  .flex.xs12 .chart-detail-header {
    padding: 2px 2px 0 2px!important
  }

  .flex.xs12.chart-detail-header .card {
    padding: 5px;
    height: 72px!important;
    background-color: #364962!important;
    box-shadow: none
  }

  .flex.xs12 .chart-detail {
    padding: 0px 2px 2px 2px!important
  }

  .flex.xs12.chart-detail .card {
    padding: 5px;
    height: 200px!important;
    background-color: #2E3C51!important;
    box-shadow: none;
    text-align: left!important;
  }

  .user-tag {
    font-size: .625em!important;
    padding-top: 2px;
    padding-left: 5px;
  }

  .date-tag {
    font-size: .625em;
    padding-top: 2px;
    padding-right: 5px;
    text-align: right;
  }

  .flex .chart-detail-idx-name {
    font-size: .7em;
    color: #6e88ac;
  }

  .chart-detail-idx-value {
    font-size: 1em;
    color: #FFF;
    padding-left: 10px;
    padding-bottom: 10px!important;
    font-weight: bold;
  }

  .chart-detail-func-name-tag {
    font-size: .75em!important;
    padding-top: 10px;
    padding-bottom: 0px;
  }

  .chart-detail-func-value-tag {
    font-size: 1.25em!important;
    padding-top: 5px;
    padding-bottom: 0px;
    font-weight: bold;
  }

  .btn {
    color: #fff!important;
    font-size: .875em;
    font-weight: bold;
    margin: 0px;
  }

  .tabs__bar {
    background-color: #364962!important;
    color: #fff!important;
  }

  .logo {
    margin-top: 20vh;
    height: 96px!important;
    width: 96px!important;
  }

  .top-bar {
    height: 40px!important;
    text-align: center;
  }

  .flex.filter .input-group {
    padding-top: 0px;
    height: 30px!important;
  }

  table.table thead tr, table.table tbody td, table.table tbody th{
    height: 10px!important;
    color: #FFF!important;
    font-size: .625em;
  }

  table.table thead th {
    background-color: #364962!important;
    height: 10px!important;
    color: #FFF!important;
  }

  .table {
    background-color: #2E3C51!important;
    color: #FFF!important;
  }

  .flex.xs12.circle-bar .card {
    height: 40px!important;
  }
  
  .flex.xs12.circle-bar .material-icons{
    margin-top: 4px!important;
  }

  .flex.xs6.circle-bar .material-icons {
    margin-top: 20px!important;
  }

  .trending-down {
    background: url(assets/down.png) no-repeat;
    width: 16px;    
    height: 16px;
    display: inline-block;
    margin-top: 2px;
  }
  .trending-up {
    background: url(assets/up.png) no-repeat;
    width: 16px;    
    height: 16px;
    display: inline-block;
    margin-top: 2px;
  }
  .trending-flat {
    background: url(assets/flat.png) no-repeat;
    width: 16px;    
    height: 16px;
    display: inline-block;
    margin-top: 2px;
  }

  .list__tile--avatar {
  	height: 30px;
  	background-color: #364962;
  	color: #FFF!important;
  	font-size: .75em;
  	border: 1px solid #6E88AC;
  }
  .application--light .list {
  	background-color: #222E3E;
  }

  .list__tile__content {
  	color: #FFF;
  }

  .application--light .list .list__tile__sub-title, .application--light .list .subheader {
  	color: #FFF;
  }
</style>
