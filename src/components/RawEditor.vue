<template>
  <div class="component-raw-editor">
    <textarea v-model="text" :disabled="locked" ref="textarea" v-on:keyup.prevent.stop="keyup"></textarea>
  </div>
</template>
<script>
import Utils from '../utils/Utils'
import Content from '../service/Content'
import bus from '../event/'
export default {
  props: {
    locked: {
      type: Boolean,
      default () { return false }
    },
    content: String,
    insertImage: String,
    id: String,
    from: String
  },
  data () {
    return { text: '' }
  },
  created () {
    this.text = this.content
  },
  watch: {
    /**
     * 这个content必须watch，否则的话
     * this.text = input 将不会执行，很奇怪
     */
    content (input) {
      // console.log('RawEditor.vue watcher named content exec ...')
      this.text = input
    },
    /**
     * 不用每次监控，只有编辑按键 `ctrl + s` 才渲染
     */
    text () {
      console.log('RawEditor.vue watcher named text exec ...')
      this.commit()
      if (this.from === 'help') {
        bus.$emit('mdchange')
      }
    },
    insertImage (val) {
      if (val) {
        Utils.insertContent(this.$refs.textarea, `\n![](${val})\n`)
      }
      // if(val){
      //   this.commit(Utils.insertContent(this.$refs.textarea, `\n![](${val})\n`))
      // }
    }
  },
  methods: {
    keyup (event) {
      if (event.keyCode === 83 && event.ctrlKey) {
        // this.commit()
        bus.$emit('mdchange')
      }
    },
    commit (text = this.text) {
      // console.log('RawEditor.vue commit mutation named change exec ...')
      this.$store.commit('change', text)
      const { id } = this
      if(id){
        Content.setContentToLocal(id, 'text', text, true)
      }
    }
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
   display: flex;
   flex-direction: column;
 }

 .component-raw-editor textarea {
    outline: none;
    box-sizing: border-box;
    display: block;
    width: 100%;
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
    resize: none;
    flex: 1;
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
