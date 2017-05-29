import Vue from 'vue'
import VueRouter from 'vue-router'
// 不同的路由规则分别对应的页面视图
import Content from '../views/Content'
import Edit from '../views/Edit'
import Archive from '../views/Archive'
import Monthly from '../views/Monthly'
import User from '../views/User'
import Login from '../views/Login'
import Help from '../views/Help'
import Author from '../views/Author'
// import Password from '../views/Password'
// import Register from '../views/Register'
import NotFound from '../views/NotFound'
import LoginUtils from '../utils/LoginUtils'
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
  { path: '/', redirect: '/content' },
  { path: '/content/', name: 'content', component: Content },
  // 不带参数（新增）
  // { path: '/edit/', name: 'edit0', component: Edit },
  // 带参数
  { path: '/edit/:id', name: 'edit', component: Edit },
  {
    path: '/archive/',
    // [vue-router] Named Route 'archive' has a default child route.
    // When navigating to this named route (:to="{name: 'archive'"), the default child route will not be rendered.
    // Remove the name from this route and use the name of the default child route for named links instead.
    // name: 'archive',
    component: Archive,
    children: [
      { path: '', component: Monthly }, // 进入到 Archive.vue 页面中，默认加载 Monthly.vue
      { path: 'monthly', name: 'monthly', component: Monthly },
      { path: 'user', name: 'user', component: User }
    ]
  },
  // { path: '/monthly', component: Monthly },
  { path: '/author', component: Author },
  { path: '/help', component: Help },
  { path: '/login/', name: 'login', component: Login },
  // { path: '/password/', name: 'password', component: Password }, // 修改密码
  // { path: '/register/', name: 'register', component: Register },
  { path: '*', name: '404', component: NotFound }
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  saveScrollPosition: true,
  transitionOnLoad: true,
  linkActiveClass: 'router-link-active',
  routes // （缩写）相当于 routes: routes
})
// const vm = new Vue()
// console.log(vm.store); // undefined
router.beforeEach((to, from, next) => {
  // ...
  // console.log('导航钩子被执行.......')
  // console.log("from:",from.name)
  // console.log("to:",to.name)
  const {name} = to
  if (name === 'login') {
    return next()
  }

  let isLogin = LoginUtils.checkLoginInfo()
  if (!isLogin) {
    router.replace({name: 'login'})
  } else {
    // if( name === 'edit'){
    //   /**
    //    *  TODO
    //    *  1. check这个id是否存在
    //    *  2. 若存在则设置lockby字段
    //    */
    //   Article
    //   .checkIdAndSetLockBy(2, LoginUtils.getUsername())
    //   .then(res => {
    //     if(!res.valid){
    //       router.replace({name: 'NotFound'})
    //     }else{
    //       next()
    //     }
    //   })
    // }else{
    next()
    // }
  }
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
// 将路由器导出
export default router
