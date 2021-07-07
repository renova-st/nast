export default {
  props: {
    data: { type: Array, default: null, },
    load: { type: Function, default: null, }, // props - (params = { page, size, search, parentId})
    // Example: [ { value: (item) => {}, sort: (item) => {}, filter: (item, value) => {}, }, sortFunction, ]
    // value: {func|string} - display name, sort: {func|bool} - sort by this value, filter: {func} - filter by this value
    // need for search, filter and sort if data item is object
    fields: { type: Array, default: () => [ 'title', 'value', ], },

    search: { type: String, default: '', },
    // { n1: [ 'in', 'q', 'w', ], n2: 'q', n3: [ 'between', 1, 20, ], n4: [ 'search', 'q', ], n5: [ 'not', 'q', ]}
    filter: { type: Object, default: () => ({}), },
    sort: { type: Object, default: () => ({}), }, // { n1: 0, n2: 1 }, 0 - desc
    size: { type: Number, default: 10, }, // page size

    firstPage: { type: Number, default: 0, },
    sortFunction: { type: Function, default: (a, b) => {
      if (a === undefined && b !== undefined) return -1
      if (b === undefined) return 1
      if (a === b || a.toString() === b.toString()) return 0
      return (a > b) ? 1 : -1
    }, },
    getContent: { type: Function, default: (response) => response.data, },
    getTotalCount: { type: Function, default: (response) => {
      if (response.pagination) {
        return response.pagination.total || null
      }
      if (response.headers) {
        return response.headers['x-total-count'] || null
      }
      return null
    }, },

    updated: { type: Function, default: () => {}, },
    loaded: { type: Function, default: () => {}, },
    beforeLoad: { type: Function, default: (params) => {}, },
  },

  computed: {
    props() {
      return {
        data: this.data,
        load: this.load,
        fields: this.fields,
        search: this.search,
        filter: this.filter,
        size: this.size,
        firstPage: this.firstPage,
        sortFunction: this.sortFunction,
        getContent: this.getContent,
        getTotalCount: this.getTotalCount,
      }
    },
    events() {
      return {
        updated: this.updated,
        loaded: this.loaded,
        beforeLoad: this.beforeLoad,
      }
    },
    functions() {
      return {
        update: this.update,
        next: this.next,
        stop: this.stop,
      }
    },
  },
}
