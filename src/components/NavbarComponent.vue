<template>
  <nav class="navbar-container">
    <ul class="link-list">
      <li>
        <RouterLink class="logo" :key="$route.path" to="/"
          ><img src="../assets/img/tocatuLogo.png" alt="Logo" /><span>Tocatu</span></RouterLink
        >
      </li>
      <div class="navbar-links">
        <li v-for="(link, index) in computedNavLinks" :key="index">
          <RouterLink :key="link.route" :to="link.route">{{ link.text }}</RouterLink>
        </li>
        <li v-if="isLogin">
          <RouterLink :key="$route.path" :to="`/perfil/editar/${this.user._id}`">Mi Perfil</RouterLink>
          <a @click="logout">Logout</a>
        </li>
      </div>
    </ul>
  </nav>
</template>

<script>
import { useLoginStore } from '../stores/login'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

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
      const conditions = [
        {
          check: this.havePermissions('bar'),
          value: [
            { route: '/registrar-evento', text: 'Crear evento' },
            { route: '/mis-eventos', text: 'Mis Eventos' }
          ]
        },
        {
          check: !this.isLogin,
          value: [
            { route: '/registrarse', text: 'Registrarse' },
            { route: '/login', text: 'Login' }
          ]
        },
        {
          check: !this.isLogin && (this.$route === '/register' || this.$route === '/login'),
          value: []
        }
      ]
      for (const condition of conditions) {
        if (condition.check) {
          return condition.value
        }
      }
      return []
    }
  },
  methods: {
    logout() {
      this.logoutStore()
      this.$router.push('/')
    }
  },
  components: { RouterLink }
}
</script>

<style scoped lang="scss">
/* Estilos de la barra de navegación */
.navbar-container {
  background-color: var(--cerulean);
  color: var(--white);
  padding: 1rem;

  .logo {
    display: flex;
    align-items: center;
  }

  .link-list {
    list-style: none;
    display: flex;
    justify-content: space-between;

    li {
      margin-right: 1rem;
      display: flex;
      align-items: center;

      .username {
        margin-right: 1rem;
        font-weight: lighter;
      }

      span {
        margin-left: 10px;
        font-weight: bold;
        font-size: 1.5rem;
      }

      a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        margin-right: 1rem;
        cursor: pointer;
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
