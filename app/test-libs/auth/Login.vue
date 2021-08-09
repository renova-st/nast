<template>
  <div class="hello">
    <h1>Login</h1>
    <button @click="login">Login</button>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
    }
  },
  created() {
    $app.auth.needAuth(false)
  },
  methods: {
    login() {
      const user = {
        fullName: 'Administrator',
        username: 'admin',
      }
      const token = 'sadasd'
      $app.auth.login(user, token)
      $app.auth.needAuth(false)
    },
  },
}
</script>

<style scoped>
</style>
