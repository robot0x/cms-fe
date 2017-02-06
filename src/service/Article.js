import articles from '../mocks/articles'
import fetch from 'isomorphic-fetch'
export default class Article {
  static getArticles (query) {
    return new Promise((resolve, reject) => {
      try{
        let ret = []
        // 如果有查询条件，就按照查询条件查询，否则就查询全部
        if( query ){
          ret = Article.randArray(articles, Math.ceil(Math.random()*20))
        } else {
          ret = articles
        }
        setTimeout(() => {
          resolve(ret)
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
