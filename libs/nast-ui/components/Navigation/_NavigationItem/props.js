export default {
  props: {
    item: { type: Object, default: () => ({}), }, // { title: '', route: '', target: '', click: () => {}, }
    active: { type: [ Boolean, ], default: false, },
    
    click: { type: Function, default: () => {}, },
  },
  
  computed: {
    props() {
      return {
        item: this.item,
        active: this.active,
      }
    },
    events() {
      return {
        click: this.click,
      }
    },
  },
}
