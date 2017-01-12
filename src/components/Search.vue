<template>
  <div class="component-search">
    <el-input placeholder="输入文章ID或文章title" class="el-input" v-model="search">
      <el-select v-model="select" slot="prepend" placeholder="请选择" clearable>
        <el-option label="类型" value="ctype"></el-option>
        <el-option label="作者" value="author"></el-option>
      </el-select>
      <el-button slot="append" icon="search"></el-button>
    </el-input>
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

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
