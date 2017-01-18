<template>
 <div class="page-edit"
    v-loading.fullscreen.lock="loading"
    element-loading-text="正在保存中...">
    <panel title="操作" closeable close class="panel">
      <span slot="panel-heading-middle">
        <el-button type="warning" size="small" icon="delete" @click="clearCache">清空缓存</el-button>
        <el-button type="success" size="small" icon="upload" @click="save">保存</el-button>
      </span>
      <div slot="panel-body" class="panel-body">
        <el-upload
          action="//jsonplaceholder.typicode.com/posts/"
          type="drag"
          :multiple="true">
          <i class="el-icon-upload"></i>
          <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </panel>
    <div class="editor-area">
      <raw-editor class="raw-editor" :class="{'left-small': leftSmall}"></raw-editor>
      <render-editor class="render-editor" :class="{'right-small': rightSmall}"></render-editor>
      <max-window @open="open"></max-window>
    </div>
 </div>
</template>
<script>
import RawEditor from '../components/RawEditor'
import RenderEditor from '../components/RenderEditor'
import Panel from '../components/Panel'
import MaxWindow from '../components/MaxWindow'

export default {
  // name: 'hello', // 叫hello也没关系
  components: {
    RawEditor,
    RenderEditor,
    Panel,
    MaxWindow
  },

  data () {
    return {
      loading: false,
      leftSmall: false,
      rightSmall: false
    }
  },

  methods: {
    open (which) {
      console.log(which)
      if (which === 'left'){
          this.rightSmall = true
          this.leftSmall = false
      }else if (which === 'right') {
          this.leftSmall = true
          this.rightSmall = false
      } else {
        this.leftSmall = false
        this.rightSmall = false
      }
    },

    clearCache () {
      this.$confirm('此操作将删除本篇文章在本地的缓存，是否继续?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '缓存删除成功'
        })
      })
    },

    save () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        // this.$notify({
        //   title: '成功',
        //   message: '这是一条成功的提示消息',
        //   type: 'success'
        // })
        this.$message({
          type: 'success',
          message: '文章保存成功'
        })
      }, 1000)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

 .page-edit {
   padding: 10px;
   height: 100%;
 }

 .editor-area {
   height: 100%;
   display: flex;
   background: #f7f7f7;
 }

 .raw-editor {
   margin-right: 10px;
 }

 .raw-editor, .render-editor {
   flex: 7;
   transition: all .2s ease-in-out;
  // width: 100%;
 }

 .render-editor {
   flex: 6;
 }

 .left-small, .right-small {
   flex: 0;
   padding: 0;
   margin: 0;
 }

 .el-button {
   margin-left: 10px;
   color: #fff;
   font-family: 'Microsoft Yahei';
 }

 .panel-body {
   padding: 15px;
 }
</style>
