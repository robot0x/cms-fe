<template>
  <div class="component-render-editor">
    <div class="article-area" v-html="html"></div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import bus from '../event/'
export default {
  // computed: { ...mapGetters(['html']) },
  data () {
    return {
      html: ''
    }
  },
  created () {
    bus.$on('mdchange', () => {
      console.log('mdchange ....')
      this.html = this.$store.getters.html
    })
  }
}
</script>
<style lang="scss">
  ul,ol {list-style: none;}
  .component-render-editor {
    height: 100%;
    resize: none;
    border: none;
    // background-color: #f5f5f5;
    font-family: inherit;
    font-size: 18px;
    color: #616161;
    box-shadow: 4px 5px 3px #aaa;
    white-space: normal;
    word-wrap: break-word;
    overflow-x: hidden;
    position: relative;
    background:#fff;
  }
  // 文章渲染样式
  $fontFamily:"Hiragino Sans GB", "Helvetica Neue", Helvetica, "Microsoft Yahei", heiti, Arial, sans-serif;
  iframe {
    display: block;
    margin: 24px auto;
  }

  .article-banner {
    background-color: #f4f4f4;
    margin-bottom: 20px;
  }

  .banner-list {
    display: flex;
    // justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    li {
      position: relative;
      margin-right: 5px;
      padding-left: 0 !important;
      span {
        position: absolute;
        font-size: 14px;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #20A0FF;
        text-align: center;
        line-height: 20px;
        color:#fff;
      }
      &::before {
        display: none;
      }
    }
  }
/* 在safari下编辑框过小，所以加上一个最小高度，强制撑开  */
/* Safari 9.0-10.0 (not 10.1) (non-iOS) */
_::-webkit-:host:not(:root:root), .article-area {
  min-height:1200px;
}
/* Safari 9 */
@supports (overflow:-webkit-marquee) and (justify-content:inherit) 
{
  .article-area {
      min-height:1200px;
  }
}
/* Safari 10.1+ (alternate method) */
@media not all and (min-resolution:.001dpcm)
{ @supports (-webkit-appearance:none) {
    .article-area {
      min-height:1200px;
    }
}}
  .article-area {
    background:#fff;
    line-height: 2;
    font-size: 18px;
    color: #666;
    padding-bottom: 30px;
    max-width: 800px;
    height: 100%;
    margin: 0 auto;
    h1,h2,h3,h4,h5 {font-weight:normal;}
    h1 {
      display: inline-block;
      margin: 80px 0 24px 50%;
      font-size: 18px;
      color: #000;
      text-align: center;
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      line-height: 1;
      padding-bottom: 8px;
      border-bottom: 3px #e60012 solid;
      font-family:$fontFamily;
      font-weight: 500;
    }
    .lift {
      margin-left: 40px;
      padding: 0 0 0 10px;
      line-height: 1;
      color: #8e8e93;
      margin-top: 6px;
      text-align: center;
      em {
          margin-left: -80px;
          display: inline-block;
          width: 740px;
      }
    }
    .lift2 {
      margin-left: 40px;
      text-align: left;
      padding: 0 0 0 10px;
      line-height: 1;
      color: #8e8e93;
      margin-top: 6px;
    }
    & > p {
      padding: 24px 40px 0;
      a {
        color:#e60012;
      }
      img {
        display: block !important;
        margin: 0 auto;
        width: 596px;
      }
    }


    h2, h3 {
      color: #333;
       margin: 30px 0 0 40px;
       font-weight: 400;
       font-size: 16px;
       line-height: 1;
       border-left: 6px #ff0014 solid;
       padding-left: 6px;
    }

    h3 {
      border-left-width: 4px;
    }

    ul {
      padding-right:40px;
      margin-top: 30px;
      & > li {
        position: relative;
        padding-left: 50px;
      }
      & > li::before {
        content: '';
        position: absolute;
        height: 6px;
        width: 6px;
        border-radius: 50%;
        background: #ff0014;
        left: 40px;
        top: 14px;
      }
    }

    ol {
      margin-top: 30px;
      margin-left: 40px;
      counter-reset: diaodiao;
      & > li {
        p {
          display: inline;
          padding: 0;
        }
      }
      & > li::before {
        content: '';
        counter-increment: diaodiao;
        content: counter(diaodiao) "、"
      }
    }


    blockquote {
      display: block;
      background: #f4f4f4;
      margin: 30px 40px 0;
      padding: 10px 20px 30px;
      position: relative;
      & > p {
        padding: 24px 40px 0;
        strong {
          color: #333;
          font-weight: normal;
          font-size: 18px;
        }
      }

      ul, ol {
        margin-top: 0;
        padding: 0;
      }

      a {
        color: #e60012;
      }
    }

    blockquote::before{
      content: '';
      position: absolute;
      border: 20px solid transparent;
      border-top-color: #fff;
      border-right-color: #fff;
      top: 0;
      right: 0;
    }

    .editorhead {
        color: #ff0014;
        padding: 0 50px 0 40px;
    }

    .editorcontent{
      padding: 0 50px 0 40px;
      color: #999;
    }

    .lift {
      line-height: 1;
      color: #8e8e93;
      margin: 0;
      padding: 0;
      margin: 0 0 0 40px;
      padding: 6px 0 0 10px;
    }
    img + .lift {
      text-align: center;
      margin-left: -40px;
    }
  }

