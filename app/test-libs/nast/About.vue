<template>
  <div class="hello">
    <h1 v-for="item in breadcrumbs" :key="item.name">
      <router-link :to="item.route">{{ item.title }}</router-link>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      breadcrumbs: [],
    }
  },
  mounted() {
    $app.router.set({ title: 'О странице1', })
    $app.router.set('index', { route: { name: 'index', query: { test: '123', }, }, title: 'О главной1', })
    this.breadcrumbs = $app.router.breadcrumbs()
  },
}
</script>

<style scoped>
</style>
