<template>
  <div class="me mb50">
    <me-scroll class="scroller" :upCallback="upCallback" ref="mescroll" warpId="index_scroll"
    id="index_scroll" >
      <div class="me-container">
        <div class="me-name">
          <img :src="userInfo.user_avatar" alt="">
          <span class="user-pet">{{userInfo.user_pet}}</span>
          <!-- <i class="iconfont icon-shouji" v-if="userInfo.tel"></i> -->
          <div class="sign">
            <button @click.once="meSign" :class="{sign_current: userInfo.sign}">{{userInfo.sign?'已签到':'点击签到'}}</button>
            <span>已签到{{userInfo.user_sign}}天</span>
          </div>
        </div>
        <div class="pincard-entrance" @click="goMyshop">
          <div>
            <span>点击下载我的求职简历</span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>
        <div class="me-order-container">
          <div class="order-title">
            <span>我的订单</span>
            <!-- <span>查看全部<i class="iconfont icon-youjiantou"></i></span> -->
          </div>
          <me-menu :menuItem="order"></me-menu>
        </div>
        <div class="middle-wrap">
          <me-menu :menuItem="commodity"></me-menu>
        </div>
        <div class="order-rec">
          <h2 class="rec-title"><i class="iconfont icon-remen"></i> 精选推荐</h2>
          <shop-list-r :listData='recommend'></shop-list-r>
        </div>
      </div>
    </me-scroll>
  </div>
</template>
<script>
import MeMenu from './MeMenu'
import ShopListR from './../../../components/ShopListR/ShopListR'
import { mapState } from 'vuex'
import { userSign } from './../../../api/index.js'
import MeScroll from './../../../components/mescroll/Scroll'
import { MessageBox, Toast } from 'mint-ui'
export default {
  name: 'me',
  data () {
    return {
      order: [
        {icon: 'icon-daifukuan', title: '已付款', path: 'pay'},
        {icon: 'icon-daifahuo', title: '已发货', path: 'Shipments'},
        {icon: 'icon-daishouhuo', title: '已收货', path: 'takeshop'},
        {icon: 'icon-pingjia', title: '已评价', path: 'eval'}
      ],
      commodity: [
        {icon: 'icon-shoucang1', title: '我的收藏', color: '#e02e24', path: 'mecollect'},
        {icon: 'icon-zuji', title: '历史浏览', color: '#e02e24', path: 'history'},
        {icon: 'icon-dizhi1', title: '收货地址', color: '#e02e24', path: 'address'},
        {icon: 'icon-icon_set_up', title: '设置', color: '#e02e24', path: 'mesetting'}
      ],
      page: 1
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  methods: {
    // 签到
    async meSign () {
      if (!this.userInfo.sign) {
        let result = await userSign()
        this.$store.dispatch('getUserInfo')
      }
    },
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
    },
    goMyshop () {
      MessageBox.prompt(' ', {
        title: '为保个人信息安全，请输入一下内容',
        inputPlaceholder: '请输入我的姓名'
      }).then(action => {
        if (action.value === '？？？') {
          window.open('******')
        } else {
          Toast({
            message: '输入错误,请用人单位查看我的求职简历再输入',
            duration: 3000
          })
        }
      }).catch(calcel => {})
    }
  },
  computed: {
    ...mapState(['userInfo', 'recommend'])
  },
  components: {
    MeMenu,
    ShopListR,
    MeScroll
  }
}
</script>
<style lang="less" scoped>
.me {
  width: 100%;
  // height: 100%;
  // background-color: #fff;
  .me-name {
    height: 100px;
    display: flex;
    padding: .2rem .4rem;
    align-items: center;
    background-image: linear-gradient(to right, #FD9126, #e02e24);
    position: relative;
    img {
      width: 1.4rem;
      height: 1.4rem;
      border-radius: 50%;
    }
    .user-pet {
      font-size: .4rem;
      padding-left: .1rem;
      color: #fff;
      font-weight: bold;
    }
    i {
      font-size: 28px;
      margin-left: 5px;
      color: #fff;
    }
    .sign {
      width: 2.4rem;
      display: flex;
      flex-direction: column;
      position: absolute;
      right: .3rem;
      text-align: center;
      font-size: .34rem;
      color: #fff;
      .sign_current {
        opacity: 0.5;
      }
      button {
        line-height: 2;
        font-size: .34rem;
        // border: 1px solid #fff;
        background-color: #FD9126;
        color: #fff;
        border-radius: .5rem;
        margin-bottom: .2rem;
      }
    }
  }
  .pincard-entrance {
    display: flex;
    justify-content: center;
    background-image: linear-gradient(to right, #FD9126, #e02e24);
    div {
      background-color: #4f4c5b;
      width: 90%;
      font-size: .36rem;
      line-height: 3;
      padding: 0 .2rem;
      border-radius: .3rem .3rem 0 0;
      color: #ffe2c0;
      display: flex;
      justify-content: space-between;
    }
  }
  .me-order-container,.middle-wrap {
    padding: .2rem;
    color: #999;
    background-color: #fff;
    margin-bottom: .2rem;
    border-top: 1px solid #f4f4f4;
    .order-title {
      font-size: .4rem;
      display: flex;
      justify-content: space-between;
      line-height: 3;
      span {
        &:first-child {
          color: #151516
        }
      }
    }
  }
  .order-rec {
    background-color: #fff;
    .rec-title {
      text-align: center;
      font-size: 18px;
      line-height: 2.5;
      color: #e02e24;
      i {
        font-size: 20px;
      }
    }
  }
}
</style>
