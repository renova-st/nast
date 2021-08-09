<template>
  <div :class="[ 'n-tabs', {'n-disabled': disabled}, ]">
    <div v-for="tab in data" :key="tab.name" :class="[ 'n-tab', {active: tab.name === s_active}, ]" @click="s_click($event, tab.name)">
      <slot name="tab">{{ tab.title }}</slot>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get'
import props from './../props'

export default {
  mixins: [ props, ],
  data() {
    return {
      s_active: this.active,
    }
  },
  watch: {
    active(value) {
      this.s_active = value
    },
  },
  mounted() {
    if (!this.active) {
      const name = (this.state && this.$route.query[this.name]) || get(this.data, '0.name')
      this.change(name)
    }
  },
  beforeDestroy() {
    if (this.state) {
      this.$router.push({ query: { ...this.$route.query, [this.name]: undefined, }, })
    }
  },
  methods: {
    s_click(event, name) {
      if (!this.disabled) {
        this.$emit('click', event, name)
        this.click(event, name)
        this.change(name)
      }
    },
    change(name) {
      if (!this.active) {
        this.s_active = name
        const event = new CustomEvent(`nTabs.${this.name}`, { detail: name, })
        document.dispatchEvent(event)
        if (this.state && this.$route.query[this.name] !== name) {
          this.$router.push({ query: { ...this.$route.query, [this.name]: name, }, })
        }
      }
      this.$emit('update:active', name)
      this['update:active'](name)
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-tabs {
    display: flex;

    & > .n-tab {
      padding: 10px 20px;
      border-style: solid;
      border-color: transparent;
      border-width: 0 0 3px;
      cursor: pointer;

      &.active {
        border-color: var(--primary);
        color: var(--primary);
      }
    }

    &.n-disabled {
      & > .n-tab:not(.active) {
        opacity: .5;
        cursor: default;
      }
    }
  }
</style>
