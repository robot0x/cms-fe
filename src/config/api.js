// https://github.com/liaoruoxue/pm2rd/issues/73
const API = (function () {
  // const fetchURL = '//c.diaox2.com/view/app'
  // const fetchURL = '//127.0.0.1:3000'
  const fetchURL = '//172.16.1.121:3000'
  // 下列接口都是GET请求
  return {
    articles: {
      url: `${fetchURL}/articles`
    },
    images: {
      url: `${fetchURL}/images`
    },
    users: {
      url: `${fetchURL}/users`
    },
    // 礼物搜索接口
    tags: {
      url: `${fetchURL}/tags`
    }
  }
}())
export default API
export const HEADER = {'Content-Type': 'application/json'}
