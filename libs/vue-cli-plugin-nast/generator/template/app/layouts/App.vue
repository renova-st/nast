<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  html() {
    return {
      title: 'App',
      meta: [
        { mid: 'theme-color', name: 'theme-color', content: '#3e4095', },
      ],
    }
  },
  beforeCreate() {
    $app.auth.init()
  },
}
</script>

<style lang="scss">

</style>
