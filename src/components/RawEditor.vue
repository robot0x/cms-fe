<template>
  <div class="component-raw-editor">
    <textarea v-model="text" @input="input" :disabled="locked"></textarea>
  </div>
</template>
<script>
import fetch from 'isomorphic-fetch'
import API from '../API'
export default {
  props: {
    locked: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      text: ''
    }
  },
  watch: {
     // 如果路由有变化，会再次执行该方法
     '$route': 'fetchData'
  },
  methods: {
    input () {
      this.$store.commit('change', this.text)
      localStorage.setItem('article', this.text)
    },
    fetchData () {
      const id = this.$route.params.id
      if( id ){
        // 编辑已有文章
        fetch(`${API.articleContent.url}?id=${this.$route.params.id}`)
        .then(response => {
          return response.json()
        })
        .then(result => {
          console.log(result)
          // this.text = result.text
        })
        .catch(result => {
          console.log('error .....');
          console.log(result);
        })
      } else {
        // 新增，从缓存中取下试试
        this.text = localStorage.getItem('article') || '# 这是文章标题'
      }
      // 手动触发一次
      this.$store.commit('change', this.text)
    }
  },
  created () {
    this.fetchData()
  }
}
</script>
<style scoped>
 .component-raw-editor {
   padding: 15px;
   background-color: #fff;
   box-shadow: 4px 5px 3px #aaa;
   transition: all ease .3s;
   width: 100%;
   position: relative;
 }

 .component-raw-editor textarea {
    outline: none;
    box-sizing: border-box;
    height: 100%;
    vertical-align: top;
    /*padding: 15px;*/
    /*resize: none;*/
    border: none;
    /*background-color: #f5f5f5;*/
    outline: none;
    font-family: inherit;
    font-size: 18px;
    color: #616161;
    width: 100%;
    resize: none;
  }

  .operate-area {
    height: 45px;
    padding: 0;
    margin: 0;
    ul {
      box-sizing: border-box;
      position: relative;
      height: 45px;
      background-color: #009688;
      box-shadow: 4px 3px 3px #aaa;
      z-index: 20;
    }
  }
</style>
