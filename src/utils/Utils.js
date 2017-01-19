class Utils {
  static setCookie (key,value,days) {
      // 设置cookie过期事件,默认是30天
      const expire = new Date()
      days = days || 30
      expire.setTime(expire.getTime() + (+days)*24*60*60*1000)
      document.cookie = key + "="+ encodeURIComponent(value) + ";expires=" + expire.toGMTString()
  }

  static deleteCookie (key) {
      const expire = new Date()
      expire.setTime(expire.getTime() - 1)
      const cval= Utils.getCookie(key)
      if(cval!=null)
      // 把toGMTString改成了toUTCString，两者等价。但是ECMAScript推荐使用toUTCString方法。toGMTString的存在仅仅是
      // 为了向下兼容
      document.cookie= key + "="+cval+";expires=" + expire.toUTCString()
  }

  static getCookie (key) {
    let arr,reg = new RegExp("(^| )"+key+"=([^;]*)(;|$)")
    if(arr=document.cookie.match(reg)){
        return decodeURIComponent(arr[2])
    }else{
        return null
    }
  }

  static stringToBoolean (str) {
    let ret = false
    if(str === 'true'){
      ret = true
    }
    return ret
  }
}

export default Utils
