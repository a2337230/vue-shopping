<template>
  <div class="keyword mb50">
    <div class="header-bar" v-if="$route.query.keyword">
      <i class="iconfont icon-houtui" @click="goBack"></i>
      <span>{{$route.query.keyword}}</span>
    </div>
    <me-scroll class="scroller" :upCallback="upCallback" ref="mescroll" warpId="index_scroll"
    id="index_scroll" >
      <div class="key-l" :class="$route.query.keyword?'pt50':''">
        <shop-list-r :listData='searchShop' v-show="isShow"></shop-list-r>
      </div>
    </me-scroll>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ShopListR from './../../components/ShopListR/ShopListR'
import MeScroll from './../mescroll/Scroll'
export default {
  name: 'keyword',
  data () {
    return {
      page: 1,
      isShow: 0
    }
  },
  beforeDestroy () {
    localStorage.setItem('key', this.$route.meta.keyword || this.$route.query.keyword)
  },
  mounted () {
    // this.fetchDate()
  },
  computed: {
    ...mapState(['keyWord', 'searchShop'])
  },
  methods: {
    upCallback () {
      this.$store.dispatch('getSearchShop', {
        currentPage: {
          keyword: this.$route.meta.keyword || this.$route.query.keyword,
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
    },
    fetchDate () {
      this.$store.dispatch('getSearchShop', {
        keyword: this.$route.meta.keyword || this.$route.query.keyword,
        page: this.page
      })
    },
    goBack () {
      this.$router.back(-1)
    }
  },
  watch: {
    $route (val) {
      this.upCallback()
      window.scrollTo(0, 0)
    },
    searchShop () {
      this.$nextTick(() => {
        this.isShow = 1
      })
    }
  },
  components: {
    ShopListR,
    MeScroll
  }
}
</script>
<style lang="less" scoped>
.header-bar {
  width: 100%;
  height: 1rem;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff0033;
  color: #fff;
  font-size: .5rem;
  i {
    position: absolute;
    left: .3rem;
  }
}
.pt50 {
  padding-top: 1.1rem;
}
</style>
