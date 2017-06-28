<template>
 <div class="page-author">
   <el-table :data="authors" border style="width: 100%">
    <el-table-column label="pic_uri">
      <template scope="scope">
        <img :src="scope.row.pic_uri | addPrefix" width="80" height="80" alt="scope.row.title">
      </template>
    </el-table-column>
    <el-table-column label="source">
      <template scope="scope">
        <span v-if="!scope.row.editing">{{scope.row.source}}</span>
        <el-input v-model="scope.row.source" v-if="scope.row.editing"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="title">
      <template scope="scope">
        <span v-if="!scope.row.editing">{{scope.row.title}}</span>
        <el-input v-model="scope.row.title" v-if="scope.row.editing"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="type">
      <template scope="scope">
        <span v-if="!scope.row.editing">{{scope.row.type}}</span>
        <el-input v-model="scope.row.type" v-if="scope.row.editing"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="naming">
      <template scope="scope">
        <span v-if="!scope.row.editing">{{scope.row.naming}}</span>
        <el-input v-model="scope.row.naming" v-if="scope.row.editing"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="link">
      <template scope="scope">
        <span v-if="!scope.row.editing">{{scope.row.link}}</span>
        <el-input v-model="scope.row.link" v-if="scope.row.editing" type="textarea" autosize></el-input>
      </template>
    </el-table-column>
    <el-table-column label="value">
      <template scope="scope">
        <span v-if="!scope.row.editing">{{scope.row.value}}</span>
        <el-input v-model="scope.row.value" v-if="scope.row.editing" type="textarea" autosize></el-input>
      </template>
    </el-table-column>
    <el-table-column label="brief">
      <template scope="scope">
        <span v-if="!scope.row.editing">{{scope.row.brief}}</span>
        <el-input v-model="scope.row.brief" v-if="scope.row.editing"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="intro">
      <template scope="scope">
        <span v-if="!scope.row.editing">{{scope.row.intro}}</span>
        <el-input v-model="scope.row.intro" v-if="scope.row.editing" type="textarea" autosize></el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
          :icon="scope.row.editing? 'check': 'edit'"
          size="small"
          @click="handleEdit(scope.$index, scope.row)">{{scope.row.editText}}</el-button>
          <el-button size="small" @click="handleView(scope.$index, scope.row)" title="查看渲染到页面的效果">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination-bar">
    <el-pagination
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :current-page="currentPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 </div>
 <el-dialog v-model="dialogVisible" size="tiny">
   <div class="author-card">
     <div class="author-header author-border"><img :src="srcfrom" width="34" height="32" class="author-avatar"><span>作者</span></div>
     <div class="author-content author-border">
       <img :src="authorCard.pic_uri | addPrefix" width=100 height=100>
       <div class="author-title-and-value">
         <h1>{{authorCard.title}}</h1>
         <p>{{authorCard.value}}</p>
       </div>
     </div>
     <p class="author-intro">
       <base target="_blank"/>
       简介：<span v-html="authorCard.intro"></span>
     </p>
   </div>
 </el-dialog>
 </div>
</template>
<script>
import Author from '../service/Author'
import srcfrom from '../assets/srcfrom.png'
import Utils from '../utils/Utils'
import _ from 'lodash'
export default {
  components: {},
  computed: {
    offset () {
      return this.pageSize * (this.currentPage - 1)
    }
  },
  data () {
    return {
      authorCard: {},
      dialogVisible: false,
      srcfrom,
      authors: [],
      authors_copy: [],
      editing: false,
      // pageSizes:[1, 2, 3, 4],
      pageSizes:[50, 100, 200, 400],
      // pageSize: 2,
      pageSize: 50, // 一页50条
      currentPage: 1,
      total: 0
    }
  },
  created () {
   this.doQuery()
  },
  methods: {
    doQuery (query, resetPage = true) {
      this.loading = true
      let param = Utils.getPaginationParam(query, resetPage ? 0 : this.offset, this.pageSize)
      Author.getAuthors(param).then(res => {
        const {authors, total} = res
        if(!_.isEmpty(authors)){
          this.authors_copy = _.cloneDeep(authors)
          this.authors = authors.map(data => {data.editing = false, data.editText = '编辑'; return data})
          this.total = total || authors.length
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
      .catch(message => {
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
            message: h('p', { style: 'color: red'}, res.message || '发生错误，请联系@大哥')
          })
        }
      })
    },
    handleView (index, row) {
      this.dialogVisible = true
      this.authorCard = row
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.doQuery(Utils.getPaginationParam(null, this.currentPage, this.pageSize))
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.doQuery(Utils.getPaginationParam(null, this.currentPage, this.pageSize), false)
    },
    handleEdit (index, row) {
      console.log(row)
      const { editing } = row
      if(!editing){
        row.editText = '保存'
      } else {
        row.editText = '编辑'
        const data = _.cloneDeep(row)
        const {id} = data
        console.log(id)
        delete data.editing
        delete data.editText
        const authorCopy = this.authors_copy[index]
        // 只有当数据发生了变化才访问网络
        if(!_.isEqual(authorCopy, data)){
          Author
          .update(data)
          .then(res=> {
            console.log(res)
          })
          .catch(res => {
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
                message: h('p', { style: 'color: red'}, res.message || '发生错误，请联系@大哥')
              })
            }
          })
        }
      }
      row.editing = !editing
    }
  },
  filters: {
    htmlFilter (html) {
      console.log(html)
    },
    addPrefix (url) {
      return `//c.diaox2.com${url}`
    }
  }
}
</script>
<style lang="scss" scoped>
  img {
    vertical-align: middle;
  }
  .pagination-bar {
    text-align: center;
    padding: 20px 0;
  }
  .author-card {
    background-color: #fff;
    // padding: 20px;
    color: #8e8e93;
    font-size: 22px;
    line-height: 1.9;
  }
  .author-header {
      line-height: 1;
      border-bottom: 1px solid #e9e9e9;
      span {
        vertical-align: middle;
      }
  }
  .author-avatar {
    margin-right: 12px;
  }
  .author-border {
    border-bottom: 1px solid #e9e9e9;
    padding-bottom: 22px;
  }
  .author-content {
    padding: 20px 0;
    display: flex;
  }
  .author-intro {
    padding-top: 12px;
  }
  .author-title-and-value {
    display: flex;
    flex-direction: column;
    margin: 0 0 0 24px;
    justify-content: space-around;
    h1 {
      font-size: 28px;
      color: #616368;
      line-height: 1;
    }
    p {
      font-size: 22px;
      line-height: 1.4;
    }
  }
</style>
