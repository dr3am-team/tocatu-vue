<template>
  <div class="details-view-container">
    <div class="card-container">
      <DetailedCardComponent
        imageUrl="https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1516&q=80"
        :title="event.title"
        :description="event.description"
      />
      <div v-if="eventWithBand" class="event-details">
        <p class="event-details-text">Fecha: {{ new Date(event.date).toLocaleString() }}</p>
        <p class="event-details-text">Estilo de la banda: {{ band.style }}</p>
        <p class="event-details-text">Nombre de la banda: {{ band.name }}</p>
        <p class="event-details-text">Direccion del evento: {{ event.address }}</p>
      </div>
    </div>
    <div class="button-container">
      <ButtonComponent v-if="showButton" label="Unirse a Evento" @click="joinToEvent"></ButtonComponent>
      <ButtonComponent v-if="showSpectateButton" label="¡Quiero ir a verlo!" @click="spectateEvent"></ButtonComponent>
    </div>
  </div>
</template>
<script>
import eventsService from '../service/eventsService.js'
import DetailedCardComponent from '../components/DetailedCardComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import { useLoginStore } from '../stores/login'
import { storeToRefs } from 'pinia'
import bandsService from '../service/bandsService'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import usersService from '../service/usersService.js'
export default {
  components: { DetailedCardComponent, ButtonComponent },
  beforeMount() {
    this.getEventDetails()
    this.checkJoinButton()
    this.checkSpectateButton()
    this.getBandDetails()
    this.eventHasBand()
  },
  setup() {
    const store = useLoginStore()
    const { user, isLogin } = storeToRefs(store) // ESTO TRAE PROPIEDADES
    const { havePermissions, logoutStore } = store // ESTO TRAE FUNCIONES
    return { user, havePermissions, isLogin, logoutStore }
  },
  data() {
    return {
      event: {},
      showButton: false,
      showSpectateButton: false,
      band: {},
      eventWithBand: false
    }
  },

  methods: {
    async getEventDetails() {
      try {
        this.event = await eventsService.getEventById(this.$route.params.id)
      } catch (error) {
        console.log(error)
      }
    },

    async joinToEvent() {
      try {
        const eventResponse = await eventsService.editEvent(this.event._id, { bandId: this.user._id })
        const bandResponse = await bandsService.editBand(this.user._id, { eventsSubscribed: this.event._id })

        if (eventResponse.status === 200 && bandResponse.status === 200) {
          toast.success('Te uniste correctamente al evento!', { position: 'bottom-right' })
          this.checkJoinButton()
        } else {
          toast.error('Hubo un problema. Intentalo de nuevo', { position: 'bottom-right' })
        }
      } catch (error) {
        console.log(error)
        toast.error('Hubo un problema. Intentalo de nuevo', { position: 'bottom-right' })
      }
    },
    async checkJoinButton() {
      await this.getEventDetails()
      if (this.event.bandId) {
        this.showButton = false
        return
      }
      if (this.havePermissions('band')) {
        this.showButton = true
        return
      }
      this.showButton = false
    },
    async spectateEvent() {
      //UNIR Y TRAER ID DE USER UNIDO
      let data = {}
      try {
        if (this.havePermissions('viewer')) {
          data = { viewersId: this.user._id }
          const eventResponse = await eventsService.editEvent(this.event._id, data)
          const viewerResponse = await usersService.editUser(this.user._id, { eventsSubscribed: this.event._id })
        }

        this.checkSpectateButton()
      } catch (error) {}
    },
    async checkSpectateButton() {
      await this.getEventDetails()
      if (this.event.bandId && this.havePermissions('viewer')) {
        if (!this.spectatorAlreadyInEvent()) {
          this.showSpectateButton = true
        } else {
          this.showSpectateButton = false
        }
      } else {
        this.showSpectateButton = false
      }
    },
    spectatorAlreadyInEvent() {
      const userLogged = this.user._id
      if (this.event.viewersId.includes(userLogged)) {
        return true
      }
    },
    async getBandDetails() {
      await this.getEventDetails()
      if (this.event.bandId) {
        try {
          this.band = await bandsService.getBandById(this.event.bandId)
        } catch (error) {
          console.log(error)
        }
      }
    },
    async eventHasBand() {
      await this.getEventDetails()
      if (this.event.bandId) {
        this.eventWithBand = true
      }
    }
  }
}
</script>
<style>
.details-view-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 1000px;
  margin: 50px auto;
}

.event-details {
  margin-top: 20px;
}

.event-details-text {
  margin: 5px 0;
}
</style>
