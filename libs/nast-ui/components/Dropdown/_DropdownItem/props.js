export default {
  props: {
    value: { type: [ String, Object, Boolean, Number, ], default: () => ({}), },
    active: { type: [ Boolean, ], default: false, },
    indexes: { type: Array, default: () => [], }, // массив индексов в массиве включая родителей
    itemTitle: { type: [ Function, String, ], default: (item) => item.title, },
    
    click: { type: Function, default: (item, event) => {}, },
  },
  
  computed: {
    props() {
      return {
        item: this.item,
        active: this.active,
        indexes: this.indexes,
        itemValue: this.itemValue,
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
