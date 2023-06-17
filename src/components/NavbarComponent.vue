<template>
  <nav>
    <ul class="container">
      <li>
        <RouterLink to="/"><img src="../assets/img/tocatuLogo.png" alt="Logo" /></RouterLink>
      </li>
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
    computedNavLinks() {
      if (!this.isLogin) {
        if (this.$route.path === '/') {
          return [
            { route: '/register', text: 'Registrarse' },
            { route: '/login', text: 'Login' }
          ]
        } else if (this.$route.path === '/register' || this.$route.path === '/login') {
          return []
        }
        return []
      } else if (this.havePermissions('bar')) {
        return [
          { route: '/eventRegister', text: 'Crear evento' },
          { route: '/logout', text: 'Logout' }
        ]
      } else {
        return [{ route: '/logout', text: 'Logout' }]
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
  background-color: var(--cerulean);
  color: var(--white);
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

img {
  width: 50px;
}

.container {
  display: flex;
  align-items: center;
}
</style>
