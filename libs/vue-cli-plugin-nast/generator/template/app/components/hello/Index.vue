<template>
  <div :class="[ 'c-input', ui, ]">
    <label v-if="title" :for="id">{{ title }}</label>
    <div class="input-wrap">
      <input v-if="!text" :id="id" :value="value" :type="type" @input="s_input"/>
      <div v-else class="text">value</div>
      <div v-if="danger" class="error">{{ danger }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CInput',
  props: {
    name: {
      type: [String,],
      required: true,
    },
    value: {
      type: [String, Number,],
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'text',
    },
    danger: {
      type: String,
      default: '',
    },
    ui: {
      type: String,
      default: 'default',
    },
    text: {
      type: Boolean,
      default: false,
    },

    input: {
      type: Function,
      default: () => {
      },
    },
  },
  computed: {
    id() {
      return name + Math.random()
    },
  },
  methods: {
    s_input(event) {
      this.input(event.target.value)
    },
  },
}
</script>

<style scoped lang="scss">
.c-input {
  .input-wrap{
    position: relative;
    margin-bottom: 20px;
  }

  input {
    background: rgba(255, 255, 255, 0.9);
    width: 293px;
    margin: 0 auto;
    display: block;
    height: 50px;
    padding: 6px 12px;
    font-family: Mazzard, sans-serif;
    font-style: italic;
    font-weight: 275;
    font-size: 18px;
    line-height: 21px;
    letter-spacing: 0.02em;
    color: #6c6c6c;
    border: none;
    border-radius: 100px;
    box-shadow: none;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    outline: none !important;
  }

  &.default {

  }

  &.white {

  }

  .text {

  }

  .error {
    color: red;
    font-size: 12px;
    padding-left: 40px;
  }
}
</style>
