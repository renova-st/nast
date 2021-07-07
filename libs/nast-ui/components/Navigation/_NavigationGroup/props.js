export default {
  props: {
    item: { type: Object, default: () => ({}), }, // { title: '', route: '', target: '', click: () => {}, }
    active: { type: [ Object, ], default: () => ({}), },
    absolute: { type: Boolean, default: true, },
    
    click: { type: Function, default: () => {}, },
  },
  
  computed: {
    props() {
      return {
        item: this.item,
        active: this.active,
        absolute: this.absolute,
      }
    },
    events() {
      return {
        click: this.click,
      }
    },
  },
}
