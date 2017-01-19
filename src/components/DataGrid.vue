<template>
  <div class="component-data-grid">
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
        :total="4001">
      </el-pagination>
   </div>
  </div>
</template>
<script>
// 端到端组件
import articles from '../mocks/articles'
export default {
  components: {
  },
  data () {
    return {
      articles: articles
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
      this.$router.push({ name: 'edit', params: { id: 123 }})
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.pagination-bar{
  text-align: center;
  padding: 20px 0;
}
</style>
