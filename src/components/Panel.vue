<template>
  <div class="component-panel">
    <div class="panel-heading">
      {{title}}
      <slot name="panel-heading-middle"></slot>
      <i v-if="closeable" class="el-icon-arrow-down" @click="closeHandle"></i>
    </div>
    <div class="panel-body" :class="{close: closed}">
      <slot name="panel-body"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: [String, Number],
    closeable: {
      type: Boolean,
      default () {
        return false
      }
    },
    close: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      closed: this.close
    }
  },
  methods: {
    closeHandle () {
      this.closed = !this.closed
    }
  }
}
</script>
<style scoped>
  .component-panel {
    margin-bottom: 20px;
    background-color: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.05);
    border: 1px solid #eaeefb;
    border-radius: 4px;
  }

  .panel-heading {
    color: #333;
    /*background-color: #f5f5f5;*/
    /*background-color: #58B7FF;*/
    background-color: #99A9BF;
    border-color: #ddd;
    padding: 10px 15px;
    color: #fff;
    position: relative;
  }

  .panel-body {
    overflow: hidden;
    transition: all .2s ease-in-out;
    height: auto;
    /*pdding: 15px;*/
  }

  .close {
    height: 0;
    padding: 0;
  }

  .el-icon-arrow-down {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
</style>
