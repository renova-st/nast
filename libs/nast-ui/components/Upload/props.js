export default {
  props: {
    title: { type: String, default: '', },
    value: { type: [ Array, FileList, File, Object, ], default: null, },
    multi: { type: Boolean, default: false, },

    input: { type: Function, default: (files) => {}, },
    'update:value': { type: Function, default: (files) => {}, },
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
