<template>
  <div class="me-setting">
    <me-header :title="title"></me-header>
    <setting-item>
      <span>头像</span>
      <img :src="userInfo.user_avatar" class="avatar">
    </setting-item>
    <setting-item @click.native="setPet(userInfo.user_pet)">
      <span>昵称</span>
      <span>{{userInfo.user_pet}}</span>
    </setting-item>
    <setting-item @click.native="sexClick(userInfo.user_sex)">
      <span>性别</span>
      <span>{{userInfo.user_sex || '未填写'}}</span>
    </setting-item>
    <setting-item @click.native="setBir(userInfo.user_birthday)">
      <span>生日</span>
      <span>{{(userInfo.user_birthday || '未填写') | momentFormat}}</span>
    </setting-item>
    <setting-item>
      <span>星座</span>
      <span>{{setConst}}</span>
    </setting-item>
    <setting-item @click.native="toAddress">
      <span>常住地</span>
      <span>{{userInfo.user_address || '未填写'}}</span>
    </setting-item>
    <div class="out-login" @click="loginOut">
      退出当前账户
    </div>
    <!-- 选择性别 -->
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
    <!-- 出生年月 -->
    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="birthday"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="handleBirthday"
    >
    </mt-datetime-picker>
    <!-- 地区选择 -->
    <div class="address" v-show="addInp">
      <div class="address-box">
        <v-distpicker
          type="mobile"
          @selected='selected'
          v-show="addInp"
        >
        </v-distpicker>
      </div>
      <div class="address-btn">
        <button @click="addInp=false">取消</button>
        <button @click="setAddress">确认</button>
      </div>
    </div>
  </div>
</template>
<script>
import MeHeader from './MeHeader'
import { mapState } from 'vuex'
import SettingItem from './SettingItem'
import { setPersonal } from './../../../api/index.js'
import moment from 'moment'
import VDistpicker from './Order/Distpicker'
import { MessageBox, Toast } from 'mint-ui'
export default {
  name: 'MeSetting',
  data () {
    return {
      title: '设置',
      sex: '',
      pet: '',
      birthday: new Date('1960-01-01'),
      constellation: '',
      sheetVisible: false, // 性别选择器开关
      actions: [
        {
          name: '男',
          method: this.selectSex
        },
        {
          name: '女',
          method: this.selectSex
        }
      ],
      startDate: new Date('1960-01-01'), // 初始时间
      endDate: new Date(), // 最后时间
      addInp: false, // 显示隐藏城市选择器
      mask: false,
      province: '', // 绑定城市选择器默认省
      city: '', // 绑定城市选择器默认市
      area: '' // 绑定城市选择器默认区
    }
  },
  created () {
    this.$route.meta.hideBottomTabBar = true
  },
  computed: {
    ...mapState(['userInfo']),
    // 设置星座
    setConst () {
      let constellation = '未填写'
      if (this.userInfo.user_birthday) {
        let month = moment(this.userInfo.user_birthday).format('M')
        let day = moment(this.userInfo.user_birthday).format('D')
        constellation = '魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯'.substr(month * 2 - (day < '102223444433'.charAt(month - 1) - -19) * 2, 2) + '座'
      } else {
        constellation = '未填写'
      }
      return constellation
    }
  },
  methods: {
    sexClick (val) {
      this.sex = val
      this.sheetVisible = true
    },
    // 设置性别
    selectSex (props) {
      if (props.name === this.sex) {
        this.sheetVisible = false
      } else {
        let params = {
          sex: props.name
        }
        this.$store.dispatch('setMePersonal', params)
      }
    },
    // 打开时间选择器
    setBir (val) {
      if (val) {
        this.birthday = new Date(val)
      }
      this.$refs.picker.open()
    },
    // 设置出生日期
    handleBirthday (date) {
      let params = {
        birthday: date
      }
      this.$store.dispatch('setMePersonal', params)
    },
    // 打开地区选择器
    toAddress () {
      this.mask = true
      this.addInp = true
    },
    // 选择城市
    selected (data) {
      this.mask = false
      // this.addInp = false
      this.city = data.province.value + ' ' + data.city.value + ' ' + data.area.value
    },
    // 将城市保存到数据库
    setAddress () {
      if (this.userInfo.user_address !== this.city) {
        let params = {
          city: this.city
        }
        this.$store.dispatch('setMePersonal', params)
        this.addInp = false
      } else {
        this.addInp = false
      }
    },
    // 修改昵称
    setPet (val) {
      MessageBox.prompt(' ', {
        title: '请设置昵称',
        inputValue: val
      }).then(action => {
        if (this.userInfo.user_pet !== action.value) {
          let params = {
            pet: action.value
          }
          this.$store.dispatch('setMePersonal', params)
        }
      }).catch(calcel => {})
    },
    // 用户退出
    loginOut () {
      MessageBox.confirm('', {
        title: '是否退出登录'
      }).then(action => {
        this.$store.dispatch('userOut')
        Toast({
          message: '退出登录成功',
          iconClass: 'iconfont icon-xiugaichenggong success',
          duration: 1000
        })
        setTimeout(() => {
          this.$router.push('/home')
        }, 1000)
      }).catch(calcel => {})
    }
  },
  filters: {
    momentFormat (val) {
      return val !== '未填写' ? moment(new Date(val)).format('YYYY年M月D日') : val
    }
  },
  components: {
    MeHeader,
    SettingItem,
    VDistpicker
  }
}
</script>
<style lang="less" scoped>
.me-setting {
  padding-top: 1.1rem;
  position: relative;
  z-index: 99;
  .avatar {
    height: 1.4rem;
    border-radius: 50%;
  }
  .out-login {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 1rem;
    font-size: .5rem;
    text-align: center;
    line-height: 2;
    background-color: #ff0033;
    color: #fff;
    font-weight: lighter;
  }
  .address {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 555;
    background-color: rgba(0,0,0,0.3);
    .address-box {
      height: 6rem;
      overflow: hidden;
      position: absolute;
      bottom: 1rem;
      width: 100%;
      background-color: #fff;
      overflow: auto;
    }
    .address-btn {
      border-top: 1px solid #C0C0C0;
      height: 1rem;
      position: fixed;
      bottom: 0;
      display: flex;
      width: 100%;
      background-color: #fff;
      button {
        flex: 1;
        font-size: .4rem;
        color: #ff0033;
        &:first-child {
          color: #000;
          border-right: 1px solid #c0c0c0;
        }
      }
    }
  }
}
</style>
