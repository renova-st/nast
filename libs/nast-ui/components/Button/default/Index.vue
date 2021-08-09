<template>
  <button
    :class="['n-button', color, {round}, {flat}, {outline}, {loading}, {wide}]"
    :type="type"
    :disabled="disabled || loading"
    @click="s_click"
  >
    <n-icon v-if="nIcon && icon" :icon="icon" class="icon" />
    
    <span v-if="$slots.default" class="content"><slot></slot></span>
    
    <template v-if="loading">
      <span v-if="$slots.loader" class="icon"><slot name="loader"></slot></span>
      <n-icon v-else-if="nIcon" class="icon" icon="spinner" pulse />
    </template>
    
    <n-icon v-else-if="nIcon && iconRight" :icon="iconRight" class="icon" />
  </button>
</template>

<script>
import props from './../props'

export default {
  name: 'NButton',
  mixins: [ props, ],
  computed: {
    nIcon() {
      return Boolean(this.$options.components['nIcon'])
    },
  },
  methods: {
    s_click(e) {
      this.$emit('click', e)
      this.click(e)
    },
  },
}
</script>

<style lang="scss" src="./../../../styles/cssVariables.scss"></style>
<style lang="scss">
  html {
    --n-button-padding: .5em .8em;
    --n-button-border-radius: var(--border-radius);
  }
</style>
<style lang="scss" scoped>
  @import "../../../styles/scssVariables";
  
  .n-button {
    @each $color, $value in $colors {
      &.#{$color} {
        background-color: var(--#{$color});
        border-color: var(--#{$color}-d-1);
        color: var(--#{$color}-text);
        
        &:not([disabled]):hover {
          background-color: var(--#{$color}-d-1);
          border-color: var(--#{$color}-d-2);
        }
        &:not([disabled]):active {
          background-color: var(--#{$color}-d-2);
          border-color: var(--#{$color}-d-3);
          box-shadow: inset 1px 1px 3px rgba(0, 0, 0, .3);
        }
      }
    }
  
    padding: var(--n-button-padding);
    outline: none;
    cursor: pointer;
    font: inherit;
    line-height: 1.15;
    transition: all linear 100ms;
    border: 1px solid;
    border-radius: var(--n-button-border-radius);
    user-select: none;
    white-space: nowrap;
    
    .icon {
      vertical-align: baseline;
      font-size: calc(1em - 2px);
    }
    .icon + .content { margin-left: .5em; }
    .content + .icon { margin-left: .5em; }
    .content { display: inline-block; }
  
  
    &>* { white-space: normal; }
    &[disabled] { cursor: default; opacity: .7; }
    &.outline {
      background-color: transparent;
      &:not(:hover):not(:active) { color: inherit; }
    }
    &.flat {
      background-color: transparent; border-color: transparent;
      &:not(:hover):not(:active) { color: inherit; }
    }
    &.round { border-radius: 100%; width: 2em; height: 2em; padding: 0; overflow: hidden; }
    &.wide { display: block; width: 100%; }
  }
</style>
