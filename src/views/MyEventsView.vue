<template>
  <section class="card-container" v-if="events.length > 0">
    <div v-for="event in events" :key="event._id">
      <RouterLink :to="`/editar/${event._id}`">
        <CardComponent :title="event.title" :date="event.date" />
      </RouterLink>
    </div>
  </section>
  <div v-else>No hay eventos creados</div>
</template>
<script>
import { storeToRefs } from 'pinia'
import { useLoginStore } from '../stores/login'
import eventsService from '../service/eventsService'
import CardComponent from '../components/CardComponent.vue'
export default {
  components: { CardComponent },
  setup() {
    const store = useLoginStore()
    const { user } = storeToRefs(store)
    return { user }
  },
  mounted() {
    this.getEventDetails()
  },

  data() {
    return {
      events: []
    }
  },

  methods: {
    async getEventDetails() {
      const promises = this?.user?.bar?.eventIds?.map(async (id) => {
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
.card-container {
  overflow: hidden;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  overflow: auto;
}
</style>
