<template>
  <div :class="[ 'n-header-content', { offset, }, ]">
    <slot></slot>
  </div>
</template>

<script>
import props from './../props'

export default {
  name: 'NHeaderContent',
  mixins: [ props, ],
}
</script>

<style lang="scss" scoped>
.n-header-content {
  width: 100%;
  height: var(--n-header-height);
  position: fixed;
  top: 0;
  z-index: 90;
  padding: var(--n-header-padding);
  background: var(--n-header-background);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, .2);
  
  &.offset {
    position: relative;
    opacity: 0;
    z-index: -1;
    pointer-events: none;
  }
}
</style>
