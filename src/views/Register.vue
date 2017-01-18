<template>
   <div class="page-register">
     你好，我是{{msg}}页
   </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Register'
    }
  }
}
</script>
