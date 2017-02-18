<template>
  <div class="component-render-editor">
    <div class="article-area" v-html="html"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: { ...mapGetters(['html']) }
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
    }
  }

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
      height:100px;
      line-height:100px;
      text-align:center;
      color:#333;
      font-size:20px;
      font-weight: normal;
      font-family:$fontFamily;
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

    & > ul {
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
  }
</style>
