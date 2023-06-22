<template>
  <div class="container">
    <section v-if="!!confirmedEvents.length" class="event-section">
      <h1>Eventos Confirmados</h1>
      <div class="card-container">
        <div v-for="confirmed in confirmedEvents" :key="confirmed._id">
          <RouterLink :to="`/detalle/${confirmed._id}`"
            ><CardComponent
              :imageUrl="`http://localhost:8080/public/${confirmed.flyer}`"
              :title="confirmed.title"
              :date="confirmed.date"
          /></RouterLink>
        </div>
      </div>
    </section>
    <hr v-if="!!pendingEvents.length" style="" />
    <section v-if="barOrBand && !!pendingEvents.length" class="event-section">
      <h1>Eventos No Confirmados</h1>
      <div class="card-container">
        <div v-for="pending in pendingEvents" :key="pending._id">
          <RouterLink :to="`/detalle/${pending._id}`"
            ><CardComponent
              :imageUrl="`http://localhost:8080/public/${pending.flyer}`"
              :title="pending.title"
              :date="pending.date"
          /></RouterLink>
        </div>
      </div>
    </section>
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
  data() {
    return {
      events: [],
      confirmedEvents: [],
      pendingEvents: [],
      barOrBand: this.havePermissions('bar') || this.havePermissions('band')
    }
  },
  methods: {
    async getEvents() {
      const events = await eventsService.getEvents()
      this.confirmedEvents = events.filter((f) => f.bandId !== undefined)
      this.pendingEvents = this.barOrBand ? events.filter((f) => f.bandId === undefined) : []
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  hr {
    border: 2px solid var(--prussian-blue);
    width: 75%;
    margin: 10px auto;
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
  }

  .event-section {
    margin: 10px;
  }
}
</style>
