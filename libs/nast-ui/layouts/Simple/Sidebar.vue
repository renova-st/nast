<template>
  <n-aside offset class="layout-simple-sidebar">
    <LayoutSimpleNavigation :menu="menu" />
  </n-aside>
</template>

<script>
import LayoutSimpleNavigation from './Navigation'

export default {
  name: 'LayoutSimpleSidebar',
  components: { LayoutSimpleNavigation, },
  props: {
    menu: { type: Array, default: () => [], },
  },
}
</script>

<style lang="scss" scoped>
  .layout-simple-sidebar {
    
    &::v-deep {
      --n-aside-top: var(--n-layout-simple-header-height);
    
      &>.content {
        background: #333;
        color: #fff;
        font-size: .9em;
      }
    }
  }
</style>
