<template>
  <div :class="[ 'n-form-item', {'n-inline':inline}, ]">
    <label v-if="title" :for="name" :class="[ {'n-active': active}, {'n-focused': focused}, ]">{{ title }}</label>
    <div class="n-content">
      <slot />
    </div>
    <div v-if="message" :class="[ 'n-message', color, ]">{{ message }}</div>
  </div>
</template>

<script>
import props from './../props'

export default {
  name: 'NFormItem',
  mixins: [ props, ],
  data() {
    return {
    }
  },
  computed: {
    nIcon() {
      return Boolean(this.$options.components['nIcon'])
    },
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
  .n-form-item {
    padding-top: 1.4em;
    vertical-align: baseline;
    width: 100%;
    position: relative;

    &.n-inline {
      display: inline-block;
      width: var(--n-input-width); /* TODO */
    }

    label {
      color: inherit;
      opacity: .5;
      position: absolute;
      top: 1.4em;
      height: 100%;
      left: 0;
      white-space: nowrap;
      width: 100%;
      /*overflow: hidden;*/
      text-overflow: ellipsis;
      font-size: 1em;
      line-height: 1;
      transition: top .2s ease-out, font-size .2s ease-out;
      text-align: initial;
      pointer-events: none;

      &.n-active, &.n-focused {
        top: 0.4em;
        font-size: .8em;
      }
      &.n-focused {
        color: var(--primary);
      }
    }
  }
</style>
