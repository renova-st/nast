<template>
  <div ref="group" :class="[ 'n-list-group', {'n-dragging': dragging}, ]">
    <n-list-item v-for="item in data" :key="getValue(item)" :item="item" :sortable="sortable" :opened="opened">
      <template #item="{ item, isGroup, }"><slot name="item" :item="item" :is-group="isGroup" /></template>
      <template #tools="{ item, isGroup, }"><slot name="tools" :item="item" :is-group="isGroup" /></template>
    </n-list-item>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import { getValue, } from 'nast-ui/utils/functions'
import props from '../props'

export default {
  name: 'NListGroup',
  mixins: [ props, ],
  data: () => ({
    dragging: false,
  }),
  mounted() {
    new Sortable(this.$refs.group, {
      animation: 250,
      group: 'list',
      fallbackTolerance: 5,
      swapThreshold: 0.65,
      touchStartThreshold: 10,
      handle: '.n-handle',
      onStart: () => {
        this.dragging = true
      },
      onEnd: () => {
        this.dragging = false
      },
    })
  },
  methods: {
    getValue(item) {
      return getValue(item, this.itemValue)
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-list-group {
    &.n-dragging::v-deep {
      .n-list-item {
        * {
          cursor: none;
        }
      }
    }
  }
</style>
