export default {
  props: {
    data: { type: Array, default: [], },
    name: { type: String, default: () => `list-${Math.random()}`, },
    itemValue: { type: String, default: 'value', },
    itemTitle: { type: [ Function, String, ], default: (item) => item.title, },
    itemChildren: { type: String, default: 'children', },
    sortable: { type: Boolean, default: false, },
    opened: { type: Boolean, default: false, },
  },
  
  computed: {
    props() {
      return {
        data: this.data,
        name: this.name,
        itemValue: this.itemValue,
        itemTitle: this.itemTitle,
        itemChildren: this.itemChildren,
        sortable: this.sortable,
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
