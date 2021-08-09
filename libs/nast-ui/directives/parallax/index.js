// import listenersBus from './../mixins/listeners/bus'

const getStartScroll = (el) => {
  return el.offsetTop - window.innerHeight > 0 ? el.offsetTop - window.innerHeight : 0
}
const getEndScroll = (el) => {
  let endScroll
  const offsetBottom = el.offsetTop + el.offsetHeight
  const bottomHeight = document.body.offsetHeight - offsetBottom
  if (window.innerHeight - bottomHeight > 0) {
    endScroll = document.body.offsetHeight - window.innerHeight
  } else {
    endScroll = offsetBottom
  }
  
  return endScroll
}

export default {
  inserted(el, bindings) {
    const { value, modifiers, } = bindings
    const direction = modifiers.invert || modifiers.fixed ? 1 : -1
    
    let bg = new Image()
    bg.src = el.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0]
    
    let start
    let end
    let startScroll
    let endScroll
    
    const calculateVars = () => {
      const dif = (el.offsetHeight - bg.height) * direction
      start = dif > 0 ? dif * direction : 0
      end = dif < 0 ? dif * direction : 0
      startScroll = getStartScroll(el)
      endScroll = getEndScroll(el)
      
      if (modifiers.fixed) {
        const visibleHeight = $n.setInRange(window.innerHeight - el.offsetTop, 0, window.innerHeight)
        let stock = bg.height - window.innerHeight
        if (value === 'top') stock = +stock
        else if (value === 'bottom') stock = 0
        else if (value === 'center') stock *= .5
        else if (value) stock *= value
        else stock *= .5
        
        start = visibleHeight + stock - bg.height
      }
    }
    const parallax = (event) => {
      const scrollTop = event.target.documentElement.scrollTop
      if (scrollTop >= startScroll && scrollTop <= endScroll) {
        const k = modifiers.fixed ? -1 : Math.abs((end - start) / (endScroll - startScroll)) * direction
        const currentScroll = scrollTop - startScroll
        let current = start - currentScroll * k
        if (!modifiers.fixed) current = $n.setInRange(current, start, end)
        
        el.style.backgroundPositionY = `${current}px`
      }
    }
    
    bg.onload = () => {
      calculateVars()
      parallax({ target: document, })
    }
    
    document.addEventListener('scroll', parallax)
    window.addEventListener('resize', calculateVars)
    // listenersBus.$on('changeContent', () => setTimeout(calculateVars, 1))
    el.$destroy = () => {
      document.removeEventListener('scroll', parallax)
      window.removeEventListener('resize', calculateVars)
    }
  },
  unbind(el) {
    el.$destroy()
  },
}
