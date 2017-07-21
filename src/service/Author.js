// import iFetch from '../Utils/iFetch'
import fetch from 'isomorphic-fetch';
import API from '../config/api';
import _ from 'lodash';
const successCode = 'SUCCESS';

export default class Author {
  static getAuthors (query) {
    return new Promise((resolve, reject) => {
      try {
        console.log(query);
        let { offset, pageSize } = query;
        let queryString = '';
        if (_.isInteger(pageSize)) {
          if (!_.isInteger(offset)) {
            offset = 0;
          }
          queryString = `${queryString ? '&' : '?'}offset=${offset}&limit=${pageSize}`;
          // queryString = queryString ? queryString + `&offset=${offset}&limit=${pageSize}`: `?offset=${offset}&limit=${pageSize}`
        }
        const url = `${API.authors.url}/${queryString}`;
        fetch(url, {
          credentials: 'include'
        })
          .then(response => response.json())
          .then(result => {
            console.log(url, result);
            const { message, status } = result;
            if (status !== 200) {
              reject(result);
            } else {
              if (message !== successCode) {
                reject(result);
              } else {
                resolve(result.res);
              }
            }
          });
      } catch (e) {
        console.log(e);
        reject(e.message);
      }
    });
  }
  /**
   * 获取按照作者名的统计数据
   */
  static getUserAndCount () {
    return new Promise((resolve, reject) => {
      try {
        fetch(API.authors.url, {
          credentials: 'include'
        })
          .then(response => response.json())
          .then(result => {
            const { message, res, status } = result;
            if (status !== 200) {
              reject(result);
            } else {
              if (message !== successCode) {
                reject(result);
              } else {
                resolve(result.res);
              }
            }
          })
          .catch(({ message }) => {
            reject(message);
          });
      } catch (e) {
        console.log(e);
        reject(e.message);
      }
    });
  }
  static update (data) {
    console.log(data);
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
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'json'
          })
        })
          .then(response => response.json())
          .then(result => {
            console.log(API.authors.url, result);
            const { message, status } = result;
            if (status !== 200) {
              reject(result);
            } else {
              if (message !== successCode) {
                reject(result);
              } else {
                resolve(result.res);
              }
            }
          });
      } catch (e) {
        console.log(e);
        reject(e.message);
      }
    });
  }
}
