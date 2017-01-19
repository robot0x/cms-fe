<template>
   <div class="page-password">
     <div class="password-box">
       <h2>改密码</h2>
       <el-input v-model="username" placeholder="请输入用户名" size="large" @keyup.native.enter.stop.prevent="modify"></el-input>
       <el-input v-model="password" placeholder="请输入密码" type="password" size="large" @keyup.native.enter.stop.prevent="modify"></el-input>
       <el-input v-model="rpassword" placeholder="请再次输入密码" type="password" size="large" @keyup.native.enter.stop.prevent="modify"></el-input>
       <el-button type="primary" @click="modify" :loading="loading">{{ loginMsg }}</el-button>
     </div>
   </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      rpassword: '',
      loginMsg: '修改密码',
      loading: false
    }
  },
  methods: {
    modify () {
      const username = this.username
      const password = this.password
      const rpassword = this.rpassword
      let message = ''
      if( !username ){
        message = '用户名不能为空'
      }else if( !password ){
        message = '密码不能为空'
      }else if( !rpassword ){
        message = '再次输入的密码不能为空'
      }
      if( message ){
        return this.$notify({
          message: message,
          type: 'warning'
        })
      }
      this.loading = true
      this.loginMsg = '正在修改中，请稍候'
      setTimeout(() => {
        this.loading = false
        this.loginMsg = '修改密码'
        this.$router.replace({name: 'login'})
      }, 2000)
    },
    forgetPassword () {

    }
  }
}
</script>
<style scoped>
  .page-password {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /*background-color: #324057;*/
    background: url(../assets/p1089.jpg) center center repeat;
    background-size: cover;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 9;
  }
  .password-box {
    width: 400px;
    height: 500px;
    transform: translateY(-160px);
  }
  .el-input {
    margin-top: 30px;
  }
  .el-button {
    width: 400px;
    margin-top: 20px;
    font-size: 18px;
    font-weight: 400;
  }
</style>
