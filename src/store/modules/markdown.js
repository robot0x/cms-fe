import marked from 'marked'
import _ from 'lodash'

function rendeEds(content, eds) {
  return `
    <p class="editorhead">${eds}</p>
    <p class="editorcontent">${content}</p>
  `
}

function rendeBanner(content) {
  const reg = /([^\(\)]+)(?=\))/g
  const banners = content.match(reg)
  let html = ''
  if(banners){
    html = `
    <div class="article-banner">
        <ul class="banner-list">
          ${banners.map((banner, index) => {
            return `<li><img src="${banner}" alt="" height="120"><span>${index + 1}</span></li>`
          }).join('')}
        </ul>
      </div>
    `
  }
  return html
}

function rendeSku(content = '') {
  console.log(content)
  const contents = content.split(/\s/)
  console.log(contents)
  let skuCardHtml = ''
  for(let cont of contents){
    cont = _.toSafeInteger(cont)
    if( cont ){
      skuCardHtml += `<p>${cont}</p>`
    }
  }
  return skuCardHtml
}

function rendeArticle(content) {
  return ''
}

const state = {
  md: ''
}

// https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
// https://help.github.com/categories/writing-on-github/
const getters = {
  html: (state, getters, rootState) => {
    console.log('md\'s getter named html exec ...')
    console.log('md is null:', state.md === '')
    const renderer = new marked.Renderer
    const options = {
      // default: false github flavored markdown github风格的markdown
      gfm: true,
      // default: true 使用 gfm 风格的表格，想要这个生效，需要设置 gfm 为 true
      tables: true,
      // default: false 使用 gfm 风格的断行（line breaks），想要这个生效，需要设置 gfm 为 true
      breaks: true, // 按一次enter键，还是在一个p标签里，不过使用<br>来换行了，按两次enter键，就变成了两个p标签
      // default: false 学究式的 尽量遵从markdown.pl的复杂部分，不修复任何markdown的bug和奇怪行为
      pedantic: false,
      // default: false 净化、清洁  净化输出，忽略html标签。如果设置为true，<span style="color:red;">红</span>将不起作用
      sanitize: false,
      // default: true 使用相对于原始markdown语法智能的表格
      smartLists: true,
      // default: false 与标点符号有关
      smartypants: false
    }
    let title = ''
    renderer.heading = (text, level) => {
      if(text && text.trim()){
        title = text
      }
      return '<h' + level + '>' + title + '</h' + level + '>'
    }

    renderer.link = (href, title = '', text ) => {
      if(/^\d+$/.test(href)){
        href = `//www.diaox2.com/article/${href}.html`
      }
      return `<a target="_blank" href="${href}">${text || href}</a>`
    }

    renderer.code = (content, type) => {
      const EDS = 'eds'
      let eds = ''
      if( type.indexOf(EDS) !== -1 ) {
        eds = type.replace(EDS, '') || '小编说'
        type = EDS
      }
      let ret = ''
      switch (type) {
        case EDS:
          ret = rendeEds(content, eds)
          break;
        case 'sku':
          ret = rendeSku(content)
          break;
        case 'banner':
          ret = rendeBanner(content)
          break;
        case 'article':
          ret = rendeArticle(content)
          break;
      }
      return ret
    }
    options.renderer = renderer
    marked.setOptions(options)
    const {md} = state
    return marked(md, (err, content) => {
      return {
        md,
        content,
        title,
      }
    })
  }
}

// const actions = {}

const mutations = {
  change (state, payload) {
    state.md = payload
  }
}

export default {
  state,
  getters,
  // actions,
  mutations
}
