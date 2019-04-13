<template>
  <div class="mall-page" v-if="mallAll.mall_copons">
    <div class="mall-header">
      <div class="back" @click="goBack">
        <i class="iconfont icon-houtui"></i>
      </div>
      <img :src="mallBg" alt="" class="mall-bg">
      <div class="mall-logo">
        <img v-lazy="mallAll.mall_copons.logo" :alt="mallAll.mall_copons.mall_name">
      </div>
      <h2 class="mall-name">{{mallAll.mall_copons.mall_name}}</h2>
      <div class="mall-num">
        <span>商品数量 : {{mallAll.mall_shop.goods.goods_list.length}} 件</span>
        <span>{{mallAll.mall_copons.sales_tip.replace('拼', '售')}}</span>
      </div>
    </div>
    <div class="mall-center">
      <h2 class="rec-title"><i class="iconfont icon-remen"></i>店长推荐</h2>
      <ul class="mall-recom">
        <li class="mallrec-item"
          v-for="mall in mallRec"
          :key="mall.goods_id"
          @click="goShop(mall)"
        >
          <img v-lazy="mall.thumb_url" alt="">
          <p>{{mall.short_name}}</p>
          <span>¥{{mall.normal_price / 100}}</span>
        </li>
      </ul>
    </div>
    <div class="mall-shop mb50">
      <h2 class="mall-shop-title"><i class="iconfont icon-gouwu"></i>商家商品</h2>
      <shop-list-r :listData='mallAll.mall_shop.goods.goods_list'></shop-list-r>
    </div>
  </div>
</template>
<script>
import { mallInfo } from './../../api/index.js'
import SwiperTab from './../../components/Swiper/Swiper'
import ShopListR from './../../components/ShopListR/ShopListR'
export default {
  name: 'MallPage',
  data () {
    return {
      mallBg: null,
      mallAll: {},
      mallRec: {}
    }
  },
  created () {
    this._getMallInfo()
  },
  methods: {
    async _getMallInfo () {
      let result = await mallInfo({mallId: this.$route.query.mall_id})
      this.mallAll = result.message
      let ramdom = Math.ceil(Math.random() * (result.message.mall_shop.goods.goods_list.length - 3))
      this.mallRec = result.message.mall_shop.goods.goods_list.sort(() => Math.random() - 0.5).slice(ramdom, ramdom + 3)
      this.mallBg = this.mallRec[0].hd_thumb_url
    },
    // 返回上一页
    goBack () {
      this.$router.back(-1)
    },
    goShop (goods) {
      this.$router.push({
        path: '/shopdetail',
        query: {
          id: goods.goods_id,
          cnt: goods.sales_tip,
          price: goods.normal_price
        }
      })
    }
  },
  components: {
    SwiperTab,
    ShopListR
  }
}
</script>
<style lang="less" scoped>
.mall-page {
  .mall-header {
    width: 100%;
    padding: .4rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    position: relative;
    .back {
      position: absolute;
      width: .8rem;
      height: .8rem;
      top: .4rem;
      left: .4rem;
      z-index: 555;
      background-color: rgba(0,0,0,0.7);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      padding-right: .06rem;
      i {
        font-size: .32rem;
        color: #fff;
        line-height: .8rem;
        text-align: center;
      }
    }
    .mall-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.5;
    }
    .mall-logo {
      width: 20%;
      margin-bottom: .2rem;
      z-index: 1;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .mall-name {
      font-size: .36rem;
      line-height: 1.5;
      color: #151516;
      z-index: 1;
    }
    .mall-num {
      font-size: .24rem;
      color: #151516;
      line-height: 2;
      z-index: 1;
      span {
        padding: 0 .2rem;
      }
    }
  }
  .mall-center,.mall-shop {
    margin-top: 10px;
    background-color: #fff;
    padding: .02rem 0;
    .rec-title,.mall-shop-title {
      color: #e02e24;
      font-size: .4rem;
      text-align: center;
      line-height: 2;
      i {
        font-size: .48rem;
        margin-right: .2rem;
      }
    }
    .mall-recom {
      display: flex;
      width: 100%;
      .mallrec-item {
        width: 33.3%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 94%;
        }
        p {
          width: 94%;
          font-size: .28rem;
          white-space: nowrap;
          text-overflow:ellipsis;
          overflow:hidden;
        }
        span {
          font-size: .4rem;
          color: #e02e24;
          line-height: 2;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
