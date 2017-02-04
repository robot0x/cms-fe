<template>
   <div class="page-content">
     <div class="search-area">
       <el-input placeholder="输入文章ID或文章title" class="el-input" v-model="search" @keyup.native.enter.stop.prevent="doQuery">
         <el-select v-model="type" slot="prepend" placeholder="请选择" clearable>
           <el-option label="类型" value="ctype"></el-option>
           <el-option label="作者" value="author"></el-option>
         </el-select>
         <el-button slot="append" icon="search" size="large" @click="doQuery"></el-button>
       </el-input>
       <el-button type="primary" icon="plus" @click="newArticle" class="new-article">新建文章</el-button>
     </div>
     <data-grid :input="query"></data-grid>
   </div>
</template>
<script>
import fetch from 'isomorphic-fetch'
import API from '../API'
// import Search from '../components/Search'
import DataGrid from '../components/DataGrid'
export default {
  name: 'hello',
  components: {
    // Search,
    DataGrid
  },
  data () {
    return {
      search: '',
      type: '',
      query: {}
    }
  },
  methods: {
    doQuery () {
      /**
       * id      为按照id进行搜索             精准搜索
       * title   为按照title进行搜索          like搜索
       * ctype   为按照ctype进行搜索          精准搜索
       * author  为按照authorname进行搜索     like搜索
       * monthly 为按照月份进行搜索           范围搜索
       */
      let {type, search} = this
      if(!search.trim()){
        return this.$message({
          type: 'warning',
          message: '请输入要搜索的内容~'
        })
      }
      if( !type ){
        if(/^\d+$/.test(search)){
          type = 'id'
          search = Number(search)
        }else{
          type = 'title'
        }
      }
      this.query = { type, search }
    },
    newArticle () {
      // alert('newArticle')
      console.log(this.$route)
      // this.$route.push('edit')
      console.log(this.$router)
      // 默认跳转到无参数 edit 视图
      this.$router.push({ name: 'edit0' })
    }
  },
  created () {
    // 在created中获取后端数据
    // fetch(API.articles.url + '?id=121223').then(result => {
    //   console.log(result)
    // })
  }
}
</script>
<style scoped>
.el-select {
   width: 100px;
 }
.search-area {
  padding: 24px;
  border: 1px solid #eaeefb;
  border-radius: 4px;
}
.el-input {
  width: 50%;
}

.new-article {
  /*margin-left: 10px;*/
  float: right;
}
</style>
