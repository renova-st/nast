<template>
  <div v-click-outside="clickOutside" :class="[ 'n-navigation-group', {'n-absolute': absolute}, {open: isOpen}, ]">
    <n-navigation-item :item="item" :click="() => toggle()" :active="isActive()">
      <template v-slot="{ item, }">
        <slot :item="item" />
      </template>
    </n-navigation-item>
    
    <div v-show="isOpen" class="n-dropdown">
      <template v-for="(child, i) in item.children">
        <template v-if="child.children">
          <n-navigation-group :key="child.title" :item="child" :active="active.children" :absolute="absolute" :click="click">
            <template v-slot="{ item, }">
              <slot :item="item" />
            </template>
          </n-navigation-group>
        </template>
        <template v-else>
          <n-navigation-item :key="child.title" :item="child" :click="itemClick" :active="isActive(i)">
            <template v-slot="{ item, }">
              <slot :item="item" />
            </template>
          </n-navigation-item>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import clickOutside from './../../../../directives/click-outside'
import props from './../props'

export default {
  name: 'NNavigationGroup',
  directives: { clickOutside, },
  mixins: [ props, ],
  data() {
    return {
      isOpen: this.absolute ? false : this.isActive(),
    }
  },
  methods: {
    isActive(i) {
      if (i !== undefined) {
        return this.active.index === i
      }
      
      return Boolean(Object.keys(this.active).length)
    },
    toggle(value) {
      this.isOpen = (value !== undefined ? value : !this.isOpen)
    },
    itemClick(e) {
      this.click(e)
      this.$emit('click')
      
      if (this.absolute) {
        this.toggle(false)
      }
    },
    clickOutside() {
      if (this.absolute) {
        this.toggle(false)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-navigation-group {
    &.n-absolute {
      .n-dropdown {
        position: absolute;
        background: rgba(255, 255, 255, .9);
        border: 1px solid #eee;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, .1);
        padding: 20px 15px;
      }
    }
  }
</style>
