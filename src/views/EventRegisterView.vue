<template>
  <NavbarComponent />
  <div class="super-container">
    <div class="container">
      <InputComponent label="Nombre del Evento" type="text" v-model="event.title" />
      <InputComponent label="Fecha" type="date" v-model="event.date" />
      <InputComponent label="Hora" type="time" v-model="event.time" />
      <InputComponent label="Precio" type="number" v-model="event.price" />
      <InputComponent label="Flyer" type="file" fileTypes="image/*" @update:modelValue="handleFlyerUpdate" />

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
      <span v-if="creationMessage">{{ creationMessage }}</span>
    </div>
    <button @click="notify">Notify !</button>
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
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

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
        price: '',
        capacity: '',
        barName: '',
        description: '',
        date: '',
        flyer: ''
      },
      creationMessage: ''
    }
  },
  methods: {
    async register() {
      // const MANDATORY_PROPS = ['time', 'price', 'date', 'description', 'title', 'capacity']

      const { username } = this.user.bar
      this.event.address = this.user.bar.address
      this.event.capacity = this.user.bar.capacity
      this.event.barName = this.user.bar.name
      // const formData = new FormData()
      // formData.append('flyer', this.event.flyer)

      if (this.checkEmptyFields(this.event)) {
        const eventCreated = await eventsService.addEvent(this.event, username)
        if (eventCreated.status === 200) {
          this.creationMessage = 'Evento creado correctamente'
          setTimeout(() => {
            this.creationMessage = ''
          }, 3000)
        }

        this.clearEventData()
      }
    },

    clearEventData() {
      this.event = {}
    },

    notify() {
      toast.info('hello', { rtl: true })
    },

    checkEmptyFields(event) {
      return !!(event.date && event.price && event.description && event.title)
    },
    handleFlyerUpdate(files) {
      const [file] = files
      this.event.flyer = file.name
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 600px;
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
