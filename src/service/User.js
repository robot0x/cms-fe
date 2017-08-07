// import iFetch from '../Utils/iFetch'
import fetch from 'isomorphic-fetch';
import API from '../config/api';
import Utils from '../utils/Utils';
const successCode = 'SUCCESS';

export default class User {
  static modifyPassword (username, password) {
    let msg = '';
    if (!username) {
      msg = '用户名不能为空';
    } else if (!password) {
      msg = '密码不能为空';
    }
    return new Promise((resolve, reject) => {
      try {
        if (!msg) {
          fetch(`${API.users.url}/`, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
              username,
              password
            }),
            headers: new Headers({
              'Content-Type': 'json'
            })
          })
            .then(response => response.json())
            .then(result => {
              console.log(result);
              if (result.message !== successCode) {
                reject(result.message);
              } else {
                if (result.res.action) {
                  resolve();
                } else {
                  reject('修改失败，请联系管理员@大哥');
                }
              }
            })
            .catch(({ message }) => {
              reject(message);
            });
        } else {
          reject(msg);
        }
      } catch (e) {
        console.log(e);
        reject(e.message);
      }
    });
  }
  static auth (username, password) {
    let msg = '';
    if (!username) {
      msg = '用户名不能为空';
    } else if (!password) {
      msg = '密码不能为空';
    }
    return new Promise((resolve, reject) => {
      try {
        if (!msg) {
          fetch(`${API.users.url}/?user=${username}&password=${password}`, {
            credentials: 'include'
          })
            .then(response => response.json())
            .then(result => {
              console.log(result);
              if (result.message !== successCode) {
                reject(result.message);
              } else {
                if (result.res.auth) {
                  console.log('result.res.token:', result.res.token);
                  // 一定要设置第三个参数，不然其值就为5，这不是我们想要的
                  Utils.setCookie('token', result.res.token, 0)
                  resolve();
                  // reject()
                } else {
                  reject('帐号或密码错误，请重试');
                }
              }
            })
            .catch(({ message }) => {
              reject(message);
            });
        } else {
          reject(msg);
        }
      } catch (e) {
        console.log(e);
        reject(e.message);
      }
    });
  }
  /**
   * select * from table limit offset pageSize where query
   */
  static getArticles (query) {
    return new Promise((resolve, reject) => {
      try {
      } catch (e) {
        console.log(e);
        reject(e.message);
      }
    });
  }
}
