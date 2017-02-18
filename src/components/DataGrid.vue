<template>
  <div class="component-data-grid">
    <el-table
      v-loading="loading"
      element-loading-text="玩命加载中..."
      :data="articles"
      :row-class-name="tableRowClassName"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        width="100px"
        sortable
        label="id">
      </el-table-column>
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
           type="success"
           size="small">编辑</el-button>
         <!-- <el-button
           size="small"
           @click="handleDelete(scope.$index, scope.row)"
           type="danger">删除</el-button> -->
       </template>
      </el-table-column>
    </el-table>
    <div class="pagination-bar">
      <!-- :page-sizes="[50, 100, 150, 200]" -->
      <el-pagination
        :page-sizes="[1, 2, 3, 4]"
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
      return this.pageSize * (this.currentPage - 1)
    }
  },
  watch: {
    input (val, oldVal) {
      console.log('input 改变了....')
      if(_.isEqual(val, oldVal)) return
      if(val.type === 'new'){
        this.doNew()
      }else{
        this.doQuery(val)
      }
    }
  },
  data () {
    return {
      articles: [],
      articles_copy: [],
      loading: false,
      currentPage: 1,
      pageSize: 2, // 一页50条
      total: 0
    }
  },
  // 如果是keep-alive的话created不会执行
  created () {
    this.doQuery()
  },
  filters: {
    ctypefilter(ctype){
      console.log(ctype);
    }
  },
  methods: {
    tableRowClassName(row, index) {
        return row.status === 'new' ? 'new-article-row' : ''
    },
    doNew () {
      this.loading = true
      Article.newArticle().then(newArticle => {
        this.articles = [newArticle, ...this.articles]
        this.loading = false
      })
      .catch(message => {
        this.loading = false
      })
    },
    doQuery (query) {
      let param = null
      if(query){
        param = {...query}
        param.offset = this.offset
        param.pageSize = this.pageSize
      }else{
        param = {
          offset: this.offset,
          pageSize: this.pageSize
        }
      }
      this.loading = true
      Article.getArticles(param)
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
      // console.log(`每页 ${val} 条`)
      this.doQuery(this.input)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`)
      this.doQuery(this.input)
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
<style lang="scss">
.pagination-bar {
  text-align: center;
  padding: 20px 0;
}
.el-table .new-article-row > td:nth-child(2) > div:after {
  display: inline-block;
  content: 'new';
  color:#20A0FF;
  position: relative;
  top: -8px;
  margin-left: 5px;
}
</style>
