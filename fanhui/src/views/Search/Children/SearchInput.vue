<template>
  <div class="search-input">
    <div class="search-input-box">
      <div class="input-container">
        <i class="iconfont icon-sousuo5"></i>
        <input type="text"
          :placeholder="hotSearch.shade.query"
          v-model='searchInfo'
        >
      </div>
      <button @click="btnClick">{{buttonType?"搜索":"取消"}}</button>
    </div>
    <div class="hot-search" v-show="hotShow">
      <h2 class="hot-search-title">
        <i class="iconfont icon-remen"></i>
        热门搜索
      </h2>
      <ul class="hot-search-item">
        <li
          v-for="item in hotSearch.items"
          :key="item"
          @click="tagClick(item)"
        >{{item}}</li>
      </ul>
    </div>
    <me-scroll v-show="!hotShow" class="scroller" :upCallback="upCallback" ref="mescroll" warpId="index_scroll"
    id="index_scroll" >
      <div class="search-shop-list">
        <shop-list-r :listData='searchShop'></shop-list-r>
      </div>
    </me-scroll>
  </div>
  <!-- <search-nav :hotSearch="hotSearch.shade"></search-nav> -->
</template>
<script>
import { mapState } from 'vuex'
import SearchNav from './SearchNav'
import ShopListR from './../../../components/ShopListR/ShopListR'
import MeScroll from './../../../components/mescroll/Scroll'
export default {
  name: 'SearchInput',
  data () {
    return {
      buttonType: 0,
      searchInfo: '',
      keyword: '',
      page: 1,
      hotShow: 1,
      listShow: 0,
      startY: 0
    }
  },
  computed: {
    ...mapState(['hotSearch', 'searchShop'])
  },
  updated () {
    if (this.keyword) {
      this.hotShow = 0
    }
  },
  methods: {
    upCallback () {
      this.$store.dispatch('getSearchShop', {
        currentPage: {
          keyword: this.keyword,
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
    btnClick () {
      if (this.buttonType) {
        if (this.keyword !== this.searchInfo) {
          this.keyword = this.searchInfo
          this.page = 1
          this.startY = 0
          // this._getShop()
          this.upCallback()
        }
      } else {
        this.$emit('tabView')
      }
    },
    tagClick (val) {
      this.keyword = val
      // this._getShop()
      this.upCallback()
    }
  },
  watch: {
    searchInfo (val) {
      if (val) {
        this.buttonType = 1
      } else {
        this.buttonType = 0
        this.hotShow = 1
      }
    }
  },
  components: {
    SearchNav,
    ShopListR,
    MeScroll
  }
}
</script>
<style lang="less" scoped>
.search-input {
  height: 100%;
  // padding: .1rem;
  font-size: .4rem;
  background-color: #fff;
  box-sizing: border-box;
  .search-input-box {
    width: 100%;
    display: flex;
    position: fixed;
    top: 0;
    padding: .2rem .1rem;
    background-color: #fff;
    border-bottom: 1px solid #ededed;
    line-height: 2.5;
    .input-container {
      padding-left: .4rem;
      background-color: #ededed;
      border-radius: .2rem;
      flex: 5;
       input {
        font-size: .4rem;
        padding-left: .2rem;
        width: 80%;
      }
    }
    button {
      flex: 1;
      color: #9c9c9c;
      font-size: .4rem;
      text-align: center;
    }
  }
  .hot-search {
    padding-top: .2rem;
    .hot-search-title {
      i {
        margin-right: .2rem;
      }
      font-size: .32rem;
      line-height: 4;
      font-weight: normal;
      color: #9c9c9c;
    }
    .hot-search-item {
      display: flex;
      flex-wrap: wrap;
      color: #9c9c9c;
      padding: .1rem;
      li {
        padding: 0 .2rem;
        background-color: #ededed;
        color: #58595b;
        font-size: .32rem;
        border-radius: .4rem;
        margin-right: .2rem;
        margin-bottom: .2rem;
      }
    }
  }
  .search-shop-list {
    margin: 1.2rem 0;
  }
}
</style>
