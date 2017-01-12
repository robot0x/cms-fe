<template>
  <transition name="slide-fade">
     <div class="page-monthly">
       你好，我是{{msg}}页
     </div>
   </transition>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
      msg: 'Monthly'
    }
  }
}
</script>
