<template>
  <div class="hello">
    <test
      :tototo="toto" hi="hi 你好！"
      :my-number="9999"
      size="1"
      @increment="incrementTotal"
      @mouseover.native="doTheThing">
    </test>
    <p>total: {{ total }}</p>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import Test from './Test'
console.log(Test)
export default {
  name: 'hello',
  components: {
    Test
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      toto: '从Hello组件发送到Test组件的数据',
      total: 0
    }
  },
  methods: {
    // 订阅 increment 事件，该事件在子组件的 click 回调中 emit
    incrementTotal () {
      this.total += 1
    },
    // 在test组件上绑定原生dom事件，需要加 .native 修饰，不管是自定义事件还是原生事件都可以使用 @简写方式
    doTheThing () {
      console.log('test组件被mouseover了')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
