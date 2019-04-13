import {
  HOTSHOP,
  RECOMMENDSHOP,
  HOTSEARCH,
  SEARCHMENU,
  HIDEBUTTOM,
  SEARCHSHOP,
  USER_INFO,
  SET_PERSONAL,
  LOGIN_OUT,
  FINDADD,
  SETADD
} from './mutation-types'
export default {
  // 获取首页商品数据
  [HOTSHOP] (state, {hotshop}) {
    state.hotshop = state.hotshop.concat(hotshop)
    if (state.hotshop.length === 40) {
      localStorage.setItem('hotshop', JSON.stringify(state.hotshop))
    }
  },
  // 获取推荐页商品数据
  [RECOMMENDSHOP] (state, {recommend}) {
    state.recommend = state.recommend.concat(recommend)
    if (state.recommend.length === 20) {
      localStorage.setItem('recommend', JSON.stringify(state.recommend))
    }
  },
  // 获取热门搜索
  [HOTSEARCH] (state, {hotSearch}) {
    state.hotSearch = hotSearch
  },
  // 获取搜索列表数据
  [SEARCHMENU] (state, {searchMenu}) {
    state.searchMenu = searchMenu
  },
  [HIDEBUTTOM] (state, hideButtom) {
    state.hideButtom = hideButtom
  },
  [SEARCHSHOP] (state, {searchShop, key}) {
    let oldKey = localStorage.getItem('key')
    if (oldKey === key) {
      state.searchShop = state.searchShop.concat(searchShop)
    } else {
      state.searchShop = searchShop
      localStorage.setItem('key', key)
    }
  },
  [USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [SET_PERSONAL] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [LOGIN_OUT] (state, {success}) {
    if (success === 200) {
      state.userInfo = []
      localStorage.removeItem('AccessToken')
    }
  },
  [FINDADD] (state, {address}) {
    state.address = address
  },
  [SETADD] (state, {address}) {
    state.address = address
  }
}
