<template>
   <div class="page-content">
     <div class="search-area">
       <el-input placeholder="输入文章ID或文章title" class="el-input" v-model="search" @input="filter">
         <el-select v-model="select" slot="prepend" placeholder="请选择" clearable>
           <el-option label="类型" value="ctype"></el-option>
           <el-option label="作者" value="author"></el-option>
         </el-select>
         <el-button slot="append" icon="search" size="large" @click="query"></el-button>
       </el-input>
       <el-button type="primary" icon="plus" @click="newArticle" class="new-article">新建文章</el-button>
     </div>
     <data-grid :filter="search"></data-grid>
   </div>
</template>
<script>
import fetch from 'isomorphic-fetch'
import API from '../API'
import Search from '../components/Search'
import DataGrid from '../components/DataGrid'

export default {
  name: 'hello',
  components: {
    // Hello,
    Search,
    DataGrid
  },
  data () {
    return {
      search: '',
      select: ''
    }
  },
  methods: {
    filter () {
    },
    query () {
      alert('query')
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
    fetch(API.articles.url + '?id=121223').then(result => {
      console.log(result)
    })
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
