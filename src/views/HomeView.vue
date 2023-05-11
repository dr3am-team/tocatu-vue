<template>
  <div>
    <h1>Bienvenidos a Tocatu</h1>
    <div>
      <RouterLink :to="{ name: 'Home' }">Home</RouterLink> |
      <RouterLink :to="{ name: 'Login' }">Login</RouterLink> |
      <RouterLink :to="{ name: 'Register' }">Register</RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default { components: { RouterLink } }
</script>

<style></style>
