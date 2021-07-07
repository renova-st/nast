export default {
  props: {
    item: { type: [ String, Object, Boolean, Number, ], default: () => ({}), },
    itemValue: { type: String, default: 'value', },
    itemTitle: { type: [ Function, String, ], default: (item) => item.title, },
    itemChildren: { type: String, default: 'children', },
    open: { type: Boolean, default: null, },
    opened: { type: Boolean, default: false, },
    sortable: { type: Boolean, default: false, },
    
    click: { type: Function, default: (item, isGroup, event) => {}, },
    'update:open': { type: Function, default: (value) => {}, },
  },
  
  computed: {
    props() {
      return {
        item: this.item,
        itemTitle: this.itemTitle,
      }
    },
    events() {
      return {
        click: this.click,
      }
    },
  },
}
