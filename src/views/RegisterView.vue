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

      <SelectorComponent :array="accountType" v-model="typeSelected" label="Tipo de usuario" @selected="select" />

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
      <ButtonComponent @click.prevent="register" label="Registrarse" customStyle="20px" />
    </form>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
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
