<template>
  <div class="n-center">
    <slot />
  </div>
</template>

<script>
import props from './../props'

export default {
  mixins: [ props, ],
}
</script>

<style scoped lang="scss">
  .n-center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
</style>
