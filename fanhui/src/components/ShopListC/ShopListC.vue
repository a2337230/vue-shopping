<template>
  <ul class="shopListC">
    <li class="shop-item"
      v-for="shop in listData"
      :key="shop.goods_id"
      @click="shopClick(shop)"
    >
      <div class="shop-left">
        <img v-lazy="shop.thumb_url" :alt="shop.short_name">
      </div>
      <div class="shop-right">
        <p class="shopTitle">{{shop.short_name}}</p>
        <div class="shopPrice">
          <span class="adprice discount" v-if="type">¥{{(shop.market_price / 100 * 3).toFixed(2)}}</span>
          <span class="price">¥{{shop.market_price / 100}}</span>
          <span class="total">{{shop.sales_tip.replace('拼', '售')}}</span>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'shoplistC',
  props: {
    listData: Array,
    type: Number
  },
  methods: {
    shopClick (goods) {
      let price = goods.market_price
      this.$router.push({
        path: '/shopdetail',
        query: {
          id: goods.goods_id,
          cnt: goods.cnt,
          price: price
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.shopListC {
  box-sizing: border-box;
  padding: 0 .1rem 0;
  .shop-item {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding: .08rem;
    border-radius: .2rem;
    margin-bottom: .2rem;
  }
  .shop-left {
    width: 40%;
    img {
      width: 100%;
    }
  }
  .shop-right {
    box-sizing: border-box;
    width: 60%;
    padding-left: .2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .shopTitle {
      font-size: .3rem;
    }
    .shopPrice {
      display: flex;
      justify-content: space-between;
      .price, .adprice {
        font-size: .36rem;
        line-height: .36rem;
        font-weight: bold;
        color: #e02e24;
      }
      .discount {
        font-size: .2rem;
        color: #9c9c9c;
        text-decoration: line-through;
      }
      .total {
        color: #58595b;
        font-size: .3rem;
      }
    }
  }
}
</style>
