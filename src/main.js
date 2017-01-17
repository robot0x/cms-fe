// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('es6-promise').polyfill()
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-default/index.css'
import './style/style.scss'
import 'babel-polyfill'
// import fetch from 'isomorphic-fetch'
// import API from './API'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
// import { Loading, Button, Dialog } from 'element-ui'
// Vue.use(Loading)
// Vue.use(Button)
// Vue.use(Dialog)

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store,
  // store,
  beforeCreate () {
    console.log('beforeCreate ....')
  },
  created () {
    console.log('created ....')
  },
  mounted () {
    console.log('mounted ....');
    console.log(this.$el); // 只有在mounted之后，this.$el才不是undefined
  },
  updated () {
    console.log('updated ....');
  },
  destoryed () {
    console.log('destoryed ....');
  }
})
// 除了在vm实例中用this指向vm，也可以在外面使用 vm 的实例方法或属性
console.log(vm.$el);
vm.$nextTick(() => {
  console.log('main.js vm.$nextTick ....');
})
// fetch(API.articles.url + '?id=121223', {
//   method: 'GET'
// })
// .then(function (response) {
//   if (response.status >= 400) {
//     throw new Error('Bad response from server')
//   }
//   console.log(response)
//   return response.json()
// })
// .then(function (result) {
//   console.log(result)
// })
