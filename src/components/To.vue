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
    border: 1px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    /*color: rgba(128,128,128,0.35);
    background-color: rgba(0,0,0,0);
    border-color: rgba(0,0,0,0);*/
    transition: background-color ease-in-out .15s, color ease-in-out .15s, border-color ease-in-out .15s;
  }

  .down:hover, .up:hover {
    color: #343434;
    border-color: rgba(128,128,128,0.08);
    background-color: #f0f0f0 !important;
  }

  .down {
    margin-top: 2px;
  }
</style>
