
/**
 * Mab by dom elements
 *
 * @param {string} target  #toggler | .toggler
 * @param {function} callback
 * @return {null}
 */
const mapTargetElements = (target, callback) => {
  if (target) {
    const prefix = target.slice(0, 1)
    const body = target.slice(1)
    
    if (prefix === '#') callback(document.getElementById(body))
    if (prefix === '.') Array.prototype.map.call(document.getElementsByClassName(body), (i) => callback(i))
  }
  
  return null
}


export {
  mapTargetElements,
}
