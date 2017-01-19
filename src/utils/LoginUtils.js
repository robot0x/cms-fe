import Utils from './Utils'

class LoginUtils {

  static get IS_LOGIN () {
    return 'isLogin'
  }

  static get USERNAME () {
    return 'username'
  }
  // 判断用户是否登录。在路由钩子里调用，因为此时 store 还没有被注入到实例中，
  // 所以在路由钩子中，无法访问store，只能退而求其次地用本地存储解决
  static checkLogin () {
    // return Utils.stringToBoolean( localStorage.getItem(LoginUtils.IS_LOGIN) ) ||
    //        Utils.stringToBoolean( sessionStorage.getItem(LoginUtils.IS_LOGIN) )

    return Utils.stringToBoolean( Utils.getCookie(LoginUtils.IS_LOGIN) ) ||
           Utils.stringToBoolean( sessionStorage.getItem(LoginUtils.IS_LOGIN) )
  }

  static getUsername () {
    // return localStorage.getItem(LoginUtils.USERNAME) || sessionStorage.getItem(LoginUtils.USERNAME)
    return Utils.getCookie(LoginUtils.USERNAME) || sessionStorage.getItem(LoginUtils.USERNAME)
  }

  static login (username, reme = true) {

    if( reme ){
      Utils.setCookie(LoginUtils.IS_LOGIN, true)
      Utils.setCookie(LoginUtils.USERNAME, username)

      sessionStorage.setItem(LoginUtils.IS_LOGIN, false)
      sessionStorage.setItem(LoginUtils.USERNAME, '')
    }else{
      sessionStorage.setItem(LoginUtils.IS_LOGIN, true)
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

  static logout (username) {
    // localStorage.setItem(LoginUtils.IS_LOGIN, false)
    // localStorage.setItem(LoginUtils.USERNAME, '')
    Utils.setCookie(LoginUtils.IS_LOGIN, false)
    Utils.setCookie(LoginUtils.USERNAME, '')

    sessionStorage.setItem(LoginUtils.IS_LOGIN, false)
    sessionStorage.setItem(LoginUtils.USERNAME, '')
  }



}

export default LoginUtils
