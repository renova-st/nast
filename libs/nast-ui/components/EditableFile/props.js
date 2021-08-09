export default {
  name: 'NEditableFile',
  props: {
    src: { type: String, default: undefined, },
    file: { type: File, default: undefined, },

    inline: { type: Boolean, default: false, },
    round: { type: Boolean, default: false, },
    bg: { type: Boolean, default: false, },
    size: { type: String, default: 'preview', }, // line, preview, full

    remove: { type: Function, default: () => {}, },
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
