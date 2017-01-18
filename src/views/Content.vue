<template>
   <div class="page-content">
     <search></search>
     <data-grid></data-grid>
   </div>
</template>
<script>
import fetch from 'isomorphic-fetch'
import API from '../API'
import Search from '../components/Search'
import DataGrid from '../components/DataGrid'

export default {
  name: 'hello',
  components: {
    // Hello,
    Search,
    DataGrid
  },
  data () {
    return {

    }
  },
  methods: {

  },
  created () {
    // 在created中获取后端数据
    fetch(API.articles.url + '?id=121223').then(result => {
      console.log(result)
    })
  }
}
</script>
