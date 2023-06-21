<template>
  <NavbarComponent></NavbarComponent>

  <div class="super-container">
    <div class="container">
      <h1>Inicie sesión</h1>
      <SelectorComponent :array="accountType" v-model="typeSelected" label="Tipo de usuario" @selected="select" />
      <InputComponent type="text" v-model="user.username" label="Usuario" @keyup.enter="handleKeyPress" />
      <InputComponent type="password" v-model="user.password" label="Contraseña" @keyup.enter="handleKeyPress" />
      <ButtonComponent label="Login" @click="login" />
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import { useLoginStore } from '../stores/login'
import { storeToRefs } from 'pinia'
import ButtonComponent from '../components/ButtonComponent.vue'
import InputComponent from '../components/InputComponent.vue'
import barsService from '../service/barsService.js'
import FooterComponent from '../components/FooterComponent.vue'
import SelectorComponent from '../components/SelectorComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'
import bandsService from '../service/bandsService.js'
import usersService from '../service/usersService.js'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
export default {
  components: { ButtonComponent, InputComponent, NavbarComponent, FooterComponent, SelectorComponent },
  setup() {
    const { loginStore } = useLoginStore()
    return { loginStore }
  },
  data() {
    return {
      user: { username: '', password: '' },
      failedLogin: '',

      accountType: [
        { label: 'Banda', value: 'band' },
        { label: 'Bar', value: 'bar' },
        { label: 'Espectador', value: 'viewer' }
      ],
      typeSelected: ''
    }
  },
  methods: {
    async login() {
      const apiCalls = {
        bar: async () => await barsService.loginBar(this.user),
        band: async () => await bandsService.loginBand(this.user),
        viewer: async () => await usersService.loginUser(this.user)
      }
      let response
      try {
        response = await apiCalls[this.typeSelected]()
        if (response) {
          this.loginStore({ ...response, permissions: [response.userType] })
          this.$router.push('/')
        }
      } catch (error) {
        toast.error(`Verifique su usuario o contraseña`, { position: 'bottom-right' })
      }
    },
    handleKeyPress() {
      this.login()
    },
    select(e) {
      this.typeSelected = e
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  width: 600px;

  h1 {
    text-align: center;
  }
}
.super-container {
  display: flex;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
