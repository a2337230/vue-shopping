<template>
  <div class="address">
    <me-header :title="title"></me-header>
    <div class="address-container">
      <div class="address-item">
        收货人
        <input type="text" v-model="buyname" placeholder="请输入姓名">
      </div>
      <div class="address-item">
        手机号
        <input type="text" v-model="buytel" placeholder="请输入手机号">
      </div>
      <div class="address-item" @click="toAddress">
        所在地
        <span v-if="city">{{city}}</span>
        <span v-else style="color: #999">请选择所在地 <i class="iconfont icon-youjiantou"></i></span>
      </div>
      <div class="address-item">
        详细地址
      </div>
      <div class="address-item">
        <textarea rows="4" placeholder="请输入门牌号、道路、小区、楼栋号等" v-model="buyaddress"></textarea>
      </div>
    </div>
    <div class="add-submit" @click="submitAddress">
      保存
    </div>
     <!-- 地区选择 -->
    <div class="address-select" v-show="addInp">
      <div class="address-box">
        <v-distpicker
          type="mobile"
          @selected='selected'
          v-show="addInp"
        >
        </v-distpicker>
      </div>
    </div>
  </div>
</template>
<script>
import MeHeader from './MeHeader'
import VDistpicker from './Order/Distpicker'
import { Toast } from 'mint-ui'
import { setAddress } from './../../../api/index.js'
import { mapState } from 'vuex'
export default {
  name: 'Address',
  data () {
    return {
      title: '我的收货地址',
      buyname: '', // 收货人
      buytel: '', // 手机号
      city: '', // 所在城市
      buyaddress: '', // 所在详细地址
      addInp: false, // 显示隐藏城市选择器
      mask: false,
      province: '', // 绑定城市选择器默认省
      area: '' // 绑定城市选择器默认区
    }
  },
  created () {
    this.$store.dispatch('findAdd')
  },
  computed: {
    ...mapState(['address'])
  },
  methods: {
    // 打开地区选择器
    toAddress () {
      this.mask = true
      this.addInp = true
    },
    // 选择城市
    selected (data) {
      this.mask = false
      this.addInp = false
      this.city = data.province.value + ' ' + data.city.value + ' ' + data.area.value
    },
    // 提交保存
    async submitAddress () {
      let message = ''
      if (!this.buyname) {
        message = '请输入收货人'
      } else if (!this.buytel) {
        message = '请输入手机号'
      } else if (!this.city) {
        message = '请输入所在地'
      } else if (!this.buyaddress) {
        message = '请输入详细地址'
      } else {
        let params = {
          name: this.buyname,
          tel: this.buytel,
          city: this.city,
          address: this.buyaddress
        }
        this.$store.dispatch('setAdd', params)
      }
      Toast({
        message: '修改成功',
        iconClass: 'iconfont icon-xiugaichenggong success',
        duration: 2000
      })
    }
  },
  watch: {
    address (val) {
      if (val.length > 0) {
        this.buyname = val[0].name
        this.buytel = val[0].tel
        this.buyaddress = val[0].address
        this.city = val[0].city
      }
    }
  },
  components: {
    MeHeader,
    VDistpicker
  }
}
</script>
<style lang="less" scoped>
.address {
  height: 100%;
  .address-container {
    padding-top: 1.1rem;
    font-size: .4rem;
    color: #333;
    box-sizing: border-box;
    .address-item {
      min-height: .5rem;
      line-height: .5rem;
      padding: .2rem;
      border-bottom: 1px solid #c0c0c0;
      position: relative;
      input {
        font-size: .36rem;
        color: #333;
        padding-left: .3rem;
      }
      span {
        position: absolute;
        right: .2rem;
        text-align: right;
        font-size: .36rem;
      }
      textarea {
        width: 100%;
        font-size: .36rem;
        line-height: 2;
        color: #333;
      }
    }
  }
  .add-submit {
    height: 1rem;
    position: fixed;
    bottom: 0;
    z-index: 99;
    background-color: #ff0033;
    width: 100%;
    color: #fff;
    font-size: .5rem;
    text-align: center;
    line-height: 1rem;
  }
  .address-select {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 555;
    background-color: rgba(0,0,0,0.3);
    .address-box {
      height: 6rem;
      padding-bottom: .3rem;
      overflow: hidden;
      position: absolute;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      overflow: auto;
    }
  }
}
</style>
