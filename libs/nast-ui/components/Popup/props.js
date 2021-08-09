export default {
  props: {
    open: { type: Boolean, default: false, },
    side: { type: String, default: 'bottom', }, // top, bottom, left, right
    up: { type: Boolean, default: false, },
    align: { type: String, default: 'left', }, // left, right, center
    inline: { type: Boolean, default: false, },
    absolute: { type: Boolean, default: false, },
    fit: { type: Boolean, default: false, },
    target: { type: String, default: '', },
  
    'update:open': { type: Function, default: () => {}, },
    close: { type: Function, default: () => {}, },
    focus: { type: Function, default: () => {}, },
    blur: { type: Function, default: () => {}, },
  },
  
  computed: {
    props() {
      return {
        open: this.open,
        side: this.side,
        up: this.up,
        align: this.align,
        inline: this.inline,
        absolute: this.absolute,
        fit: this.fit,
      }
    },
    events() {
      return {
        'update:open': this['update:open'],
        close: this.close,
        focus: this.focus,
        blur: this.blur,
      }
    },
    functions() {
      return {
        update: this.update,
      }
    },
  },
}
