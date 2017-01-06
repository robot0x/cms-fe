<template>
  <transition name="slide-fade">
     <div class="content">
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
              size="small">编辑</el-button>
            <el-button
              size="small"
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
     </div>
   </transition>
</template>

<script>
import Vue from 'vue'
// import { Loading, Button, Dialog } from 'element-ui'
// Vue.use(Loading)
// Vue.use(Button)
// Vue.use(Dialog)
//
// let loadingInstance = Loading.service({
//   text: '玩命加载中...',
//   target: document.getElementById('wrapper')
// })
//
// setTimeout(() => {
//   loadingInstance.close()
// }, 2000)

import { Table, TableColumn, Button, Pagination } from 'element-ui'
import fetch from 'isomorphic-fetch'
import API from '../API'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(Pagination)

export default {
  name: 'hello',
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
  },
  created () {
    // 在created中获取后端数据
    fetch(API.articles.url + '?id=121223').then(result => {
      console.log(result)
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 .pagination-bar{
   text-align: center;
   margin-top: 10px;
 }
</style>
