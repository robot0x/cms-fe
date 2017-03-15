<template>
   <div class="page-content">
     <div class="search-area">
       <el-input :placeholder="placeholder" class="el-input" v-model="search" @keyup.native.enter.stop.prevent="doQuery">
         <el-select v-model="type" slot="prepend" placeholder="请选择" clearable>
           <el-option label="类型" value="ctype"></el-option>
           <el-option label="用户" value="user"></el-option>
         </el-select>
         <el-button slot="append" icon="search" size="large" @click="doQuery"></el-button>
       </el-input>
       <el-button type="primary" icon="plus" @click="newArticle" class="new-article">新建文章</el-button>
     </div>
     <data-grid :input="query"></data-grid>
   </div>
</template>
<script>
import DataGrid from '../components/DataGrid'
export default {
  name: 'hello',
  components: {
    DataGrid
  },
  data () {
    return {
      placeholder: '输入文章ID或文章title',
      search: '',
      type: '',
      query: {}
    }
  },
  watch: {
    type (val) {
      console.log(val);
      if(val === 'ctype') {
        this.placeholder = '请输入文章类型'
      }else if(val === 'user'){
        this.placeholder = '请输入用户名称'
      }else{
        this.placeholder = '输入文章ID或文章title'
      }
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
      let like = false
      if( !type ){
        if(/^\d+$/.test(search)){
          type = 'id'
          search = Number(search)
        } else {
          type = 'title'
          like = true
        }
      }
      this.query = {type, search}
      if(like){
        this.query.like = like
      }
    },
    newArticle () {
      // alert('newArticle')
      // console.log(this.$route)
      // this.$route.push('edit')
      // console.log(this.$router)
      // 默认跳转到无参数 edit 视图
      // this.$router.push({ name: 'edit0' })
      // this.query = { type: 'new', random: Math.random() + Date.now() }
      this.query = { type: 'new' }
    }
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
