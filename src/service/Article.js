import articles from '../mocks/articles'
import fetch from 'isomorphic-fetch'
export default class Article {
  static getArticles (query) {
    return new Promise((resolve, reject) => {
      let ret = []
      // 如果有查询条件，就按照查询条件查询，否则就查询全部
      if( query ){
        ret = Article.randArray(articles, Math.ceil(Math.random()*20))
      } else {
        ret = articles
      }
      resolve(ret)
    })
  }

  static deleteArticle (id) {
    return new Promise((resolve, reject) => {
      resolve('SUCCESS')
    })
  }

  static randArray (data, len) {
    data.sort(function() {
      return Math.random() - 0.5;
    });
    return data.slice(0, len);
  }
}
