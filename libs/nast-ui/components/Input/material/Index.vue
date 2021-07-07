<template>
  <div v-click-outside="clickOutside" :class="[ 'n-input', ...containerClasses, ]" @click="s_click">
    <div class="n-wrapper">
      <n-icon v-if="nIcon && (icon || iconInner)" :icon="icon || iconInner" class="n-icon" />

      <div class="n-content">
        <div class="n-items">
          <label v-if="title" :for="name" :class="[ {'n-active': titleIsActive}, ]">{{ title }}</label>
          <div class="n-margin">
            <div v-for="(v, i) in selected" :key="i" class="n-item">
              <div class="n-badge">
                <div class="n-text">{{ getTitle(v) }}</div>
                <div class="n-remove" @click="deleteClick(i)"><n-icon v-if="nIcon" icon="times" /></div>
              </div>
            </div>
            <span v-if="text" class="n-text-content">{{ textValue }}</span>
            <n-mini-input v-else ref="input" v-bind="inputProps" v-on="inputEvents" />
          </div>
        </div>
<!--        <div v-if="nIcon && hasClearIcon && !text" class="n-clear" @click="s_clear"><n-icon v-if="nIcon" icon="times" /></div>-->
      </div>
      <n-icon v-if="nIcon && loading" icon="spinner" class="n-icon-right" pulse />
      <n-icon v-else-if="nIcon && (iconRight || iconRightInner)" :icon="iconRight || iconRightInner" class="n-icon-right" />
    </div>

    <div v-if="danger" class="n-message danger">{{ danger }}</div>
  </div>
</template>

<script>
import isArray from 'lodash/isArray'
import { getTitle, } from 'nast-ui/utils/functions'
import props from '../props'
import NMiniInput from './MiniInput'
import clickOutside from 'nast-ui/directives/click-outside'

export default {
  name: 'NInput',
  directives: { clickOutside, },
  components: { NMiniInput, },
  mixins: [ props, ],
  data() {
    return {
      s_focused: this.focused || false,
      s_value: null,
      selected: [],
      lastValue: '', // used for understanding of deleting item when backspace pushed
    }
  },
  computed: {
    inputProps() {
      return {
        value: this.getTitle(this.s_value),
        name: this.name,
        id: this.name,
        type: this.type,
        placeholder: this.placeholder,
        disabled: this.disabled || this.loading,
      }
    },
    inputEvents() {
      return {
        input: this.s_input,
        change: this.inputChange,
        keydown: this.s_keydown,
        keyup: this.s_keyup,
        focus: this.s_focus,
        blur: this.s_blur,
      }
    },
    titleIsActive() {
      const focused = this.focused !== null ? this.focused : this.s_focused
      return focused || this.s_value || this.placeholder || this.selected.length || this.text
    },
    containerClasses() {
      return [
        { 'n-inline': this.inline, },
        { 'n-focused': this.s_focused, },
        { 'n-no-label': !this.title, },
        { 'n-multi': this.multi, },
        { 'n-disabled': this.disabled || this.loading, },
        { 'n-text': Boolean(this.text), },
        { 'n-inner-icon': this.iconInner || this.iconRightInner || this.loading, },
      ]
    },
    textValue() {
      if (this.s_value) {
        return this.s_value
      }
      if (this.text === true) {
        return '-'
      }
      return this.text
    },
    nIcon() {
      return Boolean(this.$options.components['nIcon'])
    },
    hasClearIcon() {
      if (!this.selected.length && !this.s_value) {
        return false
      }
      if (this.clear === null) {
        return this.selected.length && !this.disabled
      }
      return this.clear
    },
    multi() {
      return isArray(this.value)
    },
  },
  watch: {
    value(value) {
      this.calcValue(value)
    },
    focused(value) {
      this.s_focused = value
      if (this.$refs.input) {
        if (value) {
          this.$refs.input.focus()
        } else {
          this.$refs.input.blur()
        }
      }
    },
  },
  mounted() {
    this.calcValue(this.value)
  },
  methods: {
    getTitle(item) {
      return getTitle(item, this.itemTitle)
    },
    calcValue(value) {
      if (this.multi) {
        this.selected = value
      } else {
        this.s_value = value
      }
    },
    inputChange(e) {
      if (!this.multi) {
        this.s_change(e.target.value)
      }
    },
    clickOutside(e) {
      if (this.s_focused) {
        this.updateFocus(false)
      }
    },
    updateFocus(value) {
      if (this.s_focused === value) return

      if (this.focused === null) {
        this.s_focused = value
      }
      this['update:focused'](value)
      this.$emit('update:focused', value)
    },
    deleteClick(index) {
      this.s_change(this.selected.filter((v, i) => i !== index))
    },
    s_input(e) {
      const value = e.target.value
      if (this.value === null || this.multi) {
        this.s_value = value
      }
      if (!this.multi) {
        this.$emit('update:value', this.value)
        this['update:value'](this.value)
      }
      this.input(value, e)
      this.$emit('input', value, e)
    },
    s_click(e) {
      if (this.$refs.input) {
        this.$refs.input.focus()
      }
      this.click(e)
      this.$emit('click', e)
    },
    s_focus(e) {
      this.updateFocus(true)
      this.focus(e)
      this.$emit('focus', e)
    },
    s_blur(e) {
      if (!e.relatedTarget) {
        e.preventDefault()
        return
      }
      this.updateFocus(false)
      this.blur(e)
      this.$emit('blur', e)
    },
    s_keydown(e) {
      this.keydown(e)
      this.$emit('keydown', e)

      if (e.key === 'Backspace' && this.selected.length) {
        this.lastValue = this.s_value
      }
    },
    s_keyup(e) {
      this.keyup(e)
      this.$emit('keyup', e)

      if (e.key === 'Backspace' && this.selected.length && !this.lastValue) {
        const selected = this.selected.slice(0, -1)
        this.s_change(selected, e)
      }
      if (e.key === 'Enter' && this.multi && this.s_value.trim()) {
        const selected = [ ...this.selected, this.s_value.trim(), ]
        this.s_change(selected, e)
        this.s_value = null
      }
    },
    s_change(value, e) {
      if (this.value === null) {
        if (this.multi) {
          this.selected = value
        } else {
          this.s_value = value
        }
      }
      this['update:value'](value, e)
      this.$emit('update:value', value, e)
    },
    s_clear() {
      if (this.multi) {
        this.s_change([])
        this.s_value = ''
      } else {
        this.s_change('')
      }

      this.input('')
      this.$emit('input', '')
    },
  },
}
</script>

