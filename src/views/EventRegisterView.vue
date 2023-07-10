<template>
  <NavbarComponent />

  <h1 v-if="!editing">Creación de eventos</h1>
  <h1 v-if="editing">Edición de eventos</h1>
  <div class="super-container">
    <div class="container">
      <InputComponent label="Nombre del Evento" type="text" v-model="event.title" />
      <InputComponent label="Fecha y Hora" type="datetime-local" v-model="event.date" />
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

      <div v-if="!editing"><ButtonComponent label="Crear" @click.prevent="createEvent" /></div>
      <div v-else><ButtonComponent label="Editar" @click.prevent="updateEvent" /></div>
      <div v-if="editing"><ButtonComponent label="Eliminar" buttonClass="danger" @click.prevent="deleteEvent" /></div>
      <span v-if="creationMessage">{{ creationMessage }}</span>
    </div>
    <FooterComponent />
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useLoginStore } from '../stores/login'
import InputComponent from '../components/InputComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import eventsService from '../service/eventsService.js'
import barsService from '../service/barsService.js'
import { handleDateTime } from '../utils/handleDateTime.js'

export default {
  setup() {
    const store = useLoginStore()
    const { user } = storeToRefs(store)
    return { user }
  },
  //https://i.kym-cdn.com/entries/icons/original/000/008/342/ihave.jpg
  beforeRouteEnter(to, from, next) {
    if (to?.matched[0]?.path !== from?.matched[0]?.path) {
      next((vm) => {
        vm.clearEventData()
        vm.editing = false
        if (to.fullPath.includes('editar')) {
          vm.editing = true
        }
      })
    } else {
      next()
    }
  },

  beforeMount() {
    if (!this.user.permissions.find((e) => e === 'bar')) {
      this.$router.push('/login')
    }

    if (this.$route.params.id) {
      this.getEventData()
      this.editing = true
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
        date: ''
        // flyer: ''
      },
      editing: false,
      creationMessage: '',
      image: '',
      id: this.$route.params.id
    }
  },
  methods: {
    async createEvent() {
      const { username } = this.user
      this.event.address = this.user.address
      this.event.capacity = this.user.capacity
      this.event.barName = this.user.name
      const formData = new FormData()
      formData.append('flyer', this.image)
      const isSameDate = await this.searchEventsOnSameDay(this.user._id, this.event.date)
      if (this.checkEmptyFields(this.event)) {
        if (!isSameDate) {
          const eventCreated = await eventsService.addEvent(this.event, username)
          const imageUploaded = await eventsService.uploadImage(formData, eventCreated.data._id)
          console.log(imageUploaded)
          if (eventCreated.status === 200) {
            toast.success('Evento creado correctamente!', { position: 'bottom-right' })
            this.clearEventData()
          }
        } else {
          toast.error(`Ya existe un evento en la misma fehca!${handleDateTime(this.event.date, 'normalizedDate')}`, {
            position: 'bottom-right'
          })
        }
      } else {
        toast.error('Campos incompletos', { position: 'bottom-right' })
      }
    },

    async searchEventsOnSameDay(_id, eventDate) {
      const res = await barsService.getBarById(_id)
      const barEvents = res.eventId

      const isSameDate = barEvents.map(async (event) => {
        const dates = await eventsService.getEventById(event)
        if (dates) {
          return handleDateTime(dates.date, 'onlyDate')
        }
      })

      return (await Promise.all(isSameDate)).some((date) => date === handleDateTime(eventDate, 'onlyDate'))
    },

    clearEventData() {
      this.event = {}
    },

    checkEmptyFields(event) {
      return !!(event.date && event.price && event.description && event.title)
    },
    handleFlyerUpdate(files) {
      const [file] = files
      this.image = file
    },
    async getEventData() {
      const event = await eventsService.getEventById(this.$route.params.id)
      this.event.title = event.title
      this.event.price = event.price
      this.event.date = handleDateTime(event.date, 'date')
      this.event.flyer = event.flyer
      this.event.description = event.description
    },
    async updateEvent() {
      const eventUpdated = await eventsService.editEvent(this.id, this.event)
      if (eventUpdated.status === 200) {
        toast.success('Evento editado correctamente!', { position: 'bottom-right' })
      }
    },
    async deleteEvent() {
      const eventDeleted = await eventsService.deleteEvent(this.id)
      if (eventDeleted.status === 200) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  margin-top: 20px;
}
.container {
  width: 600px;
  margin: 25px auto;
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
