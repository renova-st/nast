export default {
  props: {
    value: { type: [ String, Object, Boolean, Number, ], default: () => ({}), },
    indexes: { type: Array, default: () => [], }, // массив индексов в массиве включая родителей
    itemValue: { type: String, default: 'value', },
    itemTitle: { type: [ Function, String, ], default: (item) => item.title, },
    itemChildren: { type: String, default: 'children', },
    
    click: { type: Function, default: (item, isGroup, event) => {}, },
  },
  
  computed: {
    props() {
      return {
        item: this.item,
        indexes: this.indexes,
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
