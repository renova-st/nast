<template>
  <div :class="[ 'n-container', wide, ]">
    <slot />
  </div>
</template>

<script>
import props from './../props'

export default {
  name: 'NContainer',
  mixins: [ props, ],
}
</script>

<style lang="scss" scoped>
  @import "../../../styles/scssVariables";
  
  .n-container {
    width: 100%;
    max-width: calc(100% - #{$grid-padding});
    padding-right: ($grid-padding / 2);
    padding-left: ($grid-padding / 2);
    margin-right: auto;
    margin-left: auto;
    
    @each $breakpoint, $width in $grid {
      @if $width > 0 {
        @media (min-width: $width) {
          max-width: calc(#{$width} - #{$grid-padding});
        }
      }
    }
    
    &.wide {
      padding: 0;
      width: 100%;
    }
  }
</style>
