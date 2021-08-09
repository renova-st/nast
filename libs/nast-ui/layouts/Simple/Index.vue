<template>
  <div class="n-layout-simple">
    <layout-simple-header>
      <slot slot="logo"><slot name="logo" /></slot>
    </layout-simple-header>
    
    <div class="layout-content-wrapper">
      <layout-simple-sidebar :menu="menu" />
      
      <div class="layout-content">
        <main>
          <slot name="content"><router-view></router-view></slot>
        </main>
        
        <LayoutSimpleFooter />
      </div>
    </div>
  </div>
</template>

<script>
import LayoutSimpleHeader from './Header'
import LayoutSimpleSidebar from './Sidebar'
import LayoutSimpleFooter from './Footer'

export default {
  name: 'NLayoutSimple',
  components: { LayoutSimpleFooter, LayoutSimpleSidebar, LayoutSimpleHeader, },
  props: {
    menu: { type: Array, default: () => [], },
  },
}
</script>

<style lang="scss">
  .n-layout-simple {
    --n-layout-simple-header-height: 50px;
    --n-layout-simple-footer-height: 45px;
    --n-layout-simple-sidebar-item-offset: 20px;
  }
</style>
<style lang="scss" scoped>
  .n-layout-simple {
    overflow: hidden;
    
    .layout-content-wrapper {
      padding-top: var(--n-layout-simple-header-height);
      display: flex;
      flex-direction: row;
      min-height: 100vh;
    }
    .layout-content {
      flex-grow: 1;
      min-width: 350px;
      display: flex;
      flex-direction: column;
      
      main {
        flex-grow: 1;
        padding: 20px;
      }
    }
  }
</style>
