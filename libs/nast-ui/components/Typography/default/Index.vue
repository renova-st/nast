<template>
  <div class="n-typography" />
</template>

<script>
import props from './../props'

export default {
  name: 'NTypography',
  mixins: [ props, ],
}
</script>

<style src="./../normalise.css"></style>
<style lang="scss" src="./../../../styles/cssVariables.scss"></style>
<style lang="scss">
  @import "./../../../styles/scssVariables";
  
  body {
    font: var(--text-font);
    background-color: var(--body-bg);
    color: var(--text-color);
    line-height: var(--line-height);
    position: relative;
    padding: 0;
    margin: 0;
    min-width: map_get($grid, xs);
  }
  
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    &+sub {
      display: inline-block;
      margin-bottom: .6em;
    }
  }
  h1 { font: var(--h1-font); margin: 1.4em 0 1.2em; }
  h2 { font: var(--h2-font); margin: .9em 0 .7em; }
  h3 { font: var(--h3-font); margin: .9em 0 .7em; }
  h4 { font: var(--h4-font); margin: .9em 0 .7em; }
  h5 { font: var(--h5-font); margin: .8em 0 .6em; }
  h6 { font: var(--h6-font); margin: .7em 0 .5em; }
  
  sub {
    opacity: .9;
    font-size: .9em;
    bottom: .1em;
  }
  
  .search-value {
    background: rgba(216, 216, 8, .5);
  }
  *, ::after, ::before {
    box-sizing: border-box;
  }
  
  
  table {
    border-collapse: collapse;
    
    td {
      padding: 0;
      margin: 0;
    }
  }
  
  a {
    color: var(--link-color);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
</style>
