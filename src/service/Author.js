import fetch from 'isomorphic-fetch'
import API from '../config/api'
import _ from 'lodash'
const successCode = 'SUCCESS'

export default class Author {
  static getAuthors () {
    return new Promise((resolve, reject) => {
      try {
        const url = `${API.authors.url}`
        fetch(API.authors.url)
        .then(response => response.json())
        .then(result => {
          console.log(url, result)
          const message = result.message
          if(message !== successCode) {
            reject(message)
          }else{
            resolve(result.res)
          }
        })
      } catch (e) {
         console.log(e)
         reject(e.message)
      }
    })
  }
  static save() {
    return new Promise((resolve, reject) => {
      try {
        //  {
        //   method: 'POST',
        //   mode: 'cors',
        //   body: JSON.stringify({
        //     user,
        //     last_update_by: user
        //   }),
        //   headers: new Headers({
        //     'Content-Type': 'json'
        //   })
        // }
        fetch(API.articles.url, {
          method: 'PUT',
          mode: 'cors',
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'json'
          })
        })
        .then(response => response.json())
        .then(result => {
          console.log(url, result)
          const message = result.message
          if(message !== successCode) {
            reject(message)
          }else{
            resolve(result.res)
          }
        })
      } catch (e) {
         console.log(e)
         reject(e.message)
      }
    })
  }
}
