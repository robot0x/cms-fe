<template>
  <div id="app">
      <header>
        <nav>
          <ul>
            <li>
              <router-link class="nav-link" to="/" active-class="noop">
                <img :src="logo" alt="有调logo">有调CMS
              </router-link>
            </li>
            <li>
              <router-link class="nav-link" to="/content">
                <i class="el-icon-document"></i><span>内容</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link" to="/video">
                <i class="el-icon-upload"></i><span>视频管理</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link" to="/archive">
                <i class="el-icon-menu"></i><span>归档</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link" to="/author">
                <i class="el-icon-setting"></i><span>作者管理</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link" to="/help">
                <i class="el-icon-information"></i><span>帮助</span>
              </router-link>
            </li>
             <!--<li>
              <router-link class="nav-link" to="/pcollection">
                <i class="el-icon-date"></i><span>测评集合</span>
              </router-link>
            </li>-->
            <li class="author">
              <span>你好，{{author}}</span>
              <a href="javascript:void(0);" class="logout" @click="logout">退出</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <transition name="slide-fade">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </main>
  </div>
</template>
<script>
import logo from './assets/diaox2-logo-40.png'
import LoginUtils from './utils/LoginUtils'
export default {
  data () {
    return {
      logo
    }
  },
  computed: {
    author () {
      // 首先看看 store 中是否有存储的username，没有的话，则去本地缓存中拿
      // 单独存到 store 中不靠谱，刷新页面的话，会重新实例化 store，导致状态不能长存
      return this.$store.state.username || LoginUtils.getUsername()
    }
  },
  methods: {
    logout () {
      setTimeout(() => {
        // 第一、清空本地登录标识
        LoginUtils.clearLoginInfo()
        // 第二、清空本地登录标识之后，转到登录页
        this.$router.replace({name: 'login'})
      }, 400)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #app {
    /* padding-top: $headerHeight + $headerActiveBorderHeight;*/
    min-width: 768px;
    display: flex;
    flex-direction: column;
    height: 100%;
 }
 /* 头部导航条样式 --start*/
 $headerHeight: 60px;
 header {
   /* background-color: #324057;*/
   /* background-color: rgba(50,64,87,.8);*/
   /* background-color: rgba(50,64,87,.8);*/
   background-color: #324057;
   line-height: $headerHeight;
   color: #fff;
   padding: 0 30px;
   font-family: "Microsoft Yahei";
   /* position: fixed;*/
   /* top: 0;*/
   /* left: 0;*/
   width: 100%;
   /* z-index: 9999;*/
   min-width: 768px;
 }

 header li {
   display: inline-block;
   margin-right: 24px;
 }

 .nav-link {
   color:#fff;
   display: inline-block;
   span{
     margin-left: 6px;
   }
 }

 header li:first-child {
   margin-right: 32px;
   border:none;
   .nav-link {
     img {
       width: 30px;
       height: 30px;
       margin-right: 8px;
     }
   }
 }

 .author {
   float: right;
   img {
     width: 30px;
     height: 30px;
     border-radius: 50%;
     margin-right: 5px;
   }
 }
 main {
   flex: 1;
   overflow-x: hidden;
 }
 // .el-menu-item {
 //   width: 100%;
 // }

 .logout {
   font-size: 14px;
   color: #E5E9F2;
   margin-left: 10px;
   border-bottom: 1px #E5E9F2 solid;
   padding-bottom: 4px;
 }

 .logout:hover {
   color: #FF4949;
   border-bottom: 1px #FF4949 solid;
 }

</style>
