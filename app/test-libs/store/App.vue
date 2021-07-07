<template>
  <div id="app">
    {{ $app.store.state('app.user').fullName }}
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    $app() {
      return $app
    },
  },
  mounted() {
    $app.store.mutation('app.user', {
      username: 'admin',
      fullName: 'Administrator',
    })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
