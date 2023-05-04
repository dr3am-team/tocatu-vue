<template>
  <div v-if="this.$route.path !== '/'">
    <Input />
    <a href="/">Volver a home</a>
    <h1>Estamos en LOGIN</h1>
    <h1>{{ this.$route.path }}</h1>
  </div>
</template>

<script>
import Input from '../components/InputComponent.vue'
export default {
  components: { Input }
}
</script>

<style></style>
