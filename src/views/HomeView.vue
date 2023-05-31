<template>
  <div>
    <h1>Bienvenidos a Tocatu</h1>
    <div>
      <NavbarComponent :navLinks="computedNavLinks"></NavbarComponent>
      <EventViewList> </EventViewList>
    </div>
  </div>
  <div v-if="havePermissions('band')">Esto es una banda Nickname: {{ user.username }}</div>
  <div v-if="havePermissions('bar')">Esto es un bar Nickname: {{ user.username }}</div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useLoginStore } from '../stores/login'
import NavbarComponent from '../components/NavbarComponent.vue'
import EventViewList from './EventListView.vue'

export default {
  components: { NavbarComponent, EventViewList },
  setup() {
    const store = useLoginStore()
    const { user, isLogin } = storeToRefs(store) // ESTO TRAE PROPIEDADES
    const { havePermissions } = store // ESTO TRAE FUNCIONES
    return { user, havePermissions, isLogin }
  },
  methods: {},
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
