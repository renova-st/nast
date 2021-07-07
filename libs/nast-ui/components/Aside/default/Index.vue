<template>
  <aside class="n-aside">
    <transition name="slideWidth">
      <div v-if="offset && s_open" class="n-offset"></div>
    </transition>
    
    <transition :name="fixed ? 'slideLeft' : 'slideWidth'">
      <div v-show="s_open" v-click-outside="clickOutside" :class="[ 'n-content', { 'n-fixed': fixed, }, ]">
        <slot />
      </div>
    </transition>
  </aside>
</template>

<script>
import throttle from 'lodash/throttle'
import clickOutside from './../../../directives/click-outside'
import props from './../props'

export default {
  name: 'NAside',
  directives: { clickOutside, },
  mixins: [ props, ],
  data() {
    return {
      s_open: this.open,
      oldWindowWidth: 0,
    }
  },
  computed: {
    controls() {
      return document.getElementsByClassName(this.control)
    },
  },
  watch: {
    open(value) {
      this.s_open = value
    },
  },
  mounted() {
    if (this.controls) {
      Array.prototype.forEach.call(this.controls, (t) => {
        t.addEventListener('click', this.controlClick)
      })
    }
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeDestroy() {
    if (this.controls) {
      Array.prototype.forEach.call(this.controls, (t) => {
        t.removeEventListener('click', this.controlClick)
      })
    }
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    controlClick: throttle(function() {
      this.$nextTick(() => {
        this.toggle()
      })
    }, 500),
    clickOutside(e) {
      if (this.outerClose && !this.offset) {
        const inParentWithClass = (item, c) => {
          return item ? item.classList.contains(c) || inParentWithClass(item.parentElement, c) : false
        }
  
        if (this.s_open && !inParentWithClass(e.target, this.control)) {
          this.toggle(false)
        }
      }
    },
    toggle(value) {
      value = value !== undefined ? value : !this.s_open
      if (this.$vnode.data.model) {
        this.$emit('toggle', value)
      } else {
        this.s_open = value
      }
    },
    onResize: throttle(function() {
      if (this.mobileClose) {
        if (window.innerWidth < 650 && this.oldWindowWidth >= 650 && this.s_open) {
          this.toggle(false)
        } else if (window.innerWidth >= 650 && this.oldWindowWidth < 650 && !this.s_open) {
          this.toggle(true)
        }
        this.oldWindowWidth = window.innerWidth
      }
    }, 500),
  },
}
</script>

<style lang="scss">
  html {
    --n-aside-bg: #fff;
    --n-aside-shadow: 2px 2px 7px rgba(0, 0, 0, .3);
    --n-aside-width: 300px;
    --n-aside-top: 0;
    --n-aside-bottom: 0;
  }
</style>
<style lang="scss" scoped>
  .n-aside {
    
    .n-offset {
      width: var(--n-aside-width);
      transition: width var(--transition);
    }
    
    .n-content {
      transition: width var(--transition);
      width: var(--n-aside-width);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      background: var(--n-aside-bg);
      box-shadow: var(--n-aside-shadow);
  
      &.n-fixed {
        position: fixed;
        left: 0;
        top: var(--n-aside-top);
        bottom:  var(--n-aside-bottom);
      }
    }
  }

  .slideWidth-enter-active, .slideWidth-leave-active {
    transition: width var(--transition);
    overflow: hidden;
  }
  .slideWidth-enter, .slideWidth-leave-to {
    overflow: hidden;
    width: 0 !important;
    pointer-events: none;
  }
  .slideLeft-enter-active, .slideLeft-leave-active {
    transition: left var(--transition);
  }
  .slideLeft-enter, .slideLeft-leave-to {
    left: calc(-1 * var(--n-aside-width)) !important;
    overflow: hidden;
    pointer-events: none;
  }
</style>
