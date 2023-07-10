<template>
  <div class="container">
    <div>
      <NavbarComponent></NavbarComponent>
      <EventListView></EventListView>
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useLoginStore } from '../stores/login'
import NavbarComponent from '../components/NavbarComponent.vue'
import EventListView from './EventListView.vue'
import FooterComponent from '../components/FooterComponent.vue'

export default {
  components: { NavbarComponent, EventListView, FooterComponent },
  setup() {
    const store = useLoginStore()
    const { user, isLogin } = storeToRefs(store) // ESTO TRAE PROPIEDADES
    const { havePermissions } = store // ESTO TRAE FUNCIONES
    return { user, havePermissions, isLogin }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.container {
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
}
</style>
