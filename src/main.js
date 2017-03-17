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
import ElementUI from 'element-ui'
Vue.use(ElementUI)
console.log(ElementUI.version);
/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
  router
  // store,
  // beforeCreate () {
  // },
  // created () {
  // },
  // mounted () {
  // },
  // updated () {
  // },
  // destoryed () {
  // }
})
// 除了在vm实例中用this指向vm，也可以在外面使用 vm 的实例方法或属性
