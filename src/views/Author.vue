<template>
 <div class="page-author">
   <!-- <div class="author-card">
     <div class="author-header author-border"><img :src="srcfrom" width="34" height="32" class="author-avatar"><span>作者</span></div>
     <div class="author-content">
       <img :src="authorCard.pic_uri" width=100 height=100>
       <div class="author-title-and-value">
         <h1>{{authorCard.title}}</h1>
         <p>{{authorCard.value}}</p>
       </div>
     </div>
     <p class="author-intro">
       简介： {{authorCard.intro}}
     </p>
   </div> -->
   <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column label="pic_uri">
      <template scope="scope">
        <img :src="scope.row.pic_uri" width="80" height="80" alt="scope.row.title">
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
          <!-- <el-button
            icon="edit"
            size="small"
            @click="handleEdit(scope.$index, scope.row)">查看</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination-bar">
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
import tableData from './authors'
import srcfrom from '../assets/srcfrom.png'
export default {
  components: {},
  computed: {
    offset () {
      return this.pageSize * (this.currentPage - 1)
    }
  },
  data () {
    return {
      srcfrom,
      tableData: tableData.map(data => {data.editing = false, data.editText = '编辑'; return data}),
      editing: false,
      pageSize: 50,
      currentPage: 1,
      pageSize: 50, // 一页50条
      total: tableData.length
      // ,authorCard: {
      //   pic_uri: 'http://z.diaox2.com/cms/diaodiao/people/zrj.jpg',
      //   source: '开山怪',
      //   title: '开山怪',
      //   value: '不约',
      //   intro: '猎天下奇，会天下友，扯三句淡，粗两句口。迷失在：脑洞 + 节操 = 定值　的天赋树方程里。'
      // }
    }
  },
  created () {

  },
  methods: {
    handleSizeChange () {

    },
    handleCurrentChange () {

    },
    handleEdit (index, row) {
      console.log(row)
      const { editing } = row
      if(!editing){
        // save
        
        row.editText = '保存'
      } else {
        row.editText = '编辑'
      }
      row.editing = !editing
    }
  }
}
</script>
<style lang="scss" scoped>
  .pagination-bar {
    text-align: center;
    padding: 20px 0;
  }
  .author-card {
    background-color: #fff;
    padding: 20px;
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
    display: flex;
  }
  .author-title-and-value {
    margin-top: 40px;
    h1 {
      line-height: 1;
    }
  }
</style>
