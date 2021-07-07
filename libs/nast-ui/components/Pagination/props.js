export default {
  name: 'NLoader',

  props: {
    value: { type: Object, default: () => ({ page: 1, size: 10, infinity: false, infinityPage: 0, fixed: true, }), },
    count: { type: Number, default: 0, },
    countTemp: { type: Number, default: 0, },

    maxSize: { type: Number, default: 200, },
    startPageClass: { type: String, default: 'n-pagination-start-page', },

    'update:value': { type: Function, default: (value) => {}, },
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
