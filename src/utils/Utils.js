/*
 * @Author: liyanfeng
 * @Date: 2017-05-16 17:53:58
 * @Last Modified by: liyanfeng
 * @Last Modified time: 2017-05-25 16:59:24
 */
import _ from 'lodash';
import LoginUtils from './LoginUtils';
class Utils {
  /**
   * @static
   * @param {array} allTags [{}]
   * @param {string} id '6-1'
   * @returns [{tag1: '吃喝旅行', tag2: '休闲零食'}]
   *
   * @memberof Utils
   */
  static findTagById (allTags, ids) {
    let ret = []
    for (let id of ids) {
      for (let tag of allTags) {
        let { children } = tag;
        for (let child of children) {
          if (id === child.id) {
            ret.push({
              tag1: tag.name,
              tag2: child.name
            })
          }
        }
      }
    }
    return ret;
  }
  static findByTag2 (allTags, t2s) {
    console.log('allTags:', allTags);
    console.log('t2s:', t2s);
    let ret = [];
    for (let tag of t2s) {
      for (let tagObj of allTags) {
        let { children } = tagObj;
        for (let child of children) {
          if (tag === child.name) {
            ret.push(child.id);
          }
        }
      }
    }
    return ret;
  }
  /**
   * @static
   * @param {string} text
   * @returns {object} {isAnchor: boolean, text: string}
   * @memberof Utils
   * 输入一段文本，按照约定好的markdown anchor语法，输出对象
   * 比如 "aanchor 这是一段儿文本" 输出 {isAnchor: true, anchor:'anchor', text: '这是一段儿文本'}
   *      "a锚点 这是一段儿文本" 输出 {isAnchor: true, anchor:'锚点', text: '这是一段儿文本'}
   *      "a锚点 a呵呵 这是一段儿文本" 输出 {isAnchor: true, anchor:'锚点', text: 'a呵呵 这是一段儿文本'}
   *      "这是一段儿文本" 输出 {isAnchor: false, anchor:'', text: '这是一段儿文本'}
   */
  static anchorHandler (text) {
    if (!text) return text;
    const anchorReg = /^a(.+?)\s+/i;
    const match = text.match(anchorReg);
    const ret = Object.create(null);
    ret.isAnchor = false;
    ret.anchor = '';
    if (match) {
      ret.isAnchor = true;
      ret.anchor = match[1];
    }
    ret.text = text.replace(anchorReg, '');
    return ret;
  }
  /**
   *
   *
   * @static
   * @param {number} ctype
   * @returns string
   *
   * @memberof Utils
   *
   * 1. firstpage (type = show)                                http://c.diaox2.com/view/app/?m=show&id=9669
   * 2. goodthing (type = show)                                http://c.diaox2.com/view/app/?m=show&id=5344
   * 3. zhuankan (type = show)                                 http://c.diaox2.com/view/app/?m=show&id=1022
   * 4. activity (type = show)                                 http://c.diaox2.com/view/app/?m=zk&id=3053
   * 5. experience (type = show )
   * 7. zdm (type = scene)线上原来出现过，但是现在没用过了      http://c.diaox2.com/view/app/?m=scene&id=3045
   * 8. ceping (type = scene)线上原来出现过，但是现在没用过了      http://c.diaox2.com/view/app/?m=scene&id=3045
   * 9. zhuanti (type = zhuanti)                                http://c.diaox2.com/view/app/?m=zt&id=7080
   */
  static convertCtype (ctype) {
    let ret = null;
    // 1-首页/2-好物/3-专刊/4-活动/5-经验/7-值得买/8-评测/9-专题
    if (Number.isInteger(+ctype)) {
      switch (ctype) {
        case 1:
          ret = '首页';
          break;
        case 2:
          ret = '好物';
          break;
        case 3:
          ret = '专刊';
          break;
        case 4:
          ret = '活动';
          break;
        case 5:
          ret = '经验';
          break;
        case 7:
          ret = '值得买';
          break;
        case 8:
          ret = '评测';
          break;
        case 9:
          ret = '专题';
          break;
      }
    } else {
      switch (ctype) {
        case '好物':
          ret = 1;
          break;
        case 1:
          ret = 2;
          break;
        case '经验':
          ret = 3;
          break;
        case '专刊':
          ret = 4;
          break;
        case '专题':
          ret = 5;
          break;
      }
    }
    return ret;
  }

  static getPaginationParam (query, offset, pageSize) {
    let param = null;
    if (query) {
      param = { ...query };
      param.offset = offset;
      param.pageSize = pageSize;
    } else {
      param = {
        offset,
        pageSize: pageSize
      };
    }
    return param;
  }
  /**
   * code:
   *  1 => true
   *  0 => false
   */
  static getBoolean (code) {
    return !!code;
    // if(typeof code === 'boolean') {
    //   return code
    // } else {
    //   return code == 0 ? false : true
    // }
  }
  /**
   * bol:
   *  true => 1
   *  false => 0
   *  此方法是_getBoolean的逆运算
   */
  static getCode (bol) {
    if (typeof bol === 'number') {
      return bol;
    } else {
      return bol ? 1 : 0;
    }
  }

