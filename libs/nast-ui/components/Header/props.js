
export default {
  props: {
    offset: { type: Boolean, default: true, },
  },
  
  computed: {
    props() {
      return {
        offset: this.offset,
      }
    },
    events() {
      return {}
    },
  },
}
