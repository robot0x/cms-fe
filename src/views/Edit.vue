<template>
<div class="page-edit" v-loading.fullscreen.lock="loading" element-loading-text="正在保存中...">
  <!-- 如果被锁了，也就不必显示操作区了 -->
  <panel title="操作" closeable class="panel" v-if="!locked">

    <span slot="panel-heading-middle">
      <el-button type="success" size="small" icon="upload" @click="save">保存</el-button>
      <el-button type="info" size="small" @click="releaseLock">解除锁定</el-button>
      <el-button type="danger" size="small" icon="delete" @click="clearCache">清空缓存</el-button>
    </span>

    <div slot="panel-body" class="panel-body">
      <el-row>
        <el-form label-width="130px" ref="formData">
          <el-col :span="10">
            <el-form-item label="作者" prop="author">
              <el-input v-model="author"></el-input>
            </el-form-item>

            <el-form-item label="分享到的标题" prop="share_title">
              <el-input v-model="share_title" placeholder="文章分享出去显示出的标题，若不填，默认是文章标题" @input.native="share_titleInput"></el-input>
            </el-form-item>

            <el-form-item label="分享到微信的标题" prop="wx_title">
              <el-input v-model="wx_title" placeholder="文章分享到微信显示出的标题"></el-input>
            </el-form-item>

            <el-form-item label="分享到微博的标题" prop="wb_title">
              <el-input v-model="wb_title" placeholder="文章分享到微博显示出的标题"></el-input>
            </el-form-item>

            <el-form-item label="发布时间">
              <el-date-picker type="date" placeholder="选择发布时间" v-model="timetopublish" style="width: 100%;" :editable="false" format="yyyyMMdd" :clearable="false"></el-date-picker>
            </el-form-item>

            <el-form-item label="类型">
              <el-select v-model="ctype" placeholder="请选择文章类型">
                <el-option v-for="ctype in ctypes" :label="ctype.label" :value="ctype.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="上传图片">
              <el-upload
                action="//z.diaox2.com/view/app/upfornewcms.php"
                drag
                accept="image/*"
                :data="{'id':id}"
                :before-upload="handleBeforeUpload"
                :on-success="handleSuccess"
                :on-error="handleError"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png/gif文件，且不超过500kb<</div>
              </el-upload>
              <!-- <el-upload
                action="http://z.diaox2.com/view/app/upfornewcms.php"
                type="drag"
                accept="image/*"
                :data="{'id':id}"
                :before-upload="handleBeforeUpload"
                :on-success="handleSuccess"
                :on-error="handleError"
                :multiple="true">
                <i class="el-icon-upload"></i>
                <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png/gif文件，且不超过500kb</div>
              </el-upload> -->
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="选择所属标签">
              <el-tree
                ref="tree"
                :data="all_tags"
                :check-strictly="true"
                node-key="id"
                show-checkbox
                :props="{children: 'children',label: 'name'}"
                :default-checked-keys="select_tags"
                @check-change="handleCheckChange">
              </el-tree>
            </el-form-item>

            <el-form-item label="是否可搜">
              <el-checkbox v-model="used_for_search"></el-checkbox>
            </el-form-item>

            <div class="keywords-panel" v-if="used_for_search">
              <el-form-item label="具体品类">
                <el-input v-model="categroy" placeholder="包含同义词（如：指甲剪，指甲钳）" @keyup.native.enter.stop.prevent="addTags('categroy')"></el-input>
                <el-tag v-for="tag in render_categroys" :closable="true" :type="tag.type" @close="removeTag('categroy',tag)"> {{tag.name}} </el-tag>
              </el-form-item>

              <el-form-item label="品牌">
                <el-input v-model="brand" placeholder="品牌" @keyup.native.enter.stop.prevent="addTags('brand')"></el-input>
                <el-tag v-for="tag in render_brands" :closable="true" :type="tag.type" @close="removeTag('brand',tag)"> {{tag.name}} </el-tag>
              </el-form-item>

              <el-form-item label="使用场景">
                <el-input v-model="scene" placeholder="使用场景（如：剪指甲）" @keyup.native.enter.stop.prevent="addTags('scene')"></el-input>
                <el-tag v-for="tag in render_scenes" :closable="true" :type="tag.type" @close="removeTag('scene',tag)"> {{tag.name}} </el-tag>
              </el-form-item>

              <el-form-item label="特别之处">
                <el-input v-model="special" placeholder="特别之处（如：防水，动漫周边，创意）" @keyup.native.enter.stop.prevent="addTags('special')"></el-input>
                <el-tag v-for="tag in render_specials" :closable="true" :type="tag.type" @close="removeTag('special',tag)"> {{tag.name}} </el-tag>
              </el-form-item>

              <el-form-item label="类似产品">
                <el-input v-model="similar" placeholder="类似产品（如：美甲, 瑞士军刀）" @keyup.native.enter.stop.prevent="addTags('similar')"></el-input>
                <el-tag v-for="tag in render_similars" :closable="true" :type="tag.type" @close="removeTag('similar',tag)"> {{tag.name}} </el-tag>
              </el-form-item>
            </div>


            <el-form-item label="是否适合送礼">
              <el-checkbox v-model="used_for_gift"></el-checkbox>
            </el-form-item>

            <div class="gift-panel" v-if="used_for_gift">
              <el-form-item label="场景">
                <el-checkbox-group v-model="scenes">
                  <template v-for="(s,i) in gift.scenes">
                    <el-checkbox :label="i">{{s}}</el-checkbox>
                  </template>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="关系">
                <el-checkbox-group v-model="relations">
                  <template v-for="(r,i) in gift.relations">
                    <el-checkbox :label="i">{{r}}</el-checkbox>
                  </template>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="特点">
                <el-checkbox-group v-model="characters">
                  <template v-for="(c,i) in gift.characters">
                    <el-checkbox :label="i">{{c}}</el-checkbox>
                  </template>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </el-col>
        </el-form>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="images-count" v-if="images && images.length > 0">
            共{{images.length}}张图片
          </div>
          <ul class="image-list">
            <li v-for="(image, index) in images" class="image-item">
              <figure>
                <img :src="image.url" draggable="true" @dragstart.stop="dragstart">
              </figure>
              <figcaption class="image-info">
                <!-- {{image.size | imageSizeFormat}} -->
                <!-- {{image.width | imageWidthAndHeightFormat(image.height)}} -->
                <div class="images-attr">{{image.width | imageWidthAndHeightFormat(image.height)}} &nbsp; {{image.size | imageSizeFormat}}</div>
                <div class="images-oper-tool">
                  <i class="el-icon-view" @click="viewImage(image.url)" title="查看大图"></i>
                  <i class="el-icon-check" @click="insert(index)" title="插入到文章内"></i>
                  <a :href="image.url" target="_blank" title="跳转到图片所在链接"><i class="el-icon-picture"></i></a>
                </div>
                <div class="set-image-type">
                  <!-- 1为封面图（cover） -->
                  <!-- 2为缩略图（thumb） -->
                  <el-button type="primary" size="mini" @click="setImageType(index, 1)">设为封面</el-button>
                  <el-button type="danger" size="mini" @click="setImageType(index, 2)">设为缩略</el-button>
                </div>
              </figcaption>
              <span class="used-label" v-if="image.used"><i class="el-icon-check"></i></span>
              <div class="image-types" v-if="image.types && image.types.length > 0">
                <span v-for="t in image.types" :style="t == 1 ? {'backgroundColor':'#20a0ff'}: {'backgroundColor':'#FF4949'}" :title="t == 1 ? '此图为封面图': '此图为缩略图'"></span>
              </div>
             </li>
            </ul>
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl">
            </el-dialog>
          </el-col>
        </el-row>

      </div>
    </panel>
    <el-alert
      :closable="false"
      :title="lock_by | lockedByFormat"
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
        :id="id"
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
import MaxWindow from '../components/MaxWindow'
import Utils from '../utils/Utils'
import LoginUtils from '../utils/LoginUtils'
import Content from '../service/Content'
import Article from '../service/Article'
import Tags from '../service/Tags'
 // 这个是写在前端的，不用改
