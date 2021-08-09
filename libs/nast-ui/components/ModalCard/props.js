export default {
  name: 'NModalCard',
  props: {
    name: { type: String, default: Math.random() + '', },
    tabs: { type: Array, default: () => [], }, // [ { name: '', title: '', }, ]
    value: { type: [ String, Number, Boolean, Object, ], default: undefined, }, // open
    loading: { type: Boolean, default: false, },
    
    disabled: { type: Boolean, default: false, },
    withUrl: { type: Boolean, default: true, },
    queryParam: { type: String, default: 'modal', },
    
    'update:value': { type: Function, default: () => {}, },
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
