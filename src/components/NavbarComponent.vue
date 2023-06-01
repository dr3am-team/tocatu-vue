<template>
  <nav>
    <ul>
      <li v-for="(link, index) in computedNavLinks" :key="index">
        <RouterLink :to="link.route" @click="handleLinkClick(link)">{{ link.text }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useLoginStore } from '../stores/login'
import { storeToRefs } from 'pinia'

export default {
  name: 'NavbarComponent',
  setup() {
    const store = useLoginStore()
    const { user, isLogin } = storeToRefs(store) // ESTO TRAE PROPIEDADES
    const { havePermissions, logoutStore } = store // ESTO TRAE FUNCIONES
    return { user, havePermissions, isLogin, logoutStore }
  },
  computed: {
    computedNavLinks: function () {
      if (this.havePermissions('bar')) {
        return [
          { route: '/', text: 'Home' },
          { route: '/eventRegister', text: 'Event Register' },
          { route: '/logout', text: 'Logout' }
        ]
      } else if (this.isLogin) {
        return [
          { route: '/', text: 'Home' },
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
  },
  methods: {
    handleLinkClick(link) {
      if (link.route === '/logout') {
        this.logoutStore()
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
/* Estilos de la barra de navegación */
nav {
  background-color: #c0c3c5;
  color: #fff;
  padding: 1rem;
}

ul {
  list-style: none;
  display: flex;
}

li {
  margin-right: 1rem;
}

a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}
</style>
