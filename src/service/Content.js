import content from '../mocks/content'
import fetch from 'isomorphic-fetch'
import images from '../mocks/images'
import API from '../config/api'
import _ from 'lodash'
import LoginUtils from '../utils/LoginUtils'
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
    console.log(`拿id为${id}的文章`)
    return new Promise((resolve, reject) => {
      try {
        // 首先从缓存中拿数据
        // const content = Content.getContentFormLocal(id)
        const content = null
        if (content) {
          resolve(content)
        }
         else  // 如果没有缓存，从服务器上拿数据
        {
          try {
            const url = `${API.articles.url}/?type=all&id=${id}&user=${LoginUtils.getUsername()}`
            fetch(url)
            .then(response => response.json())
            .then(result => {
              console.log(url, result)
              const message = result.message
              if(message !== 'SUCCESS'){
                reject(message)
              }else{

                // used_for_search: false, // 是否可搜
                // categroy: '',
                // render_categroys: [],
                // brand: '',
                // render_brands: [],
                // scene: '',
                // render_scenes: [],
                // special: '',
                // render_specials: [],
                // similar: '',
                // render_similars: [],
                console.log(result.res)
                const ret = result.res
                let {gift, keywords, tags} = ret
                if(keywords){
                  keywords = JSON.parse(keywords)
                  const {categroys, brands, scenes, specials, similars} = keywords
                  // 品类
                  if(categroys){
                    ret.render_categroys = categroys.split(' ').map(item => {
                      return {
                        type: 'primary',
                        name: item
                      }
                    })
                  }
                  // 品牌
                  if(brands){
                    ret.render_brands = brands.split(' ').map(item => {
                      return {
                        type: 'primary',
                        name: item
                      }
                    })
                  }

                  // 使用场景
                  if(scenes){
                    ret.render_scenes = scenes.split(' ').map(item => {
                      return {
                        type: 'primary',
                        name: item
                      }
                    })
                  }

                  // 特别之处
                  if(specials){
                    ret.render_specials = specials.split(' ').map(item => {
                      return {
                        type: 'primary',
                        name: item
                      }
                    })
                  }

                  // 类似产品
                  if(similars){
                    ret.render_similars = similars.split(' ').map(item => {
                      return {
                        type: 'primary',
                        name: item
                      }
                    })
                  }
                }

                // used_for_gift: false, // 是否适合送礼。1-适合，0-不适合
                // scenes: [],
                // relations: [],
                // characters: [],
                if(gift){
                  gift = JSON.parse(gift)
                  console.log(gift)
                  const {scenes, relations, characters} = gift
                  if(scenes){
                    ret.scenes = scenes.split(' ').filter(s => s.trim()).map(s => Number(s))
                  }
                  if(relations){
                    ret.relations = relations.split(' ').filter(s => s.trim()).map(s => Number(s))
                  }
                  if(characters){
                    ret.characters = characters.split(' ').filter(s => s.trim()).map(s => Number(s))
                  }
                }
                if(tags){
                  tags = JSON.parse(tags)
                }
                console.log(ret);
                // console.log(gift, keywords, tags);
                resolve(ret)
              }
            })
          } catch (e) {
            reject(e.message)
          }
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

  static save (data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      try {
        if(data){
          data.type = 'all'
        } else {
          return reject('您还未填写信息')
        }
        const opts = {
          method: 'PUT',
          mode: 'cors',
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'json'
          })
        }
        const url = API.articles.url
        fetch(url, opts)
        .then(response => response.json())
        .then(result => {
          console.log(url, result)
          const message = result.message
          if(message !== 'SUCCESS'){
            reject(message)
          }else{
            resolve({})
          }
        })
      } catch (e) {
        reject(e.message)
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
