// import iFetch from '../Utils/iFetch'
import fetch from 'isomorphic-fetch'
import API from '../config/api'
import _ from 'lodash'
const successCode = 'SUCCESS'

export default class Author {
  static getAuthors (query) {
    return new Promise((resolve, reject) => {
      try {
        console.log(query)
        let {offset, pageSize} = query
        let queryString = ''
        if(_.isInteger(pageSize)){
          if(!_.isInteger(offset)){
            offset = 0
          }
          queryString = `${queryString? '&' : '?'}offset=${offset}&limit=${pageSize}`
          // queryString = queryString ? queryString + `&offset=${offset}&limit=${pageSize}`: `?offset=${offset}&limit=${pageSize}`
        }
        const url = `${API.authors.url}/${queryString}`
        fetch(url)
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
  static update(data) {
    console.log(data)
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
        fetch(API.authors.url, {
          method: 'PUT',
          mode: 'cors',
          body: JSON.stringify(data),
          headers: new Headers({
            'Content-Type': 'json'
          })
        })
        .then(response => response.json())
        .then(result => {
          console.log(API.authors.url, result)
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
