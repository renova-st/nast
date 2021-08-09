
export default {
  props: {
    data: { type: Array, default: () => [], },
    columns: { type: Array, default: () => [], }, // { name: '', title: '', width: 'px|%|em|..', align: 'left|right|center', class: [ '', {}, ], }
    js: { type: Boolean, default: false, },
    headless: { type: Boolean, default: false, },
    keyName: { type: String, default: 'id', },
    loading: { type: Boolean, default: false, }, // TODO

    headerClick: { type: Function, default: (event, column) => {}, },
    cellClick: { type: Function, default: (event, item, column) => {}, },
  },

  computed: {
    props() {
      return {
        data: this.data,
        columns: this.columns,
        js: this.js,
        headless: this.headless,
        keyName: this.keyName,
      }
    },
    events() {
      return {
        headerClick: this.headerClick,
        cellClick: this.cellClick,
      }
    },
  },
}
