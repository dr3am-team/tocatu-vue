<template>
  <nav class="navbar-container">
    <ul class="link-list">
      <li>
        <RouterLink to="/"><img src="../assets/img/tocatuLogo.png" alt="Logo" /></RouterLink>
        <span>Tocatu</span>
      </li>
      <div class="navbar-links">
        <li v-for="(link, index) in computedNavLinks" :key="index">
          <RouterLink :to="link.route" @click="handleLinkClick(link)">{{ link.text }}</RouterLink>
        </li>
      </div>
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
          { route: '/registrar-evento', text: 'Crear evento' },
          { route: '/logout', text: 'Logout' }
        ]
      } else if (this.isLogin) {
        return [{ route: '/logout', text: 'Logout' }]
      } else if (!this.isLogin && this.$route.path === '/') {
        return [
          { route: '/registrarse', text: 'Registrarse' },
          { route: '/login', text: 'Login' }
        ]
      } else if ((!this.isLogin && this.$router === '/register') || (!this.isLogin && this.$router === '/login')) {
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

<style scoped lang="scss">
/* Estilos de la barra de navegación */
.navbar-container {
  background-color: var(--cerulean);
  color: var(--white);
  padding: 1rem;

  .link-list {
    list-style: none;
    display: flex;
    justify-content: space-between;

    li {
      margin-right: 1rem;
      display: flex;
      align-items: center;

      span {
        margin-left: 10px;
        font-weight: bold;
        font-size: 1.5rem;
      }

      a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
      }

      img {
        width: 50px;
      }
    }

    .navbar-links {
      display: flex;
    }
  }
}
</style>
