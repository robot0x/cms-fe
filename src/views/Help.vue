<template>
 <div class="page-help">
   <div class="editor-area">
     <raw-editor
       class="raw-editor"
       :class="{'left-small': leftSmall}"
       :content="text">
     </raw-editor>
     <render-editor class="render-editor" :class="{'right-small': rightSmall}"></render-editor>
     <max-window @open="open"></max-window>
   </div>
 </div>
</template>
<script>
import RawEditor from '../components/RawEditor'
import RenderEditor from '../components/RenderEditor'
import MaxWindow from '../components/MaxWindow'
export default {
  components: {
    RawEditor,
    RenderEditor,
    MaxWindow
  },
  data () {
    return {
      leftSmall: false,
      rightSmall: false,
      text: ''
    }
  },
  created () {
/**
 * 真实奇怪的一个问题，代码的格式竟然会影响执行。。。
 * 后续需要查看是神原因
 */
var text = `
# 这是这篇教程的标题

\`\`\`banner

![](http://a.diaox2.com/cms/sites/default/files/20170322/firstpage/zhaopinbanner.jpg)

![](//a.diaox2.com/cms/sites/default/files/20170323/firstpage/324fulaidaybanner.jpg)

![](//a.diaox2.com/cms/sites/default/files/20170323/6666666.jpg)

![](//content.image.alimmdn.com/cms/sites/default/files/20170322/goodthing/fengmiantu4.jpg@768w_1l)

\`\`\`

\`\`\`eds大哥说
这是小编说的内容，eds即editor say的缩写。可以在eds后加入任何标题，例如“作者说”。
若省略的话，则默认为“小编说”。
\`\`\`

CMS系统支持的浏览器为（排名有先后）：

1. Chrome
2. Safari
3. Opera
4. Firefox
5. Edge
6. IE9以上的浏览器

CMS系统的特点是：

* markdown实时渲染，编辑可迅速看到大致的渲染效果
* 文章有本地缓存，若忘记保存，下次进来优先加载本地缓存
*  其他的也想不起来了。

这是插入图片：

![](http://content.image.alimmdn.com/cms/sites/default/files/20170322/firstpage/heying.JPG@768w_1l)

文章内容直接在这儿写，例如：

「有调」正在成为一个极致生活用品的消费决策指南

为那些不肯将就的你找到书写最顺畅的笔、穿着最透气的袜子、真的有用的防雾霾口罩，让你使用的都是最安全、最放心、功能性最强的产品；


## 这是大红条标题

天王盖地虎哦，宝塔震河妖

### 这是小红条标题

滁河日党务，旱地和下土

> 这是内容引用，前面加一个“>”和空格即可

这个段落中含有我们的其他[文章的链接](9466)，只需要在"()”填写我们的文章id即可

这个段落中含有引用非文章[链接](http://www.diaox2.com)

技术支持：有问题报给@李彦峰（大哥）
`;
  // this.$nextTick(() => {
    this.text = text
  // })
  },
  methods: {
    open(dir) {
      const True = true
      const False = false
      switch (dir) {
        case 'left':
          this.rightSmall = True
          this.leftSmall = False
          break;
        case 'right':
          this.leftSmall = True
          this.rightSmall = False
          break;
        default:
          this.leftSmall = False
          this.rightSmall = False
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.page-help {
    padding: 10px;
    height: 100%;
}

.editor-area {
    height: 100%;
    display: flex;
    background: #f7f7f7;
}

.raw-editor {
    margin-right: 10px;
}

.raw-editor,
.render-editor {
    flex: 7;
    transition: all 0.2s ease-in-out;
}

.render-editor {
    flex: 6;
}
.left-small,
.right-small {
    flex: 0;
    padding: 0;
    margin: 0;
}

</style>
