<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <hello></hello> -->
    <header>
      <nav>
        <ul>
          <li>
            <router-link class="nav-link" to="/" keep-alive active-class="noop">
              <img src="//www.diaox2.com/images/diaox2-logo-40.png" alt="有调log">
              有调CMS
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
              <span>帮助</span>
            </router-link>
          </li>
          <li class="author">
            <img src="./assets/default-headshot.jpg" alt="">
            <span>李彦峰</span>
          </li>
        </ul>
      </nav>
    </header>
    <main>
        <router-view></router-view>
    </main>
  </div>
</template>
<script>
import Hello from './components/Hello'
export default {
  name: 'app',
  components: {
    Hello
  }
}
</script>
