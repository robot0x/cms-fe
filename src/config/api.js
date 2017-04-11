// https://github.com/liaoruoxue/pm2rd/issues/73
const debug = process.env.NODE_ENV !== 'production'
const API = (function () {
  // const fetchURL = '//c.diaox2.com/view/app'
  // const fetchURL = '//127.0.0.1:3000'
  // const fetchURL = '//123.56.242.50:3000' // beijing1 ip
  const fetchURL = debug? '//127.0.0.1:3000': '//bj1.a.dx2rd.com:3000'
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
    },
    // 作者编辑相关接口
    authors: {
      url: `${fetchURL}/authors`
    }
  }
}())
export default API
export const HEADER = {'Content-Type': 'application/json'}
