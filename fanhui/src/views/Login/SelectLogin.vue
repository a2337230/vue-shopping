<template>
  <div class="select-login">
    <div class="logo">
      <img src="./../../common/image/logo.png" alt="">
    </div>
    <button @click="loginBtn(1)">手机登录</button>
    <button @click="loginBtn(0)">用户名登录</button>
  </div>
</template>
<script>
export default {
  name: 'SelectLogin',
  methods: {
    loginBtn (state) {
      this.$emit('LoginTab', state)
    }
  }
}
</script>
<style lang="less" scoped>
.select-login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .logo {
    position: fixed;
    top: 20%;
    img {
      display: block;
      width: 80%;
      margin: 0 auto;
    }
  }
  button {
    width: 90%;
    line-height: 40px;
    border-radius: 10px;
    margin: 10px;
    color: #fff;
    font-size: 18px;
    background-color: #fd2e4c;
    font-weight: lighter;
  }
}
</style>
