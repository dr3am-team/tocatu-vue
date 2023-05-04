<template>
  <div>
    <h1>Estamos en HOME /</h1>
    <h1>{{ this.$route.path }}</h1>

    <div>
      <span>Solo se tiene que ver en home</span>
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'Login' }">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
