<template>
    <div class="page-author">
      <el-row>
         <el-col :span="4">
            <el-menu @select="select" theme="dark">
              <el-menu-item :index="index | calcIndex" v-for="(item, index) in items">
                {{item.name}}（{{item.count}}）
              </el-menu-item>
              <!-- <el-menu-item index="1-1">8023wei (218)</el-menu-item>
              <el-menu-item index="1-2">949815562 (1)</el-menu-item>
              <el-menu-item index="1-3">a574427792 (152)</el-menu-item>
              <el-menu-item index="1-4">Anyuna (4)</el-menu-item>
              <el-menu-item index="1-5">august (6)</el-menu-item>
              <el-menu-item index="1-6">chengmingjia (2)</el-menu-item>
              <el-menu-item index="1-7">chenguanglin (153)</el-menu-item>
              <el-menu-item index="1-8">chenyisahn (24)</el-menu-item>
              <el-menu-item index="1-9">cuicui (11)</el-menu-item>
              <el-menu-item index="1-10">dayuan (477)</el-menu-item>
              <el-menu-item index="1-11">diamond (584)</el-menu-item>
              <el-menu-item index="1-12">dongxu (207)</el-menu-item>
              <el-menu-item index="1-13">dongxu (207)</el-menu-item>
              <el-menu-item index="1-14">dongxu (207)</el-menu-item>
              <el-menu-item index="1-15">dongxu (207)</el-menu-item>
              <el-menu-item index="1-16">dongxu (207)</el-menu-item>
              <el-menu-item index="1-17">dongxu (207)</el-menu-item>
              <el-menu-item index="1-18">dongxu (207)</el-menu-item>
              <el-menu-item index="1-19">dongxu (207)</el-menu-item>
              <el-menu-item index="1-20">dongxu (207)</el-menu-item>
              <el-menu-item index="1-21">dongxu (207)</el-menu-item>
              <el-menu-item index="1-22">dongxu (207)</el-menu-item> -->
          </el-menu>
         </el-col>
         <el-col :span="20">
           <data-grid class="data-grid" :input="query"></data-grid>
         </el-col>
      </el-row>
    </div>
</template>
<script>
import DataGrid from '../components/DataGrid'
export default {
  components: {
    DataGrid
  },
  data () {
    return {
      msg: 'Author',
      visible: false,
      query: {},
      items: [{
        id: 1,
        name: '8023wei',
        count: 218
      }, {
        id: 2,
        name: '949815562',
        count: 120
      }, {
        id: 3,
        name: 'a574427792',
        count: 90
      }, {
        id: 4,
        name: 'Anyuna',
        count: 123
      }, {
        id: 4,
        name: '8023wei',
        count: 218
      }, {
        id: 5,
        name: '8023wei',
        count: 218
      }, {
        id: 6,
        name: '8023wei',
        count: 218
      }, {
        id: 7,
        name: '8023wei',
        count: 218
      }, {
        id: 8,
        name: '8023wei',
        count: 218
      }, {
        id: 9,
        name: '8023wei',
        count: 218
      }]
    }
  },
  methods: {
    select (index) {
      const [,i] = index.split('-').map(i => i - 1)
      this.query = {
        type: 'aId',
        search: this.items[i].id
      }
    }
  },
  filters: {
    calcIndex ( index ) {
      return 1 + '-' + (index + 1)
    }
  }
}
</script>
<style scoped>
.data-grid {
  position: relative;
  top: -60px;
}
</style>
