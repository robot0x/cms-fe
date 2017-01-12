<template>
  <div class="component-to">
    <div class="up" title="回到顶部" @click="up">
      <i class="el-icon-arrow-up"></i>
    </div>
    <div class="down" title="回到底部">
      <i class="el-icon-arrow-down" @click="down"></i>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    up(){
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    down(){
      document.body.scrollTop = document.documentElement.scrollTop = 2000
    }
  }
}
</script>

<style scoped>
  .component-to {
    position: fixed;
    right: 10px;
    bottom: 10px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  .down, .up {
    width: 36px;
    height: 36px;
    background-color: rgba(0,0,0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .down {
    margin-top: 2px;
  }
</style>
