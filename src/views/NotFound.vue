<template>
  <transition name="slide-fade">
     <div class="page-notfound">
       你好，我是{{msg}}页
     </div>
   </transition>
</template>

<script>
export default {
  data () {
    return {
      msg: '404'
    }
  }
}
</script>
