<template>
  <NavbarComponent />
  <h1>Mis Eventos</h1>
  <div class="container">
    <section class="card-container" v-if="events.length > 0">
      <div v-for="event in events" :key="event._id">
        <RouterLink :key="$route.path" :to="`/mis-eventos/editar/${event._id}`">
          <CardComponent
            :title="event.title"
            :date="event.date"
            :imageUrl="`http://localhost:8080/public/${event.flyer}`"
          />
        </RouterLink>
      </div>
    </section>
    <div v-else>No hay eventos creados</div>
  </div>
  <FooterComponent />
</template>
<script>
import NavbarComponent from '../components/NavbarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import { storeToRefs } from 'pinia'
import { useLoginStore } from '../stores/login'
import eventsService from '../service/eventsService'
import CardComponent from '../components/CardComponent.vue'
import barsService from '../service/barsService'
export default {
  components: { CardComponent, NavbarComponent, FooterComponent },
  setup() {
    const store = useLoginStore()
    const { user } = storeToRefs(store)
    return { user }
  },
  beforeMount() {
    this.getEventDetails()
  },

  data() {
    return {
      events: []
    }
  },

  methods: {
    async getEventDetails() {
      const { eventId } = await barsService.getBarById(this.user._id)
      const promises = eventId.map(async (id) => {
        return await eventsService.getEventById(id)
      })
      if (promises) {
        this.events = await Promise.all(promises)
      }
    }
  }
}
</script>
<style scoped lang="scss">
h1 {
  text-align: center;
  margin-top: 25px;
}
.container {
  display: flex;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.card-container {
  overflow: hidden;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  overflow: auto;
}
</style>
