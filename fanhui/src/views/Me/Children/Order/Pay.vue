<template>
  <div class="order">
    <me-header :title="title"></me-header>
    <order-menu :type="type"></order-menu>
  </div>
</template>
<script>
import MeHeader from './../MeHeader'
import OrderMenu from './OrderMenu'
export default {
  name: 'pay',
  data () {
    return {
      title: '已付款订单',
      type: 1
    }
  },
  components: {
    MeHeader,
    OrderMenu
  }
}
</script>
<style lang="less" scoped>
.order {
  height: 100%;
}
</style>
