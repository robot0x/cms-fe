<template>
 <div class="page-edit"
    v-loading.fullscreen.lock="loading"
    element-loading-text="正在保存中...">
    <!-- 如果被锁了，也就不必显示操作区了 -->
    <panel title="操作" closeable close class="panel" v-if="!locked">
      <span slot="panel-heading-middle">
        <el-button type="success" size="small" icon="upload" @click="save">保存</el-button>
      </span>
      <div slot="panel-body" class="panel-body">
        <el-row>
          <el-col :span="6">
            <el-upload
              action="//jsonplaceholder.typicode.com/posts/"
              type="drag"
              :multiple="true">
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
          <el-col :span="6">
            <div style="text-align:left;">
              <el-input v-model="keyword" placeholder="请输入文章关键字，多个关键字用空格或逗号隔开" @keyup.native.enter.stop.prevent="addKeywords"></el-input>
              <el-tag v-for="keyword in keywords" :closable="true" :type="keyword.type" @close="removeTag(keyword)"> {{keyword.name}} </el-tag>
            </div>
          </el-col>
          <el-col :span="6" class="el-col-end">
            类型：
            <el-select v-model="ctype" placeholder="请选择文章类型">
              <el-option
                v-for="ctype in ctypes"
                :label="ctype.label"
                :value="ctype.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <tag-tree></tag-tree>
          </el-col>
        </el-row>
      </div>
    </panel>
    <el-alert
      :closable="false"
      :title="lockedBy | lockedByFormat"
      v-if="locked"
      type="error">
    </el-alert>
    <div class="editor-area">
      <raw-editor class="raw-editor" :class="{'left-small': leftSmall}" :locked="locked" :content="text"></raw-editor>
      <render-editor class="render-editor" :class="{'right-small': rightSmall}"></render-editor>
      <max-window @open="open"></max-window>
    </div>
 </div>
</template>
<script>
import RawEditor from '../components/RawEditor'
import TagTree from '../components/TagTree'
import ContentForm from '../components/ContentForm'
import RenderEditor from '../components/RenderEditor'
import Panel from '../components/Panel'
import Content from '../service/Content'
import MaxWindow from '../components/MaxWindow'
import lodash from 'lodash'
export default {
  // name: 'hello', // 叫hello也没关系
  components: {
    RawEditor,
    RenderEditor,
    Panel,
    MaxWindow,
    TagTree,
    ContentForm
  },
  created () {
    Content.getContent(this.$route.params.id)
    .then(content => {
      console.log(content.tags);
      _.extend(this, content)
    })
  },
  methods: {
    handleNodeClick () {

    },
    handleCheckChange () {

    },
    removeTag (keyword) {
      this.keywords.splice(this._getIndexByKeywords(keyword), 1)
    },
    _getIndexByKeywords (keyword) {
      return _.findIndex(
        this.keywords,
        _.isPlainObject(keyword)? (key) => key.name === keyword.name : (key) => key.name === keyword
      )
    },
    addKeywords () {
      this.keywords =
        this.keywords.concat(
          this.keyword
              .split(/ +|,|，/)
              .filter(keyword => keyword.trim()) // 过滤非空的字符串
              .filter(keyword => { // 去重
                const alreadyHasKeyword = this._getIndexByKeywords(keyword) !== -1
                if(alreadyHasKeyword){
                  this.$message(`「${keyword}」已经存在，请不要重复添加`)
                }
                return !alreadyHasKeyword
              }).map( keyword => { return { name: keyword, type: 'success' } } )
      )
      this.keyword = ''
    },

    open (dir) {
      switch (dir) {
        case 'left':
          this.rightSmall = true
          this.leftSmall = false
          break;
        case 'right':
          this.leftSmall = true
          this.rightSmall = false
          break;
        default:
          this.leftSmall = false
          this.rightSmall = false
      }
    },
    // 没必要，全选删除即可
    // clearCache () {
    //   this.$confirm('此操作将删除本篇文章在本地的缓存，是否继续?', '提示',{
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$message({
    //       type: 'success',
    //       message: '缓存删除成功'
    //     })
    //   })
    // },
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
  },

  data () {
    const authorName = '李彦峰'
    return {
      loading: false,
      leftSmall: false,
      rightSmall: false,
      locked: false,
      keyword: '',
      ctype: '',
      tag: '',
      text: '',
      keywords: [],
      ctypes: [],
      tags: [],
      tagProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  filters: {
    lockedByFormat (locked){
      return `此文已被${locked}锁住...`
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

 .el-tag {
   margin-right: 10px;
   margin-top: 10px;
 }

 .el-col-end {
   padding-left: 10px;
 }
 .el-col {
   text-align: center;
 }

</style>
