import components from './components'
import directives from './directives'
import layouts from './layouts'

export default {
  install(Vue, options) {
    components.install(Vue, options)
    directives.install(Vue, options)
    layouts.install(Vue, options)
  },
}
