<template>
<div class="page-edit" v-loading.fullscreen.lock="loading" element-loading-text="正在保存中...">
  <!-- 如果被锁了，也就不必显示操作区了 -->
  <!-- <panel title="操作" closeable class="panel" v-if="!locked"> -->
  <!--<panel :title="lock_by | lockedByFormat" closeable class="panel" :close="true">-->
  <panel :title="lock_by | lockedByFormat" closeable class="panel">
    <span slot="panel-heading-middle">
      <el-button type="success" size="small" icon="upload" @click="save" v-if="!locked">保存</el-button>
      <el-button type="info" size="small" @click="releaseLock" v-if="!locked">解除锁定</el-button>
      <el-button type="danger" size="small" icon="delete" @click="clearCache">清空缓存</el-button>
       <el-tooltip class="item" effect="dark" content="查看实时修改后的效果" placement="top-start"> 
        <el-button type="warning" size="small" icon="search">
          <a :href="href" style="color:#fff;" target="_blank">效果预览</a>
        </el-button>
       </el-tooltip>
       <form class="refrshcdn-form" action="//bj1.a.dx2rd.com/cdn/refresh" method="POST" target="_blank" ref="refrshcdn">
        <input type="hidden" name="refresh" :value="id | cidTorefrshCDNUrl(ctype)">
       </form>
       <el-tooltip class="item" effect="dark" content="若要实时修改后的效果在线上生效，请刷新CDN" placement="right-start"> 
        <el-button type="info" size="small" icon="time" @click="refrshCDN">刷新CDN</el-button>
       </el-tooltip> 
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

            <el-form-item label="查看分享到的标题">
              <el-checkbox v-model="used_for_share"></el-checkbox>
            </el-form-item>
            
            <div v-if="used_for_share">
              <el-form-item label="分享到的标题" prop="share_title">
                <el-input v-model="share_title" placeholder="文章分享出去显示出的标题，若不填，默认是文章标题" @input.native="share_titleInput" :readonly="locked"></el-input>
              </el-form-item>

              <el-form-item label="分享到微信的标题" prop="wx_title">
                <el-input v-model="wx_title" placeholder="文章分享到微信显示出的标题" :readonly="locked"></el-input>
              </el-form-item>

              <el-form-item label="分享到微博的标题" prop="wb_title">
                <el-input v-model="wb_title" placeholder="文章分享到微博显示出的标题" :readonly="locked"></el-input>
              </el-form-item>
            </div>

            <el-form-item label="发布时间">
              <el-date-picker type="date" placeholder="选择发布时间" v-model="timetopublish" style="width: 100%;" format="yyyyMMdd" :clearable="false" :readonly="locked"></el-date-picker>
              <!--<el-date-picker type="date" placeholder="选择发布时间" v-model="timetopublish" style="width: 100%;" :editable="false" format="yyyyMMdd" :clearable="false" :readonly="locked"></el-date-picker>-->
            </el-form-item>

            <el-form-item label="类型">
                <el-select v-model="ctype" placeholder="请选择文章类型" :disabled="locked">
                  <el-option v-for="ctype in ctypes" :label="ctype.label" :value="ctype.value"></el-option>
                </el-select>
            </el-form-item>

            <div v-if="ctype === 2">
              <el-form-item label="购买链接" prop="buylink">
                <el-input v-model="buylink" placeholder="填写购买链接" :readonly="locked"></el-input>
              </el-form-item>
            </div>

            <div v-if="ctype === 2">
              <el-form-item label="价格" prop="price">
                <el-input v-model="price" placeholder='填写形如"￥320元"的价格信息' :readonly="locked"></el-input>
              </el-form-item>
            </div>

            <el-form-item label="是否可搜">
              <el-checkbox v-model="used_for_search"></el-checkbox>
            </el-form-item>

            <div class="keywords-panel" v-if="used_for_search">
              <el-form-item label="具体品类">
                <el-input v-model="category" placeholder="包含同义词（如：指甲剪，指甲钳）" @keyup.native.enter.stop.prevent="addTags('category')" :readonly="locked"></el-input>
                <el-tag v-for="tag in render_categorys" :closable="!locked" :type="tag.type" @close="removeTag('category',tag)"> {{tag.name}} </el-tag>
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
                <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">
                  只能上传jpg/jpeg/png/gif文件，<span style="color:#e60012;">且单张图片不超过5M。</span>为了提高上传速度及成功率，建议每次<span style="color:#e60012;">上传的图片不要超过20张。</span>
                  <p style="color:#e60012;">各种类型的文章对应的图片尺寸规则（若不符合规则，则不显示设置图片类型按钮）：</p>
                  <p style="color:#e60012;">
                    首页：
                    封面图  640*504，
                    封面图二 640*504；
                  </p>
                  <p style="color:#e60012;">
                  活动：
                  封面图 640*416，
                  封面图二 640*416；
                  </p>
                  <p style="color:#e60012;">
                  好物：
                  封面图 596*486，
                  封面图二 640*416，
                  走马灯图 640*370；
                  </p>
                  <p style="color:#e60012;">
                  专刊：
                  封面图 640*416，
                  </p>
                  <p style="color:#e60012;">
                    所有类型的文章都要满足：<br>
                    Thumb图 188*188<br>
                    Banner图 640*416
                  </p>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="选择所属标签">
              <el-tree
                ref="tree"
                :data="all_tags"
                node-key="id"
                show-checkbox
                :props="{children: 'children',label: 'name'}"
                :default-checked-keys="tags"
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
                    <el-checkbox :label="i+1">{{s}}</el-checkbox>
                  </template>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="关系">
                <el-checkbox-group v-model="relations">
                  <template v-for="(r,i) in gift.relations">
                    <el-checkbox :label="i+1">{{r}}</el-checkbox>
                  </template>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="特点">
                <el-checkbox-group v-model="characters">
                  <template v-for="(c,i) in gift.characters">
                    <el-checkbox :label="i+1">{{c}}</el-checkbox>
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
                <div class="images-attr">{{image.width | imageWidthAndHeightFormat(image.height)}} &nbsp; {{image.size | imageSizeFormat}}</div>
                <div class="images-oper-tool">
                  <i class="el-icon-view" @click="viewImage(image.url)" title="查看大图"></i>
                  <i class="el-icon-check" @click="insert(index)" title="插入到文章内"></i>
                  <a :href="image.url | addProtocol" target="_blank" title="跳转到图片所在链接"><i class="el-icon-picture"></i></a>
                  <i class="el-icon-close" @click="deleteImage(index)" title="删除图片"></i>
                </div>
                <div class="set-image-type">
                  <!--
                    图片尺寸策略：

                    首页：
                    cover  640*504
                    coverex 640*504

                    活动：
                    cover 640*416
                    coverex 640*416 


                    好物：
                    cover 596*486
                    coverex 640*416
                    swpie 640*370

                    专刊：
                    cover 640*416

                    thumb: 188*188
                    banner: 640*416

                    如果是专题，可以没有cover、coverex、thumb，因为专题没有meta
                    如果是专刊，可以没有coverex
                    除了专刊和专题之外其他类型文章的必须要满足：
                      图片必须有且仅有一张cover
                      图片必须有且仅有一张coverex
                      图片必须有且仅有一张thumb
                    -->
                  <el-tooltip
                  v-if="
                  (id == 7216) || 
                  (
                    (ctype !== 9) && 
                    (
                      (
                        (ctype === 1 || ctype === 5) && image.width === 640 && image.height === 504
                      ) || 
                      (ctype === 2 && image.width === 596 && image.height === 486) ||
                      (ctype === 3 && image.width === 640 && image.height === 416) ||
                      (ctype === 4 && image.width === 640 && image.height === 416)
                    )
                  )
                  "
                  effect="light" 
                  content="设置为封面图" 
                  placement="top">
                    <el-button type="primary" size="mini" @click="setImageType(index, 2)">C</el-button>
                  </el-tooltip>
                  <el-tooltip
                  v-if="
                  (ctype !== 9 || ctype !== 3) && 
                  (((ctype === 1 || ctype === 5) && image.width === 640 && image.height === 504) || 
                  (ctype === 2 && image.width === 640 && image.height === 416) ||
                  (ctype === 4 && image.width === 640 && image.height === 416))
                  "
                  effect="light" 
                  content="设置为封面图二" 
                  placement="top">
                    <el-button type="success" size="mini" @click="setImageType(index, 4)">CE</el-button>
                  </el-tooltip>
                  <!--thumb图，必须得是一张1:1的方图，我们规定是188 x 188 作为thumb图  -->
                  <el-tooltip effect="light" v-if="(ctype !== 9) && (image.width === 188 && image.height === 188)" content="设置为thumb图" placement="top">
                    <el-button type="danger" size="mini" @click="setImageType(index, 8)">T</el-button>
                  </el-tooltip>
                  <el-tooltip
                  v-if="ctype === 2 && image.width === 640 && image.height === 370"
                  effect="light"
                  content="设置为走马灯图" 
                  placement="top">
                    <el-button type="warning" size="mini" @click="setImageType(index, 16)">S</el-button>
                  </el-tooltip>
                  <!--banner图，我们规定是640 x 416 作为banner图 -->
                  <el-tooltip effect="light" v-if="image.width === 640 && image.height === 416" content="设置为banner图" placement="top">
                    <el-button style="background-color:#9900FF;" size="mini" @click="setImageType(index, 32)">B</el-button>
                  </el-tooltip>
                </div>
              </figcaption>
              <span class="used-label" v-if="image.used"><i class="el-icon-check"></i></span>
              <div class="image-types clearfix" v-if="image.type">
                <span v-for="t in image.types.filter(type => /^(2|4|8|16|32)$/.test(type))" :style="{backgroundColor:imageTypeColorFilter(t)}"></span>
              </div>
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
// import Tags from '../service/Tags'
 // 这个是写在前端的，不用改
