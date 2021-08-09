<template>
  <footer class="layout-simple-footer">
    footer
  </footer>
</template>

<script>
export default {
  name: 'LayoutSimpleFooter',
}
</script>

<style lang="scss" scoped>
  .layout-simple-footer {
    height: var(--n-layout-simple-footer-height);
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border-top: 1px solid #ececec;
    font-size: .8em;
  }
</style>
