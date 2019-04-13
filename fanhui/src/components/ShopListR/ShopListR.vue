<template>
  <ul class="shopListR">
    <li class="shop-item"
      v-for="shop in listData"
      :key="shop.goods_id"
      @click="shopClick(shop)"
    >
      <img v-lazy="shop.thumb_url" :alt="shop.short_name">
      <p class="shopTitle">{{shop.short_name}}</p>
      <div class="shopPrice">
        <span class="price">¥{{shop.normal_price / 100}}</span>
        <span class="total">{{shop.sales_tip.replace('拼', '售')}}</span>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'shoplistr',
  props: {
    listData: Array
  },
  methods: {
    shopClick (goods) {
      this.$router.push({
        path: '/shopdetail',
        query: {
          id: goods.goods_id,
          cnt: goods.cnt,
          price: goods.normal_price
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.shopListR {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .shop-item {
    width: 49%;
    // margin-bottom: 5px;
    background-color: #fff;
    img {
      width: 100%;
    }
    .shopTitle {
      padding: .08rem;
      font-size: .36rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .shopPrice {
      padding: .2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        font-size: .36rem;
        font-weight: bold;
        color: #e02e24;
      }
      .total {
        color: #58595b;
        font-size: .33rem;
      }
    }
  }
}
</style>
