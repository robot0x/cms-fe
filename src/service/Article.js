import articles from '../mocks/articles'
import fetch from 'isomorphic-fetch'
export default class Article {

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
        setTimeout(() => {
          resolve({
            total: total,
            articles: ret.slice(start, end)
          })
        }, 1000)
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
