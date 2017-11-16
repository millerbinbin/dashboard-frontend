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
body {
  background-color: #222e3e !important;
}
.application {
  padding-top: 8px;
  background-color: #222e3e !important;
  color: #ffffff !important;
  font-size: 15px;
}
@media screen and (max-width: 350px) {
  .application {
    font-size: 13.5px;
  }

  .input-group--select .input-group__selections__comma {
    font-size: 13.5px;
  }
}
.container {
  color: #fff !important;
}

.btn {
  color: #fff !important;
  margin: 0px;
}

.tabs__bar {
  background-color: #364962 !important;
  color: #fff !important;
}

.logo {
  margin-top: 20vh;
  height: 96px !important;
  width: 96px !important;
}

.top-bar {
  height: 40px !important;
  text-align: center;
}
.topbar-left {
  font-size: 1em;
  text-align: left;
}
.topbar-center {
  padding-top: 8px !important;
  font-size: 1em;
  text-align: center;
}
.topbar-right {
  font-size: 1em;
  text-align: right;
}
.flex.filter .input-group {
  padding-top: 0px;
  height: 30px !important;
}

.input-group--text-field input {
  color: #fff !important;
  font-size: 0.875em !important;
}

.input-group label {
  color: #fff !important;
  font-size: 0.75em !important;
}

.input-group__selections__comma {
  color: #fff !important;
  text-align: center !important;
}
.list__tile--avatar {
  height: 30px;
  background-color: #364962;
  color: #fff !important;
  font-size: 0.875em;
  border: 1px solid #6e88ac;
}
.application--light .list {
  background-color: #222e3e;
}

.list__tile__content {
  color: #fff;
}

.application--light .list .list__tile__sub-title,
.application--light .list .subheader {
  color: #fff;
  height: 40px;
}

.toolbar {
  background-color: #2e3c51 !important;
  font-size: 16px;
  color: #fff !important;
  height: 48px !important;
}

.toolbar .toolbar__content {
  background-color: #2e3c51 !important;
  font-size: 16px;
  color: #fff !important;
  height: 48px !important;
}

.material-icons.grey100 {
  color: #6e88ac;
}

.material-icons.yellow100 {
  color: #f8c849;
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

.trending-down {
  background: url(img/down.png) no-repeat;
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-top: 2px;
}
.trending-up {
  background: url(img/up.png) no-repeat;
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-top: 2px;
}
.trending-flat {
  background: url(img/flat.png) no-repeat;
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-top: 2px;
}

/* homepage*/
.card {
  background-color: #2e3c51 !important;
  color: #fff !important;
}

.user-tag {
  font-size: 0.875em !important;
  padding-top: 2px;
  padding-left: 5px;
}

.date-tag {
  font-size: 0.875em;
  padding-top: 2px;
  padding-right: 5px;
  text-align: right;
}

/* numberBox*/
.number-box {
  padding: 4px;
  margin-top: 4px;
  margin-left: 2px;
  margin-right: 2px;
  height: 85px !important;
}

.number {
  margin-bottom: 10px !important;
  margin-left: 1px !important;
  margin-right: 1px !important;
}

.flex .box-func-name,
.chart-func-name {
  font-size: 0.75em;
  padding-top: 10px !important;
}

.flex .box-func-value,
.chart-func-value {
  font-size: 1.25em;
  padding-top: 5px;
}

.flex .box-idx-name,
.chart-idx-name {
  font-size: 0.7em;
}

.box-idx-value,
.chart-idx-value {
  font-size: 0.9em;
  font-weight: bold;
}

.chart-legend {
  color: #6e88ac;
  font-size: .75em;
  margin-top: 3px;
}
/* chartBox */
.chart {
  margin-bottom: 10px !important;
  margin-left: 3px !important;
  margin-right: 3px !important;
}
/** chartHeader **/
.chart-header {
  padding: 5px;
  height: 85px !important;
  background-color: #364962 !important;
  box-shadow: none;
}

/** chartBody **/
.chart-body.card {
  padding: 5px !important;
  height: 195px !important;
  background-color: #2e3c51 !important;
  
  text-align: left !important;
  margin-bottom: 6px;
}

/* bar */
.flex .under-bar {
  background-color: #6e88ac;
  height: 5px;
  padding: 0;
}

.flex .grey-bar {
  background-color: #6e88ac;
  height: 10px;
  margin-top: 6px;
}

.flex .cyan-bar {
  background-color: #00d7fb;
  height: 10px;
  margin-top: 6px;
}

/* detailpage */
.detail-info {
  padding-top: 15px !important; 
  padding-left: 2px !important; 
  font-size: .875em
}
/** chartBox**/
/** chartHeader **/
.chart-detail-header {
  padding: 5px;
  height: 65px !important;
  background-color: #364962 !important;
  box-shadow: none;
}
.chart-detail-func-name {
  font-size: 0.75em !important;
  padding-top: 10px;
  padding-bottom: 0px;
}
.chart-detail-func-value {
  font-size: 1.25em !important;
  padding-top: 5px;
  padding-bottom: 0px;
  font-weight: bold;
}
.chart-detail-idx-name {
  font-size: 0.7em;
  color: #6e88ac;
  margin-top: 2px !important;
}
.chart-detail-idx-value {
  font-size: 0.8em;
  color: #fff;
  padding-bottom: 10px !important;
  font-weight: bold;
}
/** chartBody **/
.chart-detail-body {
  padding: 5px;
  height: 200px !important;
  background-color: #2e3c51 !important;
  text-align: left !important;
  box-shadow: none;
}
/** chartFoot **/
.chart-detail-foot {
  height: 25px !important;
  background-color: #2e3c51 !important;
  box-shadow: none;
}
/** chartTable **/
.chart-detail-table {
  margin-top: 10px;
  margin-left: 3px !important;
  margin-right: 3px !important;
}

.table {
  background-color: #2e3c51 !important;
  color: #fff !important;
}
table.table thead tr,
table.table tbody td,
table.table tbody th {
  height: 10px !important;
  color: #fff !important;
  font-size: .75em;
}

table.table thead th {
  background-color: #364962 !important;
  height: 10px !important;
  color: #fff !important;
}

.application--light .table tbody tr:hover:not(.datatable__expand-row) {
  background-color: #6e88ac;
}

.circle-bar {
  text-align: center;
  margin-left: 3px !important;
  margin-right: 3px !important;
}

.circle-bar .material-icons {
  margin-top: 4px !important;
}

.number-box.circle-bar .material-icons {
  margin-top: 13px !important;
}

.def {
  font-size: .875em;
  color: #6e88ac;
}
.logout {
  font-size: .75em;
  color: #6e88ac;
}
table.table tbody td:first-child, table.table tbody td:not(:first-child), table.table tbody th:first-child, table.table tbody th:not(:first-child), table.table thead th:first-child, table.table thead th:not(:first-child){
  padding: 0px 12px;
}
table.table tbody td:first-child, table.table tbody th:first-child{
  padding: 0px 6px;
}
</style>