import { ctypes, all_tags } from '../config/content_page_data'
// 这个是写在前端的，不用改
import gift from '../config/gift'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import moment from 'moment'

const defaultData = {
  loading: false,
  leftSmall: false,
  rightSmall: true,
  locked: false,
  lock_by: '',
  dialogVisible: false, // 查看大图的dialog默认是隐藏的
  dialogImageUrl: '',
  used_for_gift: false, // 是否适合送礼。1-适合，0-不适合
  scenes: [],
  relations: [],
  characters: [],

  used_for_search: false, // 是否可搜
  category: '',
  render_categorys: [],
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
    ctype: 0, // 文章类型，因为我们的好物文章最多，所以，使用默认使用2
    // tag = ['0', '0-0','0-2', '3', '4-1','4-2'] // 被选中的node-key
    // timetopublish: new Date(moment().format('YYYYMMDD')), // 文章发布时间，这种方式是不行的，后面只能是timestamp
    // timetopublish: Date.now(), // 文章发布时间
    timetopublish: 0, // 文章发布时间
    title: '', // 文章标题
    titleex: '', // 专刊专用副标题
    used_for_share: false, // 是否分享。若要分享的话，需要填写分享出去的标题，不填的话，就用默认的title
    wx_title: '', // 分享到微信的标题
    wb_title: '', // 分享到微博的标题
    share_title: '', // 分享到的标题
    buylink: '',
    price: '',
  // }
  // tag树
  all_tags,
  // 数据库返回的数据
  tags: [], // 选中的key。格式跟tag一致
  // all_tags,
  ctypes, // 不用改
  gift, // 礼物配置。供用户选择
  // rules,
  images: [], // 用户上传的图片
  images_copy: [] // 用户长传的图片副本
}
export default {
  components: {
    RawEditor,
    RenderEditor,
    Panel,
    MaxWindow
  },
  computed: {
    ...mapGetters(['markdown']),
    href: function () {
      // return `//z.diaox2.com:3001/?m=${Utils.ctypeToM(this.ctype)}&id=${this.id}`
      return `//z.diaox2.com/view/app/?m=${Utils.ctypeToM(this.ctype)}&id=${this.id}`
    }
  },
  watch: {
    /**
     * 判断一张图片的类型
     * 如果
     *  图片在md中存在 （has）
     *  有三种可能：
     *  1. 图片是内容图  isContent
     *  2. 图片是banner图 isBanner
     *  3. 图片即是内容图，又是banner图 isBanner && isContent
        2017-05-16 改变策略，不从markdown中确定image的type及是否被use了，而是完全根据编辑的操作决定
          type：根据image.types生成
          used: 根据image.types是否为空，为空为0，否则为1
     */
    markdown ( md ) {
      try{
        const {images} = this
        if (!_.isEmpty(images)) {
          images.forEach((image, index) => {
            this.setImageType(index,  Utils.isUsed(md, image.url)? 1: 0, true)
          })
        }
      }catch(e){
        console.log(e)
      }
    },

    used_for_gift (val) {
      console.log('used_for_gift:', val)
      if(!this.locked){
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
    used_for_share (val) {
      console.log('used_for_share:', val)
      if(!this.locked){
        Content.setContentToLocal(this.id, 'used_for_share', Utils.getCode(val))
      }
    },

    used_for_search (val) {
      if(!this.locked){
        Content.setContentToLocal(this.id, 'used_for_search', Utils.getCode(val))
      }
    },

    render_categorys (val) {
      console.log('watch render_categorys exec ....')
      if(!this.locked && Utils.isValidArray(val)){
        Content.setContentToLocal(this.id, 'render_categorys', val)
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
      if(!this.locked && Utils.isValidArray(val)){
        Content.setContentToLocal(this.id, 'images', val)
      }
    },
    title (val) {
      if(!this.locked && Utils.isValidString(val) ){
        Content.setContentToLocal(this.id, 'title', val)
      }
    },
    titleex (val) {
      if(!this.locked && Utils.isValidString(val) ){
        Content.setContentToLocal(this.id, 'titleex', val)
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
      console.log('ctype changed the new val is ', val)
      if(!this.locked){
        Content.setContentToLocal(this.id, 'ctype', val)
      }
    },
    buylink (val) {
      if(!this.locked && Utils.isValidString(val)){
        Content.setContentToLocal(this.id, 'buylink', val)
      }
    },
    price (val) {
      if(!this.locked && Utils.isValidString(val)){
        Content.setContentToLocal(this.id, 'price', val)
      }
    },
    author (val) {
      if(!this.locked && Utils.isValidString(val)){
        Content.setContentToLocal(this.id, 'author', val)
      }
    },
    timetopublish (val) {
      if(!this.locked && val){
        // console.log('if ....', val)
        Content.setContentToLocal(this.id, 'timetopublish', moment(val).format('YYYYMMDD'))
      }
    },
    tags (val) {
      if(!this.locked && Utils.isValidArray(val)){
        Content.setContentToLocal(this.id, 'tags', val)
      }
    }
    // ,'$route': 'routeChange'
  },
  data() {
    return defaultData
  },
  activated () {
    console.log('Edit.vue activated exec ...')
    // 显示地置空选中的tags，因为elementui可能会在内存中记录上次的tree的状态，导致新建的文章
    // 中的tag树还是上次编辑的文章的选中状态
    // BUG:当编辑有图片的文章时，然后再编辑新建文章，图片还是显示上一篇文章的图片
    // 所以，显式地清空一下图片
    const id = this.$route.params.id
    // 如果是测评集合页（pcollection），则只显示编辑框即可，无需展示渲染框，造成编辑的困扰
    if (id == 7216) {
      this.open('left')
    }
    this.images = []
    this.ctype = 2 // 我们的好物最多，所以，默认为好物类型
    this.loadData(id)
  },
  // created () {
  //   console.log('Edit.vue created exec ...')
  //   // 显示地置空选中的tags，因为elementui可能会在内存中记录上次的tree的状态，导致新建的文章
  //   // 中的tag树还是上次编辑的文章的选中状态
  //   this.tags = []
  //   // BUG:当编辑有图片的文章时，然后再编辑新建文章，图片还是显示上一篇文章的图片
  //   // 所以，显式地清空一下图片
  //   const id = this.$route.params.id
  //   // 如果是测评集合页（pcollection），则只显示编辑框即可，无需展示渲染框，造成编辑的困扰
  //   if (id == 7216) {
  //     this.open('left')
  //   }
  //   this.images = []
  //   this.ctype = 2 // 我们的好物最多，所以，默认为好物类型
  //   this.loadData(id)
  //   // Tags.getAllTags().then(all_tags => {
  //   //   this.all_tags = all_tags
  //   //   console.log('created.all_tags:', JSON.stringify(all_tags))
    // })
  // },
  methods: {
    // 第1位-内容图(1)/第2位cover图(2)/第3位coverex图(4)/第4位thumb图(8)/第5位swipe图(16)/第6位banner图(32)
    // 目前只用 2/4/8/16
    setImageType(index, code, notRemove = false) {
      let image = image = this.images[index]
      // if(_.isNumber(index)) {
      //   image = this.images[index]
      // } else {
      //   image = index
      // }
      if(!image) return;
      let {types} = image
      // 新上传的图片没有types属性
      types = types || []
      // console.log('image types:', types)
      // console.log('image code:', code)
      // console.log('传入的code为:', code)
      // console.log('types:', types)
      // 如果已经存在这个type，则删除
      if(!notRemove && types && types.indexOf(code) !== -1) {
        _.remove(types, n => n == code)
      } else {
        // 否则，添加到types中去
        types.push(code)
      }
      types = _.union(types)
      types.sort((i, j) => i - j)
      // 当image.type的长度为0时，不能简单地认为这张图片没有被使用
      // 而应该看看是否在markdown中存在
      // 最后，根据types的内容，更新type字段
      if(_.isEmpty((types.filter(t => t != 0)))) {
        image.type = 0
      } else {
        image.type = types.reduce((m, n) => (m | n))
      }
      image.types = types
      image.used = types.filter(t => t != 0).length > 0
      // console.log('更新之后的type为：', image.type)
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
            this[type].split(/ +|,|，/)
              // 去掉每个tag的首尾空格，去掉每个tag中的控制字符
             .map(tag => Utils.removeInvilidChar(tag)) 
              // 过滤非空的字符串
             .filter(tag => tag.trim())
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
    loadData (id, cb) {
      console.log('loadData exce ... id is ', id)
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
                    titleex,
                    used_for_share,
                    wx_title,
                    wb_title,
                    share_title,
                    buylink,
                    price,
                    lock_by,
                    // 礼物搜索
                    used_for_gift,
                    scenes,
                    relations,
                    characters,
                    // 是否可搜
                    used_for_search,
                    render_categorys,
                    render_brands,
                    render_scenes,
                    render_specials,
                    render_similars,
                    tags,
                    from
                  } = content
                  // timetopublish = timetopublish || Date.now()
                  /**
                  * 发现一个问题，timetopublish如果默认是今天，则会马上上线，也就是说，在编辑的时候就已经上线了，
                  * 所以，需要把默认值设置为 20141106 之前的日期，这样才不再合法的发布日期范围内，问了下编辑，他们通常
                  * 填的日期是20141004，所以默认值就定这个日期了，等要上线时，让他们自己去选择
                  * 这个问题很严重
                  */
                  if(timetopublish) {
                    console.log('timetopublish if ....', timetopublish)
                    this.timetopublish = moment(timetopublish, 'YYYYMMDD').valueOf()
                  } else {
                    console.log('timetopublish else ....', timetopublish)
                    this.timetopublish = moment(20141005, 'YYYYMMDD').valueOf()
                  }
                  console.log('tags:', tags)
                  // console.log('this.all_tags:', this.all_tags)
                  // console.log('from:', from)
                  // 处理tags
                  if (!_.isEmpty(tags)) {
                    if (from === 'server') {
                      const ts = tags.map(tag => tag.tag2)
                      const shouldSelectTags = Utils.findByTag2(all_tags, ts)
                      this.$refs.tree.setCheckedKeys(shouldSelectTags)
                    } else {
                      this.$refs.tree.setCheckedKeys(tags)
                    }
                  } else {
                    // 如果没有tags数据，则应该恢复为没有checked状态的树，不然的话，树是在内容中的，
                    // 没有tags数据，还是上一次 this.$refs.tree.setCheckedKeys(tags) 设置的checked状态
                    this.$refs.tree.setCheckedKeys([])
                  }
                  // 默认是好物，因为我们的好物文章最多
                  // 第1位-内容图(1)/第2位cover图(2)/第3位coverex图(4)/第4位thumb图(8)/第5位swipe图(16)/第6位banner图(32)
                  // 把用bit位表示的type拆解成types数组
                  // 2 => [2] => cover图
                  // 8 => [8] => thumb图
                  // 10 => [2, 8] => 即为cover图，又为thumb图
                  // 新建的文章并没有图片，所以需要检测null值
                  if(!_.isEmpty(images)) {
                     this.images = images.map(image => {
                      let type = image.type
                      // console.log('type:', type)
                      let types = []     
                      // 内容图
                      if ((type & 1) === 1){
                        types.push(1)
                      }
                      // cover图
                      if ((type & 2) === 2){
                        types.push(2)
                      }
                      // coverex图
                      if ((type & 4) === 4){
                        types.push(4)
                      }
                      // thumb图
                      if ((type & 8) === 8){
                        types.push(8)
                      }
                      // swipe图
                      if ((type & 16) === 16){
                        types.push(16)
                      }
                      // banner图
                      if ((type & 32) === 32){
                        types.push(32)
                      }
                      types.sort((i, j) => i - j)
                      image.types = types
                      // console.log(types)
                      return image
                    })
                    this.images_copy = _.cloneDeep(images)
                  }
                  this.text = text
                  this.author = author
                  this.tag = tag
                  this.title = title
                  this.used_for_share = Utils.getBoolean(used_for_share)
                  this.wx_title = wx_title
                  this.wb_title = wb_title
                  this.share_title = share_title
                  this.buylink = buylink
                  this.price = price
                  this.ctype = ctype
                  this.locked = Utils.isLocked(lock_by)
                  this.lock_by = lock_by
                  // gift
                  this.used_for_gift = Utils.getBoolean(used_for_gift)
                  this.scenes = scenes || []
                  this.relations = relations || []
                  this.characters = characters || []
                  // kehywords
                  this.used_for_search = Utils.getBoolean(used_for_search)
                  this.render_categorys = render_categorys
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
          }).catch(res => {
            if (res.status === 401) {
              this.$alert('token过期，请重新登录', '提示', {
                confirmButtonText: '确定',
                type: 'warning'
              }).then(res => {
                this.$router.replace({name: 'login'})
              })
            } else {
              console.log('[Edit.vue] loadData:', res)
              this.$notify({
                title: '发生错误',
                message: res.message || '发生错误，请联系@大哥'
              })
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
        // console.log('removed url：', Utils.removeProtocolHead(this.images[index].url))
        this.insertImage = Utils.addProtocolHead(Utils.removeProtocolHead(this.images[index].url), '//')
        console.log('insertImage：', this.insertImage)
      })
    },
    
    deleteImage (index) {
      this.$delete(this.images, index)
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

    handleBeforeUpload (file) {
      if (['image/jpg', 'image/jpeg', 'image/png', 'image/gif'].indexOf(file.type) === -1) {
        this.$alert('只能上传格式为jpg/jpeg/png/gif的图片文件', `上传文件格式不符合要求`, { confirmButtonText: '确定' })
        return false
      }
      if ( (file.size / 1048576) > 5 ) {
        this.$alert('上传图片单张不能超过1M', `上传文件大小不符合要求`, { confirmButtonText: '确定' })
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
             used: 0,
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
      if (!this.locked) {
        const clickId = data.id
        if(clickId.indexOf('-') === -1) return
        console.log(clickId)
        if(checked && this.tags.indexOf(clickId) === -1){
          this.tags.push(clickId)
        }else{
          this.tags.splice(_.findIndex(this.tags, t => t == clickId ), 1)
        }
        // Content.setContentToLocal(this.id || this.$route.params.id, 'tags', this.tags)
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
    refrshCDN () {
      this.$refs.refrshcdn.submit()
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
        setTimeout(() => {
          window.location.reload()
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
        .catch(res => {
          if (res.status === 401) {
            this.$alert('token过期，请重新登录', '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).then(res => {
              this.$router.replace({name: 'login'})
            })
          } else {
            console.log('[Edit.vue] clearCache:', res)
            this.$notify({
              title: '发生错误',
              message: res.message || '发生错误，请联系@大哥'
            })
          }
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
        tags,
        timetopublish,
        title,
        titleex,
        buylink,
        price,
        share_title,
        wx_title,
        wb_title,
        images,
        images_copy,
        id,

        gift,
        used_for_gift,
        scenes,
        relations,
        characters,

        used_for_search,
        render_categorys,
        render_brands,
        render_scenes,
        render_specials,
        render_similars,
        markdown
      } = this
      // console.log('要保存的timetopublish为',  moment(timetopublish).format('YYYYMMDD'))
      // 2017-05-16 title不需要从markdown中拿，而是要从title的input中拿
      // let { title } = html
      // if(!title){
      //   this.loading = false
      //   return this.$alert('请在文章编辑区填写标题，格式为: # 文章标题', '标题未填写', { confirmButtonText: '确定' })
      // }
      if(!title || !title.trim()){
        this.loading = false
        return this.$alert('请在填写标题', '标题未填写', { confirmButtonText: '确定' })
      }
      let last_update_by = LoginUtils.getUsername()
      // 数据合法性验证
      if(!author){
        this.loading = false
        return this.$alert('必须填写作者', '作者未填写', { confirmButtonText: '确定' })
      }
      // console.log('要保存的markdown为：', markdown)
      // return this.loading = false
      if (!markdown || !markdown.trim()) {
         this.loading = false
         return this.$alert('必须填写文章内容', '文章内容未填写', { confirmButtonText: '确定' })
      }

      console.log('要保存的markdown为：', markdown)

      if (id == 7216  && ctype !== 10) {
        this.loading = false
        return this.$alert(`这是是一篇测评集合，但是文章类型填写的却是"${Utils.convertCtype(ctype)}"。请检查，确认无误后再次保存`, '文章内容跟文章类型不匹配', { confirmButtonText: '确定' })
      }

      // 内容是专题，但是ctype却不是专题，需要提示
      if ((/ztdesc/i.test(markdown) || /ztarticle/i.test(markdown)) && ctype !== 9) {
        this.loading = false
        return this.$alert(`这是似乎是一篇专题文章，但是文章类型填写的却是"${Utils.convertCtype(ctype)}"。请检查，确认无误后再次保存`, '文章内容跟文章类型不匹配', { confirmButtonText: '确定' })
      }

      // 内容是专刊，但是ctype却不是专刊，需要提示
      if ((/zkdesc/i.test(markdown) || /zkarticle/i.test(markdown)) && ctype !== 3) {
        this.loading = false
        return this.$alert(`这是似乎是一篇专刊文章，但是文章类型填写的却是"${Utils.convertCtype(ctype)}"。请检查，确认无误后再次保存`, '文章内容跟文章类型不匹配', { confirmButtonText: '确定' })
      }

      // 内容是正文，但是ctype确是专刊，需要提示
      if (!(/zkdesc/i.test(markdown) || /zkarticle/i.test(markdown)) && ctype === 3) {
        this.loading = false
        return this.$alert(`这是似乎不是一篇专刊文章，但是文章类型填写的却是"${Utils.convertCtype(ctype)}"。请检查，确认无误后再次保存`, '文章内容跟文章类型不匹配', { confirmButtonText: '确定' })
      }

      // 内容是正文，但是ctype确实专题，需要提示
      if (!(/ztdesc/i.test(markdown) || /ztarticle/i.test(markdown)) && ctype === 9) {
        this.loading = false
        return this.$alert(`这是似乎不是一篇专题文章，但是文章类型填写的却是"${Utils.convertCtype(ctype)}"。请检查，确认无误后再次保存`, '文章内容跟文章类型不匹配', { confirmButtonText: '确定' })
      }

      if (!ctype) {
        this.loading = false
        return this.$alert(`未选择文章类型，请选择正确的类型之后重新保存`, '未选择文章类型', { confirmButtonText: '确定' })
      }

      let select_tags = []
      // TODO: 标签相关的逻辑前后端
      if (!_.isEmpty(tags)) {
        select_tags = Utils.findTagById(this.all_tags, tags)
        // console.log('select_tags:', select_tags)
        // return this.loading = false
        /**
         * 为了方便移动端插入数据
         * 生成的格式应该为：
         * [{
         *  tag1: xxxx,
         *  tag2: yyyy
         * }, {
         *  tag1: zzzz,
         *  tag2: xxxx
         * } ....]
         */
        // this.loading = false
        // return this.$alert('必须选择所属标签', '未选择所属标签', { confirmButtonText: '确定' })
      }
      let images_handled = []
      if(!_.isEmpty(images)){
        images_handled = images.map(image => {
          // 1-cover图-封面图/2-thumb图-缩略图/3-banner图/4-文章内容图。存储以逗号隔开的字符串，例如：1,2,4 即这张图片的类型为cover图 & thumb图 & 内容图
          const ret =  {
            id: Number(image.id || 0), // 图片的id
            aid: Number(id || 0),
            url: image.url,
            // 一个图片是否被使用了，看看其types数组去掉0之后是否为空即可
            used: _.isEmpty((image.types || []).filter(t => t != 0))? 0: 1,
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
          ret.isModify = Utils.getCode(Utils.isModify(image, images_copy))
          console.log('isModify:', ret.isModify)
          return ret
        })
      }
      if (id != 7216) {
        let imagesVerify = Utils.verifyImages(images_handled, ctype)
        if (!imagesVerify.pass) {
          this.loading = false
          return this.$alert(`${imagesVerify.message}`, '图片不符合要求', { confirmButtonText: '确定' })
        }
      }
      console.log('images_handled:', images_handled)
      const postData = {
        id,
        meta: {
          title,
          share_title,
          wx_title,
          wb_title,
          ctype,
          titleex, // 需要，专刊专有属性
          // titlecolor, // 不需要，使用默认值即可
          buylink, // 需要填写
          timetopublish: moment(timetopublish).format('YYYYMMDD'), // 需要填写
          price, // 需要填写
          // status, // 不需要，使用默认值即可
          // create_time, // 不需要，使用mysql的自动插值
          // last_update_time, // 不需要，使用mysql的自动插值
          // user, // 不需要，在创建这篇文章时就已经有值，且值不会变
          lock_by: '',
          last_update_by,
          author
        },
        tags: select_tags,
        images: images_handled,
        // 需要做非空处理，否则保存之后，在diaodiao_article_content内为null
        content: markdown,
        // "gift": { "used_for_gift": 1, "hints": "{\"scenes\":\"3 0\",\"relations\":\"3\"}" }
        gift: {
          // used_for_gift: used_for_gift === true? 1 : 0,
          used_for_gift: Utils.getCode(used_for_gift),
          hints: (() => {
            const temp = {}
            const handle = array => array.join(' ')
            if(!_.isEmpty(scenes)){
              temp.scene = handle(scenes)
            }
            if(!_.isEmpty(relations)){
              temp.relation = handle(relations)
            }
            if(!_.isEmpty(characters)){
              temp.character = handle(characters)
            }
            return _.isEmpty(temp)? '' : JSON.stringify(temp)
          })()
        },
        // "keywords": { "used_for_search": 1, "keywords": "{\"categorys\":\"爱上打\",\"brands\":\"苹果\"}" }
        keywords: {
          // used_for_search: used_for_search? 1 : 0,
          used_for_search: Utils.getCode(used_for_search),
          keywords: (() => {
            const temp = {}
            const handle = array => array.map(item => item.name).join(' ')
            if(!_.isEmpty(render_categorys)){
              temp.category = handle(render_categorys)
            }
            if(!_.isEmpty(render_brands)){
              temp.brand = handle(render_brands)
            }
            if(!_.isEmpty(render_scenes)){
              temp.scene = handle(render_scenes)
            }
            if(!_.isEmpty(render_specials)){
              temp.special = handle(render_specials)
            }
            if(!_.isEmpty(render_similars)){
              temp.similar = handle(render_similars)
            }
            return _.isEmpty(temp)? '' : JSON.stringify(temp)
          })()
        }
      }
      // console.log("作者：", author)
      // console.log("分享到标题：", share_title)
      // console.log("微信标题：", wx_title)
      // console.log("微博标题：", wb_title)
      // console.log("类型：", ctype)
      // console.log("发布时间：", timetopublish)
      // console.log('[Edit.vue.save] postData：', JSON.stringify(postData))
      Content.save(postData).then(res => {
        this.loading = false
        this.$message({
          type: 'success',
          message: '文章保存成功'
        })
        Utils.clearCache(id)
      }).catch( res => {
        this.loading = false
        if (res.status === 401) {
          this.$alert('token过期，请重新登录', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(res => {
            this.$router.replace({name: 'login'})
          })
        } else {
          console.log('[Edit.vue] save:', res)
          this.$notify({
            title: '发生错误',
            message: res.message || '发生错误，请联系@大哥'
          })
        }
      })
      // setTimeout(() => {
      //   this.loading = false
        // this.$message({
        //   type: 'success',
        //   message: '文章保存成功'
        // })
      // }, 1000)
      // 保存成功的话，清空本地缓存数据

    }, 
    imageTypeColorFilter (type) {
       let ret = null
       switch(type) {
         case 2: // cover 返回蓝色
          ret = '#20A0FF'
          break;
        case 4: // coverex 返回绿色
          ret = '#13CE66'
          break;
         case 8: // thumb 返回红色
          ret = '#FF4949'
          break;
         case 16: // swipe 返回黄色
          ret = '#F7BA2A'
          break;
         case 32: // swipe 返回黄色
          ret = '#9900FF'
          break;
       }
       return ret
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
    cidTorefrshCDNUrl (id, ctype) {
      return `http://c.diaox2.com/view/app/?m=${Utils.ctypeToM(ctype)}&id=${id}`
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
          // 加上这个是为了防止图片宽度过小，上面的空间排列不全的问题
          min-width: 188px;
          // 加上这个是为了防止图片宽度过大，太占用空间的问题
          max-width: 300px;
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
          margin-left: 15px;
        }
        a {
          text-decoration: none;
          color: #fff;
          margin-left: 15px;
        }
        .el-icon-close {
          margin-left:15px;
        }
      }
      .set-image-type {
        position: absolute;
        bottom: 20px;
        display: flex;
      }
      .image-types {
        position: absolute;
        top: 5px;
        left: 5px;
        span {
          float:left;
          width: 10px;
          height: 10px;
          margin-right:10px;
        }
        & span:first-child{
          margin-right: 10px;
        }
      }

      &:hover {
        // width: 240px;
        // height: 160px;
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
.refrshcdn-form {
  width:0;
  height:0;
  opacity:0;
  display:inline;
  z-index:-1;
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
