<template>
  <div class="page-author">
    <el-row>
       <el-col :span="4">
          <el-menu @select="select" theme="dark" :default-active="defaultActive">
            <el-menu-item :index="index | calcIndex" v-for="(item, index) in items">
              {{item.name}}（{{item.count}}）
            </el-menu-item>
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
import LoginUtils from '../utils/LoginUtils'

export default {
  components: {
    DataGrid
  },
  activated () {
    this.setDefaultActive()
    this.query = { type: 'aId', search: this.getAId(this.defaultActive)}
  },
  data () {
    return {
      defaultActive: '',
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
        name: 'liyanfeng',
        count: 312
      }, {
        id: 5,
        name: '455322185',
        count: 19
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
    getAId (index) {
      const [,i] = index.split('-').map(i => i - 1)
      return this.items[i].id
    },
    setDefaultActive () {
      const username = LoginUtils.getUsername()
      for(const item of this.items){
        if(username === item.name){
          this.defaultActive = '1-' + (this.items.indexOf(item) + 1)
          return
        }
      }
    },
    select (index) {
      this.query = { type: 'aId', search: this.getAId(index)}
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
