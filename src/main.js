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
// console.log(ElementUI.version)
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
// O(1) < O(logn) < O(n) < O(nlogn) < O(n * n) < O(n * n * n) < O(2^n) < O(n!) < O(n^n)
// function generArr(length){
//   var arr = Array(length)
//   for(var i = 0; i < length; i++){
//     arr[i] = Math.ceil(Math.random() * length)
//   }
//   return arr
// }
// var arr = generArr(1000)
// function bubbleSort(arr) {
//     console.time('bubbleSort')
//     var i = arr.length, j;
//     var tempExchangVal;
//     while (i > 0) {
//         for (j = 0; j < i - 1; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 tempExchangVal = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j + 1] = tempExchangVal;
//             }
//         }
//         i--;
//     }
//     console.timeEnd('bubbleSort')
//     return arr;
// }
//
// console.log( bubbleSort(arr));
// function bubbleSort2(nums){
//   console.time('bubbleSort2')
//   var i = 0, n = nums.length, j = 0, temp;
//   for(; i < n; i++){
//     for(j = i; j < n - i; j++){
//       if(nums[j] > nums[j + 1]){
//         temp = nums[j]
//         nums[j] = nums[j + 1]
//         nums[j + 1] = temp
//       }
//     }
//   }
//   console.timeEnd('bubbleSort2')
//   return nums
// }
// console.log(bubbleSort2(arr));
//
// function inner(nums, target){
//   var i = 0, n = nums.length, j = 0;
//   for(; i < n; i++){
//     for( j = i + 1; j < n; j++){
//       if(nums[i] + nums[j] === target){
//         return [i, j]
//       }
//     }
//   }
//   return []
// }
// console.log(inner([2, 7, 11, 15], 13))
//
// function candy(str){
//   if(!str ||
//      Object.prototype.toString.call(str).slice(8,-1).toLowerCase() !== 'string' ||
//      !str.trim() ||
//      str.trim().length % 2 !== 0
//    ){
//     return false
//   }
//   str = str.trim()
//
//   return true
// }

// console.log(candy('abcd'));
// // 除了在vm实例中用this指向vm，也可以在外面使用 vm 的实例方法或属性
//
// var twoSum = function(nums, target){
//   const hash = new Map()
//   let i = 0, n = nums.length;
//   for(; i < n; i++){
//     let diff = target - nums[i]
//     if(hash.has(diff)){
//       return [hash.get(diff), i]
//     }
//     hash.set(nums[i], i)
//   }
//   return []
// }

// console.log(twoSum([1,2,3,5], 6))
// console.log(twoSum([1,2,5,3], 6))
// console.log(twoSum([1,2,3,5], 3))
// console.log(twoSum([1,2,3,5], 5))
// console.log(twoSum([1,2,3,5], 4))
//
// var towSumSort = function(sortedArray, target) {
//   let left = 0, right = sortedArray.length - 1
//   while(left < right){
//     let sum = sortedArray[left] + sortedArray[right]
//     if(sum === target) {
//       return [left, right]
//     } else if (sum < target) {
//       left++
//     } else {
//       right--
//     }
//   }
// }
// console.log('--------------------------------------------------')
// console.log(towSumSort([1,2,5,3], 6))
// console.log(towSumSort([1,2,3,5], 6))
// console.log(towSumSort([1,2,3,5], 3))
// console.log(towSumSort([1,2,3,5], 5))
// console.log(towSumSort([1,2,3,5], 4))
// function findLongestSubString(str){
//   let i = 0, n = str.length, j = 0
//   for(; i < n; i++){
//     for(; j < n; j++){
//
//     }
//   }
// }

// function lengthOfLongestSubstring(str){
//   let i = 0, j = 0,max = 0, n = str.length
//   let set = new Set()
//   while(j < n){
//     if(!set.has(str.charAt(j))){
//       set.add(str.charAt(j++))
//       max = Math.max(max, set.size)
//     }else{
//       set.delete(str.charAt(i++))
//     }
//   }
//   return max
// }
// console.log(lengthOfLongestSubstring('aaabcddde'))
