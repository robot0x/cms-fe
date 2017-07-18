<template>
  <div class="page-user">
    <el-row>
       <el-col :span="4">
          <el-menu @select="select" theme="dark">
            <el-menu-item :index="index | calcIndex" v-for="(item, index) in items">
              {{item.name}}（{{item.count}}）
            </el-menu-item>
        </el-menu>
       </el-col>
       <el-col :span="20">
         <data-grid class="data-grid" :input="query"></data-grid>
       </el-col>
    </el-row>
  </div>
</template>
<script>
import DataGrid from '../components/DataGrid'
import User from '../service/User'
export default {
  components: {
    DataGrid
  },
  activated () {
    User.getUserAndCount().then(items => {
      this.items = items
    }).catch(res => {
      if (res.status === 401) {
        this.$alert(res.message, '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(res => {
          this.$router.replace({name: 'login'})
        })
      } else {
        console.log('[User.vue] activated:', res)
        this.$notify({
          title: '发生错误',
          message: res.message || '发生错误，请联系@大哥'
        })
      }
    })
  },
  data () {
    return {
      visible: false,
      query: {},
      items: []
    }
  },
  methods: {
    getUser (index) {
      const [,i] = index.split('-').map(i => i - 1)
      return this.items[i].name
    },
    select (index) {
      this.query = { type: 'user', search: this.getUser(index)}
    }
  },
  filters: {
    calcIndex ( index ) {
      return 1 + '-' + (index + 1)
    }
  }
}
</script>
<style scoped>
.data-grid {
  position: relative;
  top: -60px;
}
</style>
