<template>
  <aside class="ad">
    <img :src="adInfo.img" alt="" width="100%">
  </aside>
</template>
<script>
export default {
  name: 'ad',
  props: {
    adInfo: Object
  }
}
</script>
<style lang="less" scoped>
.ad {
  margin: 10px 0;
}
.ad img{
  width: 100%;
}
</style>
