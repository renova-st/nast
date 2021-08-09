export default {
  props: {
    src: { type: String, default: undefined, },
    file: { type: File, default: undefined, },
    load: { type: Function, default: undefined, },
    mock: { type: Boolean, default: false, },
    alt: { type: String, default: '', },

    inline: { type: Boolean, default: false, },
    round: { type: Boolean, default: false, },
    centered: { type: Boolean, default: false, },
    bg: { type: Boolean, default: false, },
  },

  computed: {
    props() {
      return {
      }
    },
    events() {
      return {
      }
    },
    functions() {
      return {
      }
    },
  },
}
