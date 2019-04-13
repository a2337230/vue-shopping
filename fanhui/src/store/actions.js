// ajax请求
import jwt from 'jsonwebtoken'
import {
  hotShop,
  recommendShop,
  hotSearch,
  searchMenu,
  searchShop,
  getUserInfo,
  setPersonal,
  loginOut,
  findAddress,
  setAddress
} from './../api/index'
import {
  HOTSHOP,
  RECOMMENDSHOP,
  HOTSEARCH,
  SEARCHMENU,
  SEARCHSHOP,
  USER_INFO,
  SET_PERSONAL,
  LOGIN_OUT,
  SETADD,
  FINDADD
} from './mutation-types'

export default {
  // 获取首页商品数据
  async getHotShop ({commit}, params) {
    let data = ''
    if (localStorage.hotshop && JSON.parse(localStorage.getItem('hotshop')).length === params.currentPage.page * 40) {
      data = JSON.parse(localStorage.getItem('hotshop'))
    } else {
      const result = await hotShop(params.currentPage)
      data = result.message.goods_list
    }
    // const result = await hotShop(params.currentPage)
    let scb = params.scb
    let ecb = params.ecb
    if (data) {
      commit(HOTSHOP, {hotshop: data})
      scb && scb(data)
    } else {
      ecb && ecb('请求数据失败!')
    }
  },
  // 获取推荐页数据
  async getRecommendShop ({commit}, params) {
    let data = ''
    if (localStorage.recommend && JSON.parse(localStorage.getItem('recommend')).length === params.currentPage.page * 20) {
      data = JSON.parse(localStorage.getItem('recommend'))
    } else {
      const result = await recommendShop(params.currentPage)
      data = result.message.data
    }
    let scb = params.scb
    let ecb = params.ecb
    if (data) { // 成功
      commit(RECOMMENDSHOP, {recommend: data})
      // 执行回调
      scb && scb(data)
    } else { // 失败
      ecb && ecb('请求数据失败!')
    }
  },
  // 获取搜索热词
  async getHotSearch ({commit}, params) {
    const result = await hotSearch()
    commit(HOTSEARCH, {hotSearch: result.message})
    params.callback && params.callback()
  },
  // 请求搜索列表
  async getSearchMenu ({commit}) {
    let menuData = localStorage.getItem('searchMenu')
    if (menuData) {
      commit(SEARCHMENU, {searchMenu: JSON.parse(menuData)})
    } else {
      const result = await searchMenu()
      commit(SEARCHMENU, {searchMenu: result.message.data})
      localStorage.setItem('searchMenu', JSON.stringify(result.message.data))
    }
  },
  // 搜索数据
  async getSearchShop ({commit}, params) {
    const result = await searchShop(params.currentPage)
    let scb = params.scb
    let ecb = params.ecb
    if (result.success === 200) { // 成功
      commit(SEARCHSHOP, {searchShop: result.message, key: params.currentPage.keyword})
      // 执行回调
      scb && scb(result.message)
    } else { // 失败
      ecb && ecb('请求数据失败!')
    }
  },
  // 同步用户信息
  syncUserInfo ({commit}, userInfo) {
    commit(USER_INFO, {userInfo})
    jwt.sign(userInfo, 'secretOrKey', {expiresIn: 86400}, (error, token) => {
      if (!error) {
        localStorage.setItem('AccessToken', 'Bearer ' + token)
      }
    })
  },
  // 获取用户状态
  async getUserInfo ({commit}) {
    const result = await getUserInfo()
    if (result.success_code === 200) {
      jwt.sign(result, 'secretOrKey', {expiresIn: 86400}, (error, token) => {
        if (!error) {
          localStorage.setItem('AccessToken', 'Bearer ' + token)
        }
      })
      commit(USER_INFO, {userInfo: result.message})
    }
  },
  async setMePersonal ({commit}, params) {
    const result = await setPersonal(params)
    commit(SET_PERSONAL, {userInfo: result.message})
  },
  // 退出登录
  async userOut ({commit}) {
    const result = await loginOut()
    commit(LOGIN_OUT, {success: result.success})
  },
  // 请求收货地址
  async findAdd ({commit}) {
    const result = await findAddress()
    commit(FINDADD, {address: result.message})
  },
  // 修改收货地址
  async setAdd ({commit}, params) {
    const result = await setAddress(params)
    commit(SETADD, {address: result.message})
  }
}
