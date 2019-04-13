<template>
  <ul class="me-order">
    <router-link tag="li" :to="item.path" v-for="item in menuItem" :key="item.icon">
      <i class="iconfont" :class="item.icon" :style="{color: item.color?item.color:''}"></i>
      <span>{{item.title}}</span>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: 'MeMenu',
  props: {
    menuItem: Array
  }
}
</script>
<style lang="less" scoped>
.me-order {
  display: flex;
  padding: .2rem 0;
  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #666;
    i {
      font-size: .8rem;
    }
    span {
      font-size: .36rem;
      margin-top: .3rem;
    }
  }
}
</style>
