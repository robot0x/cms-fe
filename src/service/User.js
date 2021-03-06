import fetch from 'isomorphic-fetch'
import API from '../config/api'
const successCode = 'SUCCESS'

export default class User {
  static auth (username, password) {
    let msg = ''
    if( !username ){
      msg = '用户名不能为空'
    }else if( !password ){
      msg = '密码不能为空'
    }
    return new Promise((resolve, reject) => {
      try {
        if (!msg) {
          fetch(`${API.users.url}/?user=${username}&password=${password}`)
          .then(response => response.json())
          .then(result => {
            if(result.message !== successCode){
              reject(result.message)
            }else{
              if(result.res.auth){
                resolve()
              }else{
                reject('帐号或密码错误，请重试')
              }
            }
          }).catch(({ message } )=> {
            reject(message)
          })
        }else{
          reject(msg)
        }
      } catch (e) {
        console.log(e);
        reject(e.message)
      }
    })
  }
  /**
   * 获取按照作者名的统计数据
   */
  static getUserAndCount () {
    return new Promise((resolve, reject) => {
      try {
          fetch(API.users.url)
          .then(response => response.json())
          .then(result => {
            if(result.message !== successCode){
              reject(result.message)
            }else{
              resolve(result.res)
            }
          }).catch(({ message } )=> {
            reject(message)
          })
      } catch (e) {
        console.log(e);
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

      }catch(e){
        console.log(e);
        reject(e.message)
      }
    })
  }

}
