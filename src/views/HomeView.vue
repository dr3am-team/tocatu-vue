<template>
  <div>
    <h1>Bienvenidos a Tocatu</h1>
    <div>
      <RouterLink :to="{ name: 'Home' }">Home</RouterLink> |
      <RouterLink v-if="!isLogin" :to="{ name: 'Login' }">Login</RouterLink> |
      <RouterLink v-if="!isLogin" :to="{ name: 'Register' }">Register</RouterLink>
      <RouterLink v-if="havePermissions('bar')" :to="{ name: 'EventRegister' }">Register an event</RouterLink>
      <button v-if="isLogin" @click="logout">Logout</button>
    </div>
  </div>
  <div v-if="havePermissions('band')">Esto es una banda Nickname: {{ user.username }}</div>
  <div v-if="havePermissions('bar')">Esto es un bar Nickname: {{ user.username }}</div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useLoginStore } from '../stores/login'

export default {
  components: { RouterLink },
  setup() {
    const store = useLoginStore()
    const { user, isLogin } = storeToRefs(store) // ESTO TRAE PROPIEDADES
    const { havePermissions, logoutStore } = store // ESTO TRAE FUNCIONES
    return { user, havePermissions, isLogin, logoutStore }
  },
  methods: {
    logout() {
      this.logoutStore()
      this.$router.push('/')
    }
  }
}
</script>

<style></style>
