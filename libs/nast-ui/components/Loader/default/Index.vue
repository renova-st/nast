<template>
  <div v-show="s_loading" class="n-loader">
    <div class="n-veil"></div>
    <div class="n-line">
      <n-progress ref="progress" :hidden="hidden" :speed="200" />
    </div>
    <div :class="[ 'n-content', color, ]">
      <n-icon v-if="icon" :icon="icon" pulse />
    </div>
  </div>
</template>

<script>
import props from './../props'

export default {
  name: 'NLoader',
  mixins: [ props, ],
  data() {
    return {
      s_loading: this.loading,
    }
  },
  watch: {
    loading(value) {
      if (value) {
        this.$refs.progress.start()
        this.s_loading = true
      } else {
        this.$refs.progress.end(true)
        setTimeout(() => {
          this.s_loading = false
        }, 200)
      }
    },
  },
  mounted() {
    if (this.s_loading) {
      this.$refs.progress.start()
    }
  },
  methods: {
    stop() {
      this['update:loading'](false)
      this.$emit('update:loading')(false)
    },
  },
}
</script>

<style lang="scss" src="./../../../styles/cssVariables.scss"></style>
<style lang="scss" scoped>
  @import "../../../styles/scssVariables";
  
  .n-loader {
    z-index: 50;
    
    &, .n-veil, .n-line, .n-content {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  
    .n-veil {
      background: var(--content-bg);
      opacity: .7;
      z-index: 51;
    }
  
    .n-line {
      z-index: 52;
    }
    
    .n-content {
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 53;
  
      .n-icon {
        font-size: 1.3em;
      }
  
      @each $color, $value in $colors {
        &.#{$color} {
          .n-icon {
            color: var(--#{$color}-t-2);
          }
        }
      }
    }
  }
</style>
