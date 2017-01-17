<template>
  <div class="component-max-window">
    <div class="left" @click.stop.prevent="leftOpenWindow">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="center" @click.stop.prevent="centerOpenWindow">
      <i class="el-icon-minus"></i>
    </div>
    <div class="right" @click.stop.prevent="rightOpenWindow">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
// const bus = new Vue()

export default {
  methods: {
    leftOpenWindow () {
      // 左边被点击，右边最大化
      this.$emit('open', 'right')
    },
    centerOpenWindow () {
      // 左边被点击，右边最大化
      this.$emit('open')
    },
    rightOpenWindow () {
      // 右边被点击，左边最大化
      this.$emit('open', 'left')
    }
  }
}
</script>
<style scoped>
  .component-max-window {
    position: fixed;
    /*top: 50%;*/
    /*left: 50%; */
    transform: translate(-50%, -50%);
    display: flex;
    z-index: 9999;
    height: 50px;
    right: -12px;
    top: 100px;
  }

  .left, .center, .right {
    width: 30px;
    border-radius: 4px;
    font-size: 15px;
    cursor: pointer;

    /*color: rgba(128,128,128,0.35);*/
    border: 1px solid transparent;
    /*background-color: rgba(0,0,0,0);*/
    background-color: rgba(0,0,0, 0.1);
    border-color: rgba(0,0,0,0);
    transition: background-color ease-in-out .15s, color ease-in-out .15s, border-color ease-in-out .15s;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }

  /*.right {
    margin-left: 10px;
  }*/

  .left:hover,.center:hover, .right:hover {
    color: #343434;
    border-color: rgba(128,128,128,0.08);
    /*background-color: rgba(0,0,0, 0.3);*/
    background-color: #f0f0f0 !important;
  }
</style>
