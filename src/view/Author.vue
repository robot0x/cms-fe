<template>
 <transition name="slide-fade">
    <div class="author">
      <el-button @click="visible = true">按钮</el-button>
      <el-dialog v-model="visible" title="Hello world">
        <p>你好，我是{{msg}}页</p>
      </el-dialog>
    </div>
  </transition>
</template>
<script>
import Vue from 'vue'
import { Loading, Button, Dialog } from 'element-ui'
// Vue.use(ElementUI)
Vue.use(Loading)
Vue.use(Button)
Vue.use(Dialog)

let loadingInstance = Loading.service({
  text: '玩命加载中...',
  target: document.getElementById('wrapper')
})

setTimeout(() => {
  loadingInstance.close()
}, 4000)

export default {
  data () {
    return {
      msg: 'Author',
      visible: false
    }
  }
}
</script>
