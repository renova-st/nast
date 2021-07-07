
export default {
  inserted(el, bindings) {
    const show = $n.isFunction(bindings.value) ? bindings.value : bindings.value.show
    const hide = bindings.value.hide || function() {}
    let range = bindings.value.range || 0
    if (~String(range).indexOf('%')) {
      range = el.offsetHeight * +range.slice(0, -1) / 100
    }
  
    let visible
    
    const scroll = (event) => {
      const scrollTop = event.target.documentElement.scrollTop + window.innerHeight - range
      const scrollBottom = event.target.documentElement.scrollTop - range
      const offsetTop = el.offsetTop
      const offsetBottom = offsetTop + el.offsetHeight
      
      if (scrollTop >= offsetTop && scrollBottom <= offsetBottom) {
        if (visible !== true) show(el)
        visible = true
      } else {
        if (visible !== false) hide(el)
        visible = false
      }
    }
    scroll({ target: document, })
    
    document.addEventListener('scroll', scroll)
    el.$destroy = () => {
      document.removeEventListener('scroll', scroll)
    }
  },
  unbind(el) {
    el.$destroy()
  },
}
