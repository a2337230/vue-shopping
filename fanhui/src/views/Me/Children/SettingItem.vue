<template>
  <div class="setting-item">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'SettingItem'
}
</script>
<style lang="less" scoped>
.setting-item {
  padding: .1rem .3rem;
  font-size: .4rem;
  min-height: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  color: #58595b;
  border-bottom: 1px solid #C0C0C0;
}
</style>
