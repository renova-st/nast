
export default {
  name: 'NTabs',
  
  props: {
    data: { type: Array, default: () => [], }, // [ { name: '', title: '', }, ]
    content: { type: Object, default: null, },
    active: { type: String, default: '', },
    name: { type: String, default: 'tabsDefault', },
    state: { type: Boolean, default: false, },
    disabled: { type: Boolean, default: false, },
    
    'update:active': { type: Function, default: () => {}, },
    'click': { type: Function, default: () => {}, },
  },
  
  computed: {
    props() {
      return {
        data: this.data,
        tabs: this.tabs,
      }
    },
    events() {
      return {
        change: this.change,
      }
    },
  },
}
