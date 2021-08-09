<template>
  <div>
    <h1>Hello!</h1>
    <c-hello text="World!" />
  </div>
</template>

<script>
import CHello from 'components/hello/Index'

export default {
  name: 'PageIndex',
  components: { CHello, },
}
</script>

<style lang="scss" scoped>

</style>
