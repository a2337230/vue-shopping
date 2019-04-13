<template>
  <div class="boot-page">
    <span>{{time}}秒后跳转首页</span>
  </div>
</template>
<script>
export default {
  name: 'BootPage',
  data () {
    return {
      time: 3,
      timer: null
    }
  },
  mounted () {
    this._goHome()
  },
  methods: {
    _goHome () {
      this.timer = setInterval(() => {
        this.time = this.time - 1
        if (!this.time) {
          this.$router.push('/home')
        }
      }, 1000)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped>
.boot-page {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99999;
  background: url('./../../common/image/lgbg.jpg');
  background-size: 100vw 100vh;
  span {
    position: fixed;
    right: .3rem;
    top: .3rem;
    background-color: rgba(0,0,0,0.2);
    color: #fff;
    font-size: .36rem;
    padding: .1rem .3rem;
    border-radius: .2rem;
  }
}
</style>
