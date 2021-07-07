<template>
  <header class="n-header">
    <n-header-content v-bind="$props" class="n-scroll-offset">
      <slot />
    </n-header-content>
    <n-header-content v-if="offset" v-bind="$props" :offset="false">
      <slot />
    </n-header-content>
  </header>
</template>

<script>
import props from './../props'
import NHeaderContent from './Content'

export default {
  name: 'NHeader',
  components: { NHeaderContent, },
  mixins: [ props, ],
}
</script>

<style lang="scss">
  html {
    --n-header-padding: 10px 0;
    --n-header-background: #fff;
    --n-header-height: auto;
  }
</style>
<style lang="scss" scoped>
  .n-header {
  
  }
</style>
