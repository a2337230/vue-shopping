<template>
  <div class="shop-detail">
    <!-- 商品轮播图 -->
    <div class="detail-nav" v-if="shopInfo">
      <div class="back" @click="goBack">
        <i class="iconfont icon-houtui"></i>
      </div>
      <swiper-tab :swiperData="shopInfo"></swiper-tab>
    </div>
    <!-- 商品信息 -->
    <div class="shop-info">
      <div class="shop-info-top">
        <div class="shop-price">
          ¥<span>{{price / 100}}</span>
        </div>
        <span class="shop-count">已售{{shopInfo.count}}</span>
      </div>
      <h2 class="shop-title">{{shopInfo.shop_title}}</h2>
      <ul class="shop-sev">
        <li>极速退款</li>
        <li>全场包邮</li>
        <li>7天退换</li>
        <li>48小时发货</li>
      </ul>
    </div>
    <!-- 商家信息 -->
    <div class="mall">
      <div class="mall-header">
        <div class="mail-avatar">
          <img :src="shopInfo.mall_logo" alt="">
        </div>
        <p>{{shopInfo.goods_mall_name}}</p>
        <button @click="mallPage">进店逛逛</button>
      </div>
      <div class="mall-recommend">
        <ul>
          <li
            v-for="mall in shopRecommend.mall_recommend"
            :key="mall.goods_id"
            @click="recClick(mall)"
          >
            <img v-lazy="mall.thumb_url" alt="">
            <p class="mr-title">{{mall.short_name}}</p>
            <p class="mr-pri">
              <span>¥{{mall.price / 100}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="shop-des">
      <h3>商品详情</h3>
      <p>{{shopInfo.goods_description}}</p>
      <ul class="shop-img">
        <li class="gd-item" v-for="img in shopInfo.goods_des_img" :key="img">
          <img v-lazy="'http://' + img" alt="">
        </li>
      </ul>
    </div>
    <!-- 相关推荐 -->
    <div class="goods-recommend">
      <h3 class="rec-title"><i class="iconfont icon-gouwu"></i>相似商品</h3>
      <shop-list-r :listData='shopRecommend.shop_recommend'></shop-list-r>
    </div>
    <!-- 底部购买 -->
    <footer class="shop-bottom">
      <div class="mall-shop" @click="mallPage">
        <i class="iconfont icon-dianpu isColor"></i>
        <span>店铺</span>
      </div>
      <div class="mall-customer" @click="goService">
        <i class="iconfont icon-service"></i>
        <span>客服</span>
      </div>
      <div class="mall-collect" @click="_getColl">
        <i class="iconfont icon-shoucang" :class="{isColor: coll === 1}"></i>
        <span>收藏</span>
      </div>
      <div class="buy">
        <button @click="setShopCat">加入购物车</button>
        <button @click="buyClick">立即购买</button>
      </div>
    </footer>
  </div>
</template>
<script>
import { shopDetail, shopRec, getShopCat, getColl, getFindColl, setBuyShop } from './../../api/index.js'
import SwiperTab from './../Swiper/Swiper'
import ShopListR from './../../components/ShopListR/ShopListR'
import { mapState } from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
export default {
  name: 'ShopDetail',
  data () {
    return {
      shopId: this.$route.query.id,
      price: this.$route.query.price,
      shopInfo: {},
      shopRecommend: {},
      catState: 1,
      coll: 0,
      isCollClick: true
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {
    this.getShopDetail()
  },
  beforeUpdate () {
    window.scrollTo(0, 0)
  },
  methods: {
    // 获取商品信息
    async getShopDetail () {
      let result = await shopDetail({goodsId: this.shopId, price: this.price})
      this.shopInfo = result.message
      this._getFindColl()
      this.shopRec()
    },
    // 获取商家推荐
    async shopRec () {
      let result = await shopRec({goodsId: this.shopId})
      this.shopRecommend = result.message
    },
    // 获取商品是否添加推荐
    async _getFindColl () {
      if (this.userInfo.id) {
        let params = {
          goodsId: this.shopId,
          img: this.shopInfo.goods_swiper[0],
          price: this.price,
          name: this.shopInfo.shop_title,
          count: '已拼' + this.shopInfo.count
        }
        let result = await getFindColl(params)
        this.coll = result.coll_code
      }
    },
    // 为商品添加推荐
    async _getColl () {
      if (!this.userInfo.id) {
        this.$router.push('/login')
      } else {
        if (this.isCollClick) {
          this.isCollClick = false
          let params = {
            goodsId: this.shopId,
            img: this.shopInfo.goods_swiper[0],
            price: this.price,
            name: this.shopInfo.shop_title,
            count: '已拼' + this.shopInfo.count
          }
          let result = await getColl(params)
          this.coll = result.coll_code
          if (this.coll) {
            Toast({
              message: '添加收藏成功',
              iconClass: 'iconfont icon-xiugaichenggong success',
              duration: 1000
            })
          }
          this.isCollClick = true
        }
      }
    },
    // 点击购买
    buyClick () {
      if (!this.userInfo.id) {
        this.$router.push('/login')
      } else {
        if (this.isCollClick) {
          this.isCollClick = true
          if (this.shopInfo.mall_logo && this.shopRecommend.mall_recommend) {
            this.isCollClick = false
            let params = {
              goodsId: this.shopId,
              img: this.shopInfo.goods_swiper[0],
              price: this.price,
              name: this.shopInfo.shop_title,
              count: '已拼' + this.shopInfo.count,
              mallId: this.shopRecommend.mall_recommend[0].mall_id,
              mallTitle: this.shopInfo.goods_mall_name,
              mallLogo: this.shopInfo.mall_logo
            }
            let html = `<div style="font-size:.36rem; line-height: .6rem">
              此项目为老姜仿原公司项目<br/>
              为方便测试购买流程采用虚拟流程<br/>
              每<span style="color:#ff4949">30秒</span>左右会进入一个状态<br/>
              状态顺序<br/>
              <span style="color:#ff4949">已付款→已发货→已收货→已评价</span><br/>
              可到个人中心相应版块查看
            </div>`
            MessageBox.confirm('', {
              title: '温馨提示',
              message: html,
              showCancelButton: true,
              confirmButtonText: '确定'
            }).then(action => {
              let result = setBuyShop(params)
              Toast({
                message: '购买成功，即将跳转个人中心',
                iconClass: 'iconfont icon-xiugaichenggong success',
                duration: 2000
              })
              setTimeout(() => {
                this.isCollClick = true
                this.$router.push('/personal')
              }, 2000)
            }).catch(calcel => {
              this.isCollClick = true
            })
          }
        }
      }
    },
    // 返回上一页
    goBack () {
      this.$router.back(-1)
    },
    recClick (goods) {
      this.$router.push({
        path: '/shopdetail',
        query: {
          id: goods.goods_id,
          price: goods.price
        }
      })
    },
    mallPage () {
      if (this.shopRecommend !== {}) {
        this.$router.push({
          path: '/mallpage',
          query: {
            mall_id: this.shopRecommend.mall_recommend[0].mall_id
          }
        })
      }
    },
    async setShopCat () {
      if (this.catState) {
        this.catState = false
        if (!this.userInfo.id) {
          this.catState = true
          this.$router.push('/login')
        } else {
          this.catState = true
          if (this.shopInfo.mall_logo && this.shopRecommend.mall_recommend) {
            this.catState = false
            let params = {
              shop_id: this.shopId,
              thumb_url: this.shopInfo.goods_swiper[0],
              price: this.price,
              goods_name: this.shopInfo.shop_title,
              tip: this.shopInfo.count,
              mallId: this.shopRecommend.mall_recommend[0].mall_id,
              mallTitle: this.shopInfo.goods_mall_name,
              mallLogo: this.shopInfo.mall_logo
            }
            let result = await getShopCat(params)
            Toast({
              message: '添加购物车成功',
              iconClass: 'iconfont icon-xiugaichenggong success',
              duration: 1000
            })
            setTimeout(() => {
              this.catState = true
            }, 1000)
          }
        }
      }
    },
    goService () {
      Toast({
        message: '该功能正在研发中心',
        iconClass: 'iconfont icon-shigong error',
        duration: 1000
      })
    }
  },
  components: {
    SwiperTab,
    ShopListR
  },
  watch: {
    $route () {
      this.shopId = this.$route.query.id
      this.price = this.$route.query.price
      this.getShopDetail()
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style lang="less" scoped>
.shop-detail {
  width: 100%;
  margin-bottom: 1rem;
  background-color: #f4f4f4;
  .detail-nav {
    position: relative;
    .back {
      position: absolute;
      width: .8rem;
      height: .8rem;
      top: .4rem;
      left: .4rem;
      z-index: 555;
      background-color: rgba(88,89,91,0.6);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      padding-right: .05rem;
      i {
        font-size: .52rem;
        color: #fff;
        line-height: .8rem;
        text-align: center;
      }
    }
  }
  .shop-info {
    margin-bottom: .2rem;
    background-color: #fff;
  }
  .shop-info-top {
    display: flex;
    justify-content: space-between;
    padding: .2rem;
    .shop-price {
      font-size: .32rem;
      color: #e02e24;
      span {
        font-size: .4rem;
        font-weight: bold;
      }
    }
    .shop-count {
      font-size: .4rem;
      color: #58595b;
    }
  }
  .shop-title {
    padding-top: .02rem;
    font-size: .32rem;
    line-height: 1.5;
    color: #151516;
  }
  .shop-sev {
    display: flex;
    li {
      font-size: .28rem;
      padding: 0 .2rem;
      color: #58595b;
      line-height: 2;
      &:first-child {
        padding-left: 0;
      }
    }
  }
  .mall {
    background-color: #fff;
    margin-bottom: .2rem;
    .mall-header {
      display: flex;
      padding: .1rem;
      align-items: center;
      .mail-avatar{
        flex: 1;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      p {
        font-size: .4rem;
        flex: 3;
        padding-left: .2rem;
        font-weight: bold;
      }
      button {
        flex: 1;
        border: 1px solid gray;
        line-height: 2;
        font-size: .3rem;
        border-radius: .2rem;
      }
    }
    .mall-recommend {
      padding: .2rem;
      ul {
        width: 100%;
        display: flex;
        justify-content: space-around;
        li {
          width: 33.3%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            width: 90%;
          }
          .mr-title {
            width: 90%;
            font-size: .3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 2;
          }
          .mr-pri {
            font-size: .5rem;
            color: #e02e24;
            text-align: center;
          }
        }
      }
    }
  }
  .shop-des {
    background-color: #fff;
    h3 {
      font-weight: normal;
      font-size: .5rem;
      line-height: 3;
      padding-left: .2rem;
    }
    p {
      font-size: .28rem;
      padding: .2rem;
      color: #666;
    }
  }
  .shop-img {
    margin-bottom: .2rem;
    .gd-item {
      width: 100%;
      img {
        width: 100%;
      }
    }
  }
  .goods-recommend {
    margin-top: 10px;
    background-color: #fff;
    .rec-title {
      font-size: .5rem;
      line-height: 2;
      text-align: center;
      font-weight: normal;
      color: #e02e24;
      i {
        font-size: .5rem;
        margin-right: .2rem;
      }
    }
  }
  .shop-bottom {
    width: 100%;
    height: 1rem;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    z-index: 999;
    display: flex;
    align-items: center;
    border-top: 1px solid #acacac;
    i {
      font-size: .44rem;
      color: #acacac;
      font-weight: bold;
    }
    .mall-shop,.mall-customer,.mall-collect {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      span {
        font-size: .28rem;
      }
    }
    .isColor {
      color: #ff0036;
    }
    .buy {
      flex: 4;
      display: flex;
      background-color: red;
      button {
        line-height: 1rem;
        flex: 1;
        color: #fff;
        font-size: .32rem;
        background-color: #ff0036;
        &:first-child {
          background-color: #ff9500;
        }
      }
    }
  }
}
</style>
