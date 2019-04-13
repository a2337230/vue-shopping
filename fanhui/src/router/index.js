import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/state'
// 一级路由
import BootPage from './../views/BootPage/BootPage.vue'
import Home from './../views/Home/Home.vue'
import Recommend from './../views/Recommend/Recommend.vue'
import Search from './../views/Search/Search.vue'
import KeyWord from './../components/KeyWord/Keyword.vue'
import Login from './../views/Login/Login.vue'
import MallPage from './../views/MallPage/MallPage.vue'
import ShopCat from './../views/ShopCat/ShopCat.vue'
import ActPage from './../views/ActPage/ActPage.vue'
import Personal from './../views/Me/Personal.vue'
// 二级路由
import ShopDetail from './../components/ShopDetail/ShopDetail.vue'
import Hot from './../views/Home/Children/Hot/Hot.vue'
import Me from './../views/Me/Children/Me.vue'
import History from './../views/Me/Children/History.vue'
import MeSetting from './../views/Me/Children/MeSetting.vue'
import MeCollect from './../views/Me/Children/MeCollect.vue'
import Pay from './../views/Me/Children/Order/Pay.vue'
import Shipments from './../views/Me/Children/Order/Shipments.vue'
import TakeShop from './../views/Me/Children/Order/TakeShop.vue'
import Address from './../views/Me/Children/Address.vue'
import Eval from './../views/Me/Children/Order/Eval.vue'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/bootpage'
    },
    {
      path: '/bootpage',
      name: 'BootPage',
      component: BootPage
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {path: '/home', redirect: '/home/hot'},
        {path: 'hot', name: 'Hot', component: Hot},
        {path: 'costume', name: 'Costume', component: KeyWord, meta: {keyword: '服饰'}},
        {path: 'shoebag', name: 'ShoeBag', component: KeyWord, meta: {keyword: '鞋包'}},
        {path: 'phone', name: 'Phone', component: KeyWord, meta: {keyword: '手机'}},
        {path: 'computer', name: 'Computer', component: KeyWord, meta: {keyword: '电脑'}},
        {path: 'food', name: 'Food', component: KeyWord, meta: {keyword: '食品'}},
        {path: 'underwear', name: 'UnderWear', component: KeyWord, meta: {keyword: '内衣'}},
        {path: 'beauty', name: 'Beauty', component: KeyWord, meta: {keyword: '美妆'}},
        {path: 'fruits', name: 'Fruits', component: KeyWord, meta: {keyword: '水果'}}
      ]
    },
    {
      path: '/shopdetail',
      name: 'ShopDetail',
      component: ShopDetail,
      meta: {hideBottomTabBar: true, keepAlive: true}
    },
    {
      path: '/mallpage',
      name: 'MallPage',
      component: MallPage
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/actpage',
      name: 'ActPage',
      component: ActPage,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/searchkey',
      name: 'SearchKey',
      component: KeyWord
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {hideBottomTabBar: true}
    },
    {
      path: '/shopcat',
      name: 'ShopCat',
      component: ShopCat
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal,
      children: [
        {path: '/personal', redirect: '/personal/me'},
        {path: 'me', name: 'Me', component: Me},
        {path: 'history', name: 'History', component: History},
        {path: 'mesetting', name: 'MeSetting', component: MeSetting},
        {path: 'mecollect', name: 'MeCollect', component: MeCollect},
        {path: 'pay', name: 'Pay', component: Pay},
        {path: 'shipments', name: 'Shipments', component: Shipments},
        {path: 'takeshop', name: 'TakeShop', component: TakeShop},
        {path: 'address', name: 'Address', component: Address},
        {path: 'eval', name: 'Eval', component: Eval}
      ]
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.AccessToken ? 1 : 0
  if (to.path === '/login' && token) {
    next('/personal')
  } else if (to.path === '/shopcat' && !token) {
    next({path: '/login', query: {path: '/shopcat'}})
  } else if (to.path.includes('personal') && !token) {
    next({path: '/login', query: {path: '/personal'}})
  } else {
    next()
  }

  // if (to.path === '/shopcat' && !token) {
  //   next('/login')
  // } else {
  //   next()
  // }

  // if (to.path === '/me' && !token) {
  //   next('/login')
  // } else {
  //   next()
  // }
})

export default router
