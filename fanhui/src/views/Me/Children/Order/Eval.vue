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
  name: 'Eval',
  data () {
    return {
      title: '已评价订单',
      type: 4
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
