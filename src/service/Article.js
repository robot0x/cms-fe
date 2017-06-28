// import iFetch from '../Utils/iFetch'
import fetch from 'isomorphic-fetch';
import API from '../config/api';
import _ from 'lodash';
import LoginUtils from '../utils/LoginUtils';

const successCode = 'SUCCESS';
export default class Article {
  /**
 * 释放编辑锁
 */
  static releaseLock (id) {
    const currentUser = LoginUtils.getUsername();
    return new Promise((resolve, reject) => {
      try {
        // const url = `${API.articles.url}/?type=release&id=${id}&user=${currentUser}`;
        /**
         * 文章解锁和上锁，不用显示传递username的方式，因为username是存在前端cookie里的
         * 这样是不安全的，如果有人修改了cookie，则锁住文章的可能是一个很奇怪的用户名
         */
        const url = `${API.articles.url}/?type=release&id=${id}`;
        fetch(url, {
          credentials: 'include'
        })
          .then(response => response.json())
          .then(result => {
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

  static getStatistics () {
    return new Promise((resolve, reject) => {
      try {
        const url = `${API.articles.url}/?type=monthly`;
        fetch(url, {
          credentials: 'include'
        })
          .then(response => response.json())
          .then(result => {
            console.log(url, result);
            const { status, message } = result;
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

  static newArticle () {
    return new Promise((resolve, reject) => {
      try {
        const user = LoginUtils.getUsername();
        const opts = {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          body: JSON.stringify({
            user,
            last_update_by: user
          }),
          headers: new Headers({
            'Content-Type': 'json'
          })
        };
        const url = API.articles.url;
        fetch(url, opts).then(response => response.json()).then(result => {
          console.log(url, result);
          const { status, message } = result;
          if (status !== 200) {
            reject(result);
          } else {
            if (message !== successCode) {
              reject(result);
            } else {
              resolve({
                id: result.res.id,
                title: '新建文章',
                last_update_by: user,
                last_update_time: result.res.server_timestamp
              });
            }
          }
        });
      } catch (e) {
        reject(e.message);
      }
    });
  }
  /**
   * select * from table limit offset pageSize where query
   */
  static getArticles (query) {
    // debugger
    return new Promise((resolve, reject) => {
      try {
        let ret = [];
        let { type, search, offset, pageSize, like } = query;
        let queryString = '';

        if (type && search) {
          queryString = `?${type}=${search}`;
        }

        if (_.isInteger(pageSize)) {
          if (!_.isInteger(offset)) {
            offset = 0;
          }
          if (queryString) {
            queryString = queryString + `&offset=${offset}&limit=${pageSize}`;
          } else {
            queryString = `?offset=${offset}&limit=${pageSize}`;
          }
        }
        if (like) {
          if (queryString) {
            queryString += '&like';
          } else {
            queryString = '?like';
          }
        }

        const url = `${API.articles.url}/${queryString}`;
        fetch(url, {
          credentials: 'include'
        })
          .then(response => response.json())
          .then(result => {
            console.log(url, result);
            const { status, message } = result;
            if (status !== 200) {
              reject(result);
            } else {
              if (message !== successCode) {
                reject(result);
              } else {
                if (result.res) {
                  resolve(result.res);
                } else {
                  resolve({ total: 0, articles: [] });
                }
              }
            }
          })
          .catch(e => {
            console.log(e);
          });
      } catch (e) {
        // 事实上，走了这块儿
        console.log(e);
        reject(e.message);
      }
    });
  }

  static deleteArticle (id) {
    return new Promise((resolve, reject) => {
      resolve(successCode);
    });
  }

  static randArray (data, len) {
    return data.sort(() => Math.random() - 0.5).slice(0, len);
  }
}
