<template>
  <div class="n-aside-hamburger aside-control">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
import props from './../props'

export default {
  name: 'NAsideHamburger',
  mixins: [ props, ],
}
</script>

<style lang="scss" scoped>
.n-aside-hamburger {
  width: 30px;
  padding: 5px;
  cursor: pointer;
  margin-right: 10px;
  div {
    margin: 4px 0;
    background: rgba(128, 128, 128, .7);
    border-radius: 3px;
    height: 3px;
  }
}
</style>
