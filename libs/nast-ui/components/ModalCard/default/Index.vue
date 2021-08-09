<template>
  <div v-if="s_value" class="n-modal-card">
    <div class="n-modal-content">
      <div v-if="loading" style="top: 0; left: 50%; width: 50%; height: 100%; position: fixed; z-index: 1100;">
        <n-loader :loading="loading" />
      </div>
      <header><slot name="header"></slot></header>
      <section v-if="$slots.body"><slot name="body"></slot></section>
      <nav><n-tabs :name="name" :data="tabs" :disabled="disabled" @update:active="changeTab" /></nav>
      <main>
        <n-tabs-content :name="name">
          <template v-for="t in tabs" #[t.name]><slot :name="'tab.'+t.name" /></template>
        </n-tabs-content>
      </main>
      <footer><slot name="footer" :tab="tab"></slot></footer>
    </div>
    <div class="n-dark" @click="change(false)"></div>
  </div>
</template>

<script>
import find from 'lodash/find'
import props from './../props'

export default {
  mixins: [ props, ],
  data() {
    return {
      s_value: this.value,
      tab: this.tabs[0],
    }
  },
  watch: {
    value(value) {
      this.s_value = value
    },
    s_value(value) {
      if (this.withUrl) {
        if (value && !this.isInUrl()) {
          this.$router.push({ query: { ...this.$route.query, [this.queryParam]: this.name, }, })
        } else if (!value && this.isInUrl()) {
          this.$router.back()
          // this.$router.push({ query: { ...this.$route.query, [this.queryParam]: undefined, }, })
        }
      }
    },
    $route() {
      this.$nextTick(() => {
        this.syncUrl()
      })
    },
  },
  created() {
    this.syncUrl()
  },
  methods: {
    changeTab(value) {
      // TODO eq
      this.tab = find(this.tabs, [ 'name', value, ])
    },
    isInUrl() {
      return this.$route.query[this.queryParam] === this.name
    },
    syncUrl() {
      if (this.withUrl) {
        this.change(this.isInUrl())
      }
    },
    change(value) {
      if (this.value === undefined) {
        this.s_value = value
      }
      this.$emit('update:value', value)
      this['update:value'](value)
    },
  },
}
</script>

<style lang="scss">
  body {
    /*overflow: hidden;*/
  }
</style>
<style lang="scss" scoped>
  .n-modal-card {
    position: fixed;
    z-index: 1001;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    .n-modal-content {
      margin-left: 50%;
      width: 50%;
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      background: var(--body-bg);
      border-top-left-radius: calc(var(--border-radius) * 3);
      border-bottom-left-radius: calc(var(--border-radius) * 3);
      box-shadow: -5px 0 5px 0 rgba(0, 0, 0, .2);

      &>header {
        background: var(--sidebar-bg);
        color: var(--sidebar-color);
        padding: 15px var(--content-padding);
        position: relative;
        z-index: 1;
      }
      &>section {
        background: var(--body-bg);
        padding: 35px var(--content-padding) 20px;
      }
      &>nav {
        background: var(--body-bg);
        position: relative;
        z-index: 1;
        box-shadow: 0 2px 3px -1px rgba(127, 127, 127, .5);
      }
      &>main {
        background: var(--content-bg);
        height: 100%;
        padding: var(--content-padding);
        overflow-y: auto;
      }
      &>footer {
        background: var(--body-bg);
        box-shadow: 0 -2px 3px -1px rgba(127, 127, 127, .5);
        padding: 15px var(--content-padding);
        position: relative;
        z-index: 1;
      }
    }


    .n-dark {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .5);
      z-index: -1;
      cursor: pointer;
    }
  }
</style>