<style lang="scss" src="./../../../styles/cssVariables.scss"></style>
<style lang="scss">
  html {
    --n-input-width: 300px;
  }
</style>
<style lang="scss" scoped>
  @import "./../../../styles/scssVariables";

  .n-input {
    padding-top: 1em;
    vertical-align: baseline;
    width: 100%;


    .n-message {
      color: var(--danger)
    }

    .n-wrapper, .n-content {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .n-items {
      cursor: text;
      position: relative;
      width: 100%;

      label {
        color: inherit;
        opacity: .5;
        position: absolute;
        top: .4em;
        height: 100%;
        left: 0;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1em;
        line-height: 1;
        transition: top .2s ease-out, font-size .2s ease-out;
        text-align: initial;
        pointer-events: none;

        /*&.n-active {*/
          top: -1em;
          font-size: .8em;
        /*}*/
      }

      .n-margin {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin: -2px 0 -2px -2px;
        &>* {
          margin: 2px;
        }
      }
      .n-item {
        .n-badge {
          padding: 5px 6px;
          font-size: .8em;
          line-height: 1;
          border: 1px solid #333;
          border-radius: var(--border-radius);
          display: flex;
          align-items: center;
          position: relative;

          .n-text {
            display: inline-block;
            padding-right: 8px;
          }
        }
      }
      .n-input-mini-input, .n-text-content {
        flex-grow: 1;
        line-height: 1;
        padding: 5px 0;
      }
    }
    .n-remove, .n-clear {
      width: 1em;
      height: 1em;
      box-sizing: content-box;
      font-size: 11px;
      padding: 5px;
      margin: -5px;
      cursor: pointer;
    }
    .n-remove {

    }
    .n-clear {
      margin: -5px 0;
      opacity: .2;
      transition: opacity var(--transition);
      &:hover {
        opacity: .5;
      }
    }

    .n-icon { margin-right: 7px; }
    .n-icon-right { margin-left: 7px; }

    &.n-disabled {
      opacity: .8;
      &.n-inner-icon, &:not(.n-inner-icon) .n-content { border-bottom-style: dotted; }
      &.n-inner-icon .n-wrapper, &:not(.n-inner-icon) .n-content { background: rgba(127, 127, 127, .01); }
    }
    &.n-multi {
      .n-input-mini-input::v-deep input { width: 2px; }
    }
    &.n-no-label { padding-top: 0; }
    &.n-inline { display: inline-block; width: var(--n-input-width); }
    &.n-inner-icon, &:not(.n-inner-icon) .n-content { border-bottom: 1px solid var(--border-color); }
    &.n-focused {
      label { color: var(--primary); opacity: 1; }
      &.n-inner-icon, &:not(.n-inner-icon) .n-content { border-color: var(--primary); }
    }
    &.n-text {
      &.n-inner-icon, &:not(.n-inner-icon) .n-content { border-color: transparent; }
    }
  }
</style>
