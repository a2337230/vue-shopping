import Vue from 'vue'
import App from './App'
import router from './router'
import Fastclick from 'fastclick'
import LyTab from 'ly-tab'
import store from './store/index'
import VueLazyLoad from 'vue-lazyload'
import { Actionsheet, DatetimePicker, Picker } from 'mint-ui'
Vue.config.productionTip = false
Vue.component(Actionsheet.name, Actionsheet)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker)
Fastclick.attach(document.body)
Vue.use(LyTab)
Vue.use(VueLazyLoad, {
  loading: require('./common/image/load.gif')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