import { ctypes } from '../config/content_page_data'
// 这个是写在前端的，不用改
import gift from '../config/gift'
import moment from 'moment'
import _ from 'lodash'
import { mapGetters } from 'vuex'

const defaultData = {
  loading: false,
  leftSmall: false,
  rightSmall: false,
  locked: false,
  lock_by: '',
  dialogVisible: false, // 查看大图的dialog默认是隐藏的
  dialogImageUrl: '',

  used_for_gift: false, // 是否适合送礼。1-适合，0-不适合
  scenes: [],
  relations: [],
  characters: [],

  used_for_search: false, // 是否可搜
  categroy: '',
  render_categroys: [],
  brand: '',
  render_brands: [],
  scene: '',
  render_scenes: [],
  special: '',
  render_specials: [],
  similar: '',
  render_similars: [],

  id: '', // 文章id
  text: '', // 文章图文数据
  insertImage: '', // 要插入文章图片中的图片url
  // formData: {
    author: '', // 作者名
    ctype: 0, // 文章类型
    // tag = ['0', '0-0','0-2', '3', '4-1','4-2'] // 被选中的node-key
    select_tags: [],  // 选中的key。格式跟tag一致
    timetopublish: Date.now(), // 文章发布时间
    wx_title: '', // 分享到微信的标题
    wb_title: '', // 分享到微博的标题
    share_title: '', // 分享到的标题
  // }
  all_tags: [],
  // all_tags,
  ctypes, // 不用改
  gift, // 礼物配置。供用户选择
  // rules,
  images: [] // 用户上传的图片
}
export default {
  components: {
    RawEditor,
    RenderEditor,
    Panel,
    MaxWindow,
    TagTree
  },
  computed: { ...mapGetters(['html']) },
  watch: {
    html ( {md} ) {
      try{
        this.images = this.images.map(image => {
          const { url } = image
          const has = Utils.isUsed(md, url)
          image.used =  (has || (image.types && image.types.length > 0)) ? 1 : 0
          // 进一步确定是否是banner图
          const hasBanner = md.match(/```banner\n(.)+?\s*```/g)
          if(hasBanner && Utils.isUsed(hasBanner[0], url)){
            image.banner = '3'
          }
          return image
        })
      }catch(e){
        console.log(e)
      }
    },

    used_for_gift (val) {
      Content.setContentToLocal(this.id || this.$route.params.id, 'used_for_gift', val)
    },

    scenes (val) {
      if(val && val.length){
        Content.setContentToLocal(this.id || this.$route.params.id, 'scenes', val)
      }
    },

    relations (val) {
      if(val && val.length){
        Content.setContentToLocal(this.id || this.$route.params.id, 'relations', val)
      }
    },

    characters (val) {
      if(val && val.length){
        Content.setContentToLocal(this.id || this.$route.params.id, 'characters', val)
      }
    },

    used_for_search (val) {
      Content.setContentToLocal(this.id || this.$route.params.id, 'used_for_search', val)
    },

    render_categroys (val) {
      Content.setContentToLocal(this.id || this.$route.params.id, 'render_categroys', val)
    },

    render_brands (val) {
      Content.setContentToLocal(this.id || this.$route.params.id, 'render_brands', val)
    },

    render_scenes (val) {
      Content.setContentToLocal(this.id || this.$route.params.id, 'render_scenes', val)
    },

    render_specials (val) {
      Content.setContentToLocal(this.id || this.$route.params.id, 'render_specials', val)
    },

    render_similars (val) {
      Content.setContentToLocal(this.id || this.$route.params.id, 'render_similars', val)
    },

    images (val) {
      if(val && val.length){
        Content.setContentToLocal(this.id || this.$route.params.id, 'images', val)
      }
    },
    share_title (val) {
      if(val && val.trim()){
        Content.setContentToLocal(this.id || this.$route.params.id, 'share_title', val)
      }
    },
    wx_title (val) {
      if(val && val.trim()){
        Content.setContentToLocal(this.id || this.$route.params.id, 'wx_title', val)
      }
    },
    wb_title (val) {
      if(val && val.trim()){
        Content.setContentToLocal(this.id || this.$route.params.id, 'wb_title', val)
      }
    },
    ctype (val) {
      Content.setContentToLocal(this.id || this.$route.params.id, 'ctype', val)
    },
    author (val) {
      if(val && val.trim()){
        Content.setContentToLocal(this.id || this.$route.params.id, 'author', val)
      }
    },
    timetopublish (val) {
      if(val > Date.now()){
        Content.setContentToLocal(this.id || this.$route.params.id, 'timetopublish', val)
      }
    },
    '$route': 'routeChange'
  },
  data() {
    const username = '李彦峰'
    return defaultData
  },
  created() {
    this.loadData(this.$route.params.id)
    Tags.getAllTags().then(all_tags => this.all_tags = all_tags)
  },
  methods: {

    setImageType(index, type) {
      const image = this.images[index]
      if (image.types) {
        if (image.types.indexOf(type) === -1) {
          image.types.push(type)
        } else {
          _.remove(image.types, t => t === type)
        }
      } else {
        image.types = [type]
      }
      if (image.types.length > 0 || Utils.isUsed(this.html.md, image.url)) {
        image.used = 1
      } else {
        image.used = 0
      }
      this.$set(this.images, index, image)
    },

    viewImage (url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },

    removeTag(type, tag) {
      console.log(type, tag);
      const index = this._getIndexByTags(type,tag)
      console.log('index:', index);
      this[`render_${type}s`].splice(index, 1)
    },

    _getIndexByTags(type, tag) {
      return _.findIndex( this[`render_${type}s`],(t) => t.name === tag.name )
    },

    addTags (type) {
      console.log(type)
      console.log(this[`render_${type}s`])
      this[`render_${type}s`] =
        this[`render_${type}s`].concat(
          // 去重，防止一次输入多个相同的keywodrs
          _.union(
            this[type].split(/ +|,|，/).filter(tag => tag.trim()) // 过滤非空的字符串
          ).filter(tag => { // 去重
            const alreadyHasTag = this._getIndexByTags(type, tag) !== -1
            if (alreadyHasTag) {
              this.$message(`「${tag}」已经存在，请不要重复添加`)
            }
            return !alreadyHasTag
          }).map(tag => {
            return {
              name: tag,
              type: 'success'
            }
          })
        )
        this[type] = ''
    },

    routeChange () {
      this.loadData(this.$route.params.id)
    },

    loadData (id, cb) {
      if(id){
        this.id = String(id)
        Content
          .getContent(id)
          .then(content => {
                content = content || {}
                if(!_.isEmpty(content)){
                  this.id = String(content.id || id)
                  this.images = (content.images || []).map(image => {
                    const {type} = image
                    if(type){ image.types = type.split(',') }
                    return image
                  })
                  this.text =  content.text || ''
                  this.author =  content.author || ''
                  this.ctype =  content.ctype || 0
                  this.tag =  content.tag || {}
                  this.timetopublish = content.timetopublish || Date.now()
                  this.wx_title = content.wx_title || ''
                  this.wb_title = content.wb_title || ''
                  this.share_title = content.share_title || ''

                  const { lock_by } = content
                  this.locked = Utils.isLocked(lock_by)
                  this.lock_by = lock_by
                  // gift
                  this.used_for_gift = content.used_for_gift === 1 ? true: false
                  this.scenes = content.scenes || []
                  this.relations = content.relations || []
                  this.characters = content.characters || []

                  // kehywords
                  this.used_for_search = content.used_for_search === 1 ? true: false
                  this.render_categroys = content.render_categroys || []
                  this.render_brands = content.render_brands || []
                  this.render_scenes = content.render_scenes || []
                  this.render_specials = content.render_specials || []
                  this.render_similars = content.render_similars || []
                  this.$nextTick(() => {
                    // this.select_tags = [1,2]
                  })
                  // this.$refs.tree.setCheckedKeys([1,2,3])
                  // tag
                  // this.$refs.tree.setCheckedKeys(content.select_tags || [])
                  // this.select_tags = content.select_tags || []
                  // console.log(content.select_tags)
                  // console.log(this.select_tags)
                  // this.$refs.tree.setCheckedKeys(['1'])
                  // console.log(this.$refs.tree);
                  // console.log(this.$refs.tree.setCheckedKeys);
                } else {
                  // 若根据ID查询不到任何数据，则直接跳转到首页
                  this.$alert(`id为${id}的文章不存在，自动跳转到首页`, '文章不存在', { confirmButtonText: '确定' })
                  this.$router.replace({ name:'content' })
                }
                if(cb && typeof cb === 'function'){
                  cb()
                }
          })
      }
    },

    share_titleInput(){
      this.wx_title = this.wb_title = this.share_title
    },

    insert(index) {
      this.insertImage = ''
      setTimeout(() => {
        this.insertImage = this.images[index].url
      })
    },
    // raw-editor 必须要监听dragover事件，否则safari的drop事件将不会执行（chrome没有这个问题）
    dragover() {
      return false
    },

    drop(event) {
      this.insertImage = event.dataTransfer.getData('src')
    },

    dragstart(event) {
      event.dataTransfer.setData('src', event.target.src)
    },

    handleBeforeUpload (file){
      if(['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].indexOf(file.type) === -1){
        this.$alert('只能上传格式为jpg/jpeg/png/gif的图片文件', `上传文件格式不符合要求`, { confirmButtonText: '确定' })
        return false
      }
      if( (file.size / 1024) > 500 ){
        this.$alert('上传图片大小不能超过500kb', `上传文件大小不符合要求`, { confirmButtonText: '确定' })
        return false
      }
    },
    handlePreview(file) {
      console.log('handlePreview')
      console.log(file)
    },
    handleRemove(file) {
      console.log('handleRemove')
      console.log(file)
    },
    handleSuccess(res) {
      console.log(res);
      const message = res.msg
      const state = res.state
      if(state !== 'success' ){ // error
        let title = '上传失败'
        try{
          let imageName = res.orginfo.file.name
          this.$alert(message || title, `${res.orginfo.file.name}${title}`, { confirmButtonText: '确定' })
        }catch(e){
          this.$alert(message || e.message, `${title}`, { confirmButtonText: '确定' })
        }
      }else{
        let url = res.url
        if(url){
          if(url.indexOf('//') === -1){
            url = '//' + url
          }
          this.images.push({
             url: url,
             name: res.orginfo.file.name,
             width: res.info[0],
             height: res.info[1],
             size: res.orginfo.file.size
           })
        }
      }
    },
    handleError(file) {
      let title = '上传失败'
      try{
        let imageName = res.orginfo.file.name
        this.$alert(message || title, `${res.orginfo.file.name}${title}`, { confirmButtonText: '确定' })
      }catch(e){
        this.$alert(message || e.message, `${title}`, { confirmButtonText: '确定' })
      }
    },
    handleCheckChange (data, checked, indeterminat) {
      const clickId = data.id
      console.log(clickId);
      if(checked && this.select_tags.indexOf(clickId) === -1){
        this.select_tags.push(clickId)
      }else{
        this.select_tags.splice(_.findIndex(this.select_tags, t => t == clickId ), 1)
      }
      Content.setContentToLocal(this.id || this.$route.params.id, 'select_tags', this.select_tags)
    },
    open(dir) {
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
    clearCache () {
      console.log('保存成功，清空缓存 ...');
      this.$confirm('此操作将删除本篇文章在本地的缓存，并拉取最新数据，是否继续?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const {id} = this
        Utils.clearCache(id)
        this.loadData(id, () => {
          this.$message({
            type: 'success',
            message: '缓存删除成功'
          })
        })
      })
    },
    releaseLock () {
      this.$confirm('此操作将退出编辑界面且回到首页, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Article
        .releaseLock(this.id)
        .then(res => {
          this.$router.replace({name: 'content'})
        })
      })
    },
    save() {
      // return console.log(this.images)
      this.loading = true
      // 从VM中提取数据
      let {
        ctype,
        author,
        select_tags,
        timetopublish,
        share_title,
        wx_title,
        wb_title,
        images,
        id,

        gift,
        used_for_gift,
        scenes,
        relations,
        characters,

        used_for_search,
        render_categroys,
        render_brands,
        render_scenes,
        render_specials,
        render_similars,

        html
      } = this
      let { title } = html
      let last_update_by = LoginUtils.getUsername()
      if(!title){
        this.loading = false
        return this.$alert('请在文章编辑区填写标题，格式为: # 文章标题', '标题未填写', { confirmButtonText: '确定' })
      }
      // 数据合法性验证
      if(!author){
        this.loading = false
        return this.$alert('必须填写作者', '作者未填写', { confirmButtonText: '确定' })
      }

      console.log(select_tags);

      if(!Utils.isValidArray(select_tags)){
        // this.loading = false
        // return this.$alert('必须选择所属标签', '未选择所属标签', { confirmButtonText: '确定' })
      }
      /**
        `aid`
        `url`
        `used`
        `type`
        `origin_filename`
        `extension_name`
        `size`
        `width
        `height`
       */
      let images_handled = images.map(image => {
        // 1-cover图-封面图/2-thumb图-缩略图/3-banner图/4-文章内容图。存储以逗号隔开的字符串，例如：1,2,4 即这张图片的类型为cover图 & thumb图 & 内容图
        const types = [...(image.types || [])]
        if(image.banner){
          if(types && types.length){
            types.push('3')
          } else {
            image.types = ['3']
          }
        }

        // 如果图片被使用过，并且不是banner类型也不是cover和thumb类型的，那么它就是文章的内容图片
        if(image.isUsed && !image.banner && types.length === 0 ){
          image.types = ['4']
        }
        const ret =  {
          id: Number(image.id || 0), // 图片的id
          aid: Number(id || 0),
          url: image.url,
          type: types.join(','),
          used: image.used,
          origin_filename: image.name || '',
          // origin_filename: 'image',
          extension_name: Utils.getExtensionName(image.name) || '',
          size: image.size,
          width: image.width,
          height: image.height
        }
        const isModify = Utils.isModify(image, images) ? 1 : 0
        console.log('isModify:', Utils.isModify(ret, images));
        ret.isModify = isModify
        console.log(ret);
        console.log(images);
        return ret
      })
      // return console.log(images_handled)
      // console.log(gift);
      const postData = {
        id,
        meta: {
          title,
          share_title,
          wx_title,
          wb_title,
          author,
          ctype,
          lock_by: '',
          last_update_by,
        },
        images: images_handled,
        content: this.html.md,
        gift: {
          used_for_gift: used_for_gift === true? 1 : 0,
          hints: (() => {
            const temp = {
              scenes: scenes.join(' '),
              relations: relations.join(' '),
              characters: characters.join(' ')
            }
            if (!temp.scenes){
              delete temp.scenes
            }
            if (!temp.relations){
              delete temp.relations
            }
            if (!temp.characters){
              delete temp.characters
            }
            if( _.isEmpty(temp)){
              return ''
            }else{
              return JSON.stringify(temp)
            }
          })()
        },
        keywords: {
          used_for_search: used_for_search === true? 1 : 0,
          keywords: (() => {
            const temp = {
              categroys: render_categroys.map(categroy => categroy.name).join(' '),
              brands: render_brands.map(brand => brand.name).join(' '),
              scenes: render_scenes.map(brand => brand.name).join(' '),
              specials: render_specials.map(brand => brand.name).join(' '),
              similars: render_similars.map(brand => brand.name).join(' '),
            }
            if (!temp.categroys){
              delete temp.categroys
            }
            if (!temp.brands){
              delete temp.brands
            }
            if (!temp.scenes){
              delete temp.scenes
            }
            if (!temp.specials){
              delete temp.specials
            }
            if (!temp.similars){
              delete temp.similars
            }
            if( _.isEmpty(temp)){
              return ''
            }else{
              return JSON.stringify(temp)
            }
          })()
        },
        tags: Utils.splitTags(select_tags, this.all_tags)
      }

      console.log("作者：", author)
      console.log("分享到标题：", share_title)
      console.log("微信标题：", wx_title)
      console.log("微博标题：", wb_title)
      console.log("类型：", ctype)
      console.log("发布时间：", timetopublish)

      Content.save(postData).then(res => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '文章保存成功'
        })
        Utils.clearCache(id)
      }).catch( message => {
        this.loading = false
        console.log(message)
        this.$notify({ message: message, type: 'error' })
      })
      // setTimeout(() => {
      //   this.loading = false
        // this.$message({
        //   type: 'success',
        //   message: '文章保存成功'
        // })
      // }, 1000)
      // 保存成功的话，清空本地缓存数据

    }
  },
  filters: {
    lockedByFormat(locked) {
      return `此文已被 ${locked} 锁住...`
    },
    imageSizeFormat (size) {
      return Math.ceil(size / 1024) + 'kb'
    },
    imageWidthAndHeightFormat (width, height) {
      let ret = ''
      if(width && height){
        ret = width + ' X ' + height
      }
      return ret
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.images-count {
  margin-bottom: 10px;
}
// image-list start
.image-list {
    display: flex;
    flex-wrap: wrap;
    .image-item {
      margin: 0 30px 30px 0;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      border-radius: 6px;
      // background-color: #f6f5f5;
      position: relative;
      img {
          height: 160px;
      }
      .image-info {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        // cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 14px;
        background-color: rgba(0,0,0,.7);
        transition: opacity .3s;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      .images-attr {
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
      }
      .images-oper-tool {
        font-size: 17px;
        .el-icon-check {
          margin-left: 20px;
        }
        a {
          text-decoration: none;
          color: #fff;
          margin-left: 20px;
        }
      }
      .set-image-type {
        position: absolute;
        bottom: 20px;
      }
      .image-types {
        position: absolute;
        bottom: 10px;
        right: 10px;
        span {
          display: block;
          width: 10px;
          height: 10px;
          float: left;
        }
        & span:first-child{
          margin-right: 10px;
        }
      }

      &:hover {
        .image-info {
          opacity: 1;
        }
      }
      .used-label {
        position: absolute;
        right: -15px;
        top: -6px;
        width: 40px;
        height: 24px;
        background: #13ce66;
        text-align: center;
        transform: rotate(45deg);
        box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
        i {
          font-size: 12px;
          margin-top: 11px;
          transform: rotate(-45deg) scale(.8);
          color: #fff;
        }
      }
    }
}


.clearfix:after {
    display: table;
    clear: both;
}

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

.raw-editor,
.render-editor {
    flex: 7;
    transition: all 0.2s ease-in-out;
    // width: 100%;
}

.render-editor {
    flex: 6;
}

.left-small,
.right-small {
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

.keywords-panel, .gift-panel {
  border: 1px #20A0FF solid;
  padding: 20px 0;
  margin-bottom: 20px;
}
</style>
