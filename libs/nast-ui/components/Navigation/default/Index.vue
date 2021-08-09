<template>
  <div :class="[ 'n-navigation', { 'n-vertical': vertical, }, ]">
    <template v-for="(item, i) in data">
      <template v-if="item.children">
        <n-navigation-group :key="item.title" :item="item" :active="getActive(i)" :absolute="!vertical" :click="(e) => s_click(e, item)">
          <template v-slot="{ item, }">
            <slot :item="item" name="item" />
          </template>
        </n-navigation-group>
      </template>
      <template v-else>
        <n-navigation-item :key="item.title" :item="item" :active="active.index === i" :click="(e) => s_click(e, item)">
          <template v-slot="{ item, }">
            <slot :item="item" name="item" />
          </template>
        </n-navigation-item>
      </template>
    </template>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import props from './../props'

export default {
  name: 'NNavigation',
  mixins: [ props, ],
  data: () => ({
    active: {}, // { index: 1,  children: { index: 1, }, }
  }),
  watch: {
    $route() {
      this.updateActive()
    },
  },
  created() {
    document.addEventListener('scroll', this.updateActive)
    this.updateActive()
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.updateActive)
  },
  methods: {
    isCurrent(route) {
      if (route === undefined) { // Если навигация используется только на одной странице
        return true
      }
      const name = (typeof route === 'string') ? route : route.name
      return this.$route.name === name
    },
    getActive(i) {
      return this.active.index === i ? this.active.children : {}
    },
    updateActive: throttle(function() {
      let active = {}
      this.data.map((item, i) => {
        active = this.checkActive(item, i) || active
      })
      this.active = active
    }, 50),
    checkActive(item, key) {
      let active = null
      if (item.children && item.children.length) {
        let childActive = null
        item.children.map((child, i) => {
          childActive = this.checkActive(child, i) || childActive
        })
        if (childActive) {
          active = { index: key, children: childActive, }
        }
      } else {
        if (this.isCurrent(item.route)) {
          if (item.target === undefined) {
            active = { index: key, }
          } else if (item.target) { // Если роут с хешем, то нужна дополнительная проверка на скролл до якоря
            const target = document.getElementById(item.target)
            const scroll = document.documentElement.scrollTop
            if (target && scroll >= target.offsetTop - Number(this.indent)) {
              active = { index: key, }
            }
          }
        }
      }
      
      return active
    },
    s_click(e, item) {
      this.click(e)
      this.$emit('click', e)
      if (item.click) {
        item.click(e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-navigation {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin: -.25em -1em;
    
    &.n-vertical {
      flex-direction: column;
    }
    
    &::v-deep .n-navigation-item {
      margin: .25em 1em;
      .n-active {
        border-bottom: 1px solid var(--primary);
      }
    }
  }
</style>
