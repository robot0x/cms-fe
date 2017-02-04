<template>
  <div class="component-data-grid">
    <!-- <span>{{filter}}</span> -->
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
import articles from '../mocks/articles'
import _ from 'lodash'
export default {
  props: {
    filter: [String, Number],
    input: Object
  },
  data () {
    return {
      articles: [],
      articles_copy: [],
      loading: true
    }
  },
  created () {
    setTimeout( () => {
      this.articles = articles
      this.articles_copy = [...this.articles]
      this.loading = false
      this.total = this.articles.length
    })
  },
  watch: {
    filter: function (newFilter) {
      console.log(newFilter + '.........')
      // console.log(this)
      if( !newFilter ){
        this.articles = this.articles_copy
      } else {
        this.articles = this.articles.filter(( article ) => {
           if ( _.isInteger(newFilter) ){
             return _.toInteger(article.id) === newFilter
           }
        })
      }
    }
  },

  computed: {
    total () {
      return this.articles.length
    }
    // doFilter () {
    //   return this.articles.filter( article  => {
    //       return article.id == this.filter
    //   })
    // }
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
        this.articles.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
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
