<template>
 <div class="page-monthly">
   <el-row>
      <el-col :span="4">
         <el-menu :default-openeds="defaultOpeneds"	:default-active="defaultActive" class="el-menu-vertical-demo" theme="dark" @select="select">
           <el-submenu v-for="(item, index) in items" :index="index | calcIndex">
             <template slot="title">{{ item.year }}年（{{item.count}}）</template>
             <el-menu-item :index="index | calcIndex(i)" v-for="(month, i) in item.months"> {{ month | monthFormat }}</el-menu-item>
           </el-submenu>
       </el-menu>
      </el-col>
      <el-col :span="20"> <data-grid class="data-grid" :input="query"></data-grid> </el-col>
   </el-row>
 </div>
</template>

<script>
import DataGrid from '../components/DataGrid'
import moment from 'moment'
export default {
  components: { DataGrid },
  // activated () {
  // 改为created的原因是，每次视图切换回来activated钩子都会执行，这样每次都会从新查询
  // 而这是没有必要的，所以放在created即可
  created(){
    this.setDefaultActive()
    this.query = { type: 'monthly', search: moment(this.getYearAndMonth(this.defaultActive)).valueOf() }
  },
  data () {
    return {
      defaultActive: '',
      query: {},
      defaultOpeneds: ['1', '2'],
      items: [{
        year: 2017,
        count: 500,
        months: [1, 2, 3]
      }, {
        year: 2016,
        count: 3467,
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }, {
        year: 2015,
        count: 4467,
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }, {
        year: 2014,
        count: 1402,
        months: [8, 9, 10, 11, 12]
      }]
    }
  },

  methods: {
    getYearAndMonth (index) {
      const [i, j] = index.split('-').map(i => i - 1)
      const item = this.items[i]
      return [item.year, item.months[j]]
    },
    select (index) {
      this.query = { type: 'monthly', search: moment(this.getYearAndMonth(index)).valueOf() }
    },
    setDefaultActive () {
      const now = moment() // month 是从0开始的
      for(let i = 0, l = this.items.length; i < l; i++){
        const item = this.items[i]
        const year = item.year
        for(let j = 0, len = item.months.length; j < len; j++){
          const month = item.months[j]
          if(now.isSame(moment([year, month - 1]), 'month')) {
            this.defaultActive = (i + 1) + '-' + (j + 1)
            return
          }
        }
      }
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
