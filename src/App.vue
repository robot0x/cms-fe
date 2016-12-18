<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <hello></hello> -->
    <div id="wrapper">
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
            </li>
            <li class="author">
              <img :src="headshot" :alt="authorName">
              <span>{{authorName}}</span>
            </li>
          </ul>
        </nav>
      </header>
      <main>
          <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<script>
import Hello from './components/Hello'
import logo from './assets/diaox2-logo-40.png'
import headshot from './assets/default-headshot.jpg'
export default {
  name: 'app',
  components: {
    Hello
  },
  data () {
    return {
      logo,
      headshot,
      authorName: '李彦峰'
    }
  }
}
</script>
