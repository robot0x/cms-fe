<template>
 <div class="page-edit"
    v-loading.fullscreen.lock="loading"
    element-loading-text="正在保存中...">
    <!-- 如果被锁了，也就不必显示操作区了 -->
    <panel title="操作" closeable class="panel" v-if="!locked">

      <span slot="panel-heading-middle">
        <el-button type="success" size="small" icon="upload" @click="save">保存</el-button>
      </span>

      <div slot="panel-body" class="panel-body">
        <el-form label-width="130px" ref="formData" :model="formData" :rules="rules">
          <el-row>
            <el-col :span="10">
              <el-form-item label="作者" prop="aName">
                <el-input v-model="formData.aName"></el-input>
              </el-form-item>

              <el-form-item label="分享到的标题" prop="shareTitle">
                <el-input v-model="formData.shareTitle" placeholder="文章分享出去显示出的title"></el-input>
              </el-form-item>

              <el-form-item label="分享到微信的标题" prop="wxTitle">
                <el-input v-model="formData.wxTitle" placeholder="文章分享到微信显示出的title"></el-input>
              </el-form-item>

              <el-form-item label="分享到微博的标题" prop="wbTitle">
                <el-input v-model="formData.wbTitle" placeholder="文章分享到微博显示出的title"></el-input>
              </el-form-item>

              <!-- <el-form-item label="title" prop="title" class="title-item">
                <template v-for="title in formData.titles">
                  <el-form-item :label="title.type">
                    <el-input v-model="title.value" style="float:left;width:300px;margin-left:20px;"></el-input>
                  </el-form-item>
                </template>
              </el-form-item> -->

              <el-form-item label="关键词">
                <el-input v-model="keyword" placeholder="请输入文章关键字，多个关键字用空格或逗号隔开" @keyup.native.enter.stop.prevent="addKeywords"></el-input>
                <el-tag v-for="key in formData.keywords" :closable="true" :type="key.type" @close="removeTag(key)"> {{key.name}} </el-tag>
              </el-form-item>

              <el-form-item label="上传图片">
                <el-upload
                  action="http://z.diaox2.com/view/app/upfornewcms.php"
                  type="drag"
                  accept="image/*"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :multiple="true">
                  <i class="el-icon-upload"></i>
                  <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-col>

            <el-col :span="14">
              <el-form-item label="选择所属标签">
                <!-- <tag-tree></tag-tree> -->
                <el-tree
                  :data="tags"
                  show-checkbox
                  :check-strictly="true"
                  :props="{children: 'children',label: 'label'}"
                  @node-click="handleNodeClick"
                  @check-change="handleCheckChange">
                </el-tree>
              </el-form-item>
              <el-form-item label="发布时间">
                <el-date-picker type="date" placeholder="选择发布时间" v-model="formData.timetopublish" style="width: 100%;" :editable="false" format="yyyyMMdd" :clearable="false"></el-date-picker>
              </el-form-item>

              <el-form-item label="类型">
                <el-select v-model="formData.ctype" placeholder="请选择文章类型">
                  <el-option
                    v-for="ctype in ctypes"
                    :label="ctype.label"
                    :value="ctype.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row>
          <el-col :span="24">
            <ul class="image-list">
              <li v-for="image in images">
                <figure> <img :src="image.src" draggable="true" @dragstart.stop="dragstart"> </figure>
                <div class="image-desc">
                  <figcaption class="image-title">{{image.title}}</figcaption>
                  <p class="image-attr clearfix">
                    <span class="size">{{image.size}}</span>
                    <span class="size2">{{image.size2}}</span>
                  </p>
                </div>
              </li>
            </ul>
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
      <raw-editor
        class="raw-editor"
        @drop.native.stop.prevent="drop"
        :insertImage="insertImage"
        :class="{'left-small': leftSmall}"
        :locked="locked"
        :content="text">
      </raw-editor>
      <render-editor class="render-editor" :class="{'right-small': rightSmall}"></render-editor>
      <max-window @open="open"></max-window>
    </div>
 </div>
