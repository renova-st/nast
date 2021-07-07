<template>
  <div :class="[ 'n-dropdown-item', { 'n-active': active, }, ]" @click="s_click">
    <slot :item="value"><span>{{ getTitle(value) }}</span></slot>
  </div>
</template>

<script>
import props from './../props'
import { getTitle, } from 'nast-ui/utils/functions'

export default {
  name: 'NDropdownItem',
  mixins: [ props, ],
  methods: {
    getTitle(item) {
      return getTitle(item, this.itemTitle)
    },
    s_click(event) {
      this.click(this.value, this.indexes, event)
      this.$emit('click', this.value, this.indexes, event)
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-dropdown-item {
    &::v-deep > * {
      display: inline-block;
      width: 100%;
      padding: 12px 20px;
      cursor: pointer;
    }
    
    &.n-active {
      background: var(--primary);
      color: var(--primary-text);
    }
    &:not(.n-active):hover {
      background: var(--primary-t-10);
    }
  }
</style>
