export default {
  props: {
    // 'index' | { name: 'index', } | '#anchor' | http://google.com | send@mail.com | +7(777)123-45-67
    to: { type: [ Object, String, ], default: '', },
    type: { type: String, default: 'internal', }, // internal, external, mail, phone, ...
    wide: { type: Boolean, default: false, },
    activeClass: { type: String, default: 'link-active', },
    exactActiveClass: { type: String, default: 'link-exact-active', },
    target: { type: String, default: '_blank', },
    label: { type: String, default: '', },
    offsetClass: { type: String, default: 'n-scroll-offset', },
    
    click: { type: Function, default: () => {}, },
  },
  
  computed: {
    props() {
      return {
        route: this.route,
        href: this.href,
        type: this.type,
        activeClass: this.activeClass,
        exactActiveClass: this.exactActiveClass,
        target: this.target,
        label: this.label,
        offsetClass: this.offsetClass,
      }
    },
    events() {
      return {
        click: this.click,
      }
    },
  },
}
