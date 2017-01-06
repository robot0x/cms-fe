import * as types from './mutation-types'

// export default {
//   [types.INCREMENT] (context) {
//     context.commit(types.INCREMENT)
//   },
//
//   [types.DECREMENT] ({ commit }) {
//     commit(types.INCREMENT)
//   }
// }
export const increment = ({ commit }) => commit(types.INCREMENT)
