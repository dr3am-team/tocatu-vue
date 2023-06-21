<template>
  <!--  -->
  <div>
    <NavbarComponent />
    <div class="event-detail-container">
      <div class="event-details">
        <EventDetailsComponent :event="event" />
      </div>
      <div class="bands" v-if="eventHasBands">
        <h1>Participan:</h1>
        <BandDetailComponent :band="this.band" />
      </div>
    </div>
    <div class="buttons-container">
      <ButtonComponent v-if="showButton" label="Unirse a Evento" @click="joinToEvent"></ButtonComponent>
      <ButtonComponent v-if="showSpectateButton" label="¡Quiero ir a verlo!" @click="spectateEvent"></ButtonComponent>
    </div>
  </div>
  <FooterComponent />
</template>

<script>
import eventsService from '../service/eventsService.js'
import EventDetailsComponent from '../components/EventDetailsComponent.vue'
import BandDetailComponent from '../components/BandDetailComponent.vue'
import ButtonComponent from '../components/ButtonComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import { useLoginStore } from '../stores/login'
import { storeToRefs } from 'pinia'
import bandsService from '../service/bandsService'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import usersService from '../service/usersService.js'
export default {
  components: { NavbarComponent, FooterComponent, BandDetailComponent, EventDetailsComponent, ButtonComponent },
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
      eventHasBands: false
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
          console.log(viewerResponse)
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
        this.eventHasBands = true
      }
    }
  }
}
</script>
<style>
.event-detail-container {
  display: flex;
}

.bands {
  width: 50%;
  border-left: solid 2px black;
  margin-top: 1em;
  padding: 0 3em;
}

h1 {
  margin: 1em 0;
}

.event-details {
  width: 50%;
}

.buttons-container {
  width: 50%;
  margin: 0.5em;
  text-align: center;
}
</style>
