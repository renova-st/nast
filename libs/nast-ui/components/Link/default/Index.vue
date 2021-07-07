<template>
  <span
    v-if="isSpan"
    :class="classes"
    @click="s_click"
  ><slot /></span>
  
  <a
    v-else-if="isScrollTo"
    :aria-label="s_label"
    :href="href"
    :class="classes"
    @click="scrollTo"
  ><slot /></a>
  
  <router-link
    v-else-if="type === 'internal'"
    :to="s_route"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    :aria-label="s_label"
    :class="classes"
    @click.native="s_click"
  >
    <slot />
  </router-link>
  
  <a
    v-else
    :href="getHrefByType()"
    :target="target"
    :aria-label="s_label"
    :class="classes"
    @click="s_click"
  ><slot /></a>
</template>

<script>
import size from 'lodash/size'
import isString from 'lodash/isString'
import props from './../props'

export default {
  name: 'NLink',
  mixins: [ props, ],
  computed: {
    classes() {
      return [ 'n-link', { 'n-wide': this.wide, }, ]
    },
    s_route() {
      if (this.type === 'internal' && !this.isSpan) {
        return isString(this.to) ? { name: this.to, } : this.to
      }
      return undefined
    },
    s_label() {
      const routeName = this.s_route ? this.s_route.name : false
      return this.label || routeName || this.type
    },
    isSpan() {
      return !this.to || size(this.to) === 0
    },
    isScrollTo() {
      return this.type === 'internal' && this.isCurrentRoute
    },
    href() {
      if (this.isScrollTo) {
        if (isString(this.to) && this.to.charAt(0) === '#') {
          return this.to
        } else {
          return this.$router.resolve(this.s_route).href
        }
      }
      
      return ''
    },
    hash() {
      return this.href.split('#')[1] || ''
    },
    isCurrentRoute() {
      if (isString(this.to) && this.to.charAt(0) === '#') {
        return true
      }
      const name = this.s_route ? this.s_route.name : undefined
      return this.$route.name === name
    },
  },
  watch: {
    $route() {
      this.goIfCurrentRoute()
    },
  },
  mounted() {
    this.goIfCurrentRoute()
  },
  methods: {
    scrollTo(e) {
      e.preventDefault()
      
      this.s_click(e)
  
      window.history.pushState(null, null, this.hash ? `#${this.hash}` : ' ')
      
      this.go()
    },
    goIfCurrentRoute() {
      if (this.$router.history.current.hash === `#${this.hash}`) {
        if (!window.nLinkScrollActive) {
          window.nLinkScrollActive = true
          setTimeout(() => {
            this.go()
            delete(window.nLinkScrollActive)
          }, 500)
        }
      }
    },
    go() {
      let offset = 15
      Array.prototype.forEach.call(document.getElementsByClassName(this.offsetClass), (item) => {
        offset += item.offsetHeight
      })
  
      const target = document.getElementById(this.hash)
      window.scrollTo({
        top: target ? target.offsetTop - offset: 0,
        behavior: 'smooth',
      })
    },
    getHrefByType() {
      const types = {
        external(value) {
          return value
        },
        phone(value) {
          return `tel:${value.replace(/[\s)(-]/g, '')}`
        },
        email(value) {
          return `mailto:${value}`
        },
        other(value) {
          return `${this.type}:${value}`
        },
      }
      
      const value = this.to || this.$slots.default[0].text
      const func = types[this.type] || types['other']
      return func(value)
    },
    s_click(e) {
      this.click(e)
      this.$emit('click', e)
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-link {
    &.n-wide {
      display: block;
      width: 100%;
    }
  }
</style>
