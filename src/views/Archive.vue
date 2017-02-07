<template>
   <div class="page-archive">
     <div class="route-box">
         <el-radio class="radio" label="monthly" v-model="archive" @click.native.stop="route('monthly')">按月</el-radio>
         <el-radio class="radio" label="author" v-model="archive" @click.native.stop="route('author')">按人</el-radio>
     </div>
     <!-- 加载 Monthly.vue页 和 Author.vue页 -->
     <transition name="slide-fade">
       <keep-alive>
         <router-view></router-view>
       </keep-alive>
     </transition>
   </div>
</template>

<script>
import Panel from '../components/Panel'
export default {
  components: { Panel },
  data () {
    return { archive: 'monthly' }
  },
  // watch: {
  //    // 如果路由有变化，会再次执行该方法
  //    // 刷新页面导致的路由变化，并不会触发，所以必须要监听 created 钩子，才能考虑到所有的情况
  //    '$route': 'routeChange'
  // },
  methods: {
    route (name) {
      this.$router.replace({name: name})
    },
    routeChange () {
      const archive = this.$route.path.indexOf('author') !== -1 ? 'author' : 'monthly'
      this.archive = archive
    }
  },
  // 不能只在created中监听routeChange。不然的话，在地址栏输入地址，页面无刷新的话，就不会走Archive的created的钩子了
  // 即虽然路由变了，但是created并不执行
  // 改为activated钩子即可，用不着监听 $route
  activated () {
    // 如果是keep-alive的话created其实只执行一次
    this.routeChange()
  }
}
</script>
<style scoped>
  .route-box {
    background-color: #324057;
    padding: 20px 0;
  }
  .el-radio {
    margin-left: 10px;
    color: #fff;
  }
</style>
