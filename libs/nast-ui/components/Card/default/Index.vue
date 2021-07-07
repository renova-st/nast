<template>
  <div class="n-card">
    <n-loader v-if="nLoader" :loading="loading" />
    <div class="content">
      <header v-if="$slots['header']"><slot name="header"></slot></header>
      <main><slot></slot></main>
      <footer v-if="$slots['footer']"><slot name="footer"></slot></footer>
    </div>
  </div>
</template>

<script>
import props from './../props'

export default {
  name: 'NCard',
  mixins: [ props, ],
  computed: {
    nLoader() {
      return Boolean(this.$options.components['nLoader'])
    },
  },
}
</script>

<style lang="scss" src="./../../../styles/cssVariables.scss"></style>
<style lang="scss">
  html {
    --n-card-padding: var(--content-padding);
    --n-card-margin: 20px;
  }
</style>
<style lang="scss" scoped>
  @import "./../../../styles/scssVariables";
  
  .n-card {
    position: relative;
    background: var(--content-bg);
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
    border-radius: var(--border-radius);
    margin: var(--n-card-margin);

    & > .content {
      &>*:first-child {
        padding-top: var(--n-card-padding);
      }
      &>*:last-child {
        padding-bottom: var(--n-card-padding);
      }
    }
    
    header, main, footer {
      padding-left: var(--n-card-padding);
      padding-right: var(--n-card-padding);
      overflow: auto;
    }
    
    header {
      h1, h2, h3, h4, h5, h6 {
        margin-top: 0;
      }
    }

    main > *:first-child { margin-top: 0; }
  }
</style>
