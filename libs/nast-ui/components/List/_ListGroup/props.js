export default {
  props: {
    data: { type: Array, default: () => ([]), },
    itemValue: { type: String, default: 'value', },
    itemTitle: { type: [ Function, String, ], default: (item) => item.title, },
    itemChildren: { type: String, default: 'children', },
    sortable: { type: Boolean, default: false, },
    opened: { type: Boolean, default: false, },
    
    click: { type: Function, default: (item, isGroup, event) => {}, },
  },
  
  computed: {
    props() {
      return {
        item: this.item,
        itemValue: this.itemValue,
        itemTitle: this.itemTitle,
        itemChildren: this.itemChildren,
      }
    },
    events() {
      return {
        click: this.click,
      }
    },
  },
}
