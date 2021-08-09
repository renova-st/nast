import datacomponent from './../DataComponent/props'

export default {
  props: {
    data: { type: Array, default: null, },
    load: { type: Function, default: null, }, // props - ({ page, size, }, parent)
    sortable: { type: Boolean, default: false, },
    
    name: { type: String, default: () => `list-${Math.random()}`, },
    itemValue: { type: String, default: 'value', },
    itemTitle: { type: [ Function, String, ], default: (item) => item.title, },
    itemChildren: { type: String, default: 'children', },
    size: { type: Number, default: 10, },
    firstPage: { type: Number, default: 0, },
    sortFunction: { type: Function, default: datacomponent.props.sortFunction.default, },
    getContent: { type: Function, default: datacomponent.props.getContent.default, },
    getTotalCount: { type: Function, default: datacomponent.props.getTotalCount.default, },
  },
  
  computed: {
    props() {
      return {
        data: this.data,
        itemValue: this.itemValue,
        itemTitle: this.itemTitle,
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
