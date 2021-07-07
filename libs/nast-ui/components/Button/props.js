export default {
  props: {
    color: { type: String, default: 'default', },
    round: { type: Boolean, default: false, },
    flat: { type: Boolean, default: false, },
    outline: { type: Boolean, default: false, },
    type: { type: String, default: 'button', },
    disabled: { type: Boolean, default: false, },
    wide: { type: Boolean, default: false, },
    loading: { type: Boolean, default: false, },
    icon: { type: String, default: '', },
    iconRight: { type: String, default: '', },
    
    click: { type: Function, default: () => {}, },
  },
  
  computed: {
    props() {
      return {
        color: this.color,
        round: this.round,
        flat: this.flat,
        outline: this.outline,
        disabled: this.disabled,
        wide: this.wide,
        loading: this.loading,
        icon: this.icon,
        iconRight: this.iconRight,
      }
    },
    events() {
      return {
        click: this.click,
      }
    },
  },
}
