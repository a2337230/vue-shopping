<template>
  <me-scroll class="scroller" :upCallback="upCallback" ref="mescroll" warpId="index_scroll"
    id="index_scroll" >
    <div class="recommend">
      <shop-list-r :listData="recommend"></shop-list-r>
    </div>
  </me-scroll>
</template>
<script>
import ShopListR from './../../components/ShopListR/ShopListR'
import { mapState } from 'vuex'
import MeScroll from './../../components/mescroll/Scroll'
export default {
  name: 'recommend',
  data () {
    return {
      page: 1,
      startY: 0,
      mescrollDown: {}
    }
  },
  computed: {
    ...mapState(['recommend'])
  },
  components: {
    ShopListR,
    MeScroll
  },
  methods: {
    upCallback () {
      this.$store.dispatch('getRecommendShop', {
        currentPage: {
          page: this.page
        },
        scb: (result) => {
          this.$refs.mescroll.endSuccess(result.length)
          this.page++
        },
        ecb: () => {
          this.$refs.mescroll.endErr()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.scroller {
  padding-bottom: 1rem;
}
.recommend {
  width: 100%;
}
</style>
