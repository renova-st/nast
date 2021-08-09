
export default {
  props: {
    vertical: { type: Boolean, default: false, },
  },
  
  computed: {
    props() {
      return {
        vertical: this.vertical,
      }
    },
    events() {
      return {}
    },
  },
}
