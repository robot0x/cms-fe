<template>
  <div class="component-test" v-on:click="increment">
    <h1>{{tototo}}</h1>
    <h2>{{hi}}</h2>
    <h3>{{myNumber}}</h3>
    <h4>{{normalizedSize}}</h4>
    <h5>{{message}}</h5>
    <h6>counter: {{counter}}</h6>
    <div>
      <!-- 双向绑定 -->
      请输入用户名：<input type="text" v-model="username" placeholder="在此输入用户名...">
    </div>
    <div>
      <!--
        双向绑定
        用 v-model 进行双向绑定仅仅是这中写法的语法糖
      -->
      请输入密码：<input type="text" :value="password" @input="password = $event.target.value" placeholder="在此输入密码...">
    </div>
    <!-- 必须要加 .native 否则不知道 click 是自定义事件还是原生dom事件 -->
    <!-- <my-test @click.native="myTestClick('还可以传递参数哦！，第二个参数$event是原生dom事件', $event)"></my-test> -->
    <!-- 除了上面的在 myTestClick 中调用 stopPropagation 的方式，还可以用 .stop 的方式阻止事件传播 -->

    <!-- 两种写法相同 start -->
    <my-test @click.native.stop="myTestClick('还可以传递参数哦！，第二个参数$event是原生dom事件', $event)" v-model="price">
      <p>我是通过 slot 插入到 MyTest 中的p元素 一</p>
      <p>我是通过 slot 插入到 MyTest 中的p元素 二</p>
      <raw-editor></raw-editor>
      <p slot="upon-button">
        我会被插在按钮之上
      </p>
    </my-test>
    <!-- <my-test @click.native.stop="myTestClick('还可以传递参数哦！，第二个参数$event是原生dom事件', $event)" v-bind:value="price" v-on:input="price = arguments[0]"></my-test> -->
    <!-- 两种写法相同 end -->
  </div>
</template>
<script>
//
// <div id="example">
//   <my-component></my-component>
// </div>
//
// // 注册
// Vue.component('my-component', {
//   template: '<div>A custom component!</div>'
// })
// // 创建根实例
// new Vue({
//   el: '#example'
// })

// .vue 组件使用驼峰命名法，在引用时，使用羊肉串法（减号连接）
import MyTest from './MyTest'
import RawEditor from './RawEditor'
import Vue from 'Vue'
const vm = new Vue()
// 想要在其他页面中使用这个组件，必须得导出
// 哪怕 export default {} 也行
export default {
  // 不含验证
  // props: ['tototo', 'hi', 'myNumber', 'size'],
  // 含验证 可以是下面的原生构造器 String Number Boolean Function Object Array
  props: {
    tototo: String,
    hi: {
      type: String,
      // default: 'hi all'
      default () {
        return 'hi all'
      }
    },
    myNumber: [String, Number],
    size: {
      // type: Number, // or
      type: [Number, String],
      required: true
    }
  },
  // 所有在本组件中引用的子组件，都要在 components 对象中注册
  components: {
    MyTest,
    RawEditor
  },
  // 在组件中，data必须写成一个函数，否则会报错
  data () {
    // 要用到的属性，必须一次性地声明到这儿，在程序运行期间，是无法添加的
    return {
      message: '我是公共组件Test!',
      counter: 0,
      username: '',
      password: '',
      price: 100
    }
  },
  computed: {
    normalizedSize () {
      return typeof this.size + ': 0' + this.size
    }
  },
  methods: {
    // 绑定点击事件处理函数 increment 在这个函数内emit increment 事件，由于父组件订阅了 increment 事件，则在父组件上定义的监听函数
    // incrementTotal 会执行
    increment () {
      this.counter += 1
      this.$emit('increment')
      alert('帐号是：' + this.username + '\n' + '密码是：' + this.password)  // eslint-disable-line
    },
    // 父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。
    myTestClick (message, event) {
      // 不写这行的话，也会触发上层的onclick事件，即 increment 函数会执行
      // event.stopPropagation()
      alert('myTestClick ...' + message + ',' + this.price)  // eslint-disable-line
    }
  },

  // 组件的声明周期钩子，可以对Vue实例/组件实例 的声明周期进行监控
  beforeCreate () {
    // 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
    console.log('Test.vue beforeCreate ....')
  },

  created () {
    // 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
    console.log('Test.vue created ....');
  },

  beforeMount () {
    // 在挂载开始之前被调用：相关的 render 函数首次被调用。
    console.log('Test.vue beforeMount ....');
  },

  mounted () {
    // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
    console.log('Test.vue mounted ....');
  },

  beforeUpdate () {
    // 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
    // 该钩子在服务器端渲染期间不被调用。
    console.log('Test.vue beforeUpdate ....');
  },

  updated () {
    // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
    // 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
    // 然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。
    console.log('Test.vue updated ....'); // 当输入username 和 password 时，此函数被频繁更新
    Vue.nextTick(() => {
      console.log('nextTick exec ....');
    })
  },

  beforeDestory () {
    // 实例销毁之前调用。在这一步，实例仍然完全可用。
    console.log('Test.vue beforeDestory ....');
  },

  destoryed () {
    // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。
    console.log('Test.vue destoryed ....');
  }
}

// 将回调延迟到下次DOM更新循环之后执行。在修改数据之后理解使用它，然后等到DOM更新，
// 它跟全局方法Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
vm.$nextTick(() => {
  console.log('Test.vue vm.$nextTick ....');
})

</script>
