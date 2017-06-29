/*
 * @Author: liyanfeng
 * @Date: 2017-05-16 17:53:58
 * @Last Modified by: liyanfeng
 * @Last Modified time: 2017-06-29 11:50:23
 */
import _ from 'lodash';
import LoginUtils from './LoginUtils';
class Utils {
  /**
   * 判断一个url是否包含 形如 http:// or https:// or // 协议头
   */
  static hasProtocol (url) {
    return url && Utils.HTTP_PROTOCOL_REG.test(url);
  }

  /**
   * 输入形如：
   *  1. //content.image.alimmdn.com/cms/sites/default/files/20160122/experience/kk.jpg
   *  2. http://content.image.alimmdn.com/cms/sites/default/files/20141014/firstpage/coffeelast.jpg
   *  3. https://content.image.alimmdn.com/cms/sites/default/files/20150120/experience/0_0.jpg
   * 输出：
   *  1. content.image.alimmdn.com/cms/sites/default/files/20160122/experience/kk.jpg
   *  2. content.image.alimmdn.com/cms/sites/default/files/20141014/firstpage/coffeelast.jpg
   *  3. content.image.alimmdn.com/cms/sites/default/files/20150120/experience/0_0.jpg
   */
  static removeProtocolHead (url) {
    try {
      // 如果url不存在或者不是以 http:// or https:// or // 开头，则直接返回url
      if (!Utils.hasProtocol(url)) {
        return url;
      }
      url = url.replace(Utils.HTTP_PROTOCOL_REG, '');
      return url;
    } catch (e) {
      return url;
    }
  }

  /**
   * @static
   * @param {String} url
   * @param {string} [protocol='https']
   * @returns 如果url含有协议头，直接返回，否则加上protocol参数指定的协议再返回，protocol默认为https
   * @memberof Utils
   */
  static addProtocolHead (url, protocol = 'https') {
    if (!url) return '';
    if (protocol === '//') {
      return `//${Utils.removeProtocolHead(url)}`;
    }
    // 移除协议头
    return `${protocol}://${Utils.removeProtocolHead(url)}`;
  }
  static typeToCtype (type) {
    // 1-首页/2-好物/3-专刊/4-活动/5-经验/7-值得买/8-评测/9-专题
    let ctype = 0;
    if (type === '首页' || type === 'firstpage') {
      ctype = 1;
    } else if (type === '好物' || type === 'goodthing') {
      ctype = 2;
    } else if (type === '专刊' || type === 'zhuankan') {
      ctype = 3;
    } else if (type === '活动' || type === 'activity') {
      ctype = 4;
    } else if (type === '经验' || type === 'experience') {
      ctype = 5;
    } else if (type === '专题' || type === 'zhuanti') {
      ctype = 9;
    } else if (type === '评测集合') {
      ctype = 10;
    }
    return ctype;
  }
  /**
   * @static
   * @param {array} allTags [{}]
   * @param {string} id '6-1'
   * @returns [{tag1: '吃喝旅行', tag2: '休闲零食'}]
   *
   * @memberof Utils
   */
  static findTagById (allTags, ids) {
    let ret = [];
    for (let id of ids) {
      for (let tag of allTags) {
        let { children } = tag;
        for (let child of children) {
          if (id === child.id) {
            ret.push({
              tag1: tag.name,
              tag2: child.name
            });
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
   * 比如 "$$$anchor 这是一段儿文本" 输出 {isAnchor: true, anchor:'anchor', text: '这是一段儿文本'}
   *      "$$$锚点 这是一段儿文本" 输出 {isAnchor: true, anchor:'锚点', text: '这是一段儿文本'}
   *      "$$$锚点 a呵呵 这是一段儿文本" 输出 {isAnchor: true, anchor:'锚点', text: 'a呵呵 这是一段儿文本'}
   *      "这是一段儿文本" 输出 {isAnchor: false, anchor:'', text: '这是一段儿文本'}
   *      "这是一段儿文本" 输出 {isAnchor: false, anchor:'', text: '这是一段儿文本'}
   *      "$$$youdiao <img src="http://content.image.alimmdn.com/cms/sites/default/files/20170517/firstpage/guanyupingce.jpg" alt="">"
   *      输出 {isAnchor: true, anchor:'youdiao', text: '<img src="http://content.image.alimmdn.com/cms/sites/default/files/20170517/firstpage/guanyupingce.jpg" alt="">'}
   */
  static anchorHandler (text) {
    if (!text) return text;
    /**
     * 必须是非贪婪的，只匹配到第一个空格即可，不然若后面还有空格，就会出现错误
     * 例如 $$$youdiao <img src="http://content.image.alimmdn.com/cms/sites/default/files/20170517/firstpage/guanyupingce.jpg" alt="">
     * 若是贪婪的，则会一直匹配到 alt="" 前面的空格
     */
    const anchorReg = /^\${3}(.+?) /;
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
        // case 7:
        //   ret = '值得买';
        //   break;
        // case 8:
        //   ret = '评测';
        //   break;
        case 9:
          ret = '专题';
          break;
        case 10:
          ret = '测评集合';
          break;
      }
    } else {
      switch (ctype) {
        case '首页':
          ret = 1;
          break;
        case '好物':
          ret = 2;
          break;
        case '专刊':
          ret = 3;
          break;
        case '活动':
          ret = 4;
          break;
        case '经验':
          ret = 5;
          break;
        case '专题':
          ret = 9;
          break;
        case '评测集合':
          ret = 10;
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

  static ctypeToM (ctype) {
    ctype = Number(ctype);
    // console.log(ctype)
    // 1-首页/2-好物/3-专刊/4-活动/5-经验/7-值得买/8-评测/9-专题
    let m = '';
    switch (ctype) {
      case 1:
        m = 'show';
        break;
      case 2:
        m = 'show';
        break;
      case 3:
        m = 'zk';
        break;
      case 4:
        m = 'show';
        break;
      case 5:
        m = 'show';
        break;
      case 7:
        m = 'zdm';
        break;
      case 8:
        m = 'ceping';
        break;
      case 9:
        m = 'zt';
        break;
      default:
        m = null;
    }
    return m;
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
    // path一定要设置为 / 否则由于cookie默认为同目录下可共享的，并不是整站共享
    if (days) {
      expire.setTime(expire.getTime() + days * 864e5);
      document.cookie =
        key +
        '=' +
        encodeURIComponent(value) +
        ';expires=' +
        expire.toUTCString() +
        ';path=/';
    } else {
      document.cookie = key + '=' + encodeURIComponent(value) + ';path=/';
    }
  }

  static deleteCookie (key) {
    const expire = new Date();
    expire.setTime(expire.getTime() - 1);
    const cval = Utils.getCookie(key);
    // 把toGMTString改成了toUTCString，两者等价。但是ECMAScript推荐使用toUTCString方法。toGMTString的存在仅仅是
    // 为了向下兼容
    if (cval != null) {
      document.cookie =
        key + '=' + cval + ';expires=' + expire.toUTCString() + ';path=/';
    }
  }

  static getCookie (key) {
    let arr;
    const reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
    if ((arr = document.cookie.match(reg))) {
      return decodeURIComponent(arr[2]);
    } else {
      return null;
    }
  }
}
Utils.HTTP_PROTOCOL_REG = /^(https?:)?\/\//i;
// Utils.anchorHandler('aanchor 这是一段儿文本')
// Utils.anchorHandler('a锚点 这是一段儿文本')
// Utils.anchorHandler('a锚点 a呵呵 这是一段儿文本')
// Utils.anchorHandler('这是一段儿文本')
export default Utils;
