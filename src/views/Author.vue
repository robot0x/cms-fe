<template>
 <transition name="slide-fade">
    <div class="page-author">
      <el-button @click="visible = true">按钮</el-button>
      <el-dialog v-model="visible" title="Hello world">
        <p>你好，我是{{msg}}页</p>
      </el-dialog>
    </div>
  </transition>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Author',
      visible: false
    }
  }
}
</script>
