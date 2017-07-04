import Utils from '../utils/Utils'
import marked from 'marked'
import _ from 'lodash'
// function rendeEds (content, eds) {
//   return `
//     <p class="editorhead">${eds}</p>
//     <p class="editorcontent">${content}</p>
//   `
// }

// function rendeBanner (content) {
//   const reg = /([^()]+)(?=\))/g
//   const banners = content.match(reg)
//   let html = ''
//   if (banners) {
//     html = `
//     <div class="article-banner">
//         <ul class="banner-list">
//           ${banners
//       .map((banner, index) => {
//         return `<li><img src="${banner}" alt="" height="120"><span>${index + 1}</span></li>`
//       })
//       .join('')}
//         </ul>
//       </div>
//     `
//   }
//   return html
// }

function rendeSku (content = '') {
  // const idReg = /id[:：]\s*(\d+)\s*title[:：]/
  const titleReg = /title[:：]\s*(.+)\s*price[:：]/
  const priceReg = /price[:：]\s*(.+)\s*image[:：]/
  const imageReg = /image[:：]\s*!\[.*\]\((?:https?)?(?:\/\/)?(.+)\s*\)\s*/
  // let id = content.match(idReg)
  let title = content.match(titleReg)
  let price = content.match(priceReg)
  let image = content.match(imageReg)
  // if (Utils.isValidArray(id)) {
  //   id = id[1]
  // }
  if (Utils.isValidArray(title)) {
    title = title[1]
  }
  if (Utils.isValidArray(price)) {
    price = price[1]
  }
  if (Utils.isValidArray(image)) {
    image = image[1]
  }
  // @200w_200h_1e%7C200x200-5rc
  return `<div class="articlecard bottomshadow revarticlecard">
               <img class="articleimg" src="//${image}">
               <span class="articletitle">${title}</span>
               <span class="brand">${price}</span>
               <div class="buy-button-area">
                <button class="buy-button">
                  <span>立即购买</span>
                </button>
                </div>
              </div>`
}

// function rendeArticle (content) {
//   return ''
// }

// function rendeDesc (content = '') {
//   console.log(content)
//   return `<p>${content}</p>`
// }

