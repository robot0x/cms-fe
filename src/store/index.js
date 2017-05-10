import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
// import * as actions from './actions'
// import * as getters from './getters'
// import article from './modules/article'
// import image from './modules/image'
// import author from './modules/author'
import markdown from './modules/markdown'
// import DataGrid from './modules/DataGrid'
const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)

/**
 * 一个store中，
 * 包含：state、mutations、actions、getters（可以看做是store的计算属性）
 * store是容器，用来装状态的，可以把store理解为状态的容器
 */
export default new Vuex.Store({
  modules: {
    // article,
    // image,
    // author,
    markdown
    // DataGrid
  },
  // 这个一定要写
  state: {
    username: ''
  },
  mutations,
  // actions,
  // getters,
  strict: debug
})
