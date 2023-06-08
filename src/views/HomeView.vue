<template>
  <div>
    <h1>Bienvenidos a Tocatu</h1>
    <div>
      <NavbarComponent></NavbarComponent>
      <EventViewList></EventViewList>
    </div>
  </div>
  <div v-if="havePermissions('band')">Esto es una banda Nickname: {{ user.username }}</div>
  <div v-if="havePermissions('bar')">Esto es un bar Nickname: {{ user.username }}</div>

  <div class="footer">
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useLoginStore } from '../stores/login'
import NavbarComponent from '../components/NavbarComponent.vue'
import EventViewList from './EventListView.vue'
import FooterComponent from '../components/FooterComponent.vue'

export default {
  components: { NavbarComponent, EventViewList, FooterComponent },
  setup() {
    const store = useLoginStore()
    const { user, isLogin } = storeToRefs(store) // ESTO TRAE PROPIEDADES
    const { havePermissions } = store // ESTO TRAE FUNCIONES
    return { user, havePermissions, isLogin }
  },
  methods: {}
}
</script>

<style></style>
