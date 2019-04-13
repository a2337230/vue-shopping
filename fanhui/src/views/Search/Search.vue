<template>
  <div class="search" :class="{hidden: openSearch === false}">
    <!-- 搜索框 -->
    <div class="search-box" @click='searchClick' v-if='!openSearch'>
       <search-nav :hotSearch="hotSearch.shade" v-if="hotSearch.shade"></search-nav>
    </div>
    <!-- 用户搜索 -->
    <search-input
      v-if="openSearch"
      :hotSearch="hotSearch.shade"
      @tabView="tabView"
    ></search-input>
    <!-- 搜索列表 -->
    <div class="shop-menu" ref="shopMenu" v-else>
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item"
            v-for="(item, index) in searchMenu"
            :key="item.name"
            :class="{current: index === currentIndex}"
            @click="clickLeft(index)"
            ref="menuList"
          >
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="shop-wrapper">
        <ul class="shop-list" ref="shopsParent">
          <li class="shop-li" v-for="goods in searchMenu" :key="goods.name">
            <div class="shop-title">
              <h2>{{goods.name}}</h2>
            </div>
            <ul class="shop-item">
              <li v-for="item in goods.items"
                :key="item.title"
                @click="listClick(item)"
              >
                <img :src="item.icon" alt="">
                <span>{{item.title}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import SearchNav from './Children/SearchNav'
import BScroll from 'better-scroll'
import SearchInput from './Children/SearchInput'
export default {
  name: 'search',
  data () {
    return {
      // 显示搜索框
      searchBoxShow: false,
      scrollY: 0,
      rightListTop: [],
      openSearch: false
    }
  },
  created () {
    this.$store.dispatch('getHotSearch', {
      callback: () => {
        this.searchBoxShow = true
      }
    })
    this.$store.dispatch('getSearchMenu')
    // this.$store.commit('hide-bottom', false)
  },
  computed: {
    ...mapState(['searchMenu', 'hotSearch']),
    currentIndex () {
      return this.rightListTop.findIndex((LiTop, index) => {
        this._leftScroll(index)
        return this.scrollY >= LiTop && this.scrollY < this.rightListTop[index + 1]
      })
    }
  },
  watch: {
    searchMenu () {
      this.$nextTick(() => {
        // 初始化
        this._initScroll()
        // 取出右侧板块头部位置
        this._rightListTop()
      })
    }
  },
  methods: {
    _initScroll () {
      this.leftScroll = new BScroll('.menu-wrapper', {
        scrollY: true,
        click: true
      })
      this.rightScroll = new BScroll('.shop-wrapper', {
        scrollY: true,
        click: true,
        probeType: 3
      })
      this.rightScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(pos.y)
      })
    },
    _rightListTop () {
      const tempArr = []
      let top = 0
      tempArr.push(top)
      let allList = this.$refs.shopsParent.getElementsByClassName('shop-li')
      Array.prototype.slice.call(allList).forEach((item, index) => {
        // 为最后一个增加高度
        if (index === allList.length - 1) {
          item.style.height = window.getComputedStyle(this.$refs.shopMenu).height
        }
        top += item.clientHeight
        tempArr.push(top)
      })
      this.rightListTop = tempArr
    },
    clickLeft (index) {
      this.scrollY = this.rightListTop[index]
      this.rightScroll.scrollTo(0, -this.scrollY, 300)
    },
    _leftScroll (index) {
      let menuList = this.$refs.menuList
      let el = menuList[index]
      this.leftScroll.scrollToElement(el, 300, 0, -200)
    },
    listClick (shop) {
      this.$router.push({
        name: 'SearchKey',
        query: {
          keyword: shop.title
        }
      })
    },
    searchClick () {
      this.openSearch = true
    },
    tabView () {
      this.openSearch = false
    }
  },
  components: {
    SearchNav,
    SearchInput
  }
}
</script>
<style lang="less" scoped>
.hidden {
  overflow: hidden;
}
.search {
  width: 100%;
  height: calc(~"100% - 1.2rem");
  .shop-menu {
    border-top: 1px solid #ededed;
    height: calc(~"100% - 1rem");
    display: flex;
    overflow: hidden;
    .menu-wrapper {
      width: 2rem;
      background-color: #fafafa;
      .menu-item {
        font-size: .36rem;
        line-height: 3;
        text-align: center;
        color: #666666;
      }
      .current {
        color: #e02e24;
        position: relative;
        font-weight: bold;
        background-color: #fff;
        &::before {
          content: '';
          display: block;
          width: .07rem;
          height: .6rem;
          background-color: #e02e24;
          position: absolute;
          left: 0;
          top: .22rem;
        }
      }
    }
    .shop-wrapper {
      flex: 1;
      background-color: #fff;
      .shop-list {
        .shop-title {
          display: flex;
          line-height: 2;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          h2 {
            font-size: .46rem;
            color: #58595b;
            font-weight: normal;
            padding-left: .4rem;
          }
        }
        .shop-item {
          display: flex;
          flex-wrap: wrap;
          li {
            display: flex;
            width: 33.3%;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: .2rem;
            img {
              width: 70%;
            }
            span {
              font-size: .34rem;
              line-height: 2.5;
            }
          }
        }
      }
    }
  }
}
</style>
