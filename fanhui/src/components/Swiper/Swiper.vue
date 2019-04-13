<template>
  <div class="swiper-container" v-if="showSwiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide"
          v-for="pic in swiperData.goods_swiper"
          :key='pic'
        >
          <img v-lazy="pic" width="100%">
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  name: 'swiper',
  props: {
    swiperData: Object
  },
  data () {
    return {
      showSwiper: true
    }
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
    }
  },
  updated () {
    this.autoTab()
  },
  watch: {
    swiperData () {
      this.showSwiper = false
      this.$nextTick(() => {
        this.showSwiper = true
        // this.autoTab()
      })
    }
  }
}
</script>
