<template>
  <div class="n-list">
    <n-list-group :data="data" :item-title="itemTitle" :item-value="itemValue" :item-children="itemChildren"
                  :sortable="sortable" :opened="opened">
      <template #item="{ item, isGroup, }"><slot name="item" :item="item" :is-group="isGroup" /></template>
      <template #tools="{ item, isGroup, }"><slot name="tools" :item="item" :is-group="isGroup" /></template>
    </n-list-group>
  </div>
</template>

<script>
import props from './../props'
import { getTitle, getValue, } from 'nast-ui/utils/functions'

export default {
  name: 'NList',
  mixins: [ props, ],
  methods: {
    getTitle(item) {
      return getTitle(item, this.itemTitle)
    },
    getValue(item) {
      return getValue(item, this.itemValue)
    },
  },
}
</script>

<style lang="scss">
  html {
    --n-list-tree-padding: 20px;
  }
</style>
<style lang="scss" scoped>
  .n-list {
    font-size: .8rem;
    overflow: hidden;
  }
</style>
