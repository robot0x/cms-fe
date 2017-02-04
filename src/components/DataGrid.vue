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
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
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
    total () {
      return this.articles.length
    }
  },
  watch: {
    input (val, oldVal) {
      if(!val || _.isEqual(val, oldVal)) {
        return
      }
      this.loading = true
      Article.getArticles(val).then( articles => {
        this.articles = articles
        this.articles_copy = [...this.articles]
        this.loading = false
        this.total = this.articles.length
      })
    }
  },
  data () {
    return {
      articles: [],
      articles_copy: [],
      loading: false
    }
  },
  created () {
     this.loading = true
     Article.getArticles().then( articles => {
       this.articles = articles
       this.articles_copy = [...this.articles]
       this.loading = false
       this.total = this.articles.length
     })
  },
  methods: {
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
