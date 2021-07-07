<template>
  <div :class="[ 'n-items', {'n-inline':inline}, ]">
    <slot />
  </div>
</template>

<script>
import props from './../props'

export default {
  name: 'NItems',
  mixins: [ props, ],
}
</script>

<style lang="scss">
  html {
    --n-items-margin: 8px;
  }
</style>
<style scoped lang="scss">
  .n-items {
    margin: calc(-1 * var(--n-items-margin));
    width: 100%;
    
    &.n-inline {
      display: inline-block;
      width: auto;
    }

    &::v-deep >* {
      margin: var(--n-items-margin);
      display: inline-block;
      vertical-align: top;
    }
  }
</style>
