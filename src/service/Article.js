import articles from '../mocks/articles'
import fetch from 'isomorphic-fetch'
import API from '../config/api'

export default class Article {
  static newArticle(){
    return new Promise((resolve, reject) => {
      try {
        fetch(API.articles.url, {method: 'POST'})
        .then(response => response.json())
        .then(result => {
          console.log(result);
          const message = result.message
          if(message !== 'SUCCESS'){
            reject(message)
          }else{
            resolve({
              id: result.res.insertId,
              title: '新建文章',
              last_update_time: result.res.server_timestamp
            })
          }
        })

        // setTimeout(() => {
        //   resolve({
        //     id: Math.ceil(9100 + Math.random() * 2000),
        //     title: '新建文章',
        //     status: 'new'
        //   })
        // }, 1000)
      } catch (e) {
        reject(e.message)
      } finally {

      }
    })
  }
  /**
   * 查询 article_meta 表的记录数
   */
  static getTotal() {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve(articles.length)
        },200)
      }catch(e){
        reject(e.message)
      }
    })
  }
  /**
   * select * from table limit offset pageSize
   */
  static pagination (offset, pageSize) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
            const start = offset
            const end = start + pageSize
            resolve(articles.slice(start, end))
        }, 1000)
      }catch(e){
        reject(e.message)
      }
    })
  }

  /**
   * select * from table limit offset pageSize where query
   */
  static getArticles (query) {
    return new Promise((resolve, reject) => {
      try{
        let ret = []
        let {type, offset, pageSize} = query
        // 如果有查询条件，就按照查询条件查询，否则就查询全部
        if( type ){
          ret = Article.randArray(articles, Math.ceil(Math.random() * 40))
        } else {
          ret = articles
        }
        let total = ret.length
        const start = offset
        const end = start + pageSize
        fetch(API.articles.url)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          const message = result.message
          if(message !== 'SUCCESS'){
            reject(message)
          }else{
            if(result.res.length){
              resolve({
                total: result.res[0].total,
                articles: result.res
              })
            }else{
              resolve({
                total: 0,
                articles: []
              })
            }
          }
        })
        .catch(e => {
          console.log(e);
        })
        // setTimeout(() => {
        //   resolve({
        //     total: total,
        //     articles: ret.slice(start, end)
        //   })
        // }, 1000)
      }catch(e){
        reject(e.message)
      }
    })
  }

  static deleteArticle (id) {
    return new Promise((resolve, reject) => {
      resolve('SUCCESS')
    })
  }

  static randArray (data, len) {
    return data.sort(() => Math.random() - 0.5).slice(0, len)
  }

}
