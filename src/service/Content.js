import content from '../mocks/content'
import fetch from 'isomorphic-fetch'
import images from '../mocks/images'
const CTYPES = ['好物', '专刊', '专题', '首页', '测评', '长文']
// 根据id查询Content
/*
  {
    id,
    aName,
    text,
    ctype,
    tag: {
      '家具家装' : ['家具'],
      '生活日用' : ['餐具厨具', '清洁用品']
    },
    keywords: ['key1', 'key2'],
    shareTitle,
    wxTitle,
    wbTitle,
    images: [
      {
        src,
        title,
        size: '120 x 330',
        size2: '30kb',
        types: [0, 1, 2]
      }
    ]
  }
 */
export default class Content {
  static getContent(id){
    return new Promise((resolve, reject) => {
      try {
        const content = Content.getContentFormLocal(id)
        if (content) {
          // console.log('if');
          resolve(content)
        } else {
          // 如果没有缓存，从服务器上拿数据
          // console.log('else');
          resolve(content)
        }
        // if(id){
        //   // 组装数据
        //   const lockedBy = content.lockedBy
        //   if(lockedBy){
        //     content.locked = true
        //   }
        //   content.keywords = Content.handleError(content.keywords)
        //   content.ctypes = content.ctypes.map((ctype, i) => { return { label: ctype, value: i } })
        //   resolve(content)
        // } else {
        //   resolve(Content.getContentFormLocal())
        // }
      } catch (e) {
        reject(e.message)
      } finally {
      }
    })
  }

  static save(){
    return new Promise((resolve, reject) => {
      try {
        resolve()
      } catch (e) {
        reject(e.message)
      } finally {
      }
    })
  }

  static handleKeywords(keywords, type = 'success'){
    return keywords.map(keyword => { return { name: keyword, type: type } })
  }

  static setContentToLocal(id, key, val){
    id = String(id)
    if( id && id.trim() ){
      const local = Content.getContentFormLocal(id) || {}
      local[key] = val
      localStorage.setItem(id, JSON.stringify(local))
    }
  }

  static getContentFormLocal (id) {
      return JSON.parse(localStorage.getItem(String(id)))
      // const article = localStorage.getItem('')
      // return {
      //   text: localStorage.getItem('article')        || '',
      //   images: JSON.parse(localStorage.getItem('images')) || images || [],
      //   formData: {
      //     aName: localStorage.getItem('aName') || '',
      //     ctype: parseInt(localStorage.getItem('ctype'))     || 1,
      //     keywords: Content.handleKeywords(JSON.parse(localStorage.getItem('keywords')) || []),
      //     shareTitle: localStorage.getItem('shareTitle') ||'',
      //     wxTitle: localStorage.getItem('wxTitle') ||'',
      //     wbTitle: localStorage.getItem('wbTitle') ||'',
      //     timetopublish: Date.now()
      //   }
      // }
  }

}

// `# 这是文章标题
// \`\`\`eds
// 感谢美国TSI公司的搭理支持
// \`\`\`
//
// 你好
//
// 我是文章
//
// ![](//content.image.alimmdn.com/cms/sites/default/files/20161110/firstpage/all2-logo.jpg@768w_1l)
//
// 1. 你好
// 2. 呵呵
//
// > 这个很好啊
//
//
// - 呵呵
// - 嘎嘎
//
// ## 这是标题
//
// ### 这是另一个标题
//
// <-- iframe height=498 width=510 src='http://player.youku.com/embed/XNjM3NDgxMjY0' frameborder=0 'allowfullscreen'></iframe -->
//
// 你好
//
// aswdeasdas
//
// asdsada`
