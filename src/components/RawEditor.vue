<template>
  <div class="component-raw-editor">
    <textarea v-model="text" :disabled="locked" ref="textarea"></textarea>
  </div>
</template>
<script>
import Utils from '../utils/Utils'
import Content from '../service/Content'
export default {
  props: {
    locked: {
      type: Boolean,
      default () { return false }
    },
    content: String,
    insertImage: String,
    id: String
  },
  data () {
    return { text: '' }
  },
  watch: {
    content (input) {
      this.text = input
    },
    text () {
      this.commit()
    },
    insertImage (val) {
      if(val){
        this.commit(Utils.insertContent(this.$refs.textarea, `\n![](${val})\n`))
      }
    }
  },
  methods: {
    commit (text = this.text) {
      this.$store.commit('change', text)
      Content.setContentToLocal(this.id, 'text', text, true)
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
