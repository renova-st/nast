<template>
  <form class="n-form" @submit="s_submit">
    <slot />
  </form>
</template>

<script>
import props from './../props'

export default {
  mixins: [ props, ],
  methods: {
    s_submit(e) {
      e.preventDefault()
      this.submit(e)
      this.$emit('submit', e)
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-form {
  }
</style>