// ```zk
//     title: 三百元以下的情趣小厨具
//     desc: 无论是单身狗还是一对汪，一年之中总有那么几个周末想窝在家中，望望天花板，剥剥手指甲，吃吃小食，看看电视，度过一天。所以啊，小食很重要，样样不能少！怎么做？且听我慢慢道来。
//     image: ![](//content.image.alimmdn.com/cms/sites/default/files/20150903/zk/okiki.jpg)
// ```
// ```card
// title: 关爱啤酒，更关爱打泡的你
// desc: 男生嘛，肯定要来瓶啤酒潇洒一下，尤其是那口感细腻的啤酒花，绝对不能少。别再依靠土掉渣的晃动酒瓶子，来弄点儿少得可怜的啤酒花。试试电动打泡器，分分钟尽情享用爽口的啤酒。
// image: ![](//content.image.alimmdn.com/cms/sites/default/files/20150730/goodthing/BeerCover.jpg)
// ```
function rendeZKHeader (content) {
  // console.log(content)
  const titleReg = /title[:：]\s*(.+)\s*desc[:：]/
  const descReg = /desc[:：]\s*(.+)\s*image[:：]/
  const imageReg = /image[:：]\s*!\[.*\]\((?:https?)?(?:\/\/)?(.+)\s*\)\s*/
  let title = content.match(titleReg)
  let desc = content.match(descReg)
  let image = content.match(imageReg)
  if (!_.isEmpty(title)) {
    title = title[1]
  }
  if (!_.isEmpty(desc)) {
    desc = desc[1]
  }
  if (!_.isEmpty(image)) {
    image = image[1]
  }
  // console.log('title:', title)
  // console.log('desc:', desc)
  // console.log('image:', image)
  return `<div class="bottomshadow card" id="head">
                  <div>
                      <div class="mask" style="width: 720px height: 468px"></div>
                      <img class="direct" src="//${image}" data-w="640" data-h="416" style="width: 720px height: 468px">
                      <div id="headtitle"><p>${title}</p></div>
                  </div>
                  <p class="headdesc">${desc}</p>
              </div>
              <div class="headgrayband"></div>`
}
// ```zt
//     title: 三百元以下的情趣小厨具
//     desc: 无论是单身狗还是一对汪，一年之中总有那么几个周末想窝在家中，望望天花板，剥剥手指甲，吃吃小食，看看电视，度过一天。所以啊，小食很重要，样样不能少！怎么做？且听我慢慢道来。
// ```
// ```card
// title: 关爱啤酒，更关爱打泡的你
// desc: 男生嘛，肯定要来瓶啤酒潇洒一下，尤其是那口感细腻的啤酒花，绝对不能少。别再依靠土掉渣的晃动酒瓶子，来弄点儿少得可怜的啤酒花。试试电动打泡器，分分钟尽情享用爽口的啤酒。
// image: ![](//content.image.alimmdn.com/cms/sites/default/files/20150730/goodthing/BeerCover.jpg)
// ```
function rendeZTHeader (content) {
  const titleReg = /title[:：]\s*(.+)\s*desc[:：]/
  const descReg = /desc[:：]\s*(.+)\s*(?:image[:：])?/
  let title = content.match(titleReg)
  let desc = content.match(descReg)
  if (!_.isEmpty(title)) {
    title = title[1]
  }
  if (!_.isEmpty(desc)) {
    desc = desc[1]
  }
  return `<div class="headdesc bottomshadow zthead">
                    <h4>${title}</h4>
                    <p>${desc || ''}</p>
                  </div>
                  <div class="grayband"></div>`
}

