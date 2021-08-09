<template>
  <n-header class="layout-simple-header" :offset="false">
    <div class="header-content">
      <n-aside-hamburger />
      <div class="logo"><slot name="logo" /></div>
    </div>
  </n-header>
</template>

<script>
export default {
  name: 'LayoutSimpleHeader',
}
</script>

<style lang="scss" scoped>
  .layout-simple-header {
    --n-header-height: var(--n-layout-simple-header-height);
    --n-header-padding: 0;
    
    .header-content {
      padding: 0 10px;
      height: var(--n-layout-simple-header-height);
      display: flex;
      flex-direction: row;
      align-items: center;
      
      .logo {
        height: calc(var(--n-layout-simple-header-height) - 20px);
        
        &::v-deep img {
          height: calc(var(--n-layout-simple-header-height) - 20px);
        }
      }
    }
  }
</style>
