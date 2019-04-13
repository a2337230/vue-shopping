<template>
  <div class="my-history">
    <div class="go-back" @click="goBack">
      <i class="iconfont icon-houtui"></i>
    </div>
    <h2>{{title}}</h2>
  </div>
</template>
<script>
export default {
  props: {
    title: String
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>
<style lang="less" scoped>
.my-history {
  width: 100%;
  position: fixed;
  height: 1rem;
  background-color: #ff0033;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  color: #fff;
  .go-back {
    position: absolute;
    left: 0;
    height: 1rem;
    width: 1rem;
    text-align: center;
    i {
      display: inline-block;
      font-size: .5rem;
      line-height: 1rem;
      vertical-align: top;
    }
  }
  h2 {
    font-size: .5rem;
  }
}
</style>
