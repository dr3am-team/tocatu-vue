<template>
  <div class="card-container">
    <div v-for="event in events" :key="event._id">
      <CardComponent :image-url="event.flyer" :title="event.title" :date="event.date" />
    </div>
  </div>
</template>

<script>
import CardComponent from '../components/CardComponent.vue'
import eventsService from '../service/eventsService.js'

export default {
  components: { CardComponent },
  created() {
    this.getEvents()
  },
  methods: {
    async getEvents() {
      const events = await eventsService.getEvents()
      this.events = events
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
