export default {
  props: {
    loading: { type: Boolean, default: false, },
    color: { type: String, default: 'primary', },
    icon: { type: String, default: 'spinner', },
    hidden: { type: Boolean, default: false, },
  
    'update:loading': { type: Function, default: (value) => {}, },
  },
  
  computed: {
    props() {
      return {
        loading: this.loading,
        color: this.color,
        icon: this.icon,
      }
    },
    events() {
      return {
        'update:loading': this['update:loading'],
      }
    },
    functions() {
      return {
        stop: this.stop,
      }
    },
  },
}
