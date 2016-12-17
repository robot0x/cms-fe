import Vue from 'vue'
import VueRouter from 'vue-router'
// 不同的路由规则分别对应的页面视图
import Content from '../view/Content'
import Edit from '../view/Edit'
import Monthly from '../view/Monthly'
import Author from '../view/Author'
import NotFound from '../view/NotFound'

Vue.use(VueRouter)

// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/', component: Content },
  { path: '/content', redirect: '/' },
  { path: '/edit', component: Edit },
  { path: '/monthly', component: Monthly },
  { path: '/author', component: Author },
  { path: '*', component: NotFound }
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  saveScrollPosition: true,
  transitionOnLoad: true,
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
// 将路由器导出
export default router
