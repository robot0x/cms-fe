<template>
  <div class="component-data-grid">
    <el-table
      v-loading="loading"
      element-loading-text="玩命加载中..."
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
        sortable
        width="100px">
      </el-table-column>
      <el-table-column
        prop="author"
        sortable
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
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        :current-page="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
   </div>
  </div>
</template>
<script>
// 端到端组件
import Article from '../service/Article'
import _ from 'lodash'
export default {
  props: {
    input: Object
  },
  computed: {
    offset () {
      console.log('pageSize:', this.pageSize)
      console.log('currentPage:', this.currentPage)
      console.log('offset:', this.pageSize * (this.currentPage - 1))
      return this.pageSize * (this.currentPage - 1)
    }
  },
  watch: {
    input (val, oldVal) {
      const { search } = val
      if(!String(search).trim()){
        this.articles = this.articles_copy
        return
      }
      if(_.isEqual(val, oldVal)) {
        return
      }
      // val.pageSize = this.pageSize
      // val.offset = this.offset
      this.doQuery(val)
      // this.loading = true
      // Article.getArticles(val)
      // .then( articles => {
      //   console.log(this);
      //   this.articles = articles
      //   // this.articles_copy = [...this.articles]
      //   this.loading = false
      //   this.total = this.articles.length
      // })
      // .catch( message => {
      //   this.loading = false
      // })
    }
  },
  data () {
    return {
      articles: [],
      articles_copy: [],
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  // 如果是keep-alive的话created不会执行
  created () {
     Article.getTotal().then(total => this.total = total)
     this.loading = true
     console.log('loading:', this.loading)
     this.doQuery()
    //  Article.getArticles({
    //    offset: this.offset,
    //    pageSize: this.pageSize
    //  })
    //  .then( res => {
    //    const {articles, total} = res
    //    this.loading = false
    //    this.articles = articles
    //    this.total = total
    //    this.articles_copy = [...this.articles]
    //    this.total = this.articles.length
    //    console.log('loading:', this.loading)
    //  })
    //  .catch( message => {
    //    this.loading = false
    //    console.log('loading:', this.loading)
    //  })
  },
  methods: {
    doQuery (query) {
      // query = query || { offset: this.offset,pageSize: this.pageSize}
      if( query ){
        query.offset = this.offset
        query.pageSize = this.pageSize
      }else{
        query = {
          offset: this.offset,
          pageSize: this.pageSize
        }
      }
      this.loading = true
      Article.getArticles(query)
      .then(res => {
        const {articles, total} = res
        this.loading = false
        this.articles = articles
        this.total = total
      })
      .catch(message => {
        this.loading = false
      })
    },

    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`)
      this.doQuery()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
      this.doQuery()
      // Article.pagination({
      //   offset: this.offset,
      //   pageSize: this.pageSize
      // })
      // .then(res => {
      //   const {articles, total} = res
      //   this.loading = false
      //   console.log('pagination done ...')
      //   this.articles = articles
      //   this.total = total
      // })
      // .catch(message => {
      //   this.loading = false
      // })
    },
    handleEdit (index, row) {
      this.$router.push({ name: 'edit', params: { id: this.articles[index].id }})
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const article = this.articles[index]
        console.log(article);
        console.log(article.id);
        const opt = {
            type: 'success',
            message: '删除成功!'
        }
        Article.deleteArticle(article.id)
       .then(message => {
         if(message !== 'SUCCESS'){
           opt.type = 'error'
           opt.message = message
         } else {
           this.articles.splice(index, 1)
           this.articles_copy = [...this.articles]
         }
         this.$message(opt)
       })
       .catch(message => {
         opt.type = 'error'
         opt.message = message
         this.$message(opt)
       })

      })
      console.log(index, row);
    }
  }
}
</script>
<style lang="scss" scoped>
.pagination-bar{
  text-align: center;
  padding: 20px 0;
}
</style>
