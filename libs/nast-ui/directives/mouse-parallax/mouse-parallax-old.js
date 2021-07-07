import listenersBus from './../mixins/listeners/bus'

const getStart = (offset, style, image) => {
  let start = 0.5
  style = style || 'center'
  
  if (style === 'center') start = .5
  else if (style === 'top') start = 0
  else if (style === 'bottom') start = 1
  else if (~style.indexOf('%')) start = style.slice(0, -1) / 100
  else if (~style.indexOf('px')) return +style.slice(0, -2)
  
  return Math.round((offset - image) * start)
}

export default {
  inserted(el, bindings) {
    let { value = { x: .02, y: .04, }, modifiers, } = bindings
    const direction = modifiers.invert ? -1 : 1
    
    if (!$n.isObject(value)) value = { x: value, y: value, }
    
    const kX = value.x
    const kY = value.y
    
    let bg = new Image()
    bg.src = el.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0]
    
    let startX
    let startY
    
    const calculateVars = () => {
      startX = getStart(el.offsetWidth, el.style.backgroundPositionX, bg.width)
      startY = getStart(el.offsetHeight, el.style.backgroundPositionY, bg.height)
    }
    
    const parallax = (event) => {
      
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const x = event.clientX
      const y = event.clientY
      const bgX = startX + (x - centerX) * kX * direction
      const bgY = startY + (y - centerY) * kY * direction
  
  
      if (kX) el.style.backgroundPositionX = `${bgX}px`
      if (kY) el.style.backgroundPositionY = `${bgY}px`
    }
  
    bg.onload = () => {
      calculateVars()
    }
    
    document.addEventListener('mousemove', parallax)
    // document.addEventListener('scroll', calculateVars)
    window.addEventListener('resize', calculateVars)
    listenersBus.$on('changeContent', calculateVars)
    el.$destroy = () => {
      document.removeEventListener('mousemove', parallax)
      // document.removeEventListener('scroll', calculateVars)
      window.removeEventListener('resize', calculateVars)
    }
  },
  unbind(el) {
    el.$destroy()
  },
}
