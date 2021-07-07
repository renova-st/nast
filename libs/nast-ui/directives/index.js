import parallax from './parallax'
import mouseParallax from './mouse-parallax'
import onVisible from './on-visible'
import clickOutside from './click-outside'


export default {
  install(Vue, options) {
    Vue.directive('click-outside', clickOutside)
    Vue.directive('mouse-parallax', mouseParallax)
    Vue.directive('on-visible', onVisible)
    Vue.directive('parallax', parallax)
  },
}
