<template>
  <me-scroll class="scroller" :upCallback="upCallback" ref="mescroll" warpId="index_scroll"
    id="index_scroll" >
    <div class="hot">
      <!-- 首页轮播图 -->
      <div class="hot-swiper">
        <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide"
                v-for="pic in hot_swiper"
                :key='pic.img'
              >
                <img :src="pic.img" width="100%">
              </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <!-- 推荐广告 -->
      <div class="ad" @click="adClick">
        <img
          src="http://t00img.yangkeduo.com/goods/images/2019-03-27/6df8bb9a97289d4ee321153e1fef1029.jpeg?imageMogr2/sharpen/1%7CimageView2/2/w/1300/q/70/format/webp"
          width="100%"
        >
      </div>
      <!-- <ad-box :adInfo="adInfo" @click="adClick"></ad-box> -->
      <!-- 商品列表 -->
        <shop-list-c :listData="hotshop"></shop-list-c>
    </div>
  </me-scroll>
</template>
<script>
import { mapState } from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import MeScroll from './../../../../components/mescroll/Scroll'
import ShopListC from './../../../../components/ShopListC/ShopListC'
export default {
  name: 'hot',
  data () {
    return {
      adInfo: {
        img: 'http://t00img.yangkeduo.com/goods/images/2019-03-27/6df8bb9a97289d4ee321153e1fef1029.jpeg?imageMogr2/sharpen/1%7CimageView2/2/w/1300/q/70/format/webp'
      },
      hot_swiper: [
        {
          path: '/111',
          img: 'http://t16img.yangkeduo.com/pdd_oms/2019-04-02/59bff8220897b6f71e8a2654afc6da8e.jpeg'
        },
        {
          path: '/111',
          img: 'http://t16img.yangkeduo.com/pdd_oms/2019-04-02/678283fd6a65b2ded1fb0b8406c67839.jpeg'
        },
        {
          path: '/111',
          img: 'http://t00img.yangkeduo.com/goods/images/2019-04-01/4dd613a5fa24e5b73f6073866d823230.jpeg'
        },
        {
          path: '/111',
          img: 'http://t16img.yangkeduo.com/pdd_oms/2019-02-21/e3a08f545576a2e1fbbe97241bb222f3.jpg'
        }
      ],
      page: 1
    }
  },
  mounted () {
    window.scrollTo(0, 0)
    // this.$store.dispatch('getHotShop', {page: this.page})
    this.autoTab()
  },
  methods: {
    autoTab () {
      var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        }
      })
    },
    adClick () {
      this.$router.push({
        path: '/actpage',
        query: {
          page_id: 16056
        }
      })
    },
    upCallback () {
      this.$store.dispatch('getHotShop', {
        currentPage: {
          page: this.page
        },
        scb: (result) => {
          this.$refs.mescroll.endSuccess(result)
          this.page++
        },
        ecb: () => {
          this.$refs.mescroll.endErr()
        }
      })
    }
  },
  computed: {
    ...mapState(['hotshop'])
  },
  components: {
    ShopListC,
    MeScroll
  }
}
</script>
<style lang="less" scoped>
.hot {
  width: 100%;
  height: 100%;
}
</style>
