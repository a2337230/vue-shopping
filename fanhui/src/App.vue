<template>
  <div id="app">
    <router-view/>
    <!-- <router-view v-if="!$route.meta.keepAlive"/>> -->
    <tab-bar v-if="!$route.meta.hideBottomTabBar"></tab-bar>
  </div>
</template>

<script>
import TabBar from './components/TabBar/TabBar'
import { mapState } from 'vuex'
export default {
  name: 'App',
  created () {
    this.$store.dispatch('getUserInfo')
    this._getUser()
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    _getUser () {
      if (!this.userInfo.id) {
        localStorage.removeItem('AccessToken')
      }
    }
  },
  components: {
    TabBar
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
