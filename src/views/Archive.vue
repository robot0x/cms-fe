<template>
  <transition name="slide-fade">
     <div class="page-archive">
       <panel title="选择">
         <span slot="panel-heading-middle">
           <el-radio class="radio" label="1">按月</el-radio>
           <el-radio class="radio" label="2">按人</el-radio>
         </span>
       </panel>
     </div>
   </transition>
</template>

<script>
import Panel from '../components/Panel'
export default {
  components: {
    Panel
  },
  data () {
    return {
      msg: 'Archive'
    }
  }
}
</script>
<style lang="scss" scoped>
  .page-archive{
    // padding: 10px;
  }
  .el-radio {
    margin-left: 10px;
  }
</style>
