<template>
  <transition name="slide-fade">
     <div class="page-monthly">
       <el-row>
          <el-col :span="4">
             <el-menu default-openeds=1	class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
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
            <el-table
              :data="articles"
              stripe
              style="width: 100%">
              <el-table-column
                prop="title"
                fit
                label="标题">
              </el-table-column>
              <el-table-column
                prop="ctype"
                label="类型"
                width="100px"
                >
              </el-table-column>
              <el-table-column
                prop="author"
                width="180px"
                label="作者">
              </el-table-column>
              <el-table-column
                prop="last_update_time"
                width="180px"
                sortable
                label="更新">
              </el-table-column>
              <el-table-column
                width="180px"
                label="操作">
                <template scope="scope">
                 <el-button
                   @click="handleEdit(scope.$index, scope.row)"
                   size="small">编辑</el-button>
                 <el-button
                   size="small"
                   @click="handleDelete(scope.$index, scope.row)"
                   type="danger">删除</el-button>
               </template>
              </el-table-column>
            </el-table>
            <div class="pagination-bar">
              <el-pagination
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="4001">
              </el-pagination>
           </div>
          </el-col>
       </el-row>

     </div>
   </transition>
</template>

<script>
export default {
  data () {
    return {
      articles: [
        {
          title: '全网断货的重松口罩，限量补货',
          ctype: '好物',
          author: 'gaodouya',
          last_update_time: '01/04/2017 - 19:02'
        }, {
          title: '2016年度最受欢迎好物榜单「个护类」TOP15',
          ctype: '首页文章',
          author: '8023wei',
          last_update_time: '01/04/2017 - 19:02'
        }, {
          title: '烟雨朦朦的辣酱评测报告',
          ctype: '专刊',
          author: 'chengmingjia',
          last_update_time: '01/04/2017 - 19:02'
        }, {
          title: '有调十日谈 Vol.2：一边上班一边还能走遍全球？我不是开玩笑',
          ctype: '测评',
          author: 'zhaoxinyue',
          last_update_time: '01/04/2017 - 19:02'
        }]
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
