import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

import article from './modules/article'
import image from './modules/image'
import author from './modules/author'

const debug = process.env.NODE_ENV !== 'production'

// console.log(article);
Vue.use(Vuex)

/**
 * 一个store中，
 * 包含：state、mutations、actions、getters（可以看做是store的计算属性）
 */
export default new Vuex.Store({
  modules: {
    article,
    image,
    author
  },
  state: {
    count: 1999
  },
  mutations,
  actions,
  getters,
  strict: debug
})
