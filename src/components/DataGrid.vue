<template>
  <div class="component-data-grid">
    
    <el-table
      v-loading="loading"
      element-loading-text="玩命加载中..."
      :data="articles"
      :row-class-name="tableRowClassName"
      stripe
      border
      style="width: 100%">
      <el-table-column type="expand">
        <template scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="被谁锁定">
              <span>{{ props.row.lock_by || '未锁定' }}</span>
            </el-form-item>
            <el-form-item label="分享到标题">
              <span>{{ props.row.share_title || '未填写' }}</span>
            </el-form-item>
            <el-form-item label="分享到微信标题">
              <span>{{ props.row.wx_title || '未填写' }}</span>
            </el-form-item>
            <el-form-item label="分享到微博标题">
              <span>{{ props.row.wb_title || '未填写' }}</span>
            </el-form-item>
            <el-form-item label="作者">
              <span>{{ props.row.author || '未填写'}}</span>
            </el-form-item>
            <el-form-item label="创建人">
              <span>{{ props.row.user }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.create_time }}</span>
            </el-form-item>
            <el-form-item label="发布时间">
              <span>{{ props.row.timetopublish }}</span>
            </el-form-item>
            <el-form-item label="最后修改人">
              <span>{{ props.row.last_update_by }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

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
        prop="last_update_by"
        sortable
        width="180px"
        label="最后更新用户">
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
       </template>
      </el-table-column>
    </el-table>
    <div class="pagination-bar">
      <!-- :page-sizes="[50, 100, 150, 200]" -->
      <el-pagination
        :page-sizes="[50, 100, 200, 400]"
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
import LoginUtils from '../utils/LoginUtils'
import Utils from '../utils/Utils'
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
      // if(_.isEqual(val, oldVal)) return
      if(val.type === 'new'){
        this.doNew()
      } else {
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
      pageSize: 50, // 一页50条
      total: 0
    }
  },
  created () {
    this.doQuery()
  },
  // 如果是keep-alive的话created不会执行
  // activated () {
  //   this.doQuery()
  // },
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
      Article
      .newArticle()
      .then(newArticle => {
        this.articles = [newArticle, ...this.articles]
        this.loading = false
        this.$router.push({ name: 'edit', params: { id: newArticle.id }})
      })
      .catch(res => {
        this.loading = false
        if (res.status === 401) {
          this.$alert('token过期，请重新登录', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            this.$router.replace({name: 'login'})
          })
        } else {
          this.$notify({
            title: '发生错误',
            message:  res.message || '发生错误，请联系@大哥'
          })
        }
      })
    },
    doQuery (query = {}, resetPage = true) {
      this.loading = true
      let {type, search} = query
      if (type === 'ctype' && !/^\d{1,2}$/.test(search)) {
        query.search = Utils.typeToCtype(search)
      }
      let param = Utils.getPaginationParam(query, resetPage ? 0 : this.offset, this.pageSize)
      // if(query){
      //   param = {...query}
      //   param.offset = offset
      //   param.pageSize = this.pageSize
      // }else{
      //   param = {
      //     offset,
      //     pageSize: this.pageSize
      //   }
      // }
      // debugger;
      Article.getArticles(param).then(res => {
        const {articles, total} = res
        if(articles.length){
          this.articles = articles.map(article => {
            if(Utils.isLocked(article.lock_by)){
              article.title = article.title + ' 🔒'
            }
            article.ctype = Utils.convertCtype(article.ctype)
            return article
          })
          this.total = total || articles.length
          if(resetPage){
            this.currentPage = 1
          }
        }else{
          this.$notify({
            message: '没有搜索到符合条件的数据',
            type: 'success'
          })
        }
        this.loading = false
      })
      .catch(res => {
        this.loading = false
        if (res.status === 401) {
          this.$alert('token过期，请重新登录', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(res => {
            this.$router.replace({name: 'login'})
          })
        } else {
          this.$notify({
            title: '发生错误',
            message: res.message || '发生错误，请联系@大哥'
          })
        }
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
      this.doQuery(this.input, false)
    },
    handleEdit (index, row) {
      const {id, lock_by} = this.articles[index]
      this.$router.push({ name: 'edit', params: { id }})
      // const {id, lock_by} = this.articles[index]
      // if(Utils.isLocked(lock_by)){
      //   this.$alert(`此文章已经被 ${lock_by} 锁定，暂无法编辑，请联系 ${lock_by} 解锁`, '文章被锁定', { confirmButtonText: '确定' })
      // } else {
      //   this.$router.push({ name: 'edit', params: { id }})
      // }
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
 .demo-table-expand {
   font-size: 0;
 }
 .demo-table-expand label {
   width: 120px;
   color: #99a9bf;
 }
 .demo-table-expand .el-form-item {
   margin-right: 0;
   margin-bottom: 0;
   width: 50%;
 }
</style>
