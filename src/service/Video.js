import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import API from '../config/api';
const successCode = 'SUCCESS';

export default class Video {
  static getToken () {
    return new Promise((resolve, reject) => {
      try {
        const url = `${API.vid.url}/token`;
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
}
