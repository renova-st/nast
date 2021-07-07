export default {
  props: {
    wide: { type: Boolean, default: false, },
  },
  
  computed: {
    props() {
      return {
        wide: this.wide,
      }
    },
    events() {
      return {}
    },
  },
}
