<template>
     <div class="page-monthly">
       <el-row>
          <el-col :span="4">
             <el-menu :default-openeds="defaultOpeneds"	class="el-menu-vertical-demo"  theme="dark" @select="select">
               <el-submenu v-for="(item, index) in items" :index="index | calcIndex">
                 <template slot="title">{{ item.year }}年（{{item.count}}）</template>
                 <el-menu-item :index="index | calcIndex(i)" v-for="(month, i) in item.months"> {{month}} </el-menu-item>
               </el-submenu>
               <!-- <el-submenu index="1">
                   <template slot="title">2017年（200）</template>
                   <el-menu-item index="1-1">一月</el-menu-item>
                   <el-menu-item index="1-2">二月</el-menu-item>
                   <el-menu-item index="1-3">三月</el-menu-item>
                   <el-menu-item index="1-4">四月</el-menu-item>
                   <el-menu-item index="1-5">五月</el-menu-item>
                   <el-menu-item index="1-6">六月</el-menu-item>
                   <el-menu-item index="1-7">七月</el-menu-item>
                   <el-menu-item index="1-8">八月</el-menu-item>
                   <el-menu-item index="1-9">九月</el-menu-item>
                   <el-menu-item index="1-10">十月</el-menu-item>
                   <el-menu-item index="1-11">十一月</el-menu-item>
                   <el-menu-item index="1-12">十二月</el-menu-item>
               </el-submenu>

               <el-submenu index="2">
                   <template slot="title">2016年（3890）</template>
                   <el-menu-item index="2-1">一月</el-menu-item>
                   <el-menu-item index="2-2">二月</el-menu-item>
                   <el-menu-item index="2-3">三月</el-menu-item>
                   <el-menu-item index="2-4">四月</el-menu-item>
                   <el-menu-item index="2-5">五月</el-menu-item>
                   <el-menu-item index="2-6">六月</el-menu-item>
                   <el-menu-item index="2-7">七月</el-menu-item>
                   <el-menu-item index="2-8">八月</el-menu-item>
                   <el-menu-item index="2-9">九月</el-menu-item>
                   <el-menu-item index="2-10">十月</el-menu-item>
                   <el-menu-item index="2-11">十一月</el-menu-item>
                   <el-menu-item index="2-12">十二月</el-menu-item>
               </el-submenu>

               <el-submenu index="3">
                   <template slot="title">2015年（4120）</template>
                   <el-menu-item index="3-1">一月</el-menu-item>
                   <el-menu-item index="3-2">二月</el-menu-item>
                   <el-menu-item index="3-3">三月</el-menu-item>
                   <el-menu-item index="3-4">四月</el-menu-item>
                   <el-menu-item index="3-5">五月</el-menu-item>
                   <el-menu-item index="3-6">六月</el-menu-item>
                   <el-menu-item index="3-7">七月</el-menu-item>
                   <el-menu-item index="3-8">八月</el-menu-item>
                   <el-menu-item index="3-9">九月</el-menu-item>
                   <el-menu-item index="3-10">十月</el-menu-item>
                   <el-menu-item index="3-11">十一月</el-menu-item>
                   <el-menu-item index="3-12">十二月</el-menu-item>
               </el-submenu>

               <el-submenu index="4">
                   <template slot="title">2014年（899）</template>
                   <el-menu-item index="4-10">十月</el-menu-item>
                   <el-menu-item index="4-11">十一月</el-menu-item>
                   <el-menu-item index="4-12">十二月</el-menu-item>
               </el-submenu> -->
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
import moment from 'moment'
export default {
  components: {
    DataGrid
  },
  created () {
    console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
    console.log(moment().format('dddd'))
    console.log(moment().format("MMM Do YY"))
    console.log(moment().format('YYYY [escaped] YYYY'))
    console.log(moment().format())
    console.log(moment().format('YYYY-MM-DD hh:mm:ss'))
    console.log(moment('2014-1', 'YYYY-MM').format('YYYY-MM-DD hh:mm:ss'));
    console.log(moment('2014-1', 'YYYY-MM').format('YYYY-MM-DD hh:mm:ss'));
    console.log(moment('2014-1', 'YYYY-MM').valueOf())
  },
  data () {
    return {
      query: {},
      defaultOpeneds: ['1', '2'],
      items: [{
        year: 2017,
        count: 500,
        months: ['一月', '二月', '三月']
      }, {
        year: 2016,
        count: 3467,
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      }, {
        year: 2015,
        count: 4467,
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      }, {
        year: 2014,
        count: 1402,
        months: ['八月', '九月', '十月', '十一月', '十二月']
      }]
    }
  },

  methods: {
    select (index) {
      const [i, j] = index.split('-').map(i => i - 1)
      const item = this.items[i]
      this.query = {
        type: 'monthly',
        search: moment(item.year + '-' + item.months[j], 'YYYY-MM').valueOf()
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
