// https://github.com/liaoruoxue/pm2rd/issues/73
const debug = process.env.NODE_ENV !== 'production'
// cms-be端口
const port = 3000
const API = (function () {
  const fetchURL = debug ? '//127.0.0.1:' + port : 'http://z.diaox2.com:' + port
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
    },
    // 作者编辑相关接口
    vid: {
      url: `${fetchURL}/vid`
    }
  }
}())
export default API
export const HEADER = {'Content-Type': 'application/json'}
