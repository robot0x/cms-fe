<template>
   <div class="page-notfound">
     <div class="info-box">
       <img :src="NotFoundImg" class="not-found-img" width="306" height="178">
       <p class="sorry">Sorry，您访问的页面跑<span class="spec">「</span>调<span class="spec">」</span>了</p>
       <el-button type="danger" @click="toIndex">回到首页</el-button>
     </div>
   </div>
</template>

<script>
import NotFoundImg from '../assets/404.png'
export default {
  data () {
    return {
      NotFoundImg
    }
  },
  methods: {
    toIndex () {
      this.$router.replace("/")
    }
  }
}
</script>
<style scope>
  .page-notfound {
    height: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    top:100px;
    overflow: hidden;
  }
  .info-box {
    text-align: center;
  }
  .sorry {
    text-align: center;
    margin-top: 20px;
    margin: 30px 0 60px;
    line-height: 1;
    font-size: 20px;
  }
</style>
