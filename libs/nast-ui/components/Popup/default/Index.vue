<template>
  <div :class="['n-popup', {'n-inline': inline}]">
    <slot name="action" />
    <div ref="container" class="n-popup-container" tabindex="-1" @focus="s_focus" @blur="s_blur">
      <div ref="wrapper" :class="['n-popup-wrapper', {'n-fixed': fixed}, ]">
        <div class="n-dark" @click="s_close"></div>
        <div v-if="s_open" ref="popup" class="n-popup-content" :style="style">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import props from './../props'
import { getPosition, isFit, getPopupRect, } from './../utils'
import debounce from 'lodash/debounce'

export default {
  name: 'NPopup',
  mixins: [ props, ],
  data() {
    return {
      s_open: Boolean(this.open),
      visible: true, // всегда равен s_open, с задержкой в 1 мс (за это время идет расчет позиции)
      dir: null, // { up, side, align, }
      fixed: false,
    }
  },
  computed: {
    element() {
      return this.target ? this.$slots.action[0].elm.querySelector(this.target) : this.$slots.action[0].elm
    },
    style() {
      const style = { }
      if (this.fixed) {
        style.maxHeight = `${window.innerHeight - 100}px`
      } else if (this.dir && this.$refs.popup) {
        const popupRect = this.getPopupRect(this.dir.up, this.dir.side, this.dir.align)
        const pos = getPosition(popupRect, this.element.getBoundingClientRect(), this.absolute)
        style.top = `${pos.top}px`
        style.left = `${pos.left}px`
        if (this.fit) {
          style.minWidth = `${this.element.clientWidth}px`
        }
      }
  
      return {
        ...style,
        opacity: this.visible ? 1 : 0,
      }
    },
  },
  watch: {
    open(value) {
      this.onChange(value)
    },
    absolute(value) {
      if (!value) {
        this.togglePopupPlace(false)
      }
    },
  },
  mounted() {
    this.onChange(this.s_open)
  },
  beforeDestroy() {
    if (this.absolute) {
      this.togglePopupPlace(false)
    }
    if (this.s_open) {
      document.removeEventListener('scroll', this.debouncedCalcStyle)
      window.removeEventListener('resize', this.debouncedCalcStyle)
    }
  },
  methods: {
    update() {
      this.debouncedCalcStyle()
    },
    s_close() {
      this.$emit('close')
      this.close()
      this.$emit('update:open', false)
      this['update:open'](false)
    },
    s_focus(e) {
      this.$emit('focus')
      this.focus()
    },
    s_blur(e) {
      this.$emit('blur')
      this.blur()
    },
    onChange(value) {
      this.s_open = value
      if (!value) {
        this.toggleFixed(false)
      }
      
      if (value) {
        this.$nextTick(() => {
          if (this.absolute) {
            this.togglePopupPlace(true)
            this.$nextTick(() => {
              this.calcStyle()
            })
          } else {
            this.calcStyle()
          }
          setTimeout(() => {
            this.visible = true
          }, 1)
        })
        document.addEventListener('scroll', this.debouncedCalcStyle)
        window.addEventListener('resize', this.debouncedCalcStyle)
      } else {
        this.togglePopupPlace(false)
        this.visible = false
        document.removeEventListener('scroll', this.debouncedCalcStyle)
        window.removeEventListener('resize', this.debouncedCalcStyle)
      }
    },
    togglePopupPlace(value) {
      if (this.$refs.popup) {
        if (value) {
          document.body.append(this.$refs.wrapper)
        } else {
          this.$refs.container.append(this.$refs.wrapper)
        }
      }
    },
    toggleFixed(value) {
      this.fixed = value
    },
    calcStyle() {
      if (this.s_open) {
        let dir
        const defaultFit = isFit(this.getPopupRect(this.up, this.side, this.align))
        
        if (defaultFit.total) {
          dir = {
            up: this.up,
            side: this.side,
            align: this.align,
          }
          this.toggleFixed(false)
        } else {
          dir = this.findPosition(this.up, this.side, this.align, defaultFit)
          if (dir === false) {
            return
          }
        }
        
        this.dir = dir
      }
    },
    findPosition(up, side, align, fit) {
      let newDir = { up, side, align, }
      
      if (!fit.top && !fit.bottom) {
        // ничего не делаем
      } else if (!fit.top) {
        // если итак смотрит вниз
        if (!up && side === 'bottom') {
          // то ничего не делаем
        } else {
          // то меняем направление вниз
          newDir.up = false
          if (side === 'top') newDir.side = 'bottom'
          
          // если вниз тоже не поместился, то ставим fixed
          if (!isFit(this.getPopupRect(newDir.up, newDir.side, align))['top']) {
            newDir.up = up
            newDir.side = side
          }
        }
      } else if (!fit.bottom) {
        if (up && side === 'top') {
          // то ничего не делаем
        } else {
          newDir.up = true
          if (side === 'bottom') newDir.side = 'top'
          
          if (!isFit(this.getPopupRect(newDir.up, newDir.side, align))['bottom']) {
            newDir.up = up
            newDir.side = side
          }
        }
      }
      
      if (!fit.left || !fit.right) {
        const self = fit.left ? 'right' : 'left'
        const other = fit.left ? 'left' : 'right'
        
        if (side === 'top' || side === 'bottom') {
          if (align === 'center') {
            newDir.align = self
            if (!isFit(this.getPopupRect(newDir.up, newDir.side, newDir.align))[other]) {
              this.toggleFixed(true)
              return false
            }
          }
          if (align === self) {
            newDir.align = other
            if (!isFit(this.getPopupRect(newDir.up, newDir.side, newDir.align))[self]) {
              this.toggleFixed(true)
              return false
            }
          }
          if (align === other) {
            newDir.align = self
            if (!isFit(this.getPopupRect(newDir.up, newDir.side, newDir.align))[other]) {
              this.toggleFixed(true)
              return false
            }
          }
        } else {
          newDir.side = 'bottom'
          newDir.up = false
          newDir = this.findPosition(newDir.up, newDir.side, newDir.align, isFit(this.getPopupRect(newDir.up, newDir.side, newDir.align)))
        }
      }
      
      return { ...newDir, }
    },
    debouncedCalcStyle: debounce(function() {
      this.calcStyle()
    }, 100),
    getPopupRect(up, side, align) {
      const popup = this.$refs.popup
      return getPopupRect(up, side, align, this.element.getBoundingClientRect(), popup.offsetWidth, popup.offsetHeight)
    },
  },
}
</script>

<style lang="scss">
  html {
    --n-popup-width: 300px;
  }
</style>
<style lang="scss" scoped>
  .n-popup {
    line-height: 1;
    
    &.n-inline {
      display: inline-block;
    }
    
    .n-popup-container {
      position: absolute;
      outline: none;
      &.n-absoluted {
        display: none;
      }
    }
  }
  
  .n-popup-wrapper {
    .n-popup-content {
      position: absolute;
      width: var(--n-popup-width);
      z-index: 110;
      background: var(--content-bg);
      box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
      border-radius: var(--border-radius);
      opacity: 0;
    }
    &.n-fixed {
      .n-popup-content {
        position: fixed;
        bottom: 10px;
        left: 10px;
        right: 10px;
        width: auto;
      }
      .n-dark {
        position: fixed;
        cursor: pointer;
        z-index: 109;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.1);
      }
    }
  }
</style>
