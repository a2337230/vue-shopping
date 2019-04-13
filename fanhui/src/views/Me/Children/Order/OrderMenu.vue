<template>
  <div class="order-menu" v-if="shopData">
    <ul>
      <li class="order-list" v-for="shop in shopData" :key="shop.id">
        <div class="mall">
          <div class="mall-mame" @click="goMall(shop.mall_id)">
            <img :src="shop.mall_logo" alt="">
            <span>{{shop.mall_name}}</span><i class="iconfont icon-youjiantou"></i>
          </div>
          <span class="buy-state">{{shop.buy_state | buyState}}</span>
        </div>
        <div class="shop-info" @click="goShop(shop)">
          <div class="shop-logo">
            <img :src="shop.thumb_url" alt="">
          </div>
          <div class="shop-dec">
            <h3 class="shop-name">{{shop.short_name}}</h3>
            <div class="shop-price">
              <span>共{{shop.buy_num}}件商品 合计: ¥</span><span class="price">{{(shop.normal_price / 100 * shop.buy_num).toFixed(2)}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getBuyShopOne } from './../../../../api/index.js'
export default {
  name: 'OrderMenu',
  props: {
    type: Number
  },
  data () {
    return {
      shopData: false
    }
  },
  created () {
    this._getShop()
  },
  methods: {
    async _getShop () {
      let result = await getBuyShopOne({
        type: this.type
      })
      this.shopData = result.message
    },
    goMall (shop) {
      this.$router.push({
        path: '/mallpage',
        query: {
          mall_id: shop
        }
      })
    },
    goShop (shop) {
      this.$router.push({
        path: '/shopdetail',
        query: {
          id: shop.goods_id,
          cnt: shop.sales_tip,
          price: shop.normal_price
        }
      })
    }
  },
  filters: {
    buyState (val) {
      let state = ''
      if (val === 1) {
        state = '已付款'
      } else if (val === 2) {
        state = '已发货'
      } else if (val === 3) {
        state = '已收货'
      } else {
        state = '已评价'
      }
      return state
    }
  }
}
</script>
<style lang="less" scoped>
.order-menu {
  height: 100%;
  padding: 1.1rem 0;
  box-sizing: border-box;
  ul {
    padding: .1rem;
    margin-bottom: 1.1rem;
    .order-list {
      border-radius: .2rem;
      background-color: #fff;
      margin-bottom: .2rem;
      .mall {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .2rem .3rem;
        .mall-mame {
          font-size: .36rem;
          img {
            width: .42rem;
            border-radius: 50%;
            vertical-align: middle;
            margin-top: -.1rem;
          }
          i {
            margin-left: .1rem;
            font-size: .3rem;
          }
        }
        .buy-state {
          font-size: .36rem;
          color: #ff0033;
        }
      }
      .shop-info {
        padding: .2rem;
        display: flex;
        .shop-logo {
          flex: 3;
          img {
            width: 100%;
          }
        }
        .shop-dec {
          flex: 6;
          padding-left: .2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .shop-name {
            font-size: .36rem;
            font-weight: normal;
          }
          .shop-price {
            text-align: right;
            font-size: .3rem;
            line-height: 2;
            .price {
              font-size: .33rem;
            }
          }
        }
      }
    }
  }
}
</style>
