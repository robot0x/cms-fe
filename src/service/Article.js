import articles from '../mocks/articles'
import fetch from 'isomorphic-fetch'
import API from '../config/api'
import _ from 'lodash'
import LoginUtils from '../utils/LoginUtils'
export default class Article {

  static newArticle () {
    return new Promise((resolve, reject) => {
      try {
        const user = LoginUtils.getUsername()
        const opts = {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify({
            user,
            last_update_by: user
          }),
          headers: new Headers({
            'Content-Type': 'json'
          })
        }
        fetch(API.articles.url, opts)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          const message = result.message
          if(message !== 'SUCCESS'){
            reject(message)
          }else{
            resolve({
              id: result.res.id,
              title: '新建文章',
              last_update_by: user,
              last_update_time: result.res.server_timestamp
            })
          }
        })
      } catch (e) {
        reject(e.message)
      } finally {

      }
    })
  }
  /**
   * select * from table limit offset pageSize where query
   */
  static getArticles (query) {
    // debugger;
    return new Promise((resolve, reject) => {
      try{
        let ret = []
        let {type, search, offset, pageSize} = query
        let queryString = ''
        if(type && search){
          queryString = `?${type}=${search}`
        }

        if(_.isInteger(pageSize)){
          if(!_.isInteger(offset)){
            offset = 0
          }
          if(queryString){
            queryString = queryString + `&offset=${offset}&limit=${pageSize}`
          }else{
            queryString = `?offset=${offset}&limit=${pageSize}`
          }
        }
        console.log(`${API.articles.url}/${queryString}`);
        fetch(`${API.articles.url}/${queryString}`)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          const message = result.message
          if(message !== 'SUCCESS'){
            reject(message)
          }else{
            if(result.res){
              resolve(result.res)
            }else{
              resolve({total: 0,articles: []})
            }
          }
        }).catch(e => {
          console.log(e);
        })
      }catch(e){
        // 事实上，走了这块儿
        console.log(e);
        reject(e.message)
      }
    })
  }
  static saveAll (data) {
    return new Promise((resolve, reject) => {
      try {
        fetch(API.articles.url, {method: 'PUT'})
        .then(response => response.json())
        .then(result => {
          console.log(result);
          const message = result.message
          if(message !== 'SUCCESS'){
            reject(message)
          }else{
            resolve({})
          }
        })
      } catch (e) {
        reject(e.message)
      } finally {

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