// 专刊样式
  .card {
    position: relative;
    width: 100%;
    background-color: #fff;
    max-width: 720px;
    min-width: 480px;
  }
  .bottomshadow {
    border-bottom: 1px solid rgba(0,0,0,0.15);
  }
  .headgrayband {
    max-width: 720px;
    min-width: 480px;
    height: 24px;
    background-color: #efeff4;
}
.mask {
    position: absolute;
    z-index: 9;
    background-color: #000;
    filter: alpha(opacity=15);
    -moz-opacity: 0.15;
    opacity: 0.15;
}
#headtitle {
    color: #fff;
    position: absolute;
    width: 100%;
    bottom: 0;
    text-align: center;
    z-index: 10;
}
#headtitle p {
    margin: 0 24px 17px;
    font-size: 40px;
    line-height: 54px;
}
#head > div {
    width: 100%;
    line-height: 0;
    position: relative;
}
#head img {
    width: 100%;
}
.wrapper {
    padding: 24px 24px 0px;
    width: 100%;
    position: relative;
    background-color: #fff;
    line-height: 0;
}
.title {
    margin: 10px 24px -7px;
    color: #252629;
    font-weight: bold;
    font-size: 32px;
    line-height: 46px;
}
.desc {
    font-size: 32px;
    line-height: 40px;
    color: #616368;
    word-break: break-word;
    word-wrap: break-word;
    margin: 20px 24px;
}
.pseudoB {
    height: 64px;
    width: auto;
    margin: 20px 24px 24px;
    line-height: 0;
    position: relative;
}
.pseudoB span {
    line-height: 28px;
    font-size: 28px;
    padding: 18px 24px;
    cursor: pointer;
    color: #fff;
    float: right;
    background-color: rgba(230,0,18,0.5);
    border-radius: 8px;
    margin-right: 24px;
}
.pseudoB p {
    line-height: 28px;
    font-size: 28px;
    padding: 16px 24px;
    color: #f38089;
    float: right;
    cursor: pointer;
    /* background-color: rgba(230,0,18,0.5); */
    border-radius: 8px;
    border: 2px solid;
}
// 专题样式
.headdesc {
    padding: 22px;
}
.zthead h4 {
    color: #616368;
    font-size: 32px;
    line-height: 38px;
    color: #252629;
    font-weight: normal;
    margin: 0 0 12px;
}
.zthead p {
    color: #8e8e93;
    word-break: break-word;
    word-wrap: break-word;
    font-size: 28px;
    line-height: 38px;
}
.grayband {
    height: 24px;
    background-color: #efeff4;
    min-width: 480px;
}
.ztcard {
    display: table;
    padding: 24px 24px 0;
}
.articlecard {
    position: relative;
    width: 100%;
    height: 236px;
    background-color: #fff;
    line-height: 0;
    cursor: pointer;
}
.ztleft {
    display: table-cell;
    width: 188px;
    height: 188px;
}
.ztright {
    display: table-cell;
    padding-left: 24px;
    position: relative;
    vertical-align: top;
    word-break: break-all;
}
.ztleft img {
    width: 188px;
    height: 188px;
    border-radius: 8px;
}
.ztright .p1 {
    color: #616368;
    font-size: 28px;
    line-height: 36px;
    max-height: 72px;
    padding-right: 12px;
    overflow-y: hidden;
    margin-bottom: 8px;
}
.ztright .p2 {
    color: #8e8e93;
    font-size: 24px;
    line-height: 32px;
    max-height: 64px;
    padding-right: 12px;
    overflow-y: hidden;
    word-break: break-word;
    word-wrap: break-word;
}
.ztright .p3 {
    color: #d0d0d0;
    font-size: 28px;
    line-height: 36px;
    position: absolute;
    bottom: 19px;
}
// sku
.revarticlecard {
    height: 198px;
    margin-bottom: 12px;
}
.articlecard {
    width: 700px;
    position: relative;
    height: 236px;
    background-color: #efeff4;
    font-size: 28px;
    line-height: 38px;
    color: #535353;
    margin: 20px auto;
}
.bottomshadow {
    border-bottom: 1px solid rgba(0,0,0,0.15);
}

.revarticlecard .articleimg {
    width: 150px;
    height: 150px;
    border-radius: 4px;
}
.articleimg {
    display: inline;
    width: 188px;
    height: 188px;
    border-radius: 8px;
    position: relative;
    top: 24px;
    left: 24px;
}
.revarticlecard .articletitle, .revarticlecard .brand {
    left: 198px;
}
.articletitle {
    position: absolute;
    top: 19px;
    left: 236px;
    font-size: 28px;
    color: #616368;
    line-height: 38px;
}
.revarticlecard .articletitle, .revarticlecard .brand {
    left: 198px;
}
.brand {
    position: absolute;
    left: 236px;
    bottom: 24px;
    font-size: 24px;
}
.buy-button-area {
    position: absolute;
    right: 12px;
    font-size: 14px;
    bottom: 24px;
}
.buy-button {
    display: block;
    width: 110px;
    height: 37px;
    padding-top: 4px;
    padding-right: 8px;
    filter: alpha(opacity=50);
    opacity: 0.5;
    outline: none;
    border: none;
    border-radius: 6px;
    background-color: #e60012;
    color: #fff;
    font-size: 20px;
}
.buy-button span {
    display: block;
    height: 28px;
    line-height: 27px;
}

</style>
