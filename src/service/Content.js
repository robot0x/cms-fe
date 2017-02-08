import content from '../mocks/content'
import fetch from 'isomorphic-fetch'
const CTYPES = ['好物', '专刊', '专题', '首页', '测评', '长文']

export default class Content {
  static getContent(id){
    return new Promise((resolve, reject) => {
      try {
        if(id){
          // 组装数据
          const lockedBy = content.lockedBy
          if(lockedBy){
            content.locked = true
          }
          content.ctypes = CTYPES
          content.keywords = content.keywords.map(keyword => { return { name: keyword, type: 'primary' } })
          // content.tags = content.tags.map((tag, i) => {
          //   return {
          //     label: tag,
          //     value: i
          //   }
          // })
          content.ctypes = content.ctypes.map((ctype, i) => { return { label: ctype, value: i } })
          console.log(content);
          resolve(content)
        } else {
          resolve(Content.getContentFormLocal())
        }
      } catch (e) {
        reject(e.message)
      } finally {

      }
    })
  }

  static save(){
    return new Promise((resolve, reject) => {
      try {
        resolve()
      } catch (e) {
        reject(e.message)
      } finally {

      }
    })
  }

  static getContentFormLocal () {
      return {
        text: localStorage.getItem('article') || `# 这是文章标题

\`\`\`eds
感谢美国TSI公司的搭理支持
\`\`\`

你好

我是文章

![](//content.image.alimmdn.com/cms/sites/default/files/20161110/firstpage/all2-logo.jpg@768w_1l)

1. 你好
2. 呵呵

> 这个很好啊


- 呵呵
- 嘎嘎

## 这是标题

### 这是另一个标题

<-- iframe height=498 width=510 src='http://player.youku.com/embed/XNjM3NDgxMjY0' frameborder=0 'allowfullscreen'></iframe -->

你好

aswdeasdas

asdsada`
      }
  }

  static setContentToLocal () {

  }

}
