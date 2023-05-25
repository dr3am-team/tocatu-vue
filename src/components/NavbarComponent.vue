<template>
  <nav>
    <ul>
      <li v-for="(link, index) in navLinks" :key="index">
        <RouterLink :to="link.route" @click="handleLinkClick(link)">{{ link.text }}</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useLoginStore } from '../stores/login'

export default {
  name: 'NavbarComponent',
  setup() {
    const store = useLoginStore()
    const { logoutStore } = store
    return { logoutStore }
  },
  props: {
    navLinks: {
      type: Array,
      required: true
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
