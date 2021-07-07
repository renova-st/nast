import Simple from './Simple/Index.vue'
import Cool from './Cool/Index.vue'


export default {
  install(Vue, options) {
    Vue.component('nLayoutSimple', Simple)
    Vue.component('nLayoutCool', Cool)
  },
}
