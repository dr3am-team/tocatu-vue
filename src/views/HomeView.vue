<template>
  <div>
    <h1>Bienvenidos a Tocatu</h1>
    <div>
      <RouterLink :to="{ name: 'Home' }">Home</RouterLink> |
      <RouterLink v-if="!isLogin" :to="{ name: 'Login' }">Login</RouterLink> |
      <RouterLink v-if="!isLogin" :to="{ name: 'Register' }">Register</RouterLink>
      <button v-if="isLogin" @click="logout">Logout</button>
    </div>
  </div>
  <div v-if="havePermissions('band')">Esto es una banda Nickname: {{ userInfo.username }}</div>
  <div v-if="havePermissions('bar')">Esto es un bar Nickname: {{ userInfo.username }}</div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useLoginStore } from '../stores/login'
import Card from '../components/CardComponent.vue'

export default {
  components: { RouterLink },
  setup() {
    const store = useLoginStore()
    const { userInfo, isLogin } = storeToRefs(store)
    const { havePermissions, logoutStore } = store
    return { userInfo, havePermissions, isLogin, logoutStore }
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
