<template>
  <div :class="[ 'n-select', {'n-inline': inline}, {'n-focused': focused}, ]" tabindex="-1" @click="s_click"
       @focusin="onFocusin" @focusout="onFocusout">
    <n-input v-if="text" ref="input" v-bind="inputProps" :value="s_value" />
    <n-dropdown v-else ref="dropdown" v-bind="dropdownProps" :value.sync="s_value" fit :open="focused" :search="search" target=".n-wrapper" v-on="dropdownEvents">
      <n-input ref="input" v-bind="inputProps" :focused="focused" :value="s_value" icon-right-inner="angle-down" :update:value="updateInputValue" @input="s_input" />
      <template #group="{item}"><slot name="group" :item="item"></slot></template>
      <template #item="{item}"><slot name="item" :item="item"></slot></template>
    </n-dropdown>
    <div v-if="danger" class="n-message danger">{{ danger }}</div>
  </div>
</template>

<script>
import isArray from 'lodash/isArray'
import props from './../props'
import { dropdownProps, inputProps, } from '../utils'
import { getValue, } from 'nast-ui/utils/functions'
import clickOutside from 'nast-ui/directives/click-outside'

export default {
  name: 'NSelect',
  directives: { clickOutside, },
  mixins: [ props, ],
  data() {
    return {
      focused: false,
      search: '',
    }
  },
  computed: {
    s_value: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value)
        this['update:value'](value)
      },
    },
    dropdownProps() {
      return dropdownProps(this)
    },
    dropdownEvents() {
      return {
        select: this.s_select,
      }
    },
    inputProps() {
      return {
        ...inputProps(this),
        value: this.s_value,
      }
    },
    multi() {
      return isArray(this.value)
    },
  },
  methods: {
    onFocusin(e) {
      if (!this.disabled && this.$refs.dropdown) {
        this.updateFocused(true)
      }
      this.$emit('focusin', e)
      this.focusin(e)
    },
    onFocusout(e) {
      if (this.$refs.dropdown) {
        const popup = this.$refs.dropdown.$el.querySelector('.n-popup-container')
        const input = this.$refs.input.$el.querySelector('input')
        if (popup !== e.relatedTarget && input !== e.relatedTarget) {
          this.search = ''
          this.updateFocused(false)
        }
      }
      this.$emit('focusout', e)
      this.focusout(e)
    },
    s_input(value) {
      this.search = value
    },
    updateInputValue(value) {
      if (value && (this.value.length === value.length - 1)) { // created new value
        if (this.creatable) {
          this.s_value = value
        }
      } else {
        this.s_value = value
      }
    },
    updateFocused(value) {
      if (this.$refs.dropdown) {
        if (value) {
          this.$refs.input.focus()
        }
        this.focused = value
      }
    },
    getValue(item) {
      return getValue(item, this.itemValue)
    },
    s_select(item) {
      this.$emit('select', item)
      this.select(item)
      this.search = ''
      if (!this.multi) {
        setTimeout(() => {
          this.focused = false
        }, 2) // слишком быстрое закрытие не очень комфортно
      }
    },
    s_click() {
      if (!this.disabled) {
        this.updateFocused(true)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .n-select {
    --n-popup-width: var(--n-input-width);
    --n-progress-height: 2px;

    outline: none;
    cursor: text;
    text-align: left;

    &.n-inline {
      display: inline-block;
    }
    &:not(.n-inline) {
      width: 100%;
    }

    .n-message {
      margin-top: 5px;
      color: var(--danger)
    }

    &::v-deep {
      .n-input .n-icon-right {
        transition: transform var(--transition);
        opacity: .7;
        margin: 0 7px;
      }
    }
    &.n-focused::v-deep {
      .n-input .n-icon-right {
        transform: rotate(180deg);
      }
    }
  }
</style>
