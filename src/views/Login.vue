<template>
   <div class="page-login" :style="{backgroundImage: 'url(' + bg + ')'}" >
     <div class="login-box">
       <h2>有调内容管理系统</h2>
       <el-input v-model="username" placeholder="请输入用户名" size="large" @keyup.native.enter.stop.prevent="login"></el-input>
       <el-input v-model="password" placeholder="请输入密码" type="password" size="large" @keyup.native.enter.stop.prevent="login"></el-input>
       <div class="reme-box">
         <el-tooltip class="item" effect="dark" :content="content" placement="right-start">
            <span class="reme-desc">记住我</span>
         </el-tooltip>
         <el-switch v-model="reme" on-color="#13ce66" off-color="#ff4949"></el-switch>
         <a href="javascript:void(0);" @click="modifyPassword" class="modify-password">修改密码</a>
       </div>
       <el-button type="primary" @click="login" :loading="loading">{{ loginMsg }}</el-button>
     </div>
   </div>
</template>
<script>
import LoginUtils from '../utils/LoginUtils'
import User from '../service/User'

export default {
  data () {
    return {
      username: '',
      password: '',
      loginMsg: '登录',
      loading: false,
      reme: false,
      bg:require('../assets/p1089.jpg')
    }
  },
  computed: {
    content () {
      let content = ''
      if( this.reme ){
        content = '保存5天的登录状态，在自己电脑上可开启此选项'
      }else{
        content = '不记录登录状态，在他人电脑或公共电脑上，请关闭此选项（默认为关闭）'
      }
      return content
    }
  },
  methods: {
    login () {
      this.loading = true
      this.loginMsg = '正在登录中，请稍候...'
      const username = this.username
      console.log(username, this.password);
      User
      .auth(username, this.password)
      .then((res) => {
        this.loading = false
        this.loginMsg = '登录'
        LoginUtils.setLoginInfo(username, this.reme)
        // 存到 store 中不靠谱，刷新页面的话，会重新实例化 store，导致状态不能长存
        // 应该结合着本地存储来做
        this.$store.commit('setUsername', username)
        this.$router.replace('/')
      })
      .catch(message => {
        this.loading = false
        this.loginMsg = '登录'
        this.$notify({ message: message, type: 'warning' })
      })
      // setTimeout(() => {
      //   this.loading = false
      //   this.loginMsg = '登录'
      //   console.log('记住我.....');
      //   console.log(this.reme);
      //   LoginUtils.login(username, this.reme)
      //   // 存到 store 中不靠谱，刷新页面的话，会重新实例化 store，导致状态不能长存
      //   // 应该结合着本地存储来做
      //   this.$store.commit('setUsername', username)
      //   this.$router.replace('/')
      // }, 2000)
    },
    modifyPassword () {
      // 防止多次点击
      if( !this.loading ){
        const username = this.username
        this.loading = true
        this.loginMsg = '验证成功可改密码，验证中...'
        LoginUtils.auth( username, this.password, (message) => {
          this.loading = false
          this.loginMsg = '登录'
          if( message ){
            return this.$notify({
              message: message,
              type: 'warning'
            })
          }else{
            this.$prompt('请输入新密码', '请先输入用户名和密码', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                closeOnClickModal: false,
                inputPattern: /.+/,
                inputErrorMessage: '新密码不能为空'
              }).then(({ value }) => {
                this.$notify({
                  title: '密码修改成功',
                  message: `你的密码是: ${value} 请牢记`,
                  type: 'success'
                })
              })
          }
        })
      }
    }
  }
}
</script>
<style scoped>
  .page-login {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /*background-color: #324057;*/
    /*background: url(../assets/p1089.jpg) center center repeat;*/
    background-size: cover;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 9;
  }
  .login-box {
    width: 400px;
    height: 500px;
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
  .reme-box {
    margin-top: 30px;
    text-align: left;
    font-weight: 400;
  }
  .reme-box span {
    margin-right: 8px;
  }
  .reme-desc {
    cursor: pointer;
  }
  .modify-password {
    color: #D3DCE6;
    float: right;
  }
</style>
