<template>
  <div class="container">
    <InputComponent label="Nombre del Evento" type="text" v-model="event.name" />
    <InputComponent label="Fecha" type="date" v-model="event.date" />
    <InputComponent label="Precio" type="text" v-model="event.price" />
    <InputComponent label="Flyer" type="file" />
  </div>

  <ButtonComponent label="Crear" @click="createEvent" />
</template>

<script>
import { storeToRefs } from 'pinia'
import { useLoginStore } from '../stores/login'
import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
export default {
  setup() {
    const store = useLoginStore()
    const { user } = storeToRefs(store)
    return { user }
  },

  components: { InputComponent, ButtonComponent },
  data() {
    return {
      event: {}
    }
  },
  methods: {
    createEvent() {
      const users = JSON.parse(window.localStorage.getItem('usuarios'))

      const userLoggedIn = users.find((element) => element.username === this.user.username)
      console.log('🚀 ~ file: EventRegisterView.vue:35 ~ createEvent ~ userLoggedIn:', userLoggedIn)

      this.event.address = userLoggedIn.address
      this.event.capacity = userLoggedIn.capacity
      this.event.barName = userLoggedIn.name
      this.event.mail = userLoggedIn.mail

      userLoggedIn.events = userLoggedIn.events || []
      userLoggedIn.events.push(this.event)

      const datosEnString = JSON.stringify(users, null, '\t')
      window.localStorage.setItem('usuarios', datosEnString)
    }
  }
}
</script>

<style>
.container {
}
</style>
