<template>
  <a
    class="ly-tab-item"
    :style="$parent.value === id ? activeStyle : {}"
    @click="onItemClicked">
    <div class="ly-tab-item-icon" v-if="$parent.fixBottom"><slot name="icon"></slot></div>
    <div class="ly-tab-item-label"><slot></slot></div>
    <div class="active-item-tab" v-if="$parent.value === id"></div>
  </a>
</template>

<script>
export default {
  name: 'LyTabItem',
  props: {
    setId: Number
  },
  computed: {
    activeStyle () {
      return {
        color: this.$parent.activeColor
      }
    }
  },
  data () {
    return {
      id: (this.$parent.$children.length || 1) - 1,
    }
  },
  methods: {
    onItemClicked () {
      this.$parent.$emit('input', this.id)
    }
  }
}
</script>

<style>
.ly-tab-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  text-align: center;
  position: relative;
}
.active-item-tab {
  position: absolute;
  bottom: -.3rem;
  height: .06rem;
  border-radius: .1rem;
  width: 80%;
  background-color: rgb(233, 35, 44);
}

.ly-tab-item-icon {
  margin: 0 auto .2rem;
}

</style>
