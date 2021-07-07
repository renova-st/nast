
const getUnits = (str) => {
  let result = '0px'
  if (str) {
    const matches = String(str).match(/-?[\d]+[a-zA-Z]+|[0]/gm)
    result = Array.isArray(matches) ? matches[0] : '0px'
  }
  return result
}
const getPos = (str) => {
  let result = ''
  if (str) {
    const matches = String(str).match(/(top|bottom|left|right)/gm)
    result = Array.isArray(matches) ? matches[0] : ''
  }
  return result
}

const bgPositionToString = (start, shift, pos, { size, inside, invert, }) => {
  const center = pos ? '' : '50% + '
  const dir = (pos === 'right' || pos === 'bottom') ? 1 : -1
  const shiftToInside = pos && !inside ? -dir * invert * size : 0
  
  return `calc(${start} + ${center}${shiftToInside + (dir * shift)}px)`
}

export default {
  inserted(el, bindings, vnode) {
    const xProp = bindings.value ? bindings.value.x : undefined
    const yProp = bindings.value ? bindings.value.y : undefined
    const sizeProp = bindings.value ? bindings.value.size : undefined
    
    const options = {
      xPos: getPos(xProp),
      yPos: getPos(yProp),
      xStart: getUnits(xProp),
      yStart: getUnits(yProp),
      size: sizeProp || 10,
      invert: bindings.modifiers.invert ? -1 : 1,
      bg: bindings.modifiers.bg || false,
      inside: bindings.modifiers.inside || false,
    }
    
    const move = (event) => {
      const o = options
      const xMouse = event.clientX
      const yMouse = event.clientY
      const xCenter = window.innerWidth / 2
      const yCenter = window.innerHeight / 2
  
      const xShift = (xCenter - xMouse) * (o.size / xCenter) * o.invert
      const yShift = (yCenter - yMouse) * (o.size / yCenter) * o.invert
      
      // console.log(xShift)
      
      if (o.bg) {
        const p = [
          o.xPos || 'left',
          bgPositionToString(o.xStart, xShift, o.xPos, o),
          o.yPos || 'top',
          bgPositionToString(o.yStart, yShift, o.yPos, o),
        ].join(' ')
        
        // console.log(p)
        
        el.style.backgroundPosition = p
      }
    }
    
    // console.log(options)
  
    document.addEventListener('mousemove', move)
    el.$destroy = () => {
      document.removeEventListener('mousemove', move)
    }
  },
  unbind(el) {
    // console.log('destroy', el.$destroy)
    el.$destroy()
  },
}
