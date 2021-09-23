import NastLib from 'nast/Lib'
// import parallax from './directives/parallax'
// import mouseParallax from './directives/mouse-parallax'
// import onVisible from './directives/on-visible'
// import clickOutside from './directives/click-outside'
import ui from '_ui'

/**
 *
 */
export default class NastUi extends NastLib {
  /**
   * @type {Object}
   * @protected
   */
  static _defaultConfig = {
  
  }
  
  /**
   * Returns plugin object for Vue.use
   *
   * @return {Object}
   */
  static vue() {
    return ui
  }
}
