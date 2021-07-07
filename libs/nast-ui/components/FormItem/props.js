export default {
  props: {
    name: { type: String, default: () => `input-${Math.random()}`, },
    title: { type: String, default: '', },
    inline: { type: Boolean, default: false, },
    message: { type: String, default: '', },
    color: { type: String, default: 'default', },
    active: { type: Boolean, default: true, },
    focused: { type: Boolean, default: false, },
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
