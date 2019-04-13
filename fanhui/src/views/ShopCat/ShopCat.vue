<template>
  <div class="shopcat" >
    <header class="shopcat-title">
      <div class="shop-nav">
         <h2>购物车</h2>
      </div>
      <span>共{{allCount}}件宝贝</span>
    </header>
    <ul class="cat-menu" v-if="shopCat && shopCat.length > 0">
      <li class="cat-item" v-for="(shop, index) in shopCat" :key="shop.goods_id" @click="goShop(shop)">
        <div class="checkbox" @click.stop="catClick(index)">
          <i class="iconfont" :class="shop.checked?'icon-gouxuan shop-current':' icon-checkboxround0'"></i>
        </div>
        <div class="shop-img">
          <img v-lazy="shop.thumb_url" alt="">
        </div>
        <div class="shop-info">
          <p class="shop-title">{{shop.goods_name}}</p>
          <div class="price-container">
            <span class="shop-price">¥{{((shop.price / 100) * shop.count).toFixed(2)}}</span>
            <div class="btn-group">
              <span @click.stop="shopNum(shop, -1)">-</span>
              <input type="number" v-model="shop.count" disabled="disabled">
              <span @click.stop="shopNum(shop, 1)">+</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="none" v-else>
      <img src="./../../common/image/gouwuche.png" alt="">
      <p>购物车空空如也</p>
    </div>
    <footer class="cat-footer">
      <div class="checkbox" @click="allClick">
        <i class="iconfont" :class="isChecked?'icon-gouxuan shop-current':' icon-checkboxround0'"></i> 全选
      </div>
      <div class="cat-submit">
        <div class="allPrice">
          合计:<span>{{checkPrice}}</span>元
        </div>
        <button @click="gobuy">结算</button>
      </div>
    </footer>
  </div>
</template>
<script>
import { findCat, setCatUpdate, setAllCat } from './../../api/index.js'
import { mapState } from 'vuex'
import { Toast, MessageBox } from 'mint-ui'
export default {
  name: 'ShopCat',
  data () {
    return {
      shopCat: false,
      btnChecked: true,
      isChecked: false
    }
  },
  created () {
    this._findCat()
  },
  computed: {
    ...mapState(['userInfo']),
    allCount () {
      let num = 0
      if (this.shopCat && this.shopCat.length > 0) {
        num = this.shopCat.map(item => item.count).reduce((total, current) => total + current)
      }
      return num
    },
    checkPrice () {
      let allPrice = 0
      if (this.shopCat) {
        let check = this.shopCat.filter(item => item.checked === true).forEach(item => {
          allPrice = allPrice + item.price / 100 * item.count
        })
      }
      return allPrice.toFixed(2)
    }
  },
  methods: {
    async _findCat () {
      let result = await findCat()
      this.shopCat = result.message
    },
    catClick (val) {
      this.shopCat[val].checked = !this.shopCat[val].checked
      this.isChecked = this.shopCat.every(item => item.checked === true)
    },
    allClick () {
      this.isChecked = !this.isChecked
      this.shopCat.forEach(item => {
        item.checked = this.isChecked
      })
    },
    async shopNum (shop, num) {
      let shopnub = shop.count + num
      let params = {
        count: num,
        goodsId: shop.goods_id
      }
      if (shopnub) {
        if (this.btnChecked) {
          this.btnChecked = false
          let result = await setCatUpdate(params)
          if (result.success_code === 200) {
            this._findCat()
          }
          this.btnChecked = true
        }
      }
    },
    goShop (shop) {
      this.$router.push({
        path: '/shopdetail',
        query: {
          id: shop.goods_id,
          cnt: shop.tip,
          price: shop.price
        }
      })
    },
    async gobuy () {
      let allCat = this.shopCat.filter(item => item.checked === true)
      let params = {
        allCat
      }
      let result = await setAllCat(params)
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
        Toast({
          message: '批量购买成功，即将跳转个人中心',
          iconClass: 'iconfont icon-xiugaichenggong success',
          duration: 2000
        })
        setTimeout(() => {
          this.$router.push('/personal')
        }, 2000)
      }).catch(calcel => {
      })
    }
  }
}
</script>
<style lang="less" scoped>
.shopcat {
  background-color: #f2f2f2;
  margin-bottom: 2rem;
  .shopcat-title {
    height: 4rem;
    background-image: linear-gradient(to bottom, #FD9126, #ff0036);
    padding: .2rem;
    color: #fff;
    .shop-nav {
      display: flex;
      justify-content: space-between;
      padding: .2rem 0;
      h2 {
        font-size: .4rem;
      }
    }
    span {
      font-size: .3rem;
    }
  }
  .none {
    // width: 100%;
    // height: 5rem;
    display: flex;
    // justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: #f4f4f4;
    margin-top: -2rem;
    padding-top: 2rem;
    img {
      width: 3rem;
    }
    p {
      font-size: .5rem;
      line-height: 2;
      color: #666;
    }
  }
  .cat-menu {
    width: 98%;
    margin: -2rem auto 0;
    padding-bottom: .3rem;
    .cat-item {
      width: 100%;
      background-color: #fff;
      border-radius: .3rem;
      padding: .2rem;
      margin-bottom: .2rem;
      display: flex;
      box-sizing: border-box;
      &:last-child {
        margin-bottom: 0;
      }
      .checkbox {
        display: flex;
        align-items: center;
        i {
          font-size: .5rem;
          margin-right: .2rem;
          color: #cccccc;
        }
      }
      .shop-img {
        width: 30%;
        margin-right: 0.2rem;
        img {
          width: 100%;
        }
      }
      .shop-info {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .shop-title {
          font-size: .32rem;
          line-height: 1.5;
          color: #303433;
        }
        .price-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .shop-price {
            font-size: .4rem;
            font-weight: bold;
            color: #e02e24;
          }
          .btn-group {
            width: 2rem;
            display: flex;
            border: 1px solid #e0e0e0;
            border-radius: .3rem;
            span {
              width: .7rem;
              text-align: center;
              font-size: .45rem;
              color: #979797;
            }
            input {
              width: .6rem;
              text-align: center;
              border-left: 1px solid #e0e0e0;
              border-right: 1px solid #e0e0e0;
            }
          }
        }
      }
    }
  }
  .cat-footer {
    width: 100%;
    position: fixed;
    bottom: 1rem;
    height: 1rem;
    display: flex;
    box-sizing: border-box;
    border-top: 1px solid #e0e0e0;
    border-bottom: 1px solid #e0e0e0;
    justify-content: space-between;
    background-color: #fff;
    padding-left: .2rem;
    align-items: center;
    font-size: .4rem;
    .checkbox {
      i {
        font-size: .5rem;
        margin-right: .2rem;
        color: #cccccc;
      }
    }
    .cat-submit {
      display: flex;
      align-items: center;
      .allPrice span {
        color: #e02e24;
        font-weight: bold;
        padding: 0 .1rem;
      }
      button {
        background-color: #e02e24;
        width: 2rem;
        height: 1rem;
        font-size: .5rem;
        margin-left: .3rem;
        color: #fff;
      }
    }
  }
}
.shop-current {
  color: #fe5504 !important;
}
</style>
