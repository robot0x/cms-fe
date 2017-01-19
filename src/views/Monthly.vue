<template>
     <div class="page-monthly">
       <el-row>
          <el-col :span="4">
             <el-menu :default-openeds="['1']"	class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
             <el-submenu index="1">
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
             </el-submenu>

           </el-menu>
          </el-col>
          <el-col :span="20">
            <data-grid></data-grid>
          </el-col>
       </el-row>
     </div>
</template>

<script>
import DataGrid from '../components/DataGrid'
export default {
  components: {
    DataGrid
  },
  data () {
    return {
    }
  },
  methods: {
    handleOpen () {
    },
    handleClose () {
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-bar{
  text-align: center;
  margin-top: 10px;
}
</style>
