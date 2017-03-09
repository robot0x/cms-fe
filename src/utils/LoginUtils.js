import Utils from './Utils'

class LoginUtils {
  
  // 不设置为true，防止猜出语义
  static get FLAG () {
    return +new Date
  }

  static get IS_LOGIN () {
    // return 'isLogin'
    // 为了安全性，改为没有含义的字段
    // 是否
    return '_sf'
  }

  static get USERNAME () {
    // return 'username'
    // hm 户名
    return '_hm__'
  }
  // 判断用户是否登录。在路由钩子里调用，因为此时 store 还没有被注入到实例中，
  // 所以在路由钩子中，无法访问store，只能退而求其次地用本地存储解决
  static checkLoginInfo () {
    // return LoginUtils.stringToBoolean( localStorage.getItem(LoginUtils.IS_LOGIN) ) ||
    //        LoginUtils.stringToBoolean( sessionStorage.getItem(LoginUtils.IS_LOGIN) )

    return LoginUtils.stringToBoolean( Utils.getCookie(LoginUtils.IS_LOGIN) ) ||
           LoginUtils.stringToBoolean( sessionStorage.getItem(LoginUtils.IS_LOGIN) )
  }

  static getUsername () {
    // return localStorage.getItem(LoginUtils.USERNAME) || sessionStorage.getItem(LoginUtils.USERNAME)
    return Utils.getCookie(LoginUtils.USERNAME) || sessionStorage.getItem(LoginUtils.USERNAME)
  }

  // 设置本地的登录标志，如果是记住我，则使用sessionStorage来存储
  // 否则用cookie
  static setLoginInfo (username, reme = true) {

    if( reme ){
      Utils.setCookie(LoginUtils.IS_LOGIN, LoginUtils.FLAG)
      Utils.setCookie(LoginUtils.USERNAME, username)

      sessionStorage.removeItem(LoginUtils.IS_LOGIN)
      sessionStorage.removeItem(LoginUtils.USERNAME)
    }else{
      sessionStorage.setItem(LoginUtils.IS_LOGIN, LoginUtils.FLAG)
      sessionStorage.setItem(LoginUtils.USERNAME, username)

      Utils.deleteCookie(LoginUtils.IS_LOGIN)
      Utils.deleteCookie(LoginUtils.USERNAME)
    }

    // if( reme ){
    //   localStorage.setItem(LoginUtils.IS_LOGIN, true)
    //   localStorage.setItem(LoginUtils.USERNAME, username)
    //
    //   sessionStorage.setItem(LoginUtils.IS_LOGIN, false)
    //   sessionStorage.setItem(LoginUtils.USERNAME, '')
    // }else{
    //   sessionStorage.setItem(LoginUtils.IS_LOGIN, true)
    //   sessionStorage.setItem(LoginUtils.USERNAME, username)
    //
    //   localStorage.setItem(LoginUtils.IS_LOGIN, false)
    //   localStorage.setItem(LoginUtils.USERNAME, '')
    // }
  }

  // 清空所有本地的与登录有关的缓存
  static clearLoginInfo (username) {
    // localStorage.setItem(LoginUtils.IS_LOGIN, false)
    // localStorage.setItem(LoginUtils.USERNAME, '')
    Utils.deleteCookie(LoginUtils.IS_LOGIN)
    Utils.deleteCookie(LoginUtils.USERNAME)

    sessionStorage.removeItem(LoginUtils.IS_LOGIN)
    sessionStorage.removeItem(LoginUtils.USERNAME)
  }

  // static auth(username = '', password = '', cb){
  //   let message = ''
  //   if( !username ){
  //     message = '用户名不能为空'
  //   }else if( !password ){
  //       message = '密码不能为空'
  //   }
  //   if(cb){
  //     if( message ){
  //       cb(message)
  //     }else{
  //       setTimeout(() => {
  //         cb()
  //       }, 2000)
  //     }
  //   }
  // }

  static stringToBoolean (str) {
    let ret = false
    if( str && str !== '0'){
      ret = true
    }
    return ret
  }

}

export default LoginUtils
