import * as types from './mutation-types'

export default {
  [types.INCREMENT] (state) {
    state.count++
  },

  [types.DECREMENT] (state) {
    state.count--
  },

  [types.SET_USERNAME] (state, username) {
    state.username = username
  }
}

// export default mutations
/**
 * 默认导出 export default expression
 * default 后面跟的是“表达式” 而不是 “语句”
 * 在另外一个模块引入时，可以给默认导出起任意名字
 * 如 export default {name: '李彦峰'} // test.js
 *    import person from './test'
 */
