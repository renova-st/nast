<template>
  <div :class="[ 'n-divide', { vertical, }, ]">
    <slot />
  </div>
</template>

<script>
import props from './../props'

export default {
  name: 'NDivide',
  mixins: [ props, ],
}
</script>

<style scoped lang="scss">
  .n-divide {
    display: flex;
    justify-content: space-between;
    
    &.vertical {
      flex-direction: column;
    }
  }
</style>
