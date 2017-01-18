<template>
   <div class="page-login">
     你好，我是{{msg}}页
   </div>
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