</template>
<script>
import RawEditor from '../components/RawEditor'
import TagTree from '../components/TagTree'
import RenderEditor from '../components/RenderEditor'
import Panel from '../components/Panel'
import Content from '../service/Content'
import MaxWindow from '../components/MaxWindow'
import {tags, ctypes, rules} from '../config/content_page_data'
import moment from 'moment'
import _ from 'lodash'
import images from '../mocks/images'
export default {
  components: {
    RawEditor,
    RenderEditor,
    Panel,
    MaxWindow,
    TagTree
  },
  watch: {
    'formData.shareTitle': function(val){
        this.formData.wxTitle = this.formData.wbTitle = val
    }
  },
  data () {
    const authorName = '李彦峰'
    console.log(moment().format('YYYYMMDD'));
    return {
      loading: false,
      leftSmall: false,
      rightSmall: false,
      locked: false,
      text: '',
      keyword: '',
      insertImage: '',
      formData: {
        titleType: 'wx',
        aName: '',
        keywords: [],
        ctype: 0,
        tag: '',
        timetopublish: moment().format('YYYYMMDD'),
        wxTitle: '',
        wbTitle: '',
        shareTitle: ''
      },
      ctypes,
      tags,
      rules,
      images
    }
  },
  created () {
    Content
    .getContent(this.$route.params.id)
    .then(content => {
      _.extend(this, content)
    })
  },
  methods: {
    drop (event) {
      const src = event.dataTransfer.getData('src')
      console.log(src);
      this.insertImage = src
    },
    dragstart (event) {
      const src = event.target.src
      event.dataTransfer.setData('src', src)
    },
    handlePreview (file) {
      console.log('handlePreview')
      console.log(file)
    },
    handleRemove (file) {
      console.log('handleRemove')
      console.log(file)
    },
    handleSuccess (file) {
      console.log('handleSuccess')
      console.log(file)
    },
    handleError (file) {
      console.log('handleError')
      console.log(file)
    },
    handleNodeClick (data) {
      console.log('handleNodeClick exec ...')
      console.log(data)
    },
    handleCheckChange (data, checked, indeterminate) {
      console.log('handleCheckChange exec ...');
    },
    removeTag (keyword) {
      this.formData.keywords.splice(this._getIndexByKeywords(keyword), 1)
    },
    _getIndexByKeywords (keyword) {
      return _.findIndex(
        this.formData.keywords,
        _.isPlainObject(keyword)? (key) => key.name === keyword.name : (key) => key.name === keyword
      )
    },
    addKeywords () {
      this.formData.keywords =
        this.formData.keywords.concat(
          // 去重，防止一次输入多个相同的keywodrs
          _.union(
            this.keyword
                .split(/ +|,|，/)
                .filter(keyword => keyword.trim()) // 过滤非空的字符串
          ).filter(keyword => { // 去重
              const alreadyHasKeyword = this._getIndexByKeywords(keyword) !== -1
              if(alreadyHasKeyword){
                this.$message(`「${keyword}」已经存在，请不要重复添加`)
              }
              return !alreadyHasKeyword
          }).map( keyword => { return { name: keyword, type: 'success' } } )
      )
      console.dir(this.keywords)
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
      // 从VM中提取数据
      let {keywords, ctype, aName, tags, timetopublish, shareTitle, wxTitle, wbTitle} = this.formData
      // 处理数据
      keywords = keywords.map(keyword => keyword.name)
      console.log("作者：", aName)
      console.log("分享到标题：", shareTitle)
      console.log("微信标题：", wxTitle)
      console.log("微博标题：", wbTitle)
      console.log("类型：", ctype)
      console.log("发布时间：", timetopublish)
      console.log("keywords:");
      console.log(keywords);
      console.log('tags:');
      console.dir(tags);

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
    },
    addTitle () {

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
// image-list start
.image-list {
  display: flex;
  flex-wrap: wrap;
}
.image-list li{
  margin:0 30px 30px 0;
  cursor: pointer;
  img {
    height: 120px;
  }
}

.image-desc {
  font-size: 12px;
  background-color: #f6f5f5;
}

.image-title {
  font-size: 14px;
  display:block;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.image-attr {
  display: flex;
}

.size2 {
  flex: 1;
  text-align: right;
}

.clearfix:after {
    display: table;
    clear: both;
}

// image-list end

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
