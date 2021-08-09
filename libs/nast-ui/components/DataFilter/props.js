export default {
  name: 'NDataFilter',
  props: {
    data: { type: Object, default: () => ({}), },
    filters: { type: Array, default: () => [], }, // [ { name: '', type: 'search|select|range|date|time|datetime', title: '', }, ]

    'update:data': { type: Function, default: (value) => {}, },
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
