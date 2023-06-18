<template>
  <DetailedCardComponent
    imageUrl="https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1516&q=80"
    :title="this.event.title"
    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam tempora voluptatem delectus! Aspernatur, omnis,
        illum explicabo atque unde harum illo ratione voluptatum in aperiam autem? Eos expedita explicabo assumenda
        aperiam."
  />
</template>
<script>
import eventsService from '../service/eventsService'
import DetailedCardComponent from '../components/DetailedCardComponent.vue'
export default {
  components: { DetailedCardComponent },
  mounted() {
    this.getEventDetails()
  },

  data() {
    return {
      event: {}
    }
  },

  methods: {
    async getEventDetails() {
      try {
        this.event = await eventsService.getEventById(this.$route.params.id)
      } catch (error) {
        console.error(error)
      }

      console.log(this.event)
    }
  }
}
</script>
<style></style>
