<template>
  <div class="n-input-mini-input">
    <input ref="input" :style="{'min-width': width}" v-bind="$attrs" :type="s_type" v-on="$listeners">
    <div ref="hidden" class="n-hidden">{{ hiddenValue }}</div>
  </div>
</template>

<script>
export default {
  name: 'NMiniInput',
  inheritAttrs: false,
  data: () => ({
    width: '2px',
  }),
  computed: {
    hiddenValue() {
      const v = this.$attrs.value || this.$attrs.placeholder
      if (this.$attrs.type === 'password') {
        return '*'.repeat(v.length)
      }
      return v
    },
    s_type() {
      return this.$attrs.type === 'password' ? 'password' : 'text'
    },
  },
  watch: {
    '$attrs.value'() {
      this.calcWidth()
    },
  },
  mounted() {
    this.calcWidth()
  },
  methods: {
    calcWidth() {
      this.$nextTick(() => {
        this.$refs.hidden.font = this.$refs.input.font
        this.width = this.$refs.hidden.clientWidth + 2 + 'px'
      })
    },
    focus() {
      this.$refs.input.focus()
    },
    blur() {
      this.$refs.input.blur()
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-input-mini-input {
    cursor: text;
    overflow: hidden;
    line-height: 1.2;
    
    input {
      background: transparent;
      border: none;
      outline: none;
      color: inherit;
      font: inherit;
      width: 100%;
      line-height: 1.2;
      padding: 0;
    }
    .n-hidden {
      visibility: hidden;
      pointer-events: none;
      position: absolute;
    }
  }
</style>
