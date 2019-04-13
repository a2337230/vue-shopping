<template>
  <footer class="buttom-tabbar">
    <router-link v-for="item in tab" tag="div" class="tab-item" :to="item.path" :key='item.path'>
      <i :class='"iconfont "+item.icon'></i>
      <span v-html='item.name'></span>
    </router-link>
  </footer>
</template>
<script>
export default {
  name: 'TabBar',
  data () {
    return {
      tab: [
        {icon: 'icon-shouye', name: '首页', path: '/home'},
        {icon: 'icon-tianranqi', name: '推荐', path: '/recommend'},
        {icon: 'icon-sousuo', name: '搜索', path: '/search'},
        {icon: 'icon-gouwuche', name: '购物车', path: '/shopcat'},
        {icon: 'icon-wode', name: '个人中心', path: '/personal'}
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.buttom-tabbar {
  width: 100%;
  height: 1rem;
  background-color: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  .tab-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    font-size: .26rem;
    color: #666;
    i {
      font-size: .4rem;
      margin-bottom: .05rem;
    }
  }
  .router-link-active{
    color: #f00
  }
}
</style>
