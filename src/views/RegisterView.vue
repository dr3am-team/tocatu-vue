<template>
  <NavbarComponent></NavbarComponent>
  <div class="super-container">
    <form class="container">
      <InputComponent
        type="text"
        v-model="generalData.username"
        label="Nombre de usuario"
        @keyup.enter="handleKeyPress"
      />
      <InputComponent
        type="text"
        v-model="generalData.mail"
        label="Mail"
        placeholder="usuario@usuario.com"
        @keyup.enter="handleKeyPress"
      />
      <InputComponent type="password" v-model="generalData.password" label="Password" @keyup.enter="handleKeyPress" />

      <div v-if="!editing">
        <SelectorComponent :array="accountType" v-model="typeSelected" label="Tipo de usuario" @selected="select" />
      </div>

      <div v-if="typeSelected == 'band'" class="container">
        <InputComponent type="text" v-model="band.name" label="Nombre de tu banda" @keyup.enter="handleKeyPress" />
        <!-- <InputComponent type="text" v-model="band.style" label="Estilo de tu banda" @keyup.enter="handleKeyPress" /> -->
        <SelectorComponent
          :array="musicStyles"
          v-model="band.style"
          label="Selecciona un estilo"
          @selected="handleSelected"
        />
      </div>
      <div v-if="typeSelected == 'bar'">
        <InputComponent type="text" v-model="bar.name" label="Nombre de tu bar" />
        <InputComponent type="text" v-model="bar.address" label="Dirección" />
        <InputComponent type="number" v-model="bar.capacity" label="Capacidad" />
      </div>
      <div v-if="!editing"><ButtonComponent @click.prevent="register" label="Registrarse" customStyle="20px" /></div>
      <div v-else><ButtonComponent @click.prevent="update" label="Editar" customStyle="20px" /></div>
    </form>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useLoginStore } from '../stores/login'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import ButtonComponent from '../components/ButtonComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import InputComponent from '../components/InputComponent.vue'
import SelectorComponent from '../components/SelectorComponent.vue'
import usersService from '../service/usersService'
import NavbarComponent from '../components/NavbarComponent.vue'
import barsService from '../service/barsService'
import bandsService from '../service/bandsService'
import musicStyles from '../utils/musicStyles.json'

export default {
  components: { InputComponent, ButtonComponent, SelectorComponent, FooterComponent, NavbarComponent },
  setup() {
    const store = useLoginStore()
    const { user } = storeToRefs(store)
    return { user }
  },
  beforeMount() {
    if (this.$route.params.id) {
      this.getData(this.user.userType, this.$route.params.id)
      this.typeSelected = this.user.userType
      this.editing = true
    }
    return { musicStyles }
  },
  data() {
    return {
      accountType: [
        { label: 'Banda', value: 'band' },
        { label: 'Bar', value: 'bar' },
        { label: 'Espectador', value: 'viewer' }
      ],
      typeSelected: '',
      band: { name: '', style: '' },
      bar: { name: '', address: '', capacity: null },
      generalData: { username: '', mail: '', password: '', userType: '' },
      users: [],
      styles: [
        { value: 'rock', label: 'Rock' },
        { value: 'jazz', label: 'Jazz' }
      ]
    }
  },
  methods: {
    async register() {
      this.generalData.userType = this.typeSelected
      const data = {
        ...this.generalData,
        ...(this.typeSelected == 'band' && { ...this.band }),
        ...(this.typeSelected == 'bar' && { ...this.bar })
      }
      try {
        let response
        if (this.generalData.userType == 'bar') {
          response = await barsService.addBar(data)
        } else if (this.generalData.userType == 'band') {
          response = await bandsService.addBand(data)
        } else if (this.generalData.userType == 'viewer') {
          response = await usersService.addUser(data)
        }

        if (response.status == 200) {
          this.$router.push('/login')
        }
      } catch (error) {
        console.log('Error creating' + this.generalData.userType + error)
      }
    },
    select(e) {
      this.typeSelected = e
    },
    handleSelected(selected) {
      this.band.style = selected
    },
    handleKeyPress() {
      this.register()
    },
    async getBarData(_id) {
      const bar = await barsService.getBarById(_id)
      this.generalData.username = bar.username
      this.generalData.mail = bar.mail
      this.generalData.password = bar.password
      this.generalData.userType = this.user.userType
      this.bar.name = bar.name
      this.bar.address = bar.address
      this.bar.capacity = bar.capacity
    },
    async getBandData(_id) {
      const band = await bandsService.getBandById(_id)
      this.generalData.username = band.username
      this.generalData.mail = band.mail
      this.generalData.password = band.password
      this.generalData.userType = this.user.userType
      this.band.name = band.name
      this.band.style = band.style
    },
    async getUserData(_id) {
      const user = await usersService.getUserById(_id)
      this.generalData.username = user.username
      this.generalData.mail = user.mail
      this.generalData.password = user.password
      this.generalData.userType = this.user.userType
    },
    getData(userType, _id) {
      if (userType == 'bar') {
        this.getBarData(_id)
      } else if (userType == 'band') {
        this.getBandData(_id)
      } else {
        this.getUserData(_id)
      }
    },
    async update() {
      const apiCalls = {
        bar: async () => await barsService.editBar(this.$route.params.id, { ...this.bar, ...this.generalData }),
        band: async () => await bandsService.editBand(this.$route.params.id, { ...this.band, ...this.generalData }),
        viewer: async () => await usersService.editUser(this.$route.params.id, { ...this.viewer, ...this.generalData })
      }
      let response
      try {
        response = await apiCalls[this.user.userType]()
        if (response.status === 200) {
          toast.success(`${this.user.userType} editado correctamente!`, { position: 'bottom-right' })
        }
      } catch (error) {
        toast.error(`${error.response.data.message}`, { position: 'bottom-right' })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 600px;
}
.super-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
