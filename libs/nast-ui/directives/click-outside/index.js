
export default {
  bind(el, bindings) {
    const clickOutside = (event) => {
      if (!el.contains(event.target)) {
        bindings.value(event)
      }
    }
    
    document.addEventListener('mousedown', clickOutside)
    el.$destroy = () => document.removeEventListener('mousedown', clickOutside)
  },
  unbind(el) {
    el.$destroy()
  },
}
