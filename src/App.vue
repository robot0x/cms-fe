<template>
  <div id="app">
      <!-- <img src="./assets/logo.png"> -->
      <!-- <test :tototo="toto" hi="hi 你好！" :my-number="9999" size="1"></test> -->
      <!-- <hello></hello> -->
      <header>
        <nav>
          <ul>
            <li>
              <router-link class="nav-link" to="/" keep-alive active-class="noop">
                <img :src="logo" alt="有调logo">有调CMS
              </router-link>
            </li>
            <li>
              <router-link class="nav-link" to="/content" keep-alive>
                <i class="el-icon-document"></i><span>内容</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link" to="/edit" keep-alive>
                <i class="el-icon-edit"></i><span>编辑</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link" to="/archive" keep-alive>
                <i class="el-icon-menu"></i><span>归档</span>
              </router-link>
            </li>

            <!-- <li>
              <router-link class="nav-link" to="/login" keep-alive>
                <i class="el-icon-date"></i><span>登录</span>
              </router-link>
            </li> -->

            <!-- <li>
              <router-link class="nav-link" to="/monthly" keep-alive>
                <i class="el-icon-date"></i><span>月份归档</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link" to="/author" keep-alive>
                <i class="el-icon-menu"></i><span>作者归档</span>
              </router-link>
            </li>
            <li>
              <router-link class="nav-link" to="/help" keep-alive active-class="router-link-active">
                帮助
              </router-link>
            </li> -->
            <li class="author">
              <!--
              <img :src="headshot" :alt="authorName">
              <span>{{authorName}}</span>
              -->

              <!--
              <el-menu mode="horizontal" @select="handleSelect" theme="dark" :default-active="defaultActive">
                <el-submenu index="1">
                  <template slot="title">{{authorName}}</template>
                  <el-menu-item index="1-1">退出</el-menu-item>
                </el-submenu>
              </el-menu>
              -->
              <span>你好，{{author}}</span>
              <a href="javascript:void(0);" class="logout" @click="logout">退出</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <transition name="slide-fade">
          <router-view></router-view>
        </transition>
        <to></to>
      </main>
      <!-- 到顶部、到底部组件 -->
  </div>
</template>
<script>
// import Hello from './components/Hello'
// import Test from './components/Test'
// import headshot from './assets/default-headshot.jpg'
import logo from './assets/diaox2-logo-40.png'
import To from './components/To'
import LoginUtils from './utils/LoginUtils'
export default {
  // 本组件要用到的组件都要在 components 中声明，否则不起作用且会报错
  components: { To },
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
  mounted () {
    const store = this.$store
    const state = store.state
    console.log('count:', state.count);
    store.commit('INCREMENT')
    console.log('count:', state.count);
    store.dispatch('increment')
    console.log('count:', state.count);
    console.log('count:', store.getters.getCountPlusTen);

    console.log('title:', state.article.title);
    console.log('title:', state.article.getters);
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
  },
  created () {
    this.authorName = LoginUtils.getUsername()
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
   overflow: hidden;
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
