<template>
  <div v-click-outside="clickOutside" class="n-dropdown-group">
    <n-dropdown-item :value="value" :indexes="indexes"
                     :item-title="itemTitle" :item-value="itemValue" @click="(...p) => s_click(...p, true)">
      <template #default="{ item, }"><slot name="group" :item="item" /></template>
    </n-dropdown-item>
    
    <div v-if="isOpen" class="n-content">
      <template v-for="(child, i) in value[itemChildren]">
        <template v-if="child[itemChildren]">
          <n-dropdown-group :key="getValue(child)" :value="child" :indexes="[ ...indexes, i, ]"
                            :item-title="itemTitle" :item-value="itemValue" :item-children="itemChildren" @click="s_click">
            <template #group="{ item, }"><slot name="group" :item="item" /></template>
            <template #default="{ item, }"><slot :item="item" /></template>
          </n-dropdown-group>
        </template>
        <template v-else>
          <n-dropdown-item :key="getValue(child)" :value="child" :indexes="[ ...indexes, i, ]"
                           :item-title="itemTitle" :item-value="itemValue" @click="s_click">
            <template #default="{ item, }"><slot :item="item" /></template>
          </n-dropdown-item>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import clickOutside from 'nast-ui/directives/click-outside'
import { getValue, } from 'nast-ui/utils/functions'
import props from './../props'

export default {
  name: 'NDropdownGroup',
  directives: { clickOutside, },
  mixins: [ props, ],
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    getValue(item) {
      return getValue(item, this.itemValue)
    },
    s_click(item, indexes, event, isGroup = false) {
      this.$emit('click', item, indexes, event, isGroup)
      this.click(item, indexes, event, isGroup)
    },
    toggle() {
      this.isOpen = !this.isOpen
    },
    clickOutside() {
      if (this.isOpen) {
        this.isOpen = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-dropdown-group {
  }
</style>
