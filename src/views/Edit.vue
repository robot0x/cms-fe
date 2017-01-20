<template>
 <div class="page-edit"
    v-loading.fullscreen.lock="loading"
    element-loading-text="正在保存中...">
    <!-- 如果被锁了，也就不必显示操作区了 -->
    <panel title="操作" closeable  class="panel" v-if="!locked">
      <span slot="panel-heading-middle">
        <el-button type="warning" size="small" icon="delete" @click="clearCache">清空缓存</el-button>
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
          <el-col :span="9">
            <el-input v-model="keyword" placeholder="请输入文章关键字，多个关键字用空格或逗号隔开" @keyup.native.enter.stop.prevent="addKeywords"></el-input>
            <el-tag v-for="keyword in keywords" :closable="true" :type="keyword.type" @close="removeTag(keyword)"> {{keyword.name}} </el-tag>

            <!-- <el-select v-model="value" placeholder="请选择tag">
              <el-option
                v-for="item in options"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select> -->

          </el-col>
          <el-col :span="9" class="el-col-end">
            <el-select v-model="ctype" placeholder="请选择文章类型">
              <el-option
                v-for="ctype in ctypes"
                :label="ctype.label"
                :value="ctype.value">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
    </panel>
    <el-alert
      :closable="false"
      :title="lockTitle"
      v-if="locked"
      type="error">
    </el-alert>
    <div class="editor-area">
      <raw-editor class="raw-editor" :class="{'left-small': leftSmall}" :locked="locked"></raw-editor>
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
import lodash from 'lodash'
export default {
  // name: 'hello', // 叫hello也没关系
  components: {
    RawEditor,
    RenderEditor,
    Panel,
    MaxWindow
  },

  methods: {
    removeTag (keyword) {
      this.keywords.splice(this._getIndexByKeywords(keyword), 1)
    },
    _getIndexByKeywords (keyword) {
      let findFn = null
      if(_.isPlainObject(keyword)){
        findFn = (key) => key.name === keyword.name
      } else {
        findFn = (key) => key.name === keyword
      }
      return _.findIndex(this.keywords, findFn)
    },
    _addType (arr) {
      return arr.map( item => {
        item.type = 'primary'
        return item
      })
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
                  this.$message(`「${keyword}」已经存在，请不要重复添加`);
                }
                return !alreadyHasKeyword
              })
              .map(
                keyword => {
                  return {
                    name: keyword,
                    type: 'success'
                  }
              }
            )
      )
      this.keyword = ''
    },

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
  },

  data () {
    const authorName = '李彦峰'
    return {
      loading: false,
      leftSmall: false,
      rightSmall: false,
      // 文章是否被锁住的flag
      locked: false,
      lockTitle: `此文已被${authorName}锁住...`,
      keyword: '',
      keywords: this._addType([
         { name: '好物'},
         { name: '电脑'},
         { name: '支架'},
         { name: '天王盖地虎'},
         { name: '宝塔震河妖'}
       ]),
       ctype: '',
       ctypes: [
         {label: '好物', value: 0},
         {label: '专刊', value: 1},
         {label: '专题', value: 2},
         {label: '首页', value: 3},
         {label: '测评', value: 4},
         {label: '长文', value: 5},
       ]
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
</style>
