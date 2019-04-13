<template>
  <div>
    <me-header :title="title"></me-header>
    <div class="his-goods">
      <shop-list-r :listData="collShop" ></shop-list-r>
    </div>
  </div>
</template>
<script>
import { getAllColl } from './../../../api/index.js'
import MeHeader from './MeHeader'
import ShopListR from './../../../components/ShopListR/ShopListR'
export default {
  name: 'MeCollect',
  data () {
    return {
      title: '我的收藏',
      collShop: []
    }
  },
  mounted () {
    this._getColl()
  },
  methods: {
    async _getColl () {
      let result = await getAllColl()
      this.collShop = result.message
    }
  },
  components: {
    MeHeader,
    ShopListR
  }
}
</script>
<style lang="less" scoped>
.his-goods {
  padding-top: 1.1rem;
}
</style>
