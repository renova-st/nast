<template>
  <div class="n-tabs-content">
    <template v-for="(slot, name) in $slots">
      <slot v-if="name === s_active" :name="name" />
    </template>
  </div>
</template>

<script>
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
  created() {
    document.addEventListener(`nTabs.${this.name}`, this.change)
  },
  beforeDestroy() {
    document.removeEventListener(`nTabs.${this.name}`, this.change)
  },
  methods: {
    change(e) {
      this.s_active = e.detail
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-tabs-content {
  
  }
</style>
