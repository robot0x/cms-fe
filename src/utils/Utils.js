import _ from 'lodash'
import LoginUtils from './LoginUtils'
import fetch from 'isomorphic-fetch'
class Utils {

  /**
   * code:
   *  1 => true
   *  0 => false
   */
  static getBoolean(code) {
    if(typeof code === 'boolean') {
      return code
    }
    return code == 0 ? false : true
  }
  /**
   * bol:
   *  true => 1
   *  false => 0
   *  此方法是_getBoolean的逆运算
   */
  static getCode(bol){
    if(typeof bol === 'number'){
      return bol
    }
    return bol ? 1 : 0
  }

  static getNewType (types = '', code, remove = false){
    if(_.isString(types)){
        types = types.split(',').filter(t => t.trim()).map(t => String(t))
        code = String(code)
    }
    const index = types.indexOf(code)
    if( index === -1){
      types.push(code)
    } else if(remove) {
      types.splice(index, 1)
    }
    return types.sort().join(',')
  }

  static isLocked(lock_by){
      return lock_by && LoginUtils.getUsername() !== lock_by
  }

  static clearCache(id) {
    try {
      localStorage.removeItem(id)
    } catch (e) {
      console.log(e)
    }
  }

  static splitTags(tagIndex, all_tags){
    const tag = {}
    console.log(tagIndex);
    console.log(all_tags);
    const [tag1, tag2] = tagIndex
    console.log(tag1);
    console.log(tag2);
    return tag
  }
  /**
   * 根据老的images数组来判断某张image是否被更改了
   */
  static isModify (image, images){
    let ret = true
    if(Utils.isValidArray(images)){
      return !images.some(img => _.isEqualWith(img, image, (img1, img2) =>{
          return img1.id == img2.id && img1.type == img2.type && img1.used == img2.used
      }))
    }
    return ret
  }
  static isValidString(str){
    return  _.isString(str) && str && str.trim()
  }

  static isValidArray(arr){
    return arr && Array.isArray(arr) && arr.length > 0
  }

  static clearCache (key = '') {
    localStorage.removeItem(String(key))
  }
  /**
   * 判断一个url是否在md中出现过
   * 被使用过返回1
   * 否则返回   0
   */
  static isUsed (md, url){
    let used = 0
    md = md || ''
    url = url || ''
    if(md.trim() && url.trim()){
      // used = md.indexOf(url) > 0 ? 1 : 0
      used = md.indexOf(url) > 0
    }
    return used
  }
  /*
   获取文件扩展名
   'filename'	''
   'filename.txt'	'txt'
   '.hiddenfile'	''
   'filename.with.many.dots.ext'	'ext'
  */
  static getExtensionName (filename) {
    return filename? filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2) : ''
  }

  static insertContent(obj, str) {
    if (document.selection) {
        var sel = document.selection.createRange()
        sel.text = str;
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart,
            endPos = obj.selectionEnd,
            cursorPos = startPos,
            tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += str.length;
        obj.selectionStart = obj.selectionEnd = cursorPos
    } else {
        obj.value += str;
    }
    return obj.value
  }

  static setCookie(key, value, days = 5) {
    // 设置cookie过期事件,默认是30天
    const expire = new Date()
    expire.setTime(expire.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = key + "=" + encodeURIComponent(value) + ";expires=" + expire.toGMTString()
  }

  static deleteCookie(key) {
    const expire = new Date()
    expire.setTime(expire.getTime() - 1)
    const cval = Utils.getCookie(key)
    if (cval != null)
      // 把toGMTString改成了toUTCString，两者等价。但是ECMAScript推荐使用toUTCString方法。toGMTString的存在仅仅是
      // 为了向下兼容
      document.cookie = key + "=" + cval + ";expires=" + expire.toUTCString()
  }

  static getCookie(key) {
    let arr,
      reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)")
    if (arr = document.cookie.match(reg)) {
      return decodeURIComponent(arr[2])
    } else {
      return null
    }
  }
}

export default Utils
