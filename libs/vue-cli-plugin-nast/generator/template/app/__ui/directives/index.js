import onVisible from 'nast-ui/directives/on-visible'
import clickOutside from 'nast-ui/directives/click-outside'

export default {
  install(Vue) {
    Vue.directive('click-outside', clickOutside)
    Vue.directive('on-visible', onVisible)
  },
}
