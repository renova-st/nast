<template>
  <div :class="['n-input', {'no-label': !title}, {inline}]">
    <div :class="['input-field', color]">
      <n-icon v-if="icon" :class="['icon', {active: colored}]" :icon="icon" />
      <n-icon v-if="loading" :class="['iconRight', 'active']" icon="spinner" pulse />
      <n-icon v-else-if="iconRight" :class="['iconRight', {active: colored}]" :icon="iconRight" />
  
      <div v-if="text" class="n-input-text">{{ value }}</div>
      <textarea v-else-if="type === 'textarea'" v-bind="props" :rows="rows" v-on="events"></textarea>
      <input v-else v-bind="props" v-on="events" />
      
      <label v-if="title" :for="'field-' + name" :class="[ {active: _active}, { 'has-message': message, }, ]">{{ title }}</label>
      
      <n-animate v-model="d_animate" :type="animate" :duration="490" inline>
        <div v-if="message !== false" class="message">{{ message }}</div>
      </n-animate>
    </div>
  </div>
</template>

<script>
import props from '../props'

export default {
  name: 'NInput',
  mixins: [ props, ],
  data() {
    return {
      s_value: '',
      isFocused: false,
      d_animate: false,
    }
  },
  computed: {
    props() {
      return {
        value: this.s_value || this.value,
        id: `field-${this.name}`,
        class: [ { 'has-message': this.message, }, { disabled: this.disabled, }, { 'has-icon': this.icon, }, { 'has-icon-right': this.iconRight, }, ],
        placeholder: this.placeholder,
        type: this.type,
        readonly: this.readonly || this.loading || this.disabled,
      }
    },
    events() {
      return {
        focusin: this.m_focusin,
        focusout: this.m_focusout,
        input: this.m_input,
      }
    },
    _active() {
      return (this.s_value !== '' || this.isFocused || this.value !== '' || this.placeholder !== '' || this.loading)
        && !this.disabled && !this.readonly
    },
    colored() {
      return (this.isFocused || this.message) && !this.disabled && !this.readonly
    },
    color() {
      if (this.success !== false) {
        return 'success'
      }
      if (this.warning !== false) {
        return 'warning'
      }
      if (this.danger !== false) {
        return 'danger'
      }
      if (this.secondary !== false) {
        return 'secondary'
      }
      if (this.tertiary !== false) {
        return 'tertiary'
      }
      return 'primary'
    },
    message() {
      return this.primary || this.success || this.warning || this.danger || this.secondary || this.tertiary || false
    },
  },
  watch: {
    message(value) {
      if (value && this.animate) {
        this.startAnimate()
      }
    },
  },
  methods: {
    m_input(event) {
      const hasModel = this.$vnode.data.model
      const value = event.target.value
      if (hasModel) {
        this.$emit('model_change', value)
        this.input(event)
      } else {
        this.s_value = value
      }
    },
    m_focusin(event) {
      this.isFocused = true
      this.focusin(event)
    },
    m_focusout(event) {
      this.isFocused = false
      this.focusout(event)
    },
    startAnimate() {
      this.d_animate = true
    },
  },
}
</script>

<style lang="scss" src="./../../../styles/cssVariables.scss"></style>
<style lang="scss">
  html {
    --n-input-size-xs: .7em;
    --n-input-size-sm: .85em;
    --n-input-size-md: 1em;
    --n-input-size-lg: 1.2em;
    --n-input-size-xl: 1.5em;
  }
</style>
<style lang="scss" scoped>
  @import "./../../../styles/scssVariables";

  .n-input {
    padding-top: .875em;
    &.no-label {
      padding-top: 0;
    }
    &.inline {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .input-field {
    position: relative;
    margin-top: 0;
    
    label {
      color: var(--gray-7);
      position: absolute;
      top: -.375em;
      left: 0;
      height: 100%;
      font-size: 1em;
      cursor: text;
      transition: transform .2s ease-out;
      transform-origin: 0 100%;
      text-align: initial;
      transform: translateY(.7em);
      pointer-events: none;
  
      &:not(.label-icon).active {
        transform: translateY(-.635em) scale(.8);
        transform-origin: 0 0;
      }
    }
    input, textarea {
      font: inherit;
      background-color: transparent;
      border: none;
      border-radius: 0;
      outline: none;
      height: auto;
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      margin: 0 0 2px;
      padding: .31em 0;
      box-sizing: content-box;
      transition: all .2s ease-in-out;
      border-bottom: 1px solid var(--gray-7);
      
      &::placeholder {
        color: var(--gray-7);
      }
  
      $icon-padding: 1.625em;
      
      &.has-icon {
        padding-left: $icon-padding;
        &+label {
          margin-left: $icon-padding;
        }
      }
      &.has-icon-right {
        padding-right: $icon-padding;
        &+label {
          margin-right: $icon-padding;
        }
      }
      &.has-icon, &.has-icon-right {
        width: calc(100% - #{$icon-padding});
        min-width: calc(100% - #{$icon-padding});
        max-width: calc(100% - #{$icon-padding});
      }
      &.has-icon.has-icon-right {
        width: calc(100% - 2 * #{$icon-padding});
        min-width: calc(100% - 2 * #{$icon-padding});
        max-width: calc(100% - 2 * #{$icon-padding});
      }
      &.disabled {
        background: rgba(0, 0, 0, .04);
      }
    }
  
    .message {
      display: inline-block;
      font-size: .9em;
    }
  
    .icon, .iconRight {
      position: absolute;
      color: var(--gray-3);
      top: .44em;
      transition: all .2s ease-in-out;
    }
    .iconRight {
      right: 0;
    }
    
    @each $color, $value in $colors {
      &.#{$color} {
      
        label {
          &:focus:not([readonly]), &.has-message {
            color: var(--#{$color});
          }
        }
      
        input, textarea {
          &:focus:not([readonly]), &.has-message {
            border-bottom-color: var(--#{$color});
            box-shadow: 0 1px 2px -2px var(--#{$color});
          }
          &:focus:not([readonly])+label {
            color: var(--#{$color});
          }
        }
      
        .message {
          color: var(--#{$color});
        }
      
        .icon, .iconRight {
          &.active {
            color: var(--#{$color});
          }
        }
      }
    }
  }
  
</style>
