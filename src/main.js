// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('es6-promise').polyfill()
import Vue from 'vue'
import App from './App'
import router from './router/router'
import 'element-ui/lib/theme-default/index.css'
import './sass-lib/_common.scss'
import './style/style.scss'
import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import API from './API'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})

fetch(API.giftDefault.url)
.then(function (response) {
  if (response.status >= 400) {
    throw new Error('Bad response from server')
  }
  console.log(response)
  return response.json()
})
.then(function (stories) {
  console.log(stories)
})
