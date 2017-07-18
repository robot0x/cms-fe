<template>
 <div class="page-monthly">
   <el-row>
      <el-col :span="4">
         <el-menu :default-openeds="defaultOpeneds" class="el-menu-vertical-demo" theme="dark" @select="select">
           <el-submenu v-for="(item, index) in items" :index="index | calcIndex">
             <template slot="title">{{ item.year }}年（{{item.count}}）</template>
             <el-menu-item :index="index | calcIndex(i)" v-for="(month, i) in item.months"> {{ month.month | monthFormat }}（{{month.count}}）</el-menu-item>
           </el-submenu>
       </el-menu>
      </el-col>
      <el-col :span="20">
        <data-grid class="data-grid" :input="query"></data-grid>
      </el-col>
   </el-row>
 </div>
</template>
<script>
import Article from '../service/Article'
import DataGrid from '../components/DataGrid'
export default {
  components: {
    DataGrid
  },
  // activated () {
  // 改为created的原因是，每次视图切换回来activated钩子都会执行，这样每次都会从新查询
  // 而这是没有必要的，所以放在created即可
  activated(){
    Article.getStatistics().then(res => {
      this.items = res
    }).catch(res => {
      if (res.status === 401) {
        this.$alert('token过期，请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(res => {
          this.$router.replace({name: 'login'})
        })
      } else {
        console.log('[Monthly.vue] activated:', res)
        this.$notify({
          title: '发生错误',
          message: res.message || '发生错误，请联系@大哥'
        })
      }
    })
  },
  // select user, count(a.id) as count from article_meta as a, user as u where a.user = u.name group by u.name;
  // select DATAFORMAT('YYYY', last_update_time) as year, DATAFORMAT('m')
  data () {
    return {
      query: {},
      defaultOpeneds: ['1', '2'],
      items: []
    }
  },

  methods: {
    getYearAndMonth (index) {
      const [i, j] = index.split('-').map(i => i - 1)
      const item = this.items[i]
      return [item.year, item.months[j]]
    },
    select (index) {
      console.log(index);
      const [yIndex , mIndex] = index.split('-')
      const year = this.items[yIndex - 1]
      const month = year.months[mIndex - 1]
      this.query = { type: 'month', search: year.year + '-' + month.month }
    }
  },
  filters: {
    calcIndex (index, i) {
      let ret = ''
      if( isNaN(i) ){
        ret = index + 1 + ''
      }else{
        ret = (index + 1) + '-' + (i + 1)
      }
      return ret
    },
    monthFormat(month) {
      switch (month) {
        case 1:
          return '一月'
        case 2:
          return '二月'
        case 3:
          return '三月'
        case 4:
          return '四月'
        case 5:
          return '五月'
        case 6:
          return '六月'
        case 7:
          return '七月'
        case 8:
          return '八月'
        case 9:
          return '九月'
        case 10:
          return '十月'
        case 11:
          return '十一月'
        case 12:
          return '十二月'
      }
    }
  }
}
</script>

<style scoped>
.pagination-bar{
  text-align: center;
  margin-top: 10px;
}
.data-grid {
  position: relative;
  top: -60px;
}
</style>
