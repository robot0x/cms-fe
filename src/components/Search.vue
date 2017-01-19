<template>
  <div class="component-search">
    <el-input placeholder="输入文章ID或文章title" class="el-input" v-model="search">
      <el-select v-model="select" slot="prepend" placeholder="请选择" clearable>
        <el-option label="类型" value="ctype"></el-option>
        <el-option label="作者" value="author"></el-option>
      </el-select>
      <el-button slot="append" icon="search"></el-button>
    </el-input>
    <el-button type="primary" icon="plus" @click="newArticle" class="new-article">新建文章</el-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      search: '',
      select: '',
      placeholder: '输入文章ID或文章title'
    }
  },
  methods: {
    newArticle () {
      // alert('newArticle')
      console.log(this.$route)
      // this.$route.push('edit')
      console.log(this.$router)
      // 默认跳转到无参数 edit 视图
      this.$router.push({ name: 'edit0' })
    }
  }
}
</script>
<style scoped>
  .el-select {
     width: 100px;
   }
  .component-search{
    padding: 24px;
    border: 1px solid #eaeefb;
    border-radius: 4px;
  }
  .el-input{
    width: 50%;
  }
  .new-article {
    margin-left: 10px;
  }
</style>
