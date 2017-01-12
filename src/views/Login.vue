<template>
  <transition name="slide-fade">
     <div class="page-login">
       你好，我是{{msg}}页
     </div>
   </transition>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Login'
    }
  }
}
</script>
