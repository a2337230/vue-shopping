import ajax from './ajax'
const BASE_URL = '/api'
// 请求首页数据
export const hotShop = (params) => ajax(BASE_URL + '/fanhui/hotGoods', params)
// 请求推荐页数据
export const recommendShop = (params) => ajax(BASE_URL + '/fanhui/recommend', params)
// 获取搜索热词
export const hotSearch = () => ajax(BASE_URL + '/fanhui/hotSearch')
// 请求搜索列表
export const searchMenu = () => ajax(BASE_URL + '/fanhui/searchMenu')
// 请求商品详情页
export const shopDetail = (goodsId) => ajax(BASE_URL + '/fanhui/shopInfo', goodsId)
// 请求商家详情页
export const mallInfo = (mallId) => ajax(BASE_URL + '/fanhui/mallInfo', mallId)
// 请求商品页推荐信息
export const shopRec = (goodsId) => ajax(BASE_URL + '/fanhui/shopRec', goodsId)
// 请求搜索商品
export const searchShop = (params) => ajax(BASE_URL + '/fanhui/searchShop', params)
// 请求短信验证码
export const getPhoneCode = (phone) => ajax(BASE_URL + '/fanhui/sendcode', {phone})
// 验证手机登录
export const getPhoneCodeLogin = (phone, code) => ajax(BASE_URL + '/fanhui/login_code', {phone, code}, 'POST')
// 用户名密码登录
export const pwdLogin = (name, pwd, captcha) => ajax(BASE_URL + '/fanhui/login_pwd', {name, pwd, captcha}, 'POST')
// 获取用户登录信息
export const getUserInfo = () => ajax(BASE_URL + '/fanhui/user_info')
// 用户签到
export const userSign = () => ajax(BASE_URL + '/fanhui/me_sign')
// 添加到购物车
export const getShopCat = (params) => ajax(BASE_URL + '/fanhui/shop_cat', params)
// 查询购物车
export const findCat = () => ajax(BASE_URL + '/fanhui/find_cat')
// 购物车勾选
export const setCatChecked = (params) => ajax(BASE_URL + '/fanhui/cat_checked', params)
// 购物车勾选
export const setAllChecked = (params) => ajax(BASE_URL + '/fanhui/cat_all_checked', params)
// 购物车增减
export const setCatUpdate = (params) => ajax(BASE_URL + '/fanhui/cat_update', params)
// 批量加入购物车
export const setAllCat = (params) => ajax(BASE_URL + '/fanhui/all_cat', params, 'POST')
// 历史记录
export const getHistory = () => ajax(BASE_URL + '/fanhui/history')
// 添加取消收藏
export const getColl = (params) => ajax(BASE_URL + '/fanhui/coll', params)
// 查询商品收藏
export const getFindColl = (params) => ajax(BASE_URL + '/fanhui/findColl', params)
// 查询用户收藏
export const getAllColl = () => ajax(BASE_URL + '/fanhui/allColl')
// 添加购买列表
export const setBuyShop = (params) => ajax(BASE_URL + '/fanhui/buyShop', params)
// 获取购买单分类
export const getBuyShopOne = (params) => ajax(BASE_URL + '/fanhui/buyShopOne', params)
// 修改个人信息
export const setPersonal = (params) => ajax(BASE_URL + '/fanhui/updatePersonal', params, 'POST')
// 退出登录
export const loginOut = () => ajax(BASE_URL + '/fanhui/loginout')
// 修改收货地址
export const setAddress = (params) => ajax(BASE_URL + '/fanhui/setaddress', params, 'POST')
// 请求收货地址
export const findAddress = () => ajax(BASE_URL + '/fanhui/findaddress', '', 'POST')
