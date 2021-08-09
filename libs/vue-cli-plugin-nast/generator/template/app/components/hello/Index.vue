<template>
  <div class="c-hello">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'CHello',
  props: {
    text: {
      type: [ String, ],
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
.c-hello {
  padding: 50px;
  margin: 40px 0;
  border: 1px solid #aaa;
}
</style>
