
export default {
  props: {
    inline: { type: Boolean, default: false, },
  },
  
  computed: {
    props() {
      return {
        inline: this.inline,
      }
    },
    events() {
      return {}
    },
  },
}
