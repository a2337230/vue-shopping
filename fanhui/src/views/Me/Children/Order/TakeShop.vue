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
  name: 'TakeShop',
  data () {
    return {
      title: '已发货订单',
      type: 3
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
