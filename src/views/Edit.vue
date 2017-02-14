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
            <div class="images-count">
              共{{images.length}}张图片
            </div>
            <ul class="image-list">
              <li v-for="(image, index) in images">
                <figure>
                  <img :src="image.src" draggable="true" @dragstart.stop="dragstart">
                </figure>
                <div class="image-desc">
                  <figcaption class="image-title">{{image.title}}</figcaption>
                  <p class="image-attr clearfix">
                    <span class="size">{{image.size}}</span>
                    <span class="size2">{{image.size2}}</span>
                  </p>
                </div>
                <div class="images-oper-tool">
                  <el-button type="primary" size="mini" @click="setCover(index)">设为封面图</el-button>
                  <el-button type="success" size="mini" @click="setThumb(index)">设为缩略图</el-button>
                  <el-button type="danger" size="mini" @click="insert(index)">插入</el-button>
                </div>
                <div class="image-types" v-if="image.types && image.types.length > 0">
                  <!-- <span>type: {{image.types? image.types.join(','): ''}}</span> -->
                  <template v-for="type in image.types">
                    <span :style="type === 'cover' ? {'backgroundColor':'#20a0ff'}: {'backgroundColor':'#13ce66'}"></span>
                  </template>
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
        @dragover.native.stop.prevent="dragover"
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
    setCover (index){
      const image = this.images[index]
      const COVER = 'cover'
      if(image.types){
        if(image.types.indexOf(COVER) === -1){
          image.types.push(COVER)
        } else {
          _.remove(image.types, type => type === COVER)
        }
      } else {
        image.types = [COVER]
      }
      this.$set(this.images, index, image)
      // this.images.splice(index, 1, image)
    },
    setThumb (index) {
      const image = this.images[index]
      const THUMB = 'thumb'
      if(image.types){
        if(image.types.indexOf(THUMB) === -1){
          image.types.push(THUMB)
        } else {
          _.remove(image.types, type => type === THUMB)
        }
      } else {
        image.types = [THUMB]
      }
      this.$set(this.images, index, image)
      // this.images.splice(index, 1, image)
    },
    insert (index) {
      this.insertImage = ''
      setTimeout(() => {
        this.insertImage = this.images[index].src
      })
    },
    // raw-editor 必须要监听dragover事件，否则safari的drop事件将不会执行（chrome没有这个问题）
    dragover () { return false },
    drop (event) {
      this.insertImage = event.dataTransfer.getData('src')
    },
    dragstart (event) {
      event.dataTransfer.setData('src', event.target.src)
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
      console.log('handleCheckChange exec ...')
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
  background-color: #f6f5f5;
  position: relative;
  img {
    height: 120px;
  }
  .image-types {
    position: absolute;
    top: 0;
    right: 0;
    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
}

.image-desc {
  font-size: 12px;
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

.images-oper-tool {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
