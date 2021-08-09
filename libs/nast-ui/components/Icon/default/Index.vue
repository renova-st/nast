<template>
  <i :class="['n-icon', type, 'fa-'+icon, {'fa-pulse': pulse}]" v-on="$listeners"></i>
</template>

<script>
import props from './../props'

export default {
  name: 'NIcon',
  mixins: [ props, ],
}
</script>

<style lang="scss">
  @import url('https://use.fontawesome.com/releases/v5.7.2/css/all.css');
  /*@import "~@fortawesome/fontawesome-free/scss/fontawesome";*/
</style>
