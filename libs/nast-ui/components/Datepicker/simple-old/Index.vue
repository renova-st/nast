<template>
  <div :class="[ 'n-input', {inline}, color, {'no-title': !title}, ]">
    <div v-if="text" class="n-input-text">{{ value }}</div>
    <textarea v-else-if="type === 'textarea'" v-bind="props" v-on="events" />
    <input v-else v-bind="props" v-on="events" />
    <label v-if="title" :for="`field-${name}`">{{ title }}</label>
    
    <div v-if="message !== false" class="message">{{ message }}</div>
  </div>
</template>

<script>
import props from '../props'

export default {
  name: 'NInput',
  mixins: [ props, ],
  data: () => ({
    s_value: '',
  }),
  computed: {
    props() {
      return {
        id: `field-${this.name}`,
        name: this.name,
        value: this.value !== undefined ? this.value : this.s_value,
        type: this.type,
        placeholder: this.placeholder,
        readonly: this.readonly,
        disabled: this.disabled,
      }
    },
    events() {
      return {
        input: this.s_input,
        change: this.s_change,
        focusin: this.s_focusin,
        focusout: this.s_focusout,
      }
    },
    color() {
      if (this.success !== false) {
        return 'success'
      }
      if (this.info !== false) {
        return 'info'
      }
      if (this.warning !== false) {
        return 'warning'
      }
      if (this.danger !== false) {
        return 'danger'
      }
      return 'primary'
    },
    message() {
      return this.primary || this.success || this.info || this.warning || this.danger || false
    },
  },
  methods: {
    s_input(event) {
      const value = event.target.value
      this.$emit('input', value, event)
      this.input(value, event)
    },
    s_change(event) {
      const value = event.target.value
      this.$emit('change', value, event)
      this.change(value, event)
    },
    s_focusin(event) {
      this.focusin(event)
      this.$emit('focusin', event)
    },
    s_focusout(event) {
      this.focusout(event)
      this.$emit('focusout', event)
    },
  },
}
</script>

<style lang="scss" src="./../../../styles/cssVariables.scss"></style>
<style lang="scss">
  .n-input {
    --n-input-padding: .5em;
    --n-input-border-radius: 5px;
    --n-input-title-font-size: 0.9em;
    
    --n-input-bg: #fff;
    --n-input-disabled-bg: rgba(128, 128, 128, .1);
  }
</style>
<style lang="scss" scoped>
  @import "./../../../styles/scssVariables";

  .n-input {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-top: calc(var(--n-input-title-font-size) + .5em);
    
    &.no-title {
      padding-top: 0;
    }
  
    @each $color, $value in $colors {
      &.#{$color} {
        .message {
          color: var(--#{$color})
        }
      }
    }
    input, textarea, .n-input-text {
      padding: var(--n-input-padding);
      line-height: 1.15;
      display: block;
      width: 100%;
      border: 1px solid var(--gray-8);
      box-sizing: border-box;
    }
    input, textarea {
      border-radius: var(--n-input-border-radius);
      outline: none;
      background: var(--n-input-bg);
      &:focus {
        box-shadow: 0 0 3px var(--primary-t-7);
      }
      &:disabled {
        background: var(--n-input-disabled-bg);
      }
    }
    textarea {
      min-height: 80px;
      resize: vertical;
    }
    .n-input-text {
      padding-left: 0;
      padding-right: 0;
      border-color: transparent;
    }
    label {
      position: absolute;
      font-size: var(--n-input-title-font-size);
      top: 0;
      order: -1;
    }
  
    .message {
      display: inline-block;
      font-size: .8em;
      text-align: left;
    }
    
    &.inline {
      display: inline-flex;
    }
  }
  
</style>
