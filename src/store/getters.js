// 第一种导出方法
// export default {
//   getCountPlusTen (state) {
//     return state.count + 10
//   }
// }

// 第二中导出方法
export const getCountPlusTen = state => state.count + 10
