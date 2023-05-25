<template>
  <div class="card-container">
    <CardComponent
      image-url="https://elements-cover-images-0.imgix.net/45d65e84-71a6-43a6-b106-5d38454e758b?auto=compress%2Cformat&fit=max&w=1170&s=2c6475bd3c419ee737f43bdd2aa65182"
      title="Gospel"
      text="La banda del Gospel Atr"
      button-text="Unirme"
    />
    <CardComponent
      image-url="https://elements-cover-images-0.imgix.net/45d65e84-71a6-43a6-b106-5d38454e758b?auto=compress%2Cformat&fit=max&w=1170&s=2c6475bd3c419ee737f43bdd2aa65182"
      title="Gospel"
      text="La banda del Gospel Atr"
      button-text="Unirme"
    />
  </div>
</template>

<script>
import CardComponent from '../components/CardComponent.vue'
export default {
  components: { CardComponent }
}
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>
