<template>
  <div :class="[ 'n-navigation-item', { 'n-active': active, }, ]">
    <n-link :to="item.route" class="n-content" @click="s_click">
      <slot :item="item">{{ item.title }}</slot>
    </n-link>
  </div>
</template>

<script>
import props from './../props'

export default {
  name: 'NNavigationItem',
  mixins: [ props, ],
  methods: {
    s_click(e) {
      this.click(e)
      this.$emit('click', e)
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-navigation-item {
    .n-content {
      /*line-height: 1;*/
    }
    &::v-deep a {
      color: inherit;
      text-decoration: none;
    }
    span {
      cursor: pointer;
    }
  }
</style>
