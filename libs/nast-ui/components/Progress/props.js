export default {
  props: {
    value: { type: Number, default: 0, },
    color: { type: String, default: 'primary', },
    hidden: { type: Boolean, default: false, },
    speed: { type: Number, default: 200, }, // milliseconds
  
    started: { type: Function, default: () => {}, },
    paused: { type: Function, default: (value) => {}, },
    ended: { type: Function, default: () => {}, },
    'update:value': { type: Function, default: (value) => {}, },
  },
  
  computed: {
    props() {
      return {
        value: this.value,
        color: this.color,
        hidden: this.hidden,
        speed: this.speed,
      }
    },
    events() {
      return {
        started: this.started,
        paused: this.paused,
        ended: this.ended,
        'update:value': this['update:value'],
      }
    },
    functions() {
      return {
        start: this.start,
        pause: this.pause,
        end: this.end,
        reset: this.reset,
      }
    },
  },
}
