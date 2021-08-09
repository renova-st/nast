<template>
  <div id="app">
    <form @submit.prevent="submit">
      {{ $form.errors() }}
      <div><input title="Name" :v-bind="$form.input('name')" @input="($event) => change($event, 'name')" /></div>
      <div><input title="Email" :v-bind="$form.input('email')" @input="($event) => change($event, 'email')" /></div>
      <div><button type="submit">Submit</button></div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$form.init({
      name: '',
      email: '',
    })
    this.$form.rules({
      name: [ 'required', ],
      email: [ 'email', ],
    })
  },
  methods: {
    change(event, name) {
      this.$form.set(name, event.target.value)
    },
    submit() {
      if (this.$form.check()) {
        console.log(this.$form.get())
      }
    },
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
