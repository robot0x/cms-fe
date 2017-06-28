// import iFetch from '../Utils/iFetch'
import fetch from 'isomorphic-fetch';
import API from '../config/api';

export default class Tags {
  static getAllTags () {
    return new Promise((resolve, reject) => {
      try {
        fetch(API.tags.url, {
          credentials: 'include'
        })
          .then(response => response.json())
          .then(result => {
            const { message, res, status } = result;
            if (status !== 200) {
              reject(result);
            } else {
              if (result.message !== 'SUCCESS') {
                reject(result.message);
              } else {
                const tags = result.res;
                const res = tags.map((tag, i) => {
                  tag.id = String(i);
                  if (tag.children) {
                    tag.children = tag.children.map((child, j) => {
                      child.id = i + '-' + j;
                      return child;
                    });
                  }
                  return tag;
                });
                resolve(res);
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
}
