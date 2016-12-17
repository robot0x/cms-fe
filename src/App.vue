<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <hello></hello> -->
    <header>
      <nav>
        <ul>
          <li>
            <router-link to="/content" keep-alive>内容</router-link>
          </li>
          <li>
            <router-link to="/edit" keep-alive>编辑</router-link>
          </li>
          <li>
            <router-link to="/monthly" keep-alive>月份归档</router-link>
          </li>
          <li>
            <router-link to="/author" keep-alive>作者归档</router-link>
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

<style lang="scss">
$color:#2c3e50;
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color;
  // background-color: $color;
  margin-top: 60px;
}
</style>
