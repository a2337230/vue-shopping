<template>
  <div class="home">
    <ly-tab
      v-model="selectedId"
      :items="items"
      :options="options"
      @change="handleChange"
      class="fix"
    />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      // 默认选中id
      selectedId: 0,
      items: [
        {label: '热门'},
        {label: '服饰'},
        {label: '鞋包'},
        {label: '手机'},
        {label: '电脑'},
        {label: '食品'},
        {label: '内衣'},
        {label: '美妆'},
        {label: '水果'}
      ],
      options: {
        // 设置选中颜色
        activeColor: '#e9232c'
      },
      subRouteUrl: [
        '/home/hot',
        '/home/costume',
        '/home/shoebag',
        '/home/phone',
        '/home/computer',
        '/home/food',
        '/home/underwear',
        '/home/beauty',
        '/home/fruits'
      ]
    }
  },
  created () {
    let id = this.subRouteUrl.findIndex(item => item === this.$route.path)
    this.selectedId = id
  },
  methods: {
    handleChange (item, index) {
      this.$router.replace(this.subRouteUrl[index])
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  .fix {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
  }
  .content {
    margin-top: 1.2rem;
    margin-bottom: 1rem;
  }
}
</style>
