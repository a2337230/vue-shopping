<template>
  <div class="my-history">
    <me-header :title="title"></me-header>
    <div class="his-goods">
      <p>最多可显示最近40条浏览记录</p>
      <shop-list-r :listData="hisShopData" ></shop-list-r>
    </div>
    <div class="none" v-if="none">
      <img src="./../../../common/image/gouwuche.png" alt="">
      <p>您还没有浏览过商品</p>
      <button @click="goHome">去逛逛</button>
    </div>
  </div>
</template>
<script>
import MeHeader from './MeHeader'
import { getHistory } from './../../../api/index.js'
import ShopListR from './../../../components/ShopListR/ShopListR'
export default {
  name: 'History',
  data () {
    return {
      title: '浏览记录',
      hisShopData: [],
      none: false
    }
  },
  mounted () {
    this._getHistory()
  },
  methods: {
    async _getHistory () {
      let result = await getHistory()
      this.hisShopData = result.message
      if (this.hisShopData && this.hisShopData.length === 0) {
        this.none = true
      }
    },
    goHome () {
      this.$router.push('/home')
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
  height: 100%;
  margin: 1rem 0;
  p {
    font-size: .3rem;
    line-height: .8rem;
    text-align: center;
    background-color: #CCCC99;
    margin-bottom: .1rem;
  }
}
.none {
  text-align: center;
  img {
    display: block;
    width: 3rem;
    margin: 0 auto;
  }
  p {
    margin-top: .4rem;
    text-align: center;
    font-size: .36rem;
  }
  button {
    line-height: .4rem;
    padding: .3rem .8rem;
    font-size: .4rem;
    border-radius: .3rem;
    background-color: #ff0033;
    color: #fff;
  }
}
</style>
