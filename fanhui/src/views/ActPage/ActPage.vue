<template>
  <div class="actpage" v-if="actBg.img">
    <div class="banner">
      <img :src="actBg.img" width="100%">
    </div>
    <div class="shop-list">
      <shop-list-c :listData="searchShop" :type="1"></shop-list-c>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ShopListC from './../../components/ShopListC/ShopListC'
export default {
  name: 'ActPage',
  data () {
    return {
      actBg: {
        img: null,
        bgcolor: null
      }
    }
  },
  created () {
    this._getImg()
    this._getShop()
  },
  methods: {
    _getImg () {
      let pageId = this.$route.query.page_id
      if (pageId === 16056 || pageId === '16056') {
        this.actBg.img = 'http://t00img.yangkeduo.com/goods/images/2019-03-27/6df8bb9a97289d4ee321153e1fef1029.jpeg?imageMogr2/sharpen/1%7CimageView2/2/w/1300/q/70/format/webp'
        this.actBg.bgcolor = '#fff'
      }
    },
    _getShop () {
      let pageId = this.$route.query.page_id
      let key = null
      if (pageId === 16056 || pageId === '16056') {
        key = '爆款鞋'
      }
      this.$store.dispatch('getSearchShop', {
        currentPage: {
          keyword: key,
          page: 7
        }
      })
    }
  },
  computed: {
    ...mapState(['searchShop'])
  },
  components: {
    ShopListC
  }
}
</script>
<style lang="less" scoped>
.actpage {
  margin-bottom: 1rem;
  padding-bottom: .3rem;
  .shop-list {
    margin-top: .3rem;
  }
}
</style>