function rendeCard (content, md) {
  const idReg = /id[:：]\s*(\d+)\s*title[:：]/
  const titleReg = /title[:：]\s*(.+)\s*desc[:：]/
  const descReg = /desc[:：]\s*(.+)\s*(?:image[:：])?/
  const imageReg = /image[:：]\s*!\[.*\]\((?:https?)?(?:\/\/)?(.+)\s*\)\s*/
  let id = content.match(idReg)
  let title = content.match(titleReg)
  let desc = content.match(descReg)
  let image = content.match(imageReg)
  if (!_.isEmpty(id)) {
    id = id[1]
  }
  if (!_.isEmpty(title)) {
    title = title[1]
  }
  if (!_.isEmpty(desc)) {
    desc = desc[1]
  }
  if (!_.isEmpty(image)) {
    image = image[1]
  }
  // console.log(md)
  if (md.indexOf(/```\s*zk/) !== -1) {
    return `<div class="bottomshadow card goodthing" data-href="//c.diaox2.com/view/app/?m=show&id=${id}">
                <div class="wrapper">
                        <div class="img">
                          <img class="direct" src="//${image}" data-w="596" data-h="486" style="width: 672px height: 547px">
                        </div>
                        </div>
                        <p class="title">${title}</p>
                        <p class="desc">${desc}</p>
                        <div class="pseudoB"><p>查看详情</p><span>立即购买</span></div>
                    </div>
                    <div class="headgrayband"></div>
                    `
  } else {
    return `<div class="articlecard ztcard" data-href="//c.diaox2.com/view/app/?m=show&id=${id}">
                      <div class="ztleft">
                        <img src="//${image}">
                      </div>
                      <div class="ztright">
                        <p class="p1">${title}</p>
                        <p class="p2">${desc}</p>
                        <p class="p3" data-id="${4294967297 * id}">阅读 ...</p>
                      </div>
                    </div>
                    <hr class="articlesep">
                    `
  }
}

function rende (md) {
  // console.log('md\'s getter named html exec ...')
  // console.log('md is null:', state.md === '')
  const renderer = new marked.Renderer()
  const options = {
    // gfm default: false github flavored markdown github风格的markdown
    gfm: true,
    // tables default: true 使用 gfm 风格的表格，想要这个生效，需要设置 gfm 为 true
    tables: true,
    // breaks default: false 使用 gfm 风格的断行（line breaks），想要这个生效，需要设置 gfm 为 true
    breaks: false, // 按一次enter键，还是在一个p标签里，不过使用<br>来换行了，按两次enter键，就变成了两个p标签
    // pedantic default: false 学究式的 尽量遵从markdown.pl的复杂部分，不修复任何markdown的bug和奇怪行为
    pedantic: false,
    // sanitize default: false 净化、清洁  净化输出，忽略html标签。如果设置为true，<span style="color:red">红</span>将不起作用
    sanitize: false,
    // smartLists default: true 使用相对于原始markdown语法智能的表格
    smartLists: true,
    // smartypants default: false 与标点符号有关
    smartypants: false
  }
  // 2017-05-16 title不需要从markdown中拿，而是要从Edit.vue中的title的input中拿
  // let title = ''
  renderer.heading = (content, level) => {
    const { isAnchor, anchor, text } = Utils.anchorHandler(content)
    let ret = ''
    if (isAnchor) {
      ret = `<h${level} id="${anchor}">${text}</h${level}>`
    } else {
      ret = `<h${level}>${text}</h${level}>`
    }
    return ret
  }

  renderer.paragraph = content => {
    const { isAnchor, anchor, text } = Utils.anchorHandler(content)
    const edsReg = /^eds\s*?(?!desc)/i
    const edsdescReg = /^edsdesc\s+/i
    const liftReg = /^lift\s+/i
    const lift2Reg = /^lift2\s+/i
    const skuReg = /^sku\s+/i
    let ret = ''
    if (isAnchor) {
      ret = `<p id="${anchor}">${text}</p>`
    } else if (edsReg.test(text)) {
      let edscontent = text.replace(edsReg, '') || '小编说'
      ret = `<p class="editorhead">${edscontent}</p>`
    } else if (edsdescReg.test(text)) {
      ret = `<p class="editorcontent">${text.replace(edsdescReg, '')}</p>`
    } else if (liftReg.test(text)) {
      ret = `<p class="lift"><em>${text.replace(liftReg, '')}</em></p>`
    } else if (lift2Reg.test(text)) {
      ret = `<p class="lift2">${text.replace(lift2Reg, '')}</p>`
    } else if (skuReg.test(text)) {
      return `<p class="sku">${text.replace(skuReg, '')}</p>`
      // let sid = text.replace(skuReg, '')
      // if (sid && (sid = sid.trim()) && /^\d+$/.test(sid)) {
      //   const xhr = new window.XMLHttpRequest()
      //   xhr.open('GET', `http://s5.a.dx2rd.com:3000/v1/getsimplesku/${sid}`, false)
      //   xhr.send(null)
      //   xhr.onreadystatechange = () => {
      //     if (xhr.readyState === 4 && xhr.status === 200) {
      //       console.log(xhr.responseText)
      //     }
      //   }
      //   ret = `<p class="sku">${text.replace(skuReg, '')}</p>`
      // }
    } else {
      ret = `<p>${text}</p>`
    }
    return ret
  }

  // renderer.blockquote = (content) => {
  //   const {isAnchor, anchor, text} = Utils.anchorHandler(content)
  //   let ret = ''
  //   if (isAnchor) {
  //     ret = `<p id="${anchor}">${text}</p>`
  //   } else {
  //     ret = `<p>${text}</p>`
  //   }
  //   return ret
  // }

  /**
     * codespan 前后都有一个空的p标签，太奇怪了
     * 经过测试，发现是这个问题：
     *  由于p标签不能嵌套
     *  所以 <p><p>这是内部的p标签</p></p>
     *  将会解析成
     *   <p></p>
     *   <p>这是内部的p标签</p>
     *   <p></p>
     */
  renderer.codespan = text => {
    // console.log(text)
    // return text
    return `<p class="lift">${text}</p>`
  }

  renderer.link = (href, title = '', text = '') => {
    // console.log('href:', href)
    // console.log('title:', title)
    // console.log('text:', text)
    let imgReg = /\s*img:\s*/
    let imgUrl = ''
    if (imgReg.test(href)) {
      [href, imgUrl] = href.split(imgReg)
      text += `<img src="${imgUrl}">`
    }
    if (/^\d+$/.test(href)) {
      if (href == 7216) {
        href = '//c.diaox2.com/view/app/?m=pcollection'
      } else {
        href = `//www.diaox2.com/article/${href}.html`
      }
    } else if (/pcollection/i.test(href)) {
      href = '//c.diaox2.com/view/app/?m=pcollection'
    }
    return `<a target="_blank" href="${href}">${text || href}</a>`
  }
  // renderer.image = (href, title, text) => {
  //   return `<img src="${href}" alt="${title || ''}"></img>`
  // }
  // renderer.paragraph = (text) => {
  //   // console.log(text)
  //   // if(!text || /^\s+$/.test(text)){
  //   //   console.log('!text.trim()命中：',text)
  //   //   // return ''
  //   // }
  //   // if(/^<img.+>$/.test(text)){
  //   //   console.log('/\^<img.*\>&/命中：', text)
  //   //   return text
  //   // }
  //   // console.log(!text || /^\s+$/.test(text))
  //   // console.log(/^<img.+>$/.test(text))
  //   // return `<p>${text}</p>`
  //   return text
  // }
  // ```zk
  //     title: 三百元以下的情趣小厨具
  //     desc: 无论是单身狗还是一对汪，一年之中总有那么几个周末想窝在家中，望望天花板，剥剥手指甲，吃吃小食，看看电视，度过一天。所以啊，小食很重要，样样不能少！怎么做？且听我慢慢道来。
  //     image: ![](//content.image.alimmdn.com/cms/sites/default/files/20150903/zk/okiki.jpg)
  // ```
  // ```card
  // title: 关爱啤酒，更关爱打泡的你
  // desc: 男生嘛，肯定要来瓶啤酒潇洒一下，尤其是那口感细腻的啤酒花，绝对不能少。别再依靠土掉渣的晃动酒瓶子，来弄点儿少得可怜的啤酒花。试试电动打泡器，分分钟尽情享用爽口的啤酒。
  //     image: ![](//content.image.alimmdn.com/cms/sites/default/files/20150730/goodthing/BeerCover.jpg)
  // ```
  md = md || ''
  renderer.code = (content, type) => {
    // console.log(type)
    // const EDS = 'eds'
    // let eds = ''
    // if (type.indexOf(EDS) !== -1) {
    //   eds = type.replace(EDS, '') || '小编说'
    //   type = EDS
    // }
    let ret = ''
    switch (type) {
      // case EDS:
      //   ret = rendeEds(content, eds)
      //   break
      case 'sku':
        ret = rendeSku(content)
        break
      // case 'article':
      //   ret = rendeArticle(content)
      //   break
      case 'zk':
        ret = rendeZKHeader(content)
        break
      case 'zt':
        ret = rendeZTHeader(content)
        break
      case 'card':
        ret = rendeCard(content, md)
        break
      // default:
      //   ret = rendeDesc(content)
      //   break
    }
    return ret
  }
  options.renderer = renderer
  marked.setOptions(options)
  const lexer = new marked.Lexer(options)
  // console.log('markdown.js md:', md)
  // console.log(lexer)
  // const tokens = lexer.lex(md)
  // console.log(tokens)
  return marked(md, (err, content = '') => {
    if (err) {
      console.log(err)
    }
    return content
  })
}

export default rende
