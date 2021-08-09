export default {
  props: {
    items: { type: Array, default: () => [], }, // [ { title: '', route: '', icon: '', }, ]
    
    click: { type: Function, default: () => {}, },
  },
  
  computed: {
    props() {
      return {
        items: this.items,
      }
    },
    events() {
      return {
        click: this.click,
      }
    },
  },
}
