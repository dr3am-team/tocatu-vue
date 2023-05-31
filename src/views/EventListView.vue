<script>
<<<<<<< HEAD
=======
import axios from 'axios'
>>>>>>> f688468aefe5181bf440c19a53e3b47790d30d0d
import CardComponent from '../components/CardComponent.vue'

export default {
<<<<<<< HEAD
  components: { CardComponent }
=======
  components: { CardComponent },
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
          this.fecha = "De lunes a viernes, de 20 a 23hs"
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
>>>>>>> f688468aefe5181bf440c19a53e3b47790d30d0d
}
</script>

<template>
  <div class="card-container">
    <CardComponent :image-url="pokemonImage" :title="pokemonName" fecha="fecha"/>
    <CardComponent :image-url="pokemonImage" :title="pokemonName" :fecha="fecha"/>
    <CardComponent :image-url="pokemonImage" :title="pokemonName" :fecha="fecha"/>
    <CardComponent :image-url="pokemonImage" :title="pokemonName" :fecha="fecha"/>

  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>
