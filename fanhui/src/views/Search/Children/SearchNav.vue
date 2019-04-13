<template>
  <div class="search-nav">
    <div class="search-box">
      <i class="iconfont icon-sousuo5"></i>
      <span class="search-title">{{hotSearch.query}}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'searchnav',
  props: {
    hotSearch: Object
  }
  // mounted () {
  //   this.$store.dispatch('getHotSearch')
  // },
  // computed: {
  //   ...mapState(['hotSearch'])
  // }
}
</script>
<style lang="less" scoped>

.search-nav {
  display: flex;
  justify-content: space-around;
  padding: .1rem 0;
  height: 1rem;
  .search-box {
    width: 94%;
    background-color: #ededed;
    line-height: 2.5;
    font-size: .4rem;
    text-align: center;
    border-radius: .2rem;
    color: #9c9c9c;
  }
}
</style>
