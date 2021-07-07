export default {
  props: {
    data: { type: Array, default: () => [], }, // [ { title: '', route: '', target: '', click: () => {}, }, ]
    vertical: { type: Boolean, default: false, },
    indent: { type: [ Number, String, ], default: 150, }, // отступ от якоря при котором подсвечивется меню
    
    click: { type: Function, default: () => {}, },
  },
  
  computed: {
    props() {
      return {
        data: this.data,
        indent: this.indent,
        vertical: this.vertical,
      }
    },
    events() {
      return {
        click: this.click,
      }
    },
  },
}
