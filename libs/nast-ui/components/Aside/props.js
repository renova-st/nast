export default {
  model: {
    prop: 'show',
    event: 'toggle',
  },
  props: {
    control: { type: String, default: 'aside-control', },
    open: { type: Boolean, default: false, },
    fixed: { type: Boolean, default: true, },
    offset: { type: Boolean, default: false, },
    
    outerClose: { type: Boolean, default: false, },
    mobileClose: { type: Boolean, default: true, },
  },
  
  computed: {
    props() {
      return {}
    },
    events() {
      return {}
    },
  },
}
