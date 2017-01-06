<template>
  <transition name="slide-fade">
     <div>
       你好，我是{{msg}}页
     </div>
   </transition>
</template>

<script>
import Vue from 'vue'
// import { Loading, Button, Dialog } from 'element-ui'
// Vue.use(Loading)
// Vue.use(Button)
// Vue.use(Dialog)
//
// let loadingInstance = Loading.service({
//   text: '玩命加载中...',
//   target: document.getElementById('wrapper')
// })
//
// setTimeout(() => {
//   loadingInstance.close()
// }, 3000)

export default {
  data () {
    return {
      msg: 'Monthly'
    }
  }
}
</script>
