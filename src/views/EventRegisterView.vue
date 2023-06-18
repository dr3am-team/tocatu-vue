<template>
  <NavbarComponent />
  <div class="super-container">
    <div class="container">
      <InputComponent label="Nombre del Evento" type="text" v-model="event.title" />
      <InputComponent label="Fecha" type="date" v-model="event.date" />
      <InputComponent label="Hora" type="time" v-model="event.time" />
      <InputComponent label="Precio" type="number" v-model="event.price" />
      <InputComponent label="Flyer" type="file" />
      <label class="label" for="descripcion">
        Descripción del Evento
        <textarea
          name="descripcion"
          id=""
          cols="30"
          rows="10"
          v-model="event.description"
          placeholder="Descripción del evento"
        ></textarea>
      </label>
      <ButtonComponent label="Crear" @click.prevent="register" />
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useLoginStore } from '../stores/login'
import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import barsService from '../service/barsService.js'
import FooterComponent from '../components/FooterComponent.vue'
import eventsService from '../service/eventsService.js'

export default {
  setup() {
    const store = useLoginStore()
    const { user } = storeToRefs(store)
    return { user }
  },

  //Devuelve te manda al login si no hay permisos (se ejecuta al montarse el componente)
  mounted() {
    if (!this.user.permissions.find((e) => e === 'bar')) {
      this.$router.push('/login')
    }
  },
  components: { InputComponent, ButtonComponent, NavbarComponent, FooterComponent },
  data() {
    return {
      event: {
        title: '',
        price: 0,
        capacity: 0,
        barName: '',
        description: '',
        date: ''
      }
    }
  },
  methods: {
    async register() {
      // const MANDATORY_PROPS = ['time', 'price', 'date', 'description', 'title', 'capacity']

      const { username } = this.user.bar
      this.event.address = this.user.bar.address
      this.event.capacity = this.user.bar.capacity
      this.event.barName = this.user.bar.name
      console.log()
      if (this.checkEmptyFields(this.event)) {
        const eventCreated = await eventsService.addEvent(this.event, username)
        this.clearEventData()
      }
    },

    clearEventData() {
      this.event = {}
    },

    checkEmptyFields(event) {
      return !!(event.date && event.price && event.description && event.title)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .label {
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
    width: 100%;

    textarea {
      padding: 5px 10px;
      width: 70%;
    }
  }
}
.super-container {
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
