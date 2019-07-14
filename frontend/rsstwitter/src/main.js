import 'popper.js'
import 'jquery'
import 'bootstrap'

import 'font-awesome/css/font-awesome.css'
import "@mdi/font/css/materialdesignicons.css";
import '@progress/kendo-theme-default/dist/all.css'

import Vue from 'vue'
import App from './App.vue'

import './config/msgs'
import router from './config/router'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
