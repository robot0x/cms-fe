<template>
 <div class="page-help">
   <div class="editor-area">
     <raw-editor
       class="raw-editor"
       :class="{'left-small': leftSmall}"
       :content="text"
       from="help">
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

eds 大哥说

edsdesc 这是小编说的内容，eds即editor say的缩写。可以在eds后加入任何标题，例如“作者说”。
若省略的话，则默认为“小编说”。

# CMS系统浏览器支持

CMS系统支持的浏览器为（排名有先后）：

1. Chrome
2. Safari
3. Opera
4. Firefox
5. Edge
6. IE9以上的浏览器

CMS系统的特点是：

- markdown实时渲染，编辑可迅速看到大致的渲染效果
- 文章有本地缓存，若忘记保存，下次进来优先加载本地缓存
- 其他的也想不起来了。

> 本文约3900字，完整阅读需9分钟，口罩推荐可直接前往[购买推荐](http://www.diaox2.com/article/8110.html)
> 目录
>  1.  雾霾和我
>      - 雾霾和我有关系吗？
>      - 面对雾霾，我们可以做什么？
>  2. 关于调²研室
>  3. 测评选品
>       - 史上最全口罩测评
>  4. 测评维度
>      - 过滤性
>      - 密合性
>  5. 购买指导
>     - 有调之选
>     - 大脸朋友的性价比之选
>     - 小脸朋友的性价比之选
>     - 一个彩蛋

这是插入图片：

![](http://content.image.alimmdn.com/cms/sites/default/files/20170322/firstpage/heying.JPG@768w_1l)

lift 有调全体

> **目录**
>  - [雾霾和我](8110#t1)
>       1. [雾霾和我有关系吗？](8110#t11)
>       2. [面对雾霾，我们可以做什么？](8110#t12)
>  - [关于调²研室](8110#t21)
>  - [评测选品](8110#t222)
>       1.  [史上最全口罩评测](8110#t22)
>  - [评测维度](8110#t3)
>       1.  [过滤性](8110#t31)
>       2. [密合性](8110#t32)
>  - [购买指导](8110#t4)
>       1. [有调之选](8110#t41)
>       2. [小脸朋友的性价比之选](8110#t44)
>       3. [大脸朋友的性价比之选](8110#t42)
>       4. [一个彩蛋](8110#t43)

文章内容直接在这儿写，例如：

「有调」正在成为一个极致生活用品的消费决策指南

为那些不肯将就的你找到书写最顺畅的笔、穿着最透气的袜子、真的有用的防雾霾口罩，让你使用的都是最安全、最放心、功能性最强的产品；

## 这是一个可以折叠的标题 ===1

这下面的内容会被折叠，直到下一个标题。在需要折叠的标题内容后面添加' ===编号'即可（等号前面有一个空格）。

注意：目前只支持给h2标题（即上面样式的标题）添加折叠效果。如果给标题添加折叠效果，应该保证等号后面的编号是唯一的。

编号可以为数字、字母、数字字母的组合

## 这是另外一个可折叠的标题 ===2
lift2 这是紧贴着标题的说明

天王盖地虎哦，宝塔震河妖

### 这是小红条标题

滁河日党务，旱地和下土

<span style="color:#e60012;">我是红色的字体</span>

~~我是有删除线的文本~~

*斜体*

**粗体**

<u>我是有下划线的文字</u>

> 这是内容引用，前面加一个“>”和空格即可

这个段落中含有我们的其他[文章的链接](9466)，只需要在"()”填写我们的文章id即可

这个段落中含有引用其他的外部[链接](http://www.diaox2.com)

引用[锚点](#youdiao)

$$$youdiao 这是上面锚点引用的段落

这是sku引用的语法：

sku 8981

## 专刊：

zkdesc 在这个文艺细菌四处散播的季节，你有没有染上文具病？选一套美丽的彩色画笔，记录你的多彩生活与各色心情吧。

\`\`\`zkarticle
  id: 1881
  desc: 超过250年历史的德国品牌，有着良好的品质和逼真的色彩，是很多文艺女青年的第一套彩铅。
\`\`\`


## 专题：

ztdesc 收集自己看得上的礼物备用

\`\`\`ztarticle
  id: 460
  desc: 去年七夕送的，一直用到现在
\`\`\`

技术支持：有问题报给@李彦峰（大哥）
`;
// var text = `
// # 这是这篇教程的标题

// eds 大哥说

// edsdesc 这是小编说的内容，eds即editor say的缩写。可以在eds后加入任何标题，例如“作者说”。
// 若省略的话，则默认为“小编说”。

// CMS系统支持的浏览器为（排名有先后）：

// 1. Chrome
// 2. Safari
// 3. Opera
// 4. Firefox
// 5. Edge
// 6. IE9以上的浏览器

// CMS系统的特点是：

// - markdown实时渲染，编辑可迅速看到大致的渲染效果
// - 文章有本地缓存，若忘记保存，下次进来优先加载本地缓存
// - 其他的也想不起来了。

// > 本文约3900字，完整阅读需9分钟，口罩推荐可直接前往[购买推荐](http://www.diaox2.com/article/8110.html)
// > 目录
// >  1.  雾霾和我
// >      - 雾霾和我有关系吗？
// >      - 面对雾霾，我们可以做什么？
// >  2. 关于调²研室
// >  3. 测评选品
// >       - 史上最全口罩测评
// >  4. 测评维度
// >      - 过滤性
// >      - 密合性
// >  5. 购买指导
// >     - 有调之选
// >     - 大脸朋友的性价比之选
// >     - 小脸朋友的性价比之选
// >     - 一个彩蛋

// 这是插入图片：

// ![](http://content.image.alimmdn.com/cms/sites/default/files/20170322/firstpage/heying.JPG@768w_1l)

// lift 有调全体

// 文章内容直接在这儿写，例如：

// 「有调」正在成为一个极致生活用品的消费决策指南

// 为那些不肯将就的你找到书写最顺畅的笔、穿着最透气的袜子、真的有用的防雾霾口罩，让你使用的都是最安全、最放心、功能性最强的产品；


// ## 这是大红条标题
// lift2 这是紧贴着标题的说明

// 天王盖地虎哦，宝塔震河妖

// ### 这是小红条标题

// 滁河日党务，旱地和下土

// <span style="color:red;">我是红色的字体</span>

// ~~我是有删除线的文本~~

// *斜体*

// **粗体**

// <u>我是有下划线的文字</u>

// > 这是内容引用，前面加一个“>”和空格即可

// 这个段落中含有我们的其他[文章的链接](9466)，只需要在"()”填写我们的文章id即可

// 这个段落中含有引用其他的外部[链接](http://www.diaox2.com)

// 引用[锚点](#youdiao)

// $$$youdiao 这是上面锚点引用的段落

// 这是sku引用：

// \`\`\`sku
//   id: 8513
//   title: 薇诺娜 清透防晒霜
//   price: ￥128起
//   image: ![](//content.image.alimmdn.com/sku/1494687337TB1F1ifRXXXXXbrXFXXXXXXXXXX___0_item_pic_jpg.jpg)
// \`\`\`

// ## 专刊：

// <p style="margin-top:20px;"></p>

// \`\`\`zk
//   title: 三百元以下的情趣小厨具
//   desc: 无论是单身狗还是一对汪，一年之中总有那么几个周末想窝在家中，望望天花板，剥剥手指甲，吃吃小食，看看电视，度过一天。所以啊，小食很重要，样样不能少！怎么做？且听我慢慢道来。
//   image: ![](//content.image.alimmdn.com/cms/sites/default/files/20150903/zk/okiki.jpg)
// \`\`\`
// \`\`\`card
//   id: 2717
//   title: 关爱啤酒，更关爱打泡的你
//   desc: 男生嘛，肯定要来瓶啤酒潇洒一下，尤其是那口感细腻的啤酒花，绝对不能少。别再依靠土掉渣的晃动酒瓶子，来弄点儿少得可怜的啤酒花。试试电动打泡器，分分钟尽情享用爽口的啤酒。
//   image: ![](//content.image.alimmdn.com/cms/sites/default/files/20150730/goodthing/BeerCover.jpg)
// \`\`\`


// ## 专题：

// <p style="margin-top:20px;"></p>

// \`\`\`zt
//  title: 我的办公桌必备系列
//  desc: 专题描述
// \`\`\`

// \`\`\`card
//   id: 191
//   title: KOKUYO国誉无针订书机
//   desc: 小巧好看，而且我害怕尖锐物品
//   image: ![](//content.image.alimmdn.com/cms/sites/default/files/20141111/goodthing/00.jpg)
// \`\`\`

// 技术支持：有问题报给@李彦峰（大哥）
// `;
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
