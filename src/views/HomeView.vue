<template>
  <div>
    <h1>Bienvenidos a Tocatu</h1>
    <div>
      <NavbarComponent :navLinks="computedNavLinks"></NavbarComponent>
    </div>
  </div>
  <div v-if="havePermissions('band')">Esto es una banda Nickname: {{ user.username }}</div>
  <div v-if="havePermissions('bar')">Esto es un bar Nickname: {{ user.username }}</div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useLoginStore } from '../stores/login'
import NavbarComponent from '../components/NavbarComponent.vue'

export default {
  components: { RouterLink, NavbarComponent },
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
  },
  computed: {
    computedNavLinks: function () {
      if (this.havePermissions('bar')) {
        return [
          { route: '/eventRegister', text: 'Event Register' },
          { route: '/logout', text: 'Logout' }
        ]
      } else if (this.isLogin) {
        return [
          { route: '/', text: 'Home' },
          { route: '/events', text: 'Events' },
          { route: '/logout', text: 'Logout' }
        ]
      } else if (!this.isLogin) {
        return [
          { route: '/register', text: 'Register' },
          { route: '/login', text: 'Login' }
        ]
      } else {
        return []
      }
    }
  }
}
</script>

<style></style>