  static getNewType (types = '', code, remove = false) {
    if (_.isString(types)) {
      types = types.split(',').filter(t => t.trim()).map(t => String(t));
      code = String(code);
    }
    const index = types.indexOf(code);
    if (index === -1) {
      types.push(code);
    } else if (remove) {
      types.splice(index, 1);
    }
    return types.sort().join(',');
  }

  static isLocked (lockBy) {
    return lockBy && LoginUtils.getUsername() !== lockBy;
  }

  static clearCache (id) {
    console.log('claearCache id is ', id);
    const localStorage = window.localStorage;
    try {
      localStorage.removeItem(id);
    } catch (e) {
      console.log(e);
    }
  }

  static splitTags (tagIndex, allTags) {
    const tag = {};
    // console.log(tagIndex)
    // console.log(allTags)
    const [tag1, tag2] = tagIndex;
    // console.log(tag1)
    // console.log(tag2)
    return tag;
  }
  /**
   *
   *
   * @static
   * @param {object} image
   * @param {array} images
   * @returns boolean
   *
   * @memberof Utils
   * 根据老的images数组来判断某张image是否被更改了
   * 一张图片，用户导致可变的状态只有 type 和 used
   * 所以，我们比较两张图片的id（确认是一张图片）,type,used三个属性即可
   * 若三个属性相同，就认为没有被更改
   */
  static isModify (image, images) {
    let ret = true;
    if (!_.isEmpty(images)) {
      return !images.some(img =>
        _.isEqualWith(img, image, (img1, img2) => {
          return (
            img1.id == img2.id &&
            img1.type == img2.type &&
            img1.used == img2.used
          );
        })
      );
    }
    return ret;
  }
  static isValidString (str) {
    return _.isString(str) && str && str.trim();
  }

  static isValidArray (arr) {
    return arr && Array.isArray(arr) && arr.length > 0;
  }
  /**
   * 判断一个url是否在md中出现过
   * 被使用过返回1
   * 否则返回   0
   */
  static isUsed (md, url) {
    // console.log('[Utils.isUsed]: md is ', md)
    // console.log('[Utils.isUsed]: url is ', url)
    let used = 0;
    md = md || '';
    url = url || '';
    if (md.trim() && url.trim()) {
      // used = md.indexOf(url) > 0 ? 1 : 0
      used = md.indexOf(url) > 0;
    }
    return used;
  }
  /*
   获取文件扩展名
   'filename' -> ''
   'filename.txt' -> 'txt'
   '.hiddenfile' -> ''
   'filename.with.many.dots.ext' -> 'ext'
  */
  static getExtensionName (filename) {
    return filename
      ? filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
      : '';
  }

  static insertContent (obj, str) {
    if (document.selection) {
      let sel = document.selection.createRange();
      sel.text = str;
    } else if (
      typeof obj.selectionStart === 'number' &&
      typeof obj.selectionEnd === 'number'
    ) {
      let startPos = obj.selectionStart;
      let endPos = obj.selectionEnd;
      let cursorPos = startPos;
      let tmpStr = obj.value;
      obj.value =
        tmpStr.substring(0, startPos) +
        str +
        tmpStr.substring(endPos, tmpStr.length);
      cursorPos += str.length;
      obj.selectionStart = obj.selectionEnd = cursorPos;
    } else {
      obj.value += str;
    }
    return obj.value;
  }

  static setCookie (key, value, days = 5) {
    // 设置cookie过期事件,默认是30天
    const expire = new Date();
    // expire.setTime(expire.getTime() + days * 24 * 60 * 60 * 1000)
    // expire.setTime(expire.getTime() + days * 86400000)
    expire.setTime(expire.getTime() + days * 864e5);
    document.cookie =
      key + '=' + encodeURIComponent(value) + 'expires=' + expire.toGMTString();
  }

  static deleteCookie (key) {
    const expire = new Date();
    expire.setTime(expire.getTime() - 1);
    const cval = Utils.getCookie(key);
    // 把toGMTString改成了toUTCString，两者等价。但是ECMAScript推荐使用toUTCString方法。toGMTString的存在仅仅是
    // 为了向下兼容
    if (cval != null) {
      document.cookie = key + '=' + cval + 'expires=' + expire.toUTCString();
    }
  }

  static getCookie (key) {
    let arr;
    const reg = new RegExp('(^| )' + key + '=([^]*)(|$)');
    if ((arr = document.cookie.match(reg))) {
      return decodeURIComponent(arr[2]);
    } else {
      return null;
    }
  }
}
// Utils.anchorHandler('aanchor 这是一段儿文本')
// Utils.anchorHandler('a锚点 这是一段儿文本')
// Utils.anchorHandler('a锚点 a呵呵 这是一段儿文本')
// Utils.anchorHandler('这是一段儿文本')
export default Utils;
