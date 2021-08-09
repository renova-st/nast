export default {
  props: {
    data: { type: Array, default: () => [], },
    // { name: '', sort: true || () => {}, search: true, right: true, width: '', maxWidth: '', minWidth: '', }
    columns: { type: Array, default: () => [], },

    filters: { type: Array, default: () => [], }, // { name: '', type: 'search|select|range|date|time|datetime', title: '', }
    sort: { type: Object, default: () => ({ id: 0, }), },
    page: { type: Number, default: 1, },
    size: { type: Number, default: 10, },
    hidden: { type: Array, default: () => [], }, // column names

    js: { type: Boolean, default: false, },
    keyName: { type: String, default: 'id', },
  },


  computed: {
    props() {
      return {
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
