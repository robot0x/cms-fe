// import iFetch from '../Utils/iFetch'
import fetch from 'isomorphic-fetch';
import API from '../config/api';
import _ from 'lodash';
import LoginUtils from '../utils/LoginUtils';
const CTYPES = ['好物', '专刊', '专题', '首页', '测评', '长文'];
const successCode = 'SUCCESS';
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
  static getContent (id) {
    console.log('getContent执行 ...');
    return new Promise((resolve, reject) => {
      try {
        const content = Content.getContentFormLocal(id);
        const user = LoginUtils.getUsername();
        // const content = null
        // 虽然缓存中有数据，但是也别忘了上锁
        if (content) {
          /**
         * 文章解锁和上锁，不用显示传递username的方式，因为username是存在前端cookie里的
         * 这样是不安全的，如果有人修改了cookie，则锁住文章的可能是一个很奇怪的用户名
         */
          // const url = `${API.articles.url}/?type=lock&id=${id}&user=${user}`
          const url = `${API.articles.url}/?type=lock&id=${id}`;
          fetch(url, {
            credentials: 'include',
            headers: new Headers({
              'Content-Type': 'json;charset=UTF-8'
            })
          })
            .then(response => response.json())
            .then(result => {
              console.log(url, result);
              const { message, res, status } = result;
              if (status !== 200) {
                reject(result);
              } else {
                if (message !== successCode) {
                  reject(result);
                } else {
                  if (res && res.lock_by) {
                    content.lock_by = res.lock_by;
                  } else {
                    content.lock_by = user;
                  }
                  content.from = 'cache';
                  resolve(content);
                }
              }
            })
            .catch(e => {
              resolve(e.message);
            });
        } else {
          // 如果没有缓存，从服务器上拿数据
          try {
            const url = `${API.articles.url}/?type=all&id=${id}&user=${user}`;
            fetch(url, {
              credentials: 'include'
            })
              .then(response => response.json())
              .then(result => {
                console.log(url, result);
                const { message, res, status } = result;
                if (status !== 200) {
                  reject(result);
                } else {
                  if (message !== successCode) {
                    reject(message);
                  } else {
                    // used_for_search: false, // 是否可搜
                    // category: '',
                    // render_categorys: [],
                    // brand: '',
                    // render_brands: [],
                    // scene: '',
                    // render_scenes: [],
                    // special: '',
                    // render_specials: [],
                    // similar: '',
                    // render_similars: [],
                    const ret = result.res
                    let { gift, keywords, tags } = ret
                    console.log('加载的数据keywords:', keywords)
                    if (keywords) {
                      keywords = JSON.parse(keywords);
                      const {
                        category,
                        brand,
                        scene,
                        special,
                        similar
                      } = keywords;
                      // 品类
                      if (category) {
                        ret.render_categorys = Content._handleKeywords(
                          category
                        );
                      }
                      // 品牌
                      if (brand) {
                        ret.render_brands = Content._handleKeywords(brand);
                      }
                      // 使用场景
                      if (scene) {
                        ret.render_scenes = Content._handleKeywords(scene);
                      }
                      // 特别之处
                      if (special) {
                        ret.render_specials = Content._handleKeywords(special);
                      }
                      // 类似产品
                      if (similar) {
                        ret.render_similars = Content._handleKeywords(similar);
                      }
                    }

                    if (gift) {
                      gift = JSON.parse(gift);
                      const scenes = gift.scene;
                      const relations = gift.relation;
                      const characters = gift.character;
                      if (scenes) {
                        ret.scenes = Content._handleGift(scenes);
                      }
                      if (relations) {
                        ret.relations = Content._handleGift(relations);
                      }
                      if (characters) {
                        ret.characters = Content._handleGift(characters);
                      }
                    }
                    // if (tags) {
                    //   tags = JSON.parse(tags)
                    // }

                    let { lock_by } = ret;
                    // 如果点击“新建文章”之后，那么自动跳转到编辑也的话，此时可能拿不到lock_by字段
                    // 所以在前端赋予lock_by字段的值
                    if (!lock_by) {
                      ret.lock_by = user;
                    }
                    ret.from = 'server';
                    resolve(ret);
                  }
                }
              })
              .catch(e => {
                reject(e);
              });
          } catch (e) {
            reject(e);
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
        reject(e.message);
      }
    });
  }

  static save (data) {
    return new Promise((resolve, reject) => {
      try {
        if (data) {
          data.type = 'all';
        } else {
          return reject('您还未填写信息');
        }
        fetch(API.articles.url, {
          method: 'PUT',
          mode: 'cors',
          body: JSON.stringify(data),
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'json'
          })
        })
          .then(response => response.json())
          .then(result => {
            console.log(API.articles.url, result);
            const { message, res, status } = result;
            if (status !== 200) {
              reject(result);
            } else {
              if (message !== successCode) {
                reject(result);
              } else {
                resolve({});
              }
            }
          });
      } catch (e) {
        reject(e.message);
      }
    });
  }

  static _handleKeywords (keywords, type = 'primary') {
    return keywords.split(' ').map(item => {
      return { type, name: item };
    });
  }

  static _handleGift (gifts) {
    // 数据库存的是从1开始的索引，所以要变为真实的索引
    return gifts.split(' ').filter(s => s.trim()).map(s => Number(s) - 1);
  }

  static setContentToLocal (id, key, val, check = false) {
    id = String(id);
    const { localStorage } = window;
    if (id && id.trim()) {
      let local = Content.getContentFormLocal(id);
      if (check) {
        if (local) {
          local[key] = val;
          localStorage.setItem(id, JSON.stringify(local));
        }
      } else {
        if (!local) {
          local = {};
        }
        local[key] = val;
        localStorage.setItem(id, JSON.stringify(local));
      }
    }
  }

  static getContentFormLocal (id) {
    const { localStorage } = window;
    return JSON.parse(localStorage.getItem(String(id)));
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
