<template>
  <NavbarComponent />
  <div class="super-container">
    <div class="container">
      <InputComponent label="Nombre del Evento" type="text" v-model="event.name" />
      <InputComponent label="Fecha" type="date" v-model="event.date" />
      <InputComponent label="Hora" type="time" v-model="event.date" />
      <InputComponent label="Precio" type="number" v-model="event.price" />
      <InputComponent label="Flyer" type="file" />
      <label class="label" for="descripcion">
        Descripción del Evento
        <textarea name="descripcion" id="" cols="30" rows="10" placeholder="Descripción del evento"></textarea>
      </label>
      <SelectorComponent />
      <ButtonComponent label="Crear" @click.prevent="createEvent" />
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

export default {
  setup() {
    const store = useLoginStore()
    const { user } = storeToRefs(store)
    return { user }
  },

  components: { InputComponent, ButtonComponent, NavbarComponent, FooterComponent },
  data() {
    return {
      event: {
        price: null,
        date: ''
      }
    }
  },
  methods: {
    async register() {
      const users = await barsService.cargarUsuarios()
      const userLoggedIn = users.find((element) => element.username === this.user.username)

      this.event.address = userLoggedIn.address
      this.event.capacity = userLoggedIn.capacity
      this.event.barName = userLoggedIn.name
      this.event.mail = userLoggedIn.mail
      this.event.price = event.price
      this.event.date = event.date

      userLoggedIn.events = userLoggedIn.events || []
      userLoggedIn.events.push(this.event)

      barsService.editUser(userLoggedIn)

      const datosEnString = JSON.stringify(users, null, '\t')
      window.localStorage.setItem('usuarios', datosEnString)
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
