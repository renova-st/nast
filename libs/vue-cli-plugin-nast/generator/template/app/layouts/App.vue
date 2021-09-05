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
@import url('https://fonts.googleapis.com/css?family=Raleway|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i');
</style>
