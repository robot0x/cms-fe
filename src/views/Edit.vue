<template>
<div class="page-edit" v-loading.fullscreen.lock="loading" element-loading-text="正在保存中...">
  <!-- 如果被锁了，也就不必显示操作区了 -->
  <!-- <panel title="操作" closeable class="panel" v-if="!locked"> -->
  <panel :title="lock_by | lockedByFormat" closeable class="panel">

    <span slot="panel-heading-middle">
      <el-button type="success" size="small" icon="upload" @click="save" v-if="!locked">保存</el-button>
      <el-button type="info" size="small" @click="releaseLock" v-if="!locked">解除锁定</el-button>
      <el-button type="danger" size="small" icon="delete" @click="clearCache">清空缓存</el-button>
    </span>

    <div slot="panel-body" class="panel-body">
      <el-row>
        <el-form label-width="130px" ref="formData">
          <el-col :span="10">
            <el-form-item label="作者" prop="author">
              <el-input v-model="author" :readonly="locked"></el-input>
            </el-form-item>

            <el-form-item label="标题" prop="title">
              <el-input v-model="title" :readonly="locked"></el-input>
            </el-form-item>

            <!-- 专刊专用 -->
            <el-form-item label="专刊副标题" prop="titleex" v-if="ctype == 3">
              <el-input v-model="titleex" :readonly="locked" placeholder="专刊用。类似于 七个好物、八种经验之类的"></el-input>
            </el-form-item>

            <el-form-item label="分享到的标题" prop="share_title">
              <el-input v-model="share_title" placeholder="文章分享出去显示出的标题，若不填，默认是文章标题" @input.native="share_titleInput" :readonly="locked"></el-input>
            </el-form-item>

            <el-form-item label="分享到微信的标题" prop="wx_title">
              <el-input v-model="wx_title" placeholder="文章分享到微信显示出的标题" :readonly="locked"></el-input>
            </el-form-item>

            <el-form-item label="分享到微博的标题" prop="wb_title">
              <el-input v-model="wb_title" placeholder="文章分享到微博显示出的标题" :readonly="locked"></el-input>
            </el-form-item>

            <el-form-item label="发布时间">
              <el-date-picker type="date" placeholder="选择发布时间" v-model="timetopublish" style="width: 100%;" :editable="false" format="yyyyMMdd" :clearable="false" :readonly="locked"></el-date-picker>
            </el-form-item>

            <el-form-item label="类型">
                <el-select v-model="ctype" placeholder="请选择文章类型" :disabled="locked">
                  <el-option v-for="ctype in ctypes" :label="ctype.label" :value="ctype.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否可搜">
              <el-checkbox v-model="used_for_search"></el-checkbox>
            </el-form-item>

            <div class="keywords-panel" v-if="used_for_search">
              <el-form-item label="具体品类">
                <el-input v-model="categroy" placeholder="包含同义词（如：指甲剪，指甲钳）" @keyup.native.enter.stop.prevent="addTags('categroy')" :readonly="locked"></el-input>
                <el-tag v-for="tag in render_categroys" :closable="!locked" :type="tag.type" @close="removeTag('categroy',tag)"> {{tag.name}} </el-tag>
              </el-form-item>

              <el-form-item label="品牌">
                <el-input v-model="brand" placeholder="品牌" @keyup.native.enter.stop.prevent="addTags('brand')" :readonly="locked"></el-input>
                <el-tag v-for="tag in render_brands" :closable="!locked" :type="tag.type" @close="removeTag('brand',tag)"> {{tag.name}} </el-tag>
              </el-form-item>

              <el-form-item label="使用场景">
                <el-input v-model="scene" placeholder="使用场景（如：剪指甲）" @keyup.native.enter.stop.prevent="addTags('scene')"  :readonly="locked"></el-input>
                <el-tag v-for="tag in render_scenes" :closable="!locked" :type="tag.type" @close="removeTag('scene',tag)"> {{tag.name}} </el-tag>
              </el-form-item>

              <el-form-item label="特别之处">
                <el-input v-model="special" placeholder="特别之处（如：防水，动漫周边，创意）" @keyup.native.enter.stop.prevent="addTags('special')" :readonly="locked"></el-input>
                <el-tag v-for="tag in render_specials" :closable="!locked" :type="tag.type" @close="removeTag('special',tag)"> {{tag.name}} </el-tag>
              </el-form-item>

              <el-form-item label="类似产品">
                <el-input v-model="similar" placeholder="类似产品（如：美甲, 瑞士军刀）" @keyup.native.enter.stop.prevent="addTags('similar')" :readonly="locked"></el-input>
                <el-tag v-for="tag in render_similars" :closable="!locked" :type="tag.type" @close="removeTag('similar',tag)"> {{tag.name}} </el-tag>
              </el-form-item>
            </div>

            <el-form-item label="上传图片" v-if="!locked">
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
                <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png/gif文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="选择所属标签">
              <el-tree
                ref="tree"
                :data="all_tags"
                check-strictly
                node-key="id"
                show-checkbox
                :props="{children: 'children',label: 'name'}"
                :default-checked-keys="select_tags"
                @check-change="handleCheckChange">
              </el-tree>
            </el-form-item>

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
                <img :src="image.url | imageUrlFilter">
              </figure>
              <figcaption class="image-info">
                <div class="images-attr">{{image.width | imageWidthAndHeightFormat(image.height)}}</div>
                <div class="">
                  {{image.size | imageSizeFormat}}
                </div>
                <div class="images-oper-tool">
                  <i class="el-icon-view" @click="viewImage(image.url)" title="查看大图"></i>
                  <i class="el-icon-check" @click="insert(index)" title="插入到文章内"></i>
                  <a :href="image.url | addProtocol" target="_blank" title="跳转到图片所在链接"><i class="el-icon-picture"></i></a>
                </div>
                <div class="set-image-type">
                  <el-button type="primary" size="mini" @click="setImageType(index, 2)">cover</el-button>
                  <el-button type="danger" size="mini" @click="setImageType(index, 4)">coverex</el-button>
                  <el-button type="success" size="mini" @click="setImageType(index, 8)">thumb</el-button>
                </div>
              </figcaption>
              <span class="used-label" v-if="image.used"><i class="el-icon-check"></i></span>
              <!-- <div class="image-types" v-if="image.type && image.type.split(',').filter(t => t == 1 || t == 2).length > 0">
                <span v-for="t in image.type.split(',').filter(t => t == 1 || t == 2)" :style="t == 1 ? {'backgroundColor':'#20a0ff'}: {'backgroundColor':'#FF4949'}" :title="t == 1 ? '此图为封面图': '此图为缩略图'"></span>
              </div> -->
             </li>
            </ul>
            <el-dialog v-model="dialogVisible" size="tiny">
              <img width="100%" :src="dialogImageUrl | addProtocol">
            </el-dialog>
          </el-col>
        </el-row>

      </div>
    </panel>
    <div class="editor-area">
      <!-- <raw-editor
        class="raw-editor"
        @drop.native.stop.prevent="drop"
        @dragover.native.stop.prevent="dragover"
        :insertImage="insertImage"
        :class="{'left-small': leftSmall}"
        :locked="locked"
        :id="id"
        :content="text">
      </raw-editor> -->
      <raw-editor
        class="raw-editor"
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
import _ from 'lodash'
import { mapGetters } from 'vuex'
import moment from 'moment'
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
    title: '', // 文章标题
    titleex: '', // 专刊专用副标题
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
    MaxWindow
  },
  computed: { ...mapGetters(['html']) },
  watch: {
    /**
     * 判断一张图片的类型
     * 如果
     *  图片在md中存在 （has）
     *  有三种可能：
     *  1. 图片是内容图  isContent
     *  2. 图片是banner图 isBanner
     *  3. 图片即是内容图，又是banner图 isBanner && isContent
     */
    html ( {md} ) {
      try{
        const {images} = this
        // if(!_.isEmpty(images)){
        //   this.images = images.map(image => {
        //     let { url, type } = image
        //     // 进一步确定是否是banner图
        //     const bannerReg = /```banner\s*(.|\n)+\s*```/g
        //     const hasBanner = md.match(bannerReg)
        //     // 是否是内容图
        //     const isContent = Utils.isUsed(md.replace(bannerReg, ''), url)
        //     // 是否是banner图
        //     const isBanner = hasBanner && Utils.isUsed(hasBanner[0], url)
        //     if(isContent) {
        //       type = Utils.getNewType(type, '4')
        //     }
        //     if(isBanner){
        //       type = Utils.getNewType(type, '3')
        //     }
        //     image.type = type
        //     // image.used = (isContent || isBanner || type.length > 0) ? 1 : 0
        //     image.used = Utils.getCode(isContent || isBanner || type.length > 0)
        //     return image
        //   })
        // }
      }catch(e){
        console.log(e)
      }
    },

    used_for_gift (val) {
      if(!this.locked){
        // Content.setContentToLocal(this.id || this.$route.params.id, 'used_for_gift',  val? 1 : 0)
        // Content.setContentToLocal(this.id, 'used_for_gift',  val? 1 : 0)
        Content.setContentToLocal(this.id, 'used_for_gift',  Utils.getCode(val))
      }
    },

    scenes (val) {
      if(val && val.length && !this.locked){
        Content.setContentToLocal(this.id, 'scenes', val)
      }
    },

    relations (val) {
      if(val && val.length && !this.locked){
        Content.setContentToLocal(this.id, 'relations', val)
      }
    },

    characters (val) {
      if(val && val.length && !this.locked){
        Content.setContentToLocal(this.id, 'characters', val)
      }
    },
    used_for_search (val) {
      if(!this.locked){
        // Content.setContentToLocal(this.id, 'used_for_search', val? 1 : 0)
        Content.setContentToLocal(this.id, 'used_for_search', Utils.getCode(val))
      }
    },

    render_categroys (val) {
      if(!this.locked && Utils.isValidArray(val)){
        Content.setContentToLocal(this.id, 'render_categroys', val)
      }
    },

    render_brands (val) {
      if(!this.locked && Utils.isValidArray(val)){
        Content.setContentToLocal(this.id, 'render_brands', val)
      }
    },

    render_scenes (val) {
      if(!this.locked && Utils.isValidArray(val)){
        Content.setContentToLocal(this.id, 'render_scenes', val)
      }
    },

    render_specials (val) {
      if(!this.locked && Utils.isValidArray(val)){
        Content.setContentToLocal(this.id, 'render_specials', val)
      }
    },

    render_similars (val) {
      if(!this.locked && Utils.isValidArray(val)){
        Content.setContentToLocal(this.id, 'render_similars', val)
      }
    },

    images (val) {
      if(!this.locked && Utils.isValidArray(val)  ){
        Content.setContentToLocal(this.id, 'images', val)
      }
    },
    share_title (val) {
      if(!this.locked && Utils.isValidString(val) ){
        Content.setContentToLocal(this.id, 'share_title', val)
      }
    },
    wx_title (val) {
      if(!this.locked && Utils.isValidString(val)){
        Content.setContentToLocal(this.id, 'wx_title', val)
      }
    },
    wb_title (val) {
      if(!this.locked && Utils.isValidString(val)){
        Content.setContentToLocal(this.id, 'wb_title', val)
      }
    },
    ctype (val) {
      if(!this.locked){
        Content.setContentToLocal(this.id, 'ctype', val)
      }
    },
    author (val) {
      if(!this.locked && Utils.isValidString(val)){
        Content.setContentToLocal(this.id, 'author', val)
      }
    },
    timetopublish (val) {
      if(!this.locked &&  val > Date.now()){
        Content.setContentToLocal(this.id, 'timetopublish', val)
      }
    }
    // ,'$route': 'routeChange'
  },
  data() {
    return defaultData
  },
  created () {
    console.log('Edit.vue created exec ...')
    this.loadData(this.$route.params.id)
    Tags.getAllTags().then(all_tags => {
      this.all_tags = all_tags
      // console.log(all_tags);
    })
  },
  methods: {
    setImageType(index, code) {
      const image = this.images[index]
      // image.type = types.length > 0 ? types.join(',') : ''
      image.type = Utils.getNewType(image.type, code, true)
      // 当image.type的长度为0时，不能简单地认为这张图片没有被使用
      // 而应该看看是否在markdown中存在
      image.used = Utils.getCode(image.type.length || Utils.isUsed(this.html.md, image.url))
      this.$set(this.images, index, image)
    },

    viewImage (url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },

    removeTag(type, tag) {
      console.log(type, tag)
      const index = this._getIndexByTags(type,tag)
      console.log('index:', index)
      this[`render_${type}s`].splice(index, 1)
    },

    _getIndexByTags(type, tag) {
      return _.findIndex( this[`render_${type}s`], t => t.name === tag.name )
    },

    addTags (type) {
      const array = this[`render_${type}s`] || []
      this[`render_${type}s`] =
        array.concat(
          // 去重，防止一次输入多个相同的keywords
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

    // routeChange () {
    //   console.log('routeChange exec ...');
    //   this.loadData(this.$route.params.id)
    // },

    loadData (id, cb) {
      // console.log('Edit.vue loadData exec id is :', id);
      if(id){
        this.id = String(id)
        Content
          .getContent(id)
          .then(content => {
                console.log('[Edit.vue.loadData] 数据：', content)
                if(!_.isEmpty(content)){
                  let {
                    images,
                    text,
                    author,
                    ctype,
                    tag,
                    timetopublish,
                    title,
                    wx_title,
                    wb_title,
                    share_title,
                    lock_by,
                    // 礼物搜索
                    used_for_gift,
                    scenes,
                    relations,
                    characters,
                    // 是否可搜
                    used_for_search,
                    render_categroys,
                    render_brands,
                    render_scenes,
                    render_specials,
                    render_similars
                  } = content
                  this.images = images
                  timetopublish = new Date(moment(timetopublish, 'YYYYMMDD'))
                  console.log('timetopublish:', timetopublish)
                  this.text = text
                  this.author = author
                  this.ctype = ctype
                  this.tag = tag
                  this.timetopublish = timetopublish || Date.now()
                  this.title = title
                  this.wx_title = wx_title
                  this.wb_title = wb_title
                  this.share_title = share_title

                  this.locked = Utils.isLocked(lock_by)
                  this.lock_by = lock_by
                  // gift
                  this.used_for_gift = Utils.getBoolean(used_for_gift)
                  this.scenes = scenes || []
                  this.relations = relations || []
                  this.characters = characters || []
                  // kehywords
                  this.used_for_search = Utils.getBoolean(used_for_search)
                  this.render_categroys = render_categroys
                  this.render_brands = render_brands
                  this.render_scenes = render_scenes
                  this.render_specials = render_specials
                  this.render_similars = render_similars
                } else {
                  // 若根据ID查询不到任何数据，则直接跳转到首页
                  this.$alert(`id为${id}的文章不存在，自动跳转到首页`, '文章不存在', { confirmButtonText: '确定' })
                  this.$router.replace({ name:'content' })
                }
                if(/function/.test(typeof cb)){
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
      setTimeout(() => { this.insertImage = this.images[index].url })
    },
    // raw-editor 必须要监听dragover事件，否则safari的drop事件将不会执行（chrome没有这个问题）
    // dragover() {
    //   return false
    // },
    // drop(event) {
    //   this.insertImage = event.dataTransfer.getData('src')
    // },
    // dragstart(event) {
    //   event.dataTransfer.setData('src', event.target.src)
    // },

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
    // handlePreview(file) {
    //   console.log('handlePreview')
    //   console.log(file)
    // },
    // handleRemove(file) {
    //   console.log('handleRemove')
    //   console.log(file)
    // },
    handleSuccess(res) {
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
      if(!this.locked){
        const clickId = data.id
        console.log(clickId);
        if(checked && this.select_tags.indexOf(clickId) === -1){
          this.select_tags.push(clickId)
        }else{
          this.select_tags.splice(_.findIndex(this.select_tags, t => t == clickId ), 1)
        }
        Content.setContentToLocal(this.id || this.$route.params.id, 'select_tags', this.select_tags)
      }
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
      console.log('清空缓存 ...')
      // 清空缓存并加载数据有bug
      // 1. 第一次进来时，没有缓存，从服务端加载数据，没有问题
      // 2. 点击 “清空缓存”，缓存被清理，从新拿数据，从服务端拿到的数据中是有text的，但是却没有缓存到本地
      //
      this.$confirm('此操作将删除本篇文章在本地的缓存，并拉取最新数据，是否继续?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { id } = this
        Utils.clearCache(id)
        window.location.reload()
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

      // console.log(select_tags);
      // return this.loading = false;
      /**
       * [{
       *
       * }]
       */
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
      let images_handled = []
      if(!_.isEmpty(images)){
        images_handled = images.map(image => {
          // 1-cover图-封面图/2-thumb图-缩略图/3-banner图/4-文章内容图。存储以逗号隔开的字符串，例如：1,2,4 即这张图片的类型为cover图 & thumb图 & 内容图
          const ret =  {
            // `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增id',
            // `aid` int(11) unsigned NOT NULL COMMENT '文章的id',
            // `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '图片url',
            // `used` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '是否被使用。0-未被使用/1-被使用',
            // `type` smallint unsigned COMMENT '图片的类型。''0未设置类型（没有被使用/第1位-内容图(1)/第2位cover图(2)/第3位coverex图(4)/第4位thumb图(8)/第5位swipe图(16)/第6位banner图(32)', -- 12 封面图 缩略图
            // `origin_filename` varchar(32) DEFAULT '' COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '上传时的文件名',
            // `extension_name` varchar(10) DEFAULT '' COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '图片扩展名，jpg/jpeg/png/gif...',
            // `size` int unsigned NOT NULL DEFAULT 0 COMMENT '图片尺寸。单位为byte',
            // `width` smallint(4) unsigned NOT NULL DEFAULT 0 COMMENT '上传时的原始宽度。单位为px',
            // `height` smallint(4) unsigned NOT NULL DEFAULT 0 COMMENT '上传时的原始高度。单位为px',
            // `alt` varchar(32) DEFAULT '' COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'img的alt属性',
            // `title` varchar(32) DEFAULT '' COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'img的title属性',
            // `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '图片上传时间',
            id: Number(image.id || 0), // 图片的id
            aid: Number(id || 0),
            url: image.url,
            used: image.used,
            type: image.type, // 1 => content, 2 => cover, 4 => coverex, 8 => thumb, 16 => swipe, 32 => banner, ....
            origin_filename: image.name || '',
            extension_name: Utils.getExtensionName(image.name),
            size: image.size,
            width: image.width,
            height: image.height,
            // alt: image.alt, // 目前可以不写
            // title: image.title // 目前可以不写
          }
          // ret.isModify = Utils.isModify(image, images) ? 1 : 0
          ret.isModify = Utils.getCode(Utils.isModify(image, images))
          console.log('isModify:', ret.isModify)
          return ret
        })
      }

      // return console.log(images_handled)
      // console.log(gift);
      const postData = {
        id,
        meta: {
          // `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增id',
          // `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '文章title',
          // `share_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '分享出去的文章的title',
          // `wx_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '分享到微信的文章的title',
          // `wb_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '分享到微博的文章的title',
          // `ctype` tinyint(1) unsigned DEFAULT 0 COMMENT '文章类型：1-首页/2-好物/3-专刊/4-活动/5-经验/7-值得买/8-评测/9-专题',
          // `titleex` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '专刊专用。在专刊上显示 七个好物、八种经验之类的',
          // `titlecolor` int(32) unsigned DEFAULT 0 COMMENT '专刊专用。用来指定标题颜色',
          // `buylink` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '分享出去的文章的title',
          // `timetopublish` int(10) unsigned DEFAULT 0 COMMENT '定时发布。格式是UNIX时间戳',
          // `price` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '价格串。形如：越￥360',
          // `status` tinyint(1) unsigned NOT NULL DEFAULT 0 COMMENT '当前文章状态: 0-新增的文章/1-已发布/2-未发布',
          // `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '文章创建时间',
          // `last_update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON update CURRENT_TIMESTAMP COMMENT '文章最后更新时间',
          // `user` varchar(60) DEFAULT '' COMMENT '文章被那个用户所创建',
          // `lock_by` varchar(60) DEFAULT '' COMMENT '被那个用户锁定',
          // `last_update_by` varchar(60) DEFAULT '' COMMENT '最后一次更新的用户',
          // `author` varchar(60) DEFAULT '' COMMENT '文章作者姓名',
          title,
          share_title,
          wx_title,
          wb_title,
          ctype,
          // titleex, // 需要，专刊专有属性
          // titlecolor, // 不需要，使用默认值即可
          // buylink, // 需要填写
          // timetopublish, // 需要填写
          // price, // 需要填写
          // status, // 不需要，使用默认值即可
          // create_time, // 不需要，使用mysql的自动插值
          // last_update_time, // 不需要，使用mysql的自动插值
          // user, // 不需要，在创建这篇文章时就已经有值，且值不会变
          lock_by: '',
          last_update_by,
          author
        },
        images: images_handled,
        content: this.html.md,
        // "gift": { "used_for_gift": 1, "hints": "{\"scenes\":\"3 0\",\"relations\":\"3\"}" }
        gift: {
          // used_for_gift: used_for_gift === true? 1 : 0,
          used_for_gift: Utils.getCode(used_for_gift),
          hints: (() => {
            const temp = {}
            const handle = array => array.join(' ')
            if(!_.isEmpty(scenes)){
              temp.scenes = handle(scenes)
            }
            if(!_.isEmpty(relations)){
              temp.relations = handle(relations)
            }
            if(!_.isEmpty(characters)){
              temp.characters = handle(characters)
            }
            return _.isEmpty(temp)? '' : JSON.stringify(temp)
          })()
        },
        // "keywords": { "used_for_search": 1, "keywords": "{\"categroys\":\"爱上打\",\"brands\":\"苹果\"}" }
        keywords: {
          // used_for_search: used_for_search? 1 : 0,
          used_for_search: Utils.getCode(used_for_gift),
          keywords: (() => {
            const temp = {}
            const handle = array => array.map(item => item.name).join(' ')
            if(!_.isEmpty(render_categroys)){
              temp.categroys = handle(render_categroys)
            }
            if(!_.isEmpty(render_brands)){
              temp.brands = handle(render_brands)
            }
            if(!_.isEmpty(render_scenes)){
              temp.scenes = handle(render_scenes)
            }
            if(!_.isEmpty(render_specials)){
              temp.specials = handle(render_specials)
            }
            if(!_.isEmpty(render_similars)){
              temp.similars = handle(render_similars)
            }
            return _.isEmpty(temp)? '' : JSON.stringify(temp)
          })()
        },
        tags: Utils.splitTags(select_tags, this.all_tags)
      }
      // console.log("作者：", author)
      // console.log("分享到标题：", share_title)
      // console.log("微信标题：", wx_title)
      // console.log("微博标题：", wb_title)
      // console.log("类型：", ctype)
      // console.log("发布时间：", timetopublish)
      console.log('[Edit.vue.save] postData：', JSON.stringify(postData))
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
    addProtocol (url) {
      return '//' + url
    },
    lockedByFormat(lock_by) {
      return Utils.isLocked(lock_by)? `此文已被 ${lock_by} 锁住，只能查看信息，更改的信息无法被保存`:'操作'
    },
    imageSizeFormat (size) {
      return Math.ceil(size / 1024) + 'kb'
    },
    imageWidthAndHeightFormat (width, height) {
      return width && height ? width + ' X ' + height : ''
    },
    imageUrlFilter (url) {
      return `//${url}`
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
        opacity: 1;
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
        display: flex;
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

          // color:#fff;
          // text-align: center;
          // line-height: 20px;
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
