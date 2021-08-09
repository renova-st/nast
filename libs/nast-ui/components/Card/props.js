export default {
  props: {
    open: { type: Boolean, default: true, },
    loading: { type: Boolean, default: false, },
  },
  
  computed: {
    props() {
      return {
        open: this.open,
        loading: this.loading,
      }
    },
  },
}
