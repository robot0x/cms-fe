<template>
  <!-- 一个组件整体是隐藏还是显示，可以在组件的根元素上使用 v-if or v-show -->
  <div v-if="ok">
    hi all，这里是 MyTest 组件
    <div>
      这里是MyTest组件的input：
      <!-- ref属性可以通过 this.$refs[name] 来引用，ref属性的值可以指定任意合法的标识符 -->
      <input ref="hehe" type="text" :value="value" placeholder="请输入值..." @input="updateValue($event.target.value)">
    </div>
    <!-- 具名slot，如果有多个slot，则必须被一个元素包裹，否则会报错 -->
    <div>
      <slot name="upon-button"></slot>
    </div>
    <button @click="getValue">获取MyTest组件的input的值</button>
    <!-- 默认slot，没有名字，作为找不到匹配内容片段的备用插槽，这些 -->
    <div>
      <slot>
        只有在没有要分发的内容时才会显示。
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ['value'],
  data () {
    return {
      ok: false
    }
  },
  methods: {
    getValue (event) {
      alert(this.value + ',' + event.target.tagName) // eslint-disable-line
    },
    updateValue (value) {
      console.log(value)
      console.log('this.$refs.hehe:', this.$refs.hehe)
      this.$emit('input', Number(value))
    }
  }
}
</script>
