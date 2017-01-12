<template>
  <div class="component-raw-editor">
    <textarea v-model="text" @input="input"></textarea>
  </div>
</template>

<script>
export default {
  data () {
    const content = localStorage.getItem('article') || '# 这是文章标题'
    return {
      text: content
    }
  },
  methods: {
    input () {
      console.log(this.text);
      this.$store.commit('change', this.text)
      localStorage.setItem('article', this.text)
    }
  },
  created () {
    this.$store.commit('change', this.text)
  }
}
</script>
<style scoped>
 .component-raw-editor textarea {
    outline: none;
    box-sizing: border-box;
    height: 100%;
    vertical-align: top;
    padding: 15px;
    /*resize: none;*/
    border: none;
    /*background-color: #f5f5f5;*/
    outline: none;
    font-family: inherit;
    font-size: 18px;
    color: #616161;
    box-shadow: 4px 5px 3px #aaa;
    transition: all ease .3s;
    width: 100%;
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
