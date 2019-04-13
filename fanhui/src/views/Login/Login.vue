<template>
  <div class="login">
    <select-login v-show="loginShow" @LoginTab="LoginTab"></select-login>
    <div class="login-container" v-show="!loginShow">
      <!-- 登录面板 -->
      <div class="login-inner">
        <!-- 头部 -->
        <div class="login-header">
          <div class="login-logo">
            <img src="./../../common/image/logo.png" width="250" alt="">
          </div>
          <!-- 登录选项卡 -->
          <div class="login-header-title">
            <a href="javascript:;" @click="isLoginTab=true" :class="{current: isLoginTab}">验证码登录</a>
            <a href="javascript:;"  @click="isLoginTab=false" :class="{current: !isLoginTab}">密码登录</a>
          </div>
        </div>
        <!-- 表单部分 -->
        <div class="login-content">
          <form>
            <!-- 验证码 -->
            <div :class="{current: isLoginTab}">
              <section class="login-message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button
                  class="get-verification"
                  :class="{phone_right: phoneRight}"
                  v-if="!countDown"
                  @click.prevent="getVerificationCode()"
                >获取验证码</button>
                <button v-else class="get-verification" disabled="disabled">已发送{{countDown}}s</button>
              </section>
              <section class="login-verification">
                <input type="tel" maxlength="6" placeholder="验证码" v-model="code">
              </section>
              <section class="login-hint">
                温馨提示：未注册返惠街帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">服务协议与隐私政策</a>
              </section>
            </div>
            <!-- 账号密码登录 -->
            <div :class="{current: !isLoginTab}">
              <section>
                <section class="login-message">
                  <input type="text" maxlength="11" placeholder="用户名/手机/邮箱" v-model="user_name">
                </section>
                <section class="login-verification">
                  <input :type="pwdMode?'password':'text'" maxlength="18" placeholder="请输入密码" v-model="pwd">
                  <div class="switch-show" @click='pwdMode = !pwdMode'>
                    <i class="iconfont " :class="pwdMode?'icon-yincang':'icon-xianshi'"></i>
                  </div>
                </section>
                <section class="login-message">
                  <input type="text" maxlength="4" placeholder="验证码" v-model="captcha">
                  <img
                    ref="captcha"
                    class="get-verification"
                    alt="captcha"
                    src="http://localhost:5000/fanhui/captcha"
                    @click.prevent="createCaptcha()"
                  >
                </section>
              </section>
              <section class="login-hint">
                温馨提示：未注册返惠街帐号，登录时将自动注册，且代表已同意
                <a href="javascript:;">服务协议与隐私政策</a>
              </section>
            </div>
            <button class="login-submit" @click.prevent='login()'>登录</button>
          </form>
          <button class="login-back" @click="$router.back()">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import { getPhoneCode, getPhoneCodeLogin, pwdLogin } from './../../api/index.js'
