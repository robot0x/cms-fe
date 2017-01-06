<template>
    <div>
      <raw-editor></raw-editor>
      <render-editor></render-editor>
    </div>
</template>


<script>
import Vue from 'vue'
import RawEditor from '../components/RawEditor.vue'
import RenderEditor from '../components/RenderEditor'
// import { Loading, Button, Dialog } from 'element-ui'
// Vue.use(Loading)
// Vue.use(Button)
// Vue.use(Dialog)

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    RawEditor,
    RenderEditor
  }
}
</script>
