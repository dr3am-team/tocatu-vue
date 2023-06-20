<template>
  <div class="card-container">
    <div v-for="event in events" :key="event._id">
      <RouterLink :to="`/detalle/${event._id}`"
        ><CardComponent :image-url="event.flyer" :title="event.title" :date="event.date"
      /></RouterLink>
    </div>
  </div>
</template>

<script>
import CardComponent from '../components/CardComponent.vue'
import eventsService from '../service/eventsService.js'
import { useLoginStore } from '../stores/login'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const store = useLoginStore()
    const { user, isLogin } = storeToRefs(store) // ESTO TRAE PROPIEDADES
    const { havePermissions, logoutStore } = store // ESTO TRAE FUNCIONES
    return { user, havePermissions, isLogin, logoutStore }
  },
  components: { CardComponent },
  created() {
    this.getEvents()
  },
  methods: {
    async getEvents() {
      if (this.havePermissions('bar')) {
        this.events = await eventsService.getEvents()
        //TODO Separar visualmente cuales tienen banda y cuales no
      }

      if (this.havePermissions('band')) {
        this.events = await eventsService.getEvents('/?filter=bandId&exists=false')
      }

      if (this.havePermissions('viewer')) {
        this.events = await eventsService.getEvents('/?filter=bandId&exists=true')
      }
    }
  },
  data() {
    return {
      events: []
    }
  }
}
</script>

<style scoped>
.card-container {
  overflow: hidden;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  overflow: auto;
}
</style>