import {mapActions} from 'vuex'
import SelectLogin from './SelectLogin'
export default {
  name: 'Login',
  data () {
    return {
      loginShow: true,
      isLoginTab: true,
      phone: '', // 手机号
      countDown: 0, // 倒计时
      pwdMode: true, // 切换密码模式
      code: '', // 短信验证码
      userInfo: {}, // 用户信息
      user_name: '', // 用户名
      pwd: '', // 密码
      captcha: '', // 图形验证码
      msg: ''
    }
  },
  computed: {
    phoneRight () {
      // 验证手机号
      return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)
    }
  },
  methods: {
    ...mapActions(['syncUserInfo']),
    LoginTab (state) {
      this.isLoginTab = state
      this.loginShow = false
    },
    // 倒计时
    async getVerificationCode () {
      if (this.phoneRight) {
        this.countDown = 60
        this.intervalId = setInterval(() => {
          this.countDown--
          if (this.countDown === 0) {
            clearInterval(this.intervalId)
          }
        }, 1000)
      }
      // 获取验证码
      let result = await getPhoneCode(this.phone)
      // 获取失败
      if (result.err_code === 0) {
        Toast({
          message: result.message,
          position: 'center',
          duration: 3000
        })
        clearInterval(this.intervalId)
        this.countDown = 0
      }
    },
    // 获取图形验证码
    createCaptcha () {
      this.$refs.captcha.src = 'http://localhost:5000/fanhui/captcha?time=' + new Date()
      // this.$refs.captcha.src = 'http://localhost:3000/api/captcha?time='
    },
    // 用户登录
    async login () {
      // 判断登录模式
      // 短信登录
      if (this.isLoginTab) {
        // 前端校验
        // 判断手机号输入是否正确合法
        if (!this.phone) {
          Toast('请输入手机号')
          return
        } else if (!this.phoneRight) {
          Toast('请输入正确手机号')
          return
        }
        // 判断验证码输入是否合法
        if (!this.code) {
          Toast('请输入验证码')
          return
        } else if (!(/^\d{6}$/gi.test(this.code))) {
          Toast('请输入正确验证码')
          return
        }
        // 验证完毕，开始登录
        const result = await getPhoneCodeLogin(this.phone, this.code)
        // 判断登录是否成功
        if (result.success_code === 200) {
          this.userInfo = result.message
        } else {
          this.userInfo = {
            message: '登录失败,手机号或验证码错误'
          }
        }
      } else {
        // 用户数据校验
        if (!this.user_name) {
          Toast('请输入用户名')
          return
        } else if (!this.pwd) {
          Toast('请输入密码')
          return
        } else if (!this.captcha) {
          Toast('请输入验证码')
          return
        }
        // // 登录
        let result = await pwdLogin(this.user_name, this.pwd, this.captcha)
        // 判断用户名登录是否成功
        if (result.success_code === 200) {
          this.userInfo = result.message
        } else {
          this.userInfo = {
            message: result.message
          }
          // 获取图形验证码
          this.createCaptcha()
        }
      }
      // 后续处理
      if (!this.userInfo.id) {
        Toast(this.userInfo.message)
      } else {
        // 存入vuex
        let reslut = await this.syncUserInfo(this.userInfo)
        // 回到主页面
        setTimeout(() => {
          if (this.$route.query.path) {
            this.$router.push(`${this.$route.query.path}`)
          } else {
            this.$router.back()
          }
        }, 16)
      }
    }
  },
  components: {
    SelectLogin
  }
}
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  img {
    width: 70%;
  }
}
.login-container{
  width: 100%;
  height: 100%;
  background-color: #fff;
  .login-inner{
    padding-top: 1.2rem;
    width: 80%;
    margin: 0 auto;
    .login-header{
      .login-logo{
        font-size: .8rem;
        font-weight: bold;
        color: #fd2e4c;
        text-align: center;
      }
      .login-header-title{
        padding-top: .8rem;
        padding-bottom: .2rem;
        text-align: center;
        a{
          color: #333;
          font-size: .28rem;
          padding-bottom: .02rem;
          &:first-child{
            margin-right: .8rem;
          }
        }
        .current{
          color: #fd2e4c;
          font-weight: 700;
          border-bottom: 2px solid #fd2e4c;
        }
      }
    }
    .login-content{
      form{
        >div{
          display: none;
          input{
            width: 100%;
            height: 100%;
            padding-left: .2rem;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: .04rem;
            font-size: .28rem;
            &:focus{
              border: 1px solid #fd2e4c;
            }
          }
          .login-message{
            position: relative;
            margin-top: .32rem;
            height: .96rem;
            font-size: .4rem;
            background: #fff;
            .get-verification{
              position: absolute;
              top: 50%;
              right: 0;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: .3rem;
              background: transparent;
            }
            .phone_right{
              color: purple;
            }
          }
          .login-verification{
            position: relative;
            margin-top: .32rem;
            height: .96rem;
            font-size: .28rem;
            background: #fff;
            .switch-show{
              position: absolute;
              right: .24rem;
              top: .24rem;
              i{
                font-size: .48rem;
                color: #fd2e4c;
              }
            }
          }
          .login-hint{
            margin-top: .24rem;
            color: #999;
            font-size: .24rem;
            line-height: .4rem;
            a{
              color: #fd2e4c;
            }
          }
        }
        .current{
          display: block;
        }
        .login-submit{
          display: block;
          width: 100%;
          height: .84rem;
          margin-top: .6rem;
          border-radius: .2rem;
          background: #fd2e4c;
          color: #fff;
          text-align: center;
          font-size: .32rem;
          line-height: .84rem;
        }
      }
      .login-back{
        display: block;
        width: 100%;
        height: .84rem;
        margin-top: .3rem;
        border-radius: .2rem;
        background: transparent;
        border: 1px solid #fd2e4c;
        color: #fd2e4c;
        text-align: center;
        font-size: .32rem;
        line-height: .84rem;
      }
    }
  }
}
</style>
