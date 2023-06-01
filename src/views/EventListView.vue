<script>
import axios from 'axios'
import CardComponent from '../components/CardComponent.vue'
import DetailedCardComponent from '../components/DetailedCardComponent.vue'

export default {
  components: { CardComponent, DetailedCardComponent },
  created() {
    this.obtenerInformacionPokemon()
  },
  methods: {
    obtenerInformacionPokemon() {
      const nombrePokemon = 'pikachu'
      const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`

      axios
        .get(url)
        .then((response) => {
          // Aquí puedes trabajar con los datos del Pokémon
          console.log(response.data)
          // Asigna los datos a propiedades del componente para usarlos en el template
          // Por ejemplo:
          this.pokemonName = response.data.name
          this.pokemonImage = response.data.sprites.other.home.front_default
          this.fecha = 'De lunes a viernes, de 20 a 23hs'
        })
        .catch((error) => {
          console.error(error)
        })
    }
  },
  data() {
    return {
      pokemonName: '',
      pokemonImage: '',
      fecha: this.fecha
    }
  }
}
</script>

<template>
  <div class="card-container">
    <CardComponent :image-url="pokemonImage" :title="pokemonName" fecha="fecha" />
    <CardComponent :image-url="pokemonImage" :title="pokemonName" :fecha="fecha" />
    <CardComponent :image-url="pokemonImage" :title="pokemonName" :fecha="fecha" />
    <CardComponent :image-url="pokemonImage" :title="pokemonName" :fecha="fecha" />
    <DetailedCardComponent :imageUrl="pokemonImage" title="Ea" description="asda  sasd dASD" />
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>
